"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import useGetBookingById from "@/features/Booking/useGetBookingById"
import { Calendar, Clock, Home, Mail, MapPin, Phone, User, Users, Download } from "lucide-react"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCancelBooking } from "@/features/Booking/useCancleBooking"
import { useState, useEffect } from "react"
import { CancellationModal } from "@/features/Order/CancleBookingTable"
import { generateBookingReceiptPDF } from "@/utils/bookingPdf"
import { toast } from "sonner"
import { useAuthStore } from "@/Providers/auth-provider"

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
  const {data, isLoading, error}=useGetBookingById(params.id)
  const { isAuthenticated } = useAuthStore()
  const PropertyData =data?.data?.data?.property
  const BookingDetails=data?.data?.data
  const Owner =data?.data?.data?.user
  const [selectedBookingId, setSelectedBookingId] = useState<string | any>(null);
  const [isGmailRedirect, setIsGmailRedirect] = useState(false);
  
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
      if (!BookingDetails || !PropertyData || !Owner) {
        toast.error("Booking data not available");
        return;
      }

      await generateBookingReceiptPDF(
        BookingDetails,
        Owner,
        PropertyData,
        BookingDetails._id
      );
      
      toast.success("Receipt downloaded successfully");
    } catch (error) {
      toast.error("Failed to download receipt");
      console.error("Download receipt error:", error);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">
            {isGmailRedirect ? "Loading your booking details..." : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Booking</h2>
          <p className="text-gray-600 mb-4">
            {isGmailRedirect 
              ? "Unable to load your booking details. Please try again or contact support." 
              : "Something went wrong while loading the booking details."
            }
          </p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Show not found state
  if (!BookingDetails) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">Booking Not Found</h2>
          <p className="text-gray-600 mb-4">
            The booking you're looking for could not be found.
          </p>
          <Button onClick={() => window.location.href = '/properties'}>
            Browse Properties
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="container mx-auto px-6 py-32">
        <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Booking Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-teal-600">Booking Details</h1>
                <p className="text-sm text-slate-500">Booking ID: {BookingDetails?._id}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-teal-500 text-white hover:bg-teal-400">{BookingDetails?.status}</Badge>
                {BookingDetails?.status === "Confirmed" && (
                  <Button
                    onClick={handleDownloadReceipt}
                    className="bg-teal-600 hover:bg-teal-700 text-white"
                    size="sm"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Receipt
                  </Button>
                )}
              </div>
            </div>

            {/* Property Details */}
            <Card className="border border-teal-100">
              <CardHeader>
                <CardTitle className="text-teal-600">Property Details</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="flex gap-4">
                  <div className="relative h-24 w-24 overflow-hidden rounded-lg">
                    <Image alt="Property" className="object-cover" fill src={PropertyData?.photos[0]?.url} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="font-semibold text-teal-600">{PropertyData?.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <MapPin className="h-4 w-4" />
                      <span>{PropertyData?.address?.address}</span>
                    </div>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Home className="h-4 w-4 text-teal-500" />
                    <span>{PropertyData?.category}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Users className="h-4 w-4 text-teal-500" />
                    <span>{PropertyData?.guest_no} Guest</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Booking Details */}
            <Card className="border border-teal-100">
              <CardHeader>
                <CardTitle className="text-teal-600">Stay Details</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-slate-500">Check-in</div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Calendar className="h-4 w-4 text-teal-500" />
                      <span>{formatDate(BookingDetails?.checkIn)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Clock className="h-4 w-4" />
                      <span>After 3:00 PM</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-slate-500">Check-out</div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Calendar className="h-4 w-4 text-teal-500" />
                      <span>{formatDate(BookingDetails?.checkOut)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Clock className="h-4 w-4" />
                      <span>Before 11:00 AM</span>
                    </div>
                  </div>
                </div>
               
              </CardContent>
            </Card>

            {/* Cancellation Policy */}
            <Card className="border border-teal-100">
              <CardHeader>
                <CardTitle className="text-teal-600">Cancellation Policy</CardTitle>
                <CardDescription className="text-slate-500">
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-4 text-sm text-slate-500">
                  {/* <li>Cancel before March 2, 2024 for a full refund of the nightly rate</li>
                  <li>After that, the first night is non-refundable but 50% of remaining nights will be refunded</li>
                  <li>The cleaning fee is always refunded if you cancel</li> */}
                </ul>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                {BookingDetails?.status === "Confirmed" && (
                  <Button
                    onClick={handleDownloadReceipt}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Receipt
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="w-full border-teal-200 text-teal-600 hover:bg-teal-50 hover:text-teal-700"
                  onClick={() => setSelectedBookingId(BookingDetails._id)}
                >
                  Cancel Booking
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border border-teal-100">
              <CardHeader>
                <CardTitle className="text-teal-600">Price Details</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex justify-between text-slate-600">
                  <div className="text-sm">{BookingDetails?.nights} nights</div>
                  <div>{BookingDetails?.rent} AED</div>
                </div>
                
                
              </CardContent>
            </Card>

            {/* Host Information */}
            <Card className="border border-teal-100 rounded-lg shadow-md">
  <CardHeader>
    <CardTitle className="text-teal-600 font-semibold text-lg">Guest Information</CardTitle>
  </CardHeader>
  <CardContent className="grid gap-6">
    <div className="flex items-center gap-6">
      <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-teal-200">
        <Avatar className="h-full w-full">
          {Owner?.profileImg ? (
            <AvatarImage src={Owner.profileImg} alt="User profile" />
          ) : (
            <AvatarFallback className="text-teal-500 font-semibold">
              {Owner?.fullName
                ?.split(" ")
                .map((name: string) => name.charAt(0))
                .join("") || "U"}
            </AvatarFallback>
          )}
        </Avatar>
      </div>
      <div>
        <div className="font-semibold text-slate-700 text-lg">{Owner?.fullName}</div>
        <div className="text-sm text-slate-500 truncate w-48">{Owner?.location}</div>
      </div>
    </div>
    <Separator className="bg-teal-100" />
    <div className="grid gap-4">
      <div className="flex items-center gap-2 text-slate-600">
        <Phone className="h-5 w-5 text-teal-500" />
        <span className="text-sm">{Owner?.phone}</span>
      </div>
      <div className="flex items-center gap-2 text-slate-600">
        <Mail className="h-5 w-5 text-teal-500" />
        <span className="text-sm">{Owner?.email}</span>
      </div>
    </div>
  </CardContent>
</Card>

            {/* Need Help */}
            <Card className="border border-teal-100">
              <CardHeader>
                <CardTitle className="text-teal-600">Need Help?</CardTitle>
                <CardDescription className="text-slate-500">Our support team is available 24/7</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Button
                  variant="outline"
                  className="w-full border-teal-200 text-teal-600 hover:bg-teal-50 hover:text-teal-700"
                >
                  Visit Help Center
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-teal-200 text-teal-600 hover:bg-teal-50 hover:text-teal-700"
                >
                  Emergency Support
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

