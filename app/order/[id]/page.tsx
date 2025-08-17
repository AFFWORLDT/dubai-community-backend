"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import useGetBookingById from "@/features/Booking/useGetBookingById"
import { Calendar, Clock, Home, Mail, MapPin, Phone, User, Users, Download, ArrowLeft } from "lucide-react"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCancelBooking } from "@/features/Booking/useCancleBooking"
import { useState, useEffect } from "react"
import { CancellationModal } from "@/features/Order/CancleBookingTable"
import { generateBookingReceiptPDF } from "@/utils/bookingPdf"
import { toast } from "sonner"
import { useAuthStore } from "@/Providers/auth-provider"
import { useIsMobile } from "@/components/ui/use-mobile"

export const runtime = 'edge';

interface PageProps {
  params: {
    id: string
  }
}

function formatDate(date: any): string {
  if (!(date instanceof Date)) {
    try {
      date = new Date(date);
    } catch {
      return "Invalid date";
    }
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric", 
    year: "numeric",
  });
}

export default function BookingDetails({ params }: PageProps) {
  const { isAuthenticated } = useAuthStore()
  const {data, isLoading, error}=useGetBookingById(params.id)
  
  // Safe data destructuring with fallbacks
  const PropertyData = data?.data?.property || null
  const BookingDetails = data?.data || null
  const GuestInfo = data?.data?.user || null
  const HostInfo = PropertyData?.owner || null
  
  // Data validation and debugging
  const hasValidData = PropertyData && BookingDetails && GuestInfo
  const missingData = {
    property: !PropertyData,
    booking: !BookingDetails,
    guest: !GuestInfo,
    host: !HostInfo
  }
  
  // Debug logging to help identify data structure issues
  useEffect(() => {
    console.log('Authentication status:', isAuthenticated);
    console.log('User token available:', !!localStorage.getItem('token'));
    
    if (data) {
      console.log('Raw API data:', data);
      console.log('PropertyData:', PropertyData);
      console.log('BookingDetails:', BookingDetails);
      console.log('GuestInfo:', GuestInfo);
      console.log('HostInfo:', HostInfo);
      
      // Additional debugging for data structure
      if (PropertyData?.photos) {
        console.log('Property photos:', PropertyData.photos);
        console.log('Photos array length:', PropertyData.photos.length);
        console.log('First photo:', PropertyData.photos[0]);
      } else {
        console.log('Property photos is undefined or null');
      }
    }
    
    if (error) {
      console.log('Error details:', error);
      console.log('Error message:', error?.message);
    }
  }, [data, PropertyData, BookingDetails, GuestInfo, HostInfo, error, isAuthenticated]);
  
  const [selectedBookingId, setSelectedBookingId] = useState<string | any>(null);
  const [isGmailRedirect, setIsGmailRedirect] = useState(false);
  const isMobile = useIsMobile();
  
  const { mutate: cancelBooking, isPending } = useCancelBooking();

  // Check if this is a Gmail redirect
  useEffect(() => {
    const referer = document.referrer;
    const isGmail = referer?.includes('google.com/url') || 
                   referer?.includes('mail.google.com') ||
                   window.location.search.includes('utm_source=gmail');
    
    if (isGmail) {
      setIsGmailRedirect(true);
      if (isAuthenticated) {
        toast.success("Welcome back! You have been successfully redirected to your booking.");
      }
    }
  }, [isAuthenticated]);

  const handleCancelBooking = (reason: any) => {  
    if (selectedBookingId) {
      cancelBooking({ 
        bookingId: selectedBookingId, 
        resion: reason 
      });
      setSelectedBookingId(null);
    }
  };

  const handleDownloadReceipt = async () => {
    try {
      if (!BookingDetails || !PropertyData || !GuestInfo) {
        toast.error("Booking data not available");
        return;
      }

      // Show loading state for mobile users
      if (isMobile) {
        toast.loading("Generating receipt... Please wait");
      }

      // Add a small delay to ensure the loading toast is visible
      await new Promise(resolve => setTimeout(resolve, 100));

      const result = await generateBookingReceiptPDF(
        BookingDetails,
        GuestInfo,
        PropertyData,
        BookingDetails._id
      );
      
      // Dismiss loading toast and show success
      if (isMobile) {
        toast.dismiss();
      }
      
      // For mobile devices, provide specific instructions
      if (isMobile) {
        toast.success("Receipt generated! Check your downloads or browser tab");
        
        // Additional mobile-specific guidance
        setTimeout(() => {
          toast.info("If download didn't start, check your browser's download settings or look for a new tab");
        }, 2000);
        
        // Check if download actually happened after a delay
        setTimeout(() => {
          // Try to detect if download was successful
          const downloadStarted = sessionStorage.getItem('pdf_download_started');
          if (!downloadStarted) {
            toast.warning("Download may not have started. Try the Text option instead.");
          }
        }, 5000);
        
        // Mark download as attempted
        sessionStorage.setItem('pdf_download_started', 'true');
      } else {
        toast.success("Receipt downloaded successfully");
      }
      
    } catch (error: any) {
      // Dismiss loading toast if it exists
      if (isMobile) {
        toast.dismiss();
      }
      
      console.error("Download receipt error:", error);
      
      // Provide more specific error messages for mobile users
      if (isMobile) {
        if (error?.message?.includes('Failed to generate PDF')) {
          toast.error("PDF generation failed. Please try again or use the Text option.");
        } else if (error?.message?.includes('network') || error?.message?.includes('fetch')) {
          toast.error("Network error. Please check your connection and try again.");
        } else if (error?.message?.includes('mobile device')) {
          toast.error("Mobile download failed. Please try the Text option instead.");
        } else {
          toast.error("Download failed. Please try the Text option or contact support.");
        }
      } else {
        toast.error("Failed to download receipt");
      }
    }
  };

  const handleTextReceipt = () => {
    try {
      if (!BookingDetails || !PropertyData || !GuestInfo) {
        toast.error("Booking data not available");
        return;
      }

      // Create a simple text receipt
      const receiptText = `
MYBOOKINGS - Booking Receipt

Booking ID: ${BookingDetails._id}
Status: ${BookingDetails.status}
Date: ${new Date().toLocaleDateString()}

PROPERTY DETAILS:
${PropertyData.title}
${PropertyData.address?.address}

STAY DETAILS:
Check-in: ${formatDate(BookingDetails.checkIn)} After 3:00 PM
Check-out: ${formatDate(BookingDetails.checkOut)} Before 11:00 AM
Nights: ${BookingDetails.nights}

GUEST INFORMATION:
Name: ${GuestInfo.fullName}
Email: ${GuestInfo.email}
Phone: ${GuestInfo.phone}

PAYMENT DETAILS:
Total Amount: ${BookingDetails.rent} AED

Thank you for choosing MYBOOKINGS!
Support: support@mybookings.ae
      `.trim();

      // Create and download text file
      const blob = new Blob([receiptText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `mybooking-receipt-${BookingDetails._id}.txt`;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("Text receipt downloaded successfully");
    } catch (error) {
      console.error("Text receipt error:", error);
      toast.error("Failed to download text receipt");
    }
  };

  // Mobile download helper function
  const triggerMobileDownload = (blob: Blob, filename: string) => {
    try {
      // Method 1: Standard download
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      return true;
    } catch (error) {
      console.warn('Standard download failed, trying alternative methods:', error);
      
      try {
        // Method 2: Window open
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
        setTimeout(() => URL.revokeObjectURL(url), 5000);
        return true;
      } catch (fallbackError) {
        console.error('All download methods failed:', fallbackError);
        return false;
      }
    }
  };

  // Show authentication required state
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-12 h-12 md:w-16 md:h-16 text-blue-600" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">Authentication Required</h2>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-6 px-4">
            You need to be logged in to view your booking details. Please log in to continue.
          </p>
          <div className="space-y-3">
            <Button onClick={() => window.location.href = '/login'} className="w-full max-w-xs">
              Log In
            </Button>
            <Button onClick={() => window.location.href = '/register'} variant="outline" className="w-full max-w-xs">
              Create Account
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-4">Booking ID: {params.id}</p>
        </div>
      </div>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-24 w-24 md:h-32 md:w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-base md:text-lg text-gray-600 px-4">
            {isGmailRedirect ? "Loading your booking details..." : "Loading..."}
          </p>
          <p className="text-sm text-gray-500 mt-2">Booking ID: {params.id}</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    const isAuthError = error?.message?.includes('Unauthorized') || error?.message?.includes('401');
    
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold text-red-600 mb-4">
            {isAuthError ? 'Authentication Required' : 'Error Loading Booking'}
          </h2>
          <p className="text-sm md:text-base text-gray-600 mb-4 px-4">
            {isAuthError 
              ? "You need to be logged in to view this booking. Please log in and try again."
              : isGmailRedirect 
                ? "Unable to load your booking details. Please try again or contact support." 
                : "Something went wrong while loading the booking details."
            }
          </p>
          <div className="space-y-2 text-sm text-red-500 mb-4">
            <p>Error details: {error?.message || 'Unknown error'}</p>
            {!isAuthError && <p>Please check if the booking ID is correct and try again.</p>}
          </div>
          <div className="space-x-2">
            {isAuthError ? (
              <>
                <Button onClick={() => window.location.href = '/login'} className="px-6 py-2">
                  Log In
                </Button>
                <Button onClick={() => window.location.href = '/register'} variant="outline" className="px-6 py-2">
                  Register
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => window.location.reload()} className="px-6 py-2">
                  Try Again
                </Button>
                <Button onClick={() => window.location.href = '/properties'} variant="outline" className="px-6 py-2">
                  Browse Properties
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Show not found state
  if (!hasValidData) {
    const needsAuth = !isAuthenticated;
    
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-600 mb-4">
            {needsAuth ? 'Authentication Required' : 'Booking Not Found'}
          </h2>
          <p className="text-sm md:text-base text-gray-600 mb-4 px-4">
            {needsAuth 
              ? "You need to be logged in to view your booking details. Please log in to continue."
              : "The booking you're looking for could not be found or is missing required data."
            }
          </p>
          {!needsAuth && (
                      <div className="space-y-2 text-sm text-gray-500 mb-4">
            {missingData.booking && <p>• Booking details missing</p>}
            {missingData.property && <p>• Property information missing</p>}
            {missingData.guest && <p>• Guest information missing</p>}
            {missingData.host && <p>• Host information missing</p>}
          </div>
          )}
          <div className="space-y-2 text-sm text-blue-500 mb-4">
            <p>Booking ID: {params.id}</p>
            <p>Data received: {data ? 'Yes' : 'No'}</p>
            {data && <p>Data structure: {JSON.stringify(Object.keys(data))}</p>}
          </div>
          <div className="space-x-2">
            {needsAuth ? (
              <>
                <Button onClick={() => window.location.href = '/login'} className="px-6 py-2">
                  Log In
                </Button>
                <Button onClick={() => window.location.href = '/register'} variant="outline" className="px-6 py-2">
                  Register
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => window.location.reload()} className="px-6 py-2">
                  Try Again
                </Button>
                <Button onClick={() => window.location.href = '/properties'} variant="outline" className="px-6 py-2">
                  Browse Properties
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Mobile Header */}
      {isMobile && (
        <div className="sticky top-0 z-40 bg-blue-600 dark:bg-blue-700 border-b border-blue-700 dark:border-blue-800 px-4 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.history.back()}
              className="p-2 h-10 w-10 text-white hover:bg-blue-500"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-white">My Booking</h1>
              <p className="text-xs text-blue-100 truncate">ID: {BookingDetails?._id?.slice(0, 8)}...</p>
            </div>
          </div>
        </div>
      )}

      <div className={`${isMobile ? 'px-4 py-4' : 'container mx-auto px-6 py-32'}`}>
        <div className={`grid gap-4 md:gap-6 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-[2fr_1fr]'}`}>
          {/* Main Content */}
          <div className="space-y-4 md:space-y-6">
            {/* Booking Header - Hidden on mobile as we have sticky header */}
            {!isMobile && (
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-blue-600">Booking Details</h1>
                  <p className="text-sm text-slate-500">Booking ID: {BookingDetails?._id}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-blue-600 text-white hover:bg-blue-500">{BookingDetails?.status}</Badge>
                  {BookingDetails?.status === "Confirmed" && (
                    <Button
                      onClick={handleDownloadReceipt}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      size="sm"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Receipt
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Mobile Status and Actions */}
            {isMobile && (
              <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <Badge className="bg-blue-600 text-white text-sm px-3 py-1">{BookingDetails?.status}</Badge>
                  <span className="text-sm text-gray-600 dark:text-gray-300">Booking ID: {BookingDetails?._id?.slice(0, 8)}...</span>
                </div>
                {BookingDetails?.status === "Confirmed" && (
                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={handleDownloadReceipt}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-2 h-9 w-full"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download PDF
                    </Button>
                    <Button
                      onClick={() => handleTextReceipt()}
                      variant="outline"
                      className="border-blue-200 text-blue-600 hover:bg-blue-50 text-sm px-3 py-2 h-9 w-full"
                    >
                      Download Text Receipt
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Property Details */}
            <Card className="border border-blue-100 dark:border-blue-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-blue-600 text-lg">Property Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className={`flex gap-4 ${isMobile ? 'flex-col' : ''}`}>
                  <div className={`relative overflow-hidden rounded-lg ${isMobile ? 'h-48 w-full' : 'h-24 w-24'}`}>
                    {PropertyData?.photos && PropertyData.photos.length > 0 ? (
                      <Image 
                        alt="Property" 
                        className="object-cover" 
                        fill 
                        src={PropertyData.photos[0]?.url || '/placeholder.jpg'} 
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <Home className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold text-blue-600 text-base">
                      {PropertyData?.title || 'Property Title Not Available'}
                    </h3>
                    <div className="flex items-start gap-2 text-sm text-slate-500">
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed">
                        {PropertyData?.address?.address || 'Address not available'}
                      </span>
                    </div>
                    {PropertyData?.description && (
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {PropertyData.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className={`grid gap-3 ${isMobile ? 'grid-cols-1' : 'sm:grid-cols-2'}`}>
                  <div className="flex items-center gap-2 text-slate-600 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Home className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">{PropertyData?.category || 'Category not available'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Users className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">{PropertyData?.guest_no ? `${PropertyData.guest_no} Guest` : 'Guest count not available'}</span>
                  </div>
                  {PropertyData?.roomType && (
                    <div className="flex items-center gap-2 text-slate-600 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Home className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">{PropertyData.roomType}</span>
                    </div>
                  )}
                  {PropertyData?.washRoom && (
                    <div className="flex items-center gap-2 text-slate-600 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Home className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">{PropertyData.washRoom} Bathroom</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Stay Details */}
            <Card className="border border-blue-100 dark:border-blue-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-blue-600 text-lg">Stay Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'sm:grid-cols-2'}`}>
                  <div className="space-y-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-sm font-medium text-slate-500">Check-in</div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">{formatDate(BookingDetails?.checkIn)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Clock className="h-4 w-4" />
                      <span>After 3:00 PM</span>
                    </div>
                  </div>
                  <div className="space-y-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-sm font-medium text-slate-500">Check-out</div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">{formatDate(BookingDetails?.checkOut)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Clock className="h-4 w-4" />
                      <span>Before 11:00 AM</span>
                    </div>
                  </div>
                </div>
                
                {/* Additional Stay Information */}
                <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
                  {BookingDetails?.nights && (
                    <div className="flex items-center gap-2 text-slate-600 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">{BookingDetails.nights} nights stay</span>
                    </div>
                  )}
                  {BookingDetails?.status && (
                    <div className="flex items-center gap-2 text-slate-600 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Badge className="bg-blue-100 text-blue-700 text-xs px-2 py-1">
                        {BookingDetails.status}
                      </Badge>
                      <span className="text-sm">Booking Status</span>
                    </div>
                  )}
                  {BookingDetails?.createdAt && (
                    <div className="flex items-center gap-2 text-slate-600 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Booked on {formatDate(BookingDetails.createdAt)}</span>
                    </div>
                  )}
                  {BookingDetails?._id && (
                    <div className="flex items-center gap-2 text-slate-600 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="text-sm font-mono text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                        {BookingDetails._id.slice(0, 8)}...
                      </span>
                      <span className="text-sm">Booking ID</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Property Amenities & Rules */}
            <Card className="border border-blue-100 dark:border-blue-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-blue-600 text-lg">Property Amenities & Rules</CardTitle>
                <CardDescription className="text-slate-500">
                  What's included and important information about your stay
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Property Type & Pricing */}
                <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
                  {PropertyData?.defaultPropertyType && (
                    <div className="flex items-center gap-2 text-slate-600 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Home className="h-4 w-4 text-blue-500" />
                      <span className="text-sm capitalize">{PropertyData.defaultPropertyType} Rental</span>
                    </div>
                  )}
                  {PropertyData?.dailyPrices && (
                    <div className="flex items-center gap-2 text-slate-600 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="text-sm font-medium">Daily Rate</span>
                      <span className="text-sm">{PropertyData.dailyPrices} AED</span>
                    </div>
                  )}
                  {PropertyData?.monthlyRent && (
                    <div className="flex items-center gap-2 text-slate-600 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="text-sm font-medium">Monthly Rate</span>
                      <span className="text-sm">{PropertyData.monthlyRent} AED</span>
                    </div>
                  )}
                  {PropertyData?.yearlyRent && (
                    <div className="flex items-center gap-2 text-slate-600 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="text-sm font-medium">Yearly Rate</span>
                      <span className="text-sm">{PropertyData.yearlyRent} AED</span>
                    </div>
                  )}
                </div>
                
                {/* Property Rules */}
                <div className="space-y-3">
                  <div className="text-sm font-medium text-slate-700">Important Information</div>
                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex items-start gap-2">
                      <span className="text-blue-500">•</span>
                      <span>Check-in: After 3:00 PM</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-500">•</span>
                      <span>Check-out: Before 11:00 AM</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-500">•</span>
                      <span>No smoking allowed</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-500">•</span>
                      <span>No pets allowed</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-500">•</span>
                      <span>Quiet hours: 10:00 PM - 8:00 AM</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cancellation Policy */}
            <Card className="border border-blue-100 dark:border-blue-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-blue-600 text-lg">Cancellation Policy</CardTitle>
                <CardDescription className="text-slate-500">
                  Important information about cancelling your booking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <div className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Cancellation Policy</div>
                    <ul className="space-y-1 text-yellow-700 dark:text-yellow-300">
                      <li>• Cancel before check-in for a full refund of the nightly rate</li>
                      <li>• After check-in, no refunds are provided</li>
                      <li>• Cleaning fees are always refunded if you cancel</li>
                      <li>• Security deposits are fully refundable</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3 pt-3">
                {BookingDetails?.status === "Confirmed" && (
                  <Button
                    onClick={handleDownloadReceipt}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-base"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Download Receipt
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 h-12 text-base"
                  onClick={() => setSelectedBookingId(BookingDetails._id)}
                >
                  Cancel Booking
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Sidebar - Stacked on mobile */}
          <div className="space-y-4 md:space-y-6">
            {/* Price Details */}
            <Card className="border border-blue-100 dark:border-blue-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-blue-600 text-lg">Price Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Base Price */}
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-sm text-slate-600">
                    {BookingDetails?.nights ? `${BookingDetails.nights} nights` : 'Nights not available'}
                  </div>
                  <div className="font-semibold text-lg text-blue-600">
                    {BookingDetails?.rent ? `${BookingDetails.rent} AED` : 'Price not available'}
                  </div>
                </div>
                
                {/* Additional Fees */}
                {PropertyData?.cleaningfee && (
                  <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-sm text-slate-600">Cleaning Fee</div>
                    <div className="text-sm font-medium text-slate-700">
                      {PropertyData.cleaningfee} AED
                    </div>
                  </div>
                )}
                
                {PropertyData?.depositMonth && (
                  <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-sm text-slate-600">Security Deposit</div>
                    <div className="text-sm font-medium text-slate-700">
                      {PropertyData.depositMonth} AED
                    </div>
                  </div>
                )}
                
                {/* Total Calculation */}
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <div className="text-base font-semibold text-slate-700">Total Amount</div>
                    <div className="text-lg font-bold text-blue-600">
                      {(() => {
                        const basePrice = BookingDetails?.rent || 0;
                        const cleaningFee = PropertyData?.cleaningfee || 0;
                        const deposit = PropertyData?.depositMonth || 0;
                        return `${basePrice + cleaningFee + deposit} AED`;
                      })()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Guest Information */}
            <Card className="border border-blue-100 dark:border-blue-800 rounded-lg shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-blue-600 font-semibold text-lg flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Guest Information
                </CardTitle>
                <CardDescription className="text-slate-500">
                  Your booking details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className={`flex items-center gap-4 ${isMobile ? 'flex-col text-center' : ''}`}>
                  <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-blue-200 mx-auto">
                    <Avatar className="h-full w-full">
                      {BookingDetails?.user?.profileImg ? (
                        <AvatarImage src={BookingDetails.user.profileImg} alt="Guest profile" />
                      ) : (
                        <AvatarFallback className="text-blue-500 font-semibold text-lg">
                          {BookingDetails?.user?.fullName && BookingDetails.user.fullName.trim() 
                            ? BookingDetails.user.fullName.split(" ").map((name: string) => name.charAt(0)).join("").slice(0, 2)
                            : "G"}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </div>
                  <div className={`${isMobile ? 'text-center' : ''} flex-1`}>
                    <div className="font-semibold text-slate-700 text-xl mb-1">
                      {BookingDetails?.user?.fullName || 'Guest Name Not Available'}
                    </div>
                    <div className={`text-sm text-slate-500 ${isMobile ? 'break-words' : 'truncate w-48'} mb-2`}>
                      {BookingDetails?.user?.location || 'Location not available'}
                    </div>
                    <div className="text-xs text-blue-600 font-medium">
                      Booking Guest
                    </div>
                  </div>
                </div>
                
                <Separator className="bg-blue-100" />
                
                {/* Guest Contact Information */}
                <div className="space-y-3">
                  <div className="text-sm font-medium text-slate-700 mb-2">Your Contact Information</div>
                  
                  {BookingDetails?.user?.phone && (
                    <div className="flex items-center gap-3 text-slate-600 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Phone className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="text-sm font-medium">Phone Number</div>
                        <div className="text-sm break-all">{BookingDetails.user.phone}</div>
                      </div>
                    </div>
                  )}
                  
                  {BookingDetails?.user?.email && (
                    <div className="flex items-center gap-3 text-slate-600 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Mail className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="text-sm font-medium">Email Address</div>
                        <div className="text-sm break-all">{BookingDetails.user.email}</div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Guest Details */}
                {BookingDetails?.user?.bio && (
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-2">About You</div>
                    <p className="text-sm text-blue-600 dark:text-blue-400 leading-relaxed">
                      {BookingDetails.user.bio}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Host/Owner Information */}
            <Card className="border border-blue-100 dark:border-blue-800 rounded-lg shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-blue-600 font-semibold text-lg flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  Host/Owner Information
                </CardTitle>
                <CardDescription className="text-slate-500">
                  Contact your host for any questions or special requests
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className={`flex items-center gap-4 ${isMobile ? 'flex-col text-center' : ''}`}>
                  <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-blue-200 mx-auto">
                    <Avatar className="h-full w-full">
                      {PropertyData?.owner?.profileImg ? (
                        <AvatarImage src={PropertyData.owner.profileImg} alt="Host profile" />
                      ) : (
                        <AvatarFallback className="text-blue-500 font-semibold text-lg">
                          {PropertyData?.owner?.fullName && PropertyData.owner.fullName.trim() 
                            ? PropertyData.owner.fullName.split(" ").map((name: string) => name.charAt(0)).join("").slice(0, 2)
                            : "H"}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </div>
                  <div className={`${isMobile ? 'text-center' : ''} flex-1`}>
                    <div className="font-semibold text-slate-700 text-xl mb-1">
                      {PropertyData?.owner?.fullName || 'Host Name Not Available'}
                    </div>
                    <div className={`text-sm text-slate-500 ${isMobile ? 'break-words' : 'truncate w-48'} mb-2`}>
                      {PropertyData?.owner?.location || 'Location not available'}
                    </div>
                    {PropertyData?.owner?.email && (
                      <div className="text-xs text-blue-600 font-medium">
                        Verified Host
                      </div>
                    )}
                  </div>
                </div>
                
                <Separator className="bg-blue-100" />
                
                {/* Host Contact Information */}
                <div className="space-y-3">
                  <div className="text-sm font-medium text-slate-700 mb-2">Host Contact Information</div>
                  
                  {PropertyData?.owner?.phone && (
                    <div className="flex items-center gap-3 text-slate-600 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <Phone className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="text-sm font-medium">Phone Number</div>
                        <div className="text-sm break-all">{PropertyData.owner.phone}</div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`tel:${PropertyData.owner.phone}`, '_self')}
                        className="text-blue-600 border-blue-200 hover:bg-blue-50"
                      >
                        Call
                      </Button>
                    </div>
                  )}
                  
                  {PropertyData?.owner?.email && (
                    <div className="flex items-center gap-3 text-slate-600 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <Mail className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="text-sm font-medium">Email Address</div>
                        <div className="text-sm break-all">{PropertyData.owner.email}</div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`mailto:${PropertyData.owner.email}?subject=Booking Inquiry - ${PropertyData?.title || 'Property'}`, '_self')}
                        className="text-blue-600 border-blue-200 hover:bg-blue-50"
                      >
                        Email
                      </Button>
                    </div>
                  )}
                </div>
                
                {/* Host Details */}
                {PropertyData?.owner?.bio && (
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-2">About Your Host</div>
                    <p className="text-sm text-blue-600 dark:text-blue-400 leading-relaxed">
                      {PropertyData.owner.bio}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card className="border border-blue-100 dark:border-blue-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-blue-600 text-lg">Additional Information</CardTitle>
                <CardDescription className="text-slate-500">Important details for your stay</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Property Features */}
                {PropertyData?.amenities && PropertyData.amenities.length > 0 && (
                  <div>
                    <div className="text-sm font-medium text-slate-700 mb-2">Property Amenities</div>
                    <div className="flex flex-wrap gap-2">
                      {PropertyData.amenities.slice(0, 6).map((amenity: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                      {PropertyData.amenities.length > 6 && (
                        <Badge variant="outline" className="text-xs">
                          +{PropertyData.amenities.length - 6} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
                
                {/* House Rules */}
                <div>
                  <div className="text-sm font-medium text-slate-700 mb-2">House Rules</div>
                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Maximum {PropertyData?.guest_no || 'guests'} allowed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>No parties or events</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Respect quiet hours</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Need Help */}
            <Card className="border border-blue-100 dark:border-blue-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-blue-600 text-lg">Need Help?</CardTitle>
                <CardDescription className="text-slate-500">Our support team is available 24/7</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 h-11"
                >
                  Visit Help Center
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 h-11"
                >
                  Emergency Support
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 h-11"
                  onClick={() => window.open(`mailto:support@mybookings.ae?subject=Booking Support - ${BookingDetails?._id || 'Unknown'}`, '_self')}
                >
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
        <CancellationModal
              isOpen={!!selectedBookingId}
              onClose={() => setSelectedBookingId(null)}
              onConfirm={handleCancelBooking}
              isPending={isPending}
            />
    </div>
  )
}

