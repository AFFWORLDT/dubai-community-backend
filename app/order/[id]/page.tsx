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
  const {data, isLoading, error}=useGetBookingById(params.id)
  const { isAuthenticated } = useAuthStore()
  const PropertyData =data?.data?.data?.property
  const BookingDetails=data?.data?.data
  const Owner =data?.data?.data?.user
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
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-24 w-24 md:h-32 md:w-32 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-base md:text-lg text-gray-600 px-4">
            {isGmailRedirect ? "Loading your booking details..." : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold text-red-600 mb-4">Error Loading Booking</h2>
          <p className="text-sm md:text-base text-gray-600 mb-4 px-4">
            {isGmailRedirect 
              ? "Unable to load your booking details. Please try again or contact support." 
              : "Something went wrong while loading the booking details."
            }
          </p>
          <Button onClick={() => window.location.reload()} className="px-6 py-2">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Show not found state
  if (!BookingDetails) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-600 mb-4">Booking Not Found</h2>
          <p className="text-sm md:text-base text-gray-600 mb-4 px-4">
            The booking you're looking for could not be found.
          </p>
          <Button onClick={() => window.location.href = '/properties'} className="px-6 py-2">
            Browse Properties
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Mobile Header */}
      {isMobile && (
        <div className="sticky top-0 z-40 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 px-4 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.history.back()}
              className="p-2 h-10 w-10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">My Booking</h1>
              <p className="text-xs text-gray-500 truncate">ID: {BookingDetails?._id?.slice(0, 8)}...</p>
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
            )}

            {/* Mobile Status and Actions */}
            {isMobile && (
              <div className="flex items-center justify-between bg-teal-50 dark:bg-teal-900/20 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <Badge className="bg-teal-500 text-white text-sm px-3 py-1">{BookingDetails?.status}</Badge>
                  <span className="text-sm text-gray-600 dark:text-gray-300">Booking ID: {BookingDetails?._id?.slice(0, 8)}...</span>
                </div>
                {BookingDetails?.status === "Confirmed" && (
                  <Button
                    onClick={handleDownloadReceipt}
                    className="bg-teal-600 hover:bg-teal-700 text-white text-sm px-3 py-2 h-9"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                )}
              </div>
            )}

            {/* Property Details */}
            <Card className="border border-teal-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-teal-600 text-lg">Property Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className={`flex gap-4 ${isMobile ? 'flex-col' : ''}`}>
                  <div className={`relative overflow-hidden rounded-lg ${isMobile ? 'h-48 w-full' : 'h-24 w-24'}`}>
                    <Image 
                      alt="Property" 
                      className="object-cover" 
                      fill 
                      src={PropertyData?.photos[0]?.url} 
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold text-teal-600 text-base">{PropertyData?.title}</h3>
                    <div className="flex items-start gap-2 text-sm text-slate-500">
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed">{PropertyData?.address?.address}</span>
                    </div>
                  </div>
                </div>
                <div className={`grid gap-3 ${isMobile ? 'grid-cols-1' : 'sm:grid-cols-2'}`}>
                  <div className="flex items-center gap-2 text-slate-600 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Home className="h-4 w-4 text-teal-500" />
                    <span className="text-sm">{PropertyData?.category}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Users className="h-4 w-4 text-teal-500" />
                    <span className="text-sm">{PropertyData?.guest_no} Guest</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stay Details */}
            <Card className="border border-teal-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-teal-600 text-lg">Stay Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'sm:grid-cols-2'}`}>
                  <div className="space-y-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-sm font-medium text-slate-500">Check-in</div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Calendar className="h-4 w-4 text-teal-500" />
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
                      <Calendar className="h-4 w-4 text-teal-500" />
                      <span className="text-sm">{formatDate(BookingDetails?.checkOut)}</span>
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
              <CardHeader className="pb-3">
                <CardTitle className="text-teal-600 text-lg">Cancellation Policy</CardTitle>
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
              <CardFooter className="flex flex-col gap-3 pt-3">
                {BookingDetails?.status === "Confirmed" && (
                  <Button
                    onClick={handleDownloadReceipt}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white h-12 text-base"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Download Receipt
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="w-full border-teal-200 text-teal-600 hover:bg-teal-50 hover:text-teal-700 h-12 text-base"
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
            <Card className="border border-teal-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-teal-600 text-lg">Price Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-sm text-slate-600">{BookingDetails?.nights} nights</div>
                  <div className="font-semibold text-lg text-teal-600">{BookingDetails?.rent} AED</div>
                </div>
              </CardContent>
            </Card>

            {/* Guest Information */}
            <Card className="border border-teal-100 rounded-lg shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-teal-600 font-semibold text-lg">Guest Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className={`flex items-center gap-4 ${isMobile ? 'flex-col text-center' : ''}`}>
                  <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-teal-200 mx-auto">
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
                  <div className={`${isMobile ? 'text-center' : ''}`}>
                    <div className="font-semibold text-slate-700 text-lg">{Owner?.fullName}</div>
                    <div className={`text-sm text-slate-500 ${isMobile ? 'break-words' : 'truncate w-48'}`}>{Owner?.location}</div>
                  </div>
                </div>
                <Separator className="bg-teal-100" />
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-slate-600 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Phone className="h-5 w-5 text-teal-500 flex-shrink-0" />
                    <span className="text-sm break-all">{Owner?.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Mail className="h-5 w-5 text-teal-500 flex-shrink-0" />
                    <span className="text-sm break-all">{Owner?.email}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Need Help */}
            <Card className="border border-teal-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-teal-600 text-lg">Need Help?</CardTitle>
                <CardDescription className="text-slate-500">Our support team is available 24/7</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full border-teal-200 text-teal-600 hover:bg-teal-50 hover:text-teal-700 h-11"
                >
                  Visit Help Center
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-teal-200 text-teal-600 hover:bg-teal-50 hover:text-teal-700 h-11"
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

