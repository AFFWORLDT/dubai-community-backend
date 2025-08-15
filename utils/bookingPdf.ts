import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { format } from 'date-fns';

// Define interfaces for the data types
interface BookingData {
  checkIn: string | Date;
  checkOut: string | Date;
  nights: number;
  subtotal?: number;
  rent?: number;
  cleaningFee?: number;
  serviceFee?: number;
  vat?: number;
  totalAmount?: number;
  dtcmFee?: number;
  dtcmFeePerNight?: number;
  vatPercentage?: number;
  transactionId?: string;
  managementFees?: number;
  income?: number;
  status?: string;
  guest?: string;
}

interface UserData {
  fullName?: string;
  email?: string;
  phone?: string;
  location?: string;
}

interface PropertyData {
  title?: string;
  address?: {
    address?: string;
  };
  photos?: Array<{
    url?: string;
  }>;
  category?: string;
  guest_no?: number;
}

export const generateBookingReceiptPDF = async (
  bookingData: BookingData, 
  userData: UserData, 
  propertyData: PropertyData, 
  BOOKINGID: string
) => {
  try {
    // Format dates
    const issuedDate = format(new Date(), 'yyyy-MM-dd');
    const checkInDate = format(new Date(bookingData.checkIn), 'yyyy-MM-dd');
    const checkOutDate = format(new Date(bookingData.checkOut), 'yyyy-MM-dd');
    
    // Use transactionID for booking reference, fallback to BOOKINGID
    const bookingReference = bookingData.transactionId || BOOKINGID;
    
    // Calculate fees
    const subtotal = bookingData.subtotal || bookingData.rent || 0;
    const cleaningFee = bookingData.cleaningFee || 0;
    const serviceFee = bookingData.serviceFee || 0;
    const vat = bookingData.vat || 0;
    const totalAmount = bookingData.totalAmount || 0;
    const dtcmFee = bookingData.dtcmFee || 0;
    
    // Create HTML template
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Booking Confirmation & Receipt</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.4;
            color: #2c3e50;
            background-color: #ffffff;
            font-size: 11px;
            width: 210mm;
            height: 297mm;
            padding: 12px;
            overflow: hidden;
          }
          
                     .header {
             display: flex;
             justify-content: space-between;
             align-items: flex-start;
             margin-bottom: 15px;
             border-bottom: 3px solid #1e3d9f;
             padding-bottom: 12px;
           }
          
          .company-info {
            flex: 1;
          }
          
                     .company-name {
             font-size: 24px;
             font-weight: 700;
             color: #1e3d9f;
             margin-bottom: 6px;
             letter-spacing: -0.5px;
           }
          
          .company-address {
            font-size: 10px;
            color: #64748b;
            margin-bottom: 2px;
            line-height: 1.3;
          }
          
          .company-contact {
            font-size: 10px;
            color: #64748b;
            margin-bottom: 2px;
          }
          
          .document-title {
            text-align: center;
            margin-bottom: 12px;
          }
          
                     .title {
             font-size: 20px;
             font-weight: 700;
             color: #1e3d9f;
             margin-bottom: 4px;
             text-transform: uppercase;
             letter-spacing: 1px;
           }
          
          .issued-date {
            font-size: 11px;
            color: #64748b;
            margin-bottom: 4px;
          }
          
                     .booking-ref {
             display: flex;
             justify-content: space-between;
             align-items: center;
             margin-bottom: 15px;
             background: linear-gradient(135deg, #f0f7ff 0%, #e6f0ff 100%);
             padding: 10px 12px;
             border-radius: 6px;
             border-left: 4px solid #1e3d9f;
           }
          
                     .reference {
             font-size: 12px;
             font-weight: 600;
             color: #1e3d9f;
           }
          
          .status-badge {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 5px 10px;
            border-radius: 18px;
            font-weight: 600;
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);
          }
          
          .main-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 15px;
          }
          
                     .info-section {
             background: #f0f7ff;
             padding: 12px;
             border-radius: 6px;
             border: 1px solid #e6f0ff;
           }
          
                     .section-title {
             font-size: 12px;
             font-weight: 700;
             color: #1e3d9f;
             margin-bottom: 10px;
             text-transform: uppercase;
             letter-spacing: 0.5px;
             border-bottom: 2px solid #1e3d9f;
             padding-bottom: 4px;
           }
          
          .info-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
            font-size: 10px;
          }
          
          .info-label {
            font-weight: 600;
            color: #475569;
            min-width: 70px;
          }
          
          .info-value {
            color: #1e293b;
            text-align: right;
            flex: 1;
          }
          
          .charges-section {
            margin-bottom: 15px;
          }
          
          .charges-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 8px;
            font-size: 10px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }
          
                     .charges-table th,
           .charges-table td {
             border: 1px solid #e6f0ff;
             padding: 6px 8px;
             text-align: left;
           }
          
                     .charges-table th {
             background: linear-gradient(135deg, #1e3d9f 0%, #1a365d 100%);
             color: white;
             font-weight: 600;
             text-transform: uppercase;
             font-size: 9px;
             letter-spacing: 0.5px;
           }
          
                     .charges-table tr:nth-child(even) {
             background-color: #f0f7ff;
           }
          
                     .charges-table tr:hover {
             background-color: #e6f0ff;
           }
          
                     .footer-section {
             display: flex;
             justify-content: space-between;
             align-items: flex-end;
             margin-top: 15px;
             padding-top: 12px;
             border-top: 1px solid #e6f0ff;
           }
          
          .signature-section {
            flex: 1;
            position: relative;
          }
          
                     .signature-line {
             border-top: 2px solid #1e3d9f;
             width: 120px;
             margin-bottom: 4px;
           }
          
          .signature-text {
            font-size: 9px;
            color: #64748b;
            margin-bottom: 4px;
          }
          
                     .stamp-container {
             position: relative;
             margin-top: 15px;
             margin-left: 20px;
             width: 150px;
             height: 150px;
             opacity: 0.8;
             transform: rotate(-15deg);
           }
          
          .stamp {
            width: 130%;
            height: 130%;
            object-fit: contain;
          }
          
          .footer {
            text-align: center;
            font-size: 9px;
            color: #64748b;
            flex: 1;
          }
          
                     .footer-content {
             background: #f0f7ff;
             padding: 6px;
             border-radius: 4px;
             border: 1px solid #e6f0ff;
           }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header -->
          <div class="header">
            <div class="company-info">
              <div class="company-name">MYBOOKINGS</div>
              <div class="company-address">Office: 2/137 Great Eastern Highway, Rivervale. 6103, Western Australia</div>
              <div class="company-contact">support@mybookings.ae</div>
            </div>
          </div>
          
          <!-- Document Title -->
          <div class="document-title">
            <div class="title">Booking Confirmation & Receipt</div>
            <div class="issued-date">Issued On: ${issuedDate}</div>
          </div>
          
          <!-- Booking Reference -->
          <div class="booking-ref">
            <div class="reference">Booking Reference: ${bookingReference}</div>
            <div class="status-badge">${bookingData.status || 'Confirmed'}</div>
          </div>
          
          <!-- Main Content Grid -->
          <div class="main-content">
            <!-- Guest Information -->
            <div class="info-section">
              <div class="section-title">Guest / Payer</div>
              <div class="info-row">
                <span class="info-label">Name:</span>
                <span class="info-value">${userData.fullName || 'N/A'}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Email:</span>
                <span class="info-value">${userData.email || 'N/A'}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Phone:</span>
                <span class="info-value">${userData.phone || 'N/A'}</span>
              </div>
             
            </div>
            
            <!-- Booking Details -->
            <div class="info-section">
              <div class="section-title">Booking Details</div>
              <div class="info-row">
                <span class="info-label">Unit:</span>
                <span class="info-value">${propertyData.title || 'N/A'}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Location:</span>
                <span class="info-value">${propertyData.address?.address || 'N/A'}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Check-in:</span>
                <span class="info-value">${checkInDate}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Check-out:</span>
                <span class="info-value">${checkOutDate}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Nights:</span>
                <span class="info-value">${bookingData.nights}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Booking ID:</span>
                <span class="info-value">${bookingReference}</span>
              </div>
            </div>
          </div>
          
          <!-- Booking Charges -->
          <div class="charges-section">
            <div class="section-title">Booking Charges & Payment Summary</div>
            <table class="charges-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Nights</th>
                  <th>Amount (AED)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Nightly Rate</td>
                  <td>${bookingData.nights}</td>
                  <td>${subtotal.toFixed(2)}</td>
                </tr>
                ${cleaningFee > 0 ? `
                <tr>
                  <td>Cleaning Fee</td>
                  <td>1</td>
                  <td>${cleaningFee.toFixed(2)}</td>
                </tr>
                ` : ''}
                ${serviceFee > 0 ? `
                <tr>
                  <td>Service Fee</td>
                  <td>1</td>
                  <td>${serviceFee.toFixed(2)}</td>
                </tr>
                ` : ''}
                ${dtcmFee > 0 ? `
                <tr>
                  <td>DTCM Fee</td>
                  <td>${bookingData.nights}</td>
                  <td>${dtcmFee.toFixed(2)}</td>
                </tr>
                ` : ''}
                                 <tr style="background-color: #f0f7ff; border-top: 2px solid #1e3d9f;">
                   <td><strong>Sub-total</strong></td>
                   <td></td>
                   <td><strong>${subtotal.toFixed(2)}</strong></td>
                 </tr>
                 <tr style="background-color: #f0f7ff;">
                   <td>Discount</td>
                   <td></td>
                   <td>0.00</td>
                 </tr>
                 <tr style="background-color: #f0f7ff;">
                   <td>Tax (${bookingData.vatPercentage || 5}%)</td>
                   <td></td>
                   <td>${vat.toFixed(2)}</td>
                 </tr>
                 <tr style="background: linear-gradient(135deg, #1e3d9f 0%, #1a365d 100%); color: white; font-weight: 700; font-size: 11px;">
                   <td><strong>TOTAL PAID</strong></td>
                   <td></td>
                   <td><strong>${totalAmount.toFixed(2)}</strong></td>
                 </tr>
                 <tr style="background-color: #e6f0ff; font-size: 9px;">
                  <td colspan="3">
                    <strong>Payment Method:</strong> Card (Visa) | 
                    <strong>Transaction ID:</strong> ${bookingData.transactionId || 'TX-' + Math.random().toString(36).substr(2, 8).toUpperCase()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Footer Section -->
          <div class="footer-section">
            <div class="signature-section">
              <div class="signature-line"></div>
              <div class="signature-text">Authorized Signature</div>
              <div class="signature-text">Computer-generated receipt - No physical signature required</div>
              
                             <!-- Company Stamp -->
               <div class="stamp-container">
                 <img src="http://res.cloudinary.com/dbk0iancm/image/upload/v1755204703/ahbqpt530thpna7rpemv.jpg" alt="Company Stamp" class="stamp">
              </div>
            </div>
             
           

            <div class="footer">
              <div class="footer-content">
                <strong>Mybooking</strong><br>
                support@mybookings.ae<br>
              </div>
            </div>

             
          </div>
          
        </div>
      </body>
      </html>
    `;

    // Create a temporary div to render the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '-9999px';
    tempDiv.style.width = '210mm';
    tempDiv.style.height = '297mm';
    tempDiv.style.backgroundColor = 'white';
    document.body.appendChild(tempDiv);

    // Wait for images to load
    const images = tempDiv.querySelectorAll('img');
    await Promise.all(
      Array.from(images).map(img => {
        return new Promise((resolve) => {
          if (img.complete) {
            resolve(null);
          } else {
            img.onload = () => resolve(null);
            img.onerror = () => resolve(null);
          }
        });
      })
    );

    // Convert HTML to canvas
    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: 794, // A4 width in pixels at 96 DPI
      height: 1123, // A4 height in pixels at 96 DPI
    });

    // Remove the temporary div
    document.body.removeChild(tempDiv);

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgData = canvas.toDataURL('image/png');
    
    // Calculate dimensions to fit A4
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Save the PDF
    const filename = `mybooking-receipt-${bookingReference}.pdf`;
    pdf.save(filename);

    return {
      success: true,
      filename
    };

  } catch (error) {
    console.error('Error generating PDF receipt:', error);
    throw new Error('Failed to generate PDF receipt');
  }
};
