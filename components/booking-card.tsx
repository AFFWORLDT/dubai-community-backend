"use client"
import { useState, useMemo, useEffect } from "react"
import { DayPicker } from "react-day-picker"
import { addDays, format, isWithinInterval, parseISO } from "date-fns"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CreditCard, Info, Lock, Shield, Calendar, Users, ChevronUp, X, ChevronDown } from "lucide-react"
import { useGetBookingonProperty } from "@/features/Booking/useGetBookingonProperty"
import { Alert, AlertDescription } from "@/components/ui/alert"
import useCreatePropert from "@/features/Booking/useCreateProperty"
import { getCookie } from "@/utils/cookies"
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/Providers/auth-provider"
import { AuthForm } from "@/features/user/SignupForm"
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { ChatWithOwner } from "@/components/property/chat-with-owner"

interface DailyPrice {
  date: string
  price: number
}

interface BookingDetails {
  checkIn: Date | undefined
  checkOut: Date | undefined
  guest: string
  manualPrice: number
  property: string
  userId: string
}

interface BookingCardProps {
  price: number
  dailyPrice?: DailyPrice[]
  id: string
  cleaningFee: number
  variant?: "default" | "mobile"
}
// Add this helper function at the top of your component
const formatPrice = (price: number | undefined) => {
  if (!price) return "0"
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const BookingCard = ({ price, id, dailyPrice = [], cleaningFee,variant }: BookingCardProps) => {
  const [selectedDates, setSelectedDates] = useState<any | undefined>()
  const [guests, setGuests] = useState("1")
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [bookingStatus, setBookingStatus] = useState({ type: "", message: "" })
  const { isAuthenticated } = useAuthStore()
  const { data: booking } = useGetBookingonProperty(id)
  const { createBookings, isPending } = useCreatePropert()
  const [showSignupForm, setShowSignupForm] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false)
  const [numberOfMonths, setNumberOfMonths] = useState(window?.innerWidth >= 640 ? 2 : 1)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [selectedMode, setSelectedMode] = useState('checkin');
  const userCookie = getCookie("user")
  const userId = userCookie?._id || ""
  const guestName = userCookie?.fullName
  const { toast } = useToast()

  // Reset form function
  const resetForm = () => {
    setSelectedDates(undefined)
    setGuests("1")
    setBookingStatus({ type: "", message: "" })
  }

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  // Reset dates function
  const resetDates = () => {
    setSelectedDates(undefined);
    setSelectedMode('checkin');
  }

  const disabledDates = useMemo(() => {
    if (!booking?.data?.bookings) return []
    return booking.data.bookings
      .map((booking: any) => {
        try {
          const checkIn = parseISO(booking.checkIn)
          const checkOut = parseISO(booking.checkOut)
          
          // Validate that the dates are valid
          if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
            console.warn('Invalid booking dates:', booking)
            return null
          }
          
          return {
            from: checkIn,
            to: addDays(checkOut, -1),
          }
        } catch (error) {
          console.warn('Error parsing booking dates:', error, booking)
          return null
        }
      })
      .filter(Boolean) // Remove null entries
  }, [booking])
  const priceByDate = useMemo(() => {
    const map = new Map()
    dailyPrice.forEach(({ date, price }) => {
      try {
        const parsedDate = parseISO(date)
        if (!isNaN(parsedDate.getTime())) {
          map.set(format(parsedDate, "yyyy-MM-dd"), price)
        } else {
          console.warn('Invalid date in dailyPrice:', date)
        }
      } catch (error) {
        console.warn('Error parsing date in dailyPrice:', error, date)
      }
    })
    return map
  }, [dailyPrice])

  const calculateTotal = (from: Date | undefined, to: Date | undefined) => {
    if (!from || !to) return { subtotal: 0, nights: 0 }

    // For same day bookings (check-in and check-out on the same day)
    if (format(from, "yyyy-MM-dd") === format(to, "yyyy-MM-dd")) {
      const dateStr = format(from, "yyyy-MM-dd")
      const dailyRate = priceByDate.get(dateStr) || price
      return { subtotal: dailyRate, nights: 1 }
    }

    let total = 0
    let current = from
    let nights = 0

    // Calculate nights between check-in and check-out (inclusive of check-in, exclusive of check-out)
    while (current < to) {
      const dateStr = format(current, "yyyy-MM-dd")
      const dailyRate = priceByDate.get(dateStr) || price
      total += dailyRate
      nights += 1
      current = addDays(current, 1)
    }

    return { subtotal: total, nights }
  }

  const { subtotal, nights } = useMemo(
    () => calculateTotal(selectedDates?.from, selectedDates?.to),
    [selectedDates, priceByDate, price],
  )

  const vat = Math.floor(subtotal * 0.05) // 5% VAT
  const dtcmFee = nights * 15
  const serviceFee = Math.floor(subtotal * 0.025)
  const cleaningFeeAmount = cleaningFee || 0
  const total = subtotal + cleaningFeeAmount + serviceFee + vat + dtcmFee

  const proceedToCheckout = async () => {
    if (!isFormValid || !selectedDates?.from || !selectedDates?.to) return
    if (!isAuthenticated) {
      setShowSignupForm(true)
      return
    }

    setIsProcessing(true)
    try {
      // Ensure we're using the correct pricing for the booking
      const bookingTotal = total;
      
      const formData = {
        userId,
        checkIn: selectedDates.from.toISOString(),
        checkOut: selectedDates.to.toISOString(),
        guest: guestName.trim(),
        property: id,
        manualPrice: bookingTotal,
        intrest: 10,
        line_items: [
          {
            price_data: {
              currency: "aed",
              product_data: {
                name: `Booking for ${guestName.trim()} - ${nights} ${nights === 1 ? 'night' : 'nights'}`,
              },
              unit_amount: bookingTotal * 100,
            },
            quantity: 1,
          },
        ],
      }

      console.log("this is form data", formData)

      const token = getCookie("accessToken")
      console.log("this is token", token)

      const response = await api.post(`/api/v1/booking/checkout`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      console.log("this is response", response)

      if (response.data.statusCode === 200) {
        const { checkoutUrl } = response.data.data
        window.location.href = checkoutUrl
      } else {
        setBookingStatus({
          type: "error",
          message: response.data.message || "Failed to process payment",
        })
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.response?.data?.message || "Something went wrong",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleBookingSubmit = async () => {
    if (!isFormValid) return
    if (!isAuthenticated) {
      setShowSignupForm(true)
      return
    }

    try {
      // Ensure we're using the correct pricing for the booking
      const bookingTotal = total;
      
      const bookingDetails: BookingDetails = {
        checkIn: selectedDates?.from,
        checkOut: selectedDates?.to,
        guest: guestName.trim(),
        manualPrice: bookingTotal,
        property: id,
        userId,
      }

      await createBookings(bookingDetails)

      setBookingStatus({
        type: "success",
        message: `Booking for ${nights} ${nights === 1 ? 'night' : 'nights'} submitted successfully!`,
      })

      setTimeout(() => {
        setShowBookingModal(false)
        resetForm()
      }, 2000)
    } catch (error) {
      console.log(error)

      setBookingStatus({
        type: "error",
        message: "Failed to submit booking. Please try again.",
      })
    }
  }

  const isFormValid = selectedDates?.from && selectedDates?.to

  const DayContent = ({ date }: { date: Date }) => {
    const dateStr = format(date, "yyyy-MM-dd")
    const dayPrice = priceByDate.get(dateStr) || price

    const isBooked = disabledDates.some((interval: any) => {
      try {
        // Additional validation to ensure interval dates are valid
        if (!interval?.from || !interval?.to || 
            isNaN(interval.from.getTime()) || isNaN(interval.to.getTime())) {
          return false
        }
        return isWithinInterval(date, { start: interval.from, end: interval.to })
      } catch (error) {
        console.warn('Error checking if date is within interval:', error, interval)
        return false
      }
    })

    return (
      <div className="relative flex flex-col items-center justify-center w-full h-14 p-1">
        <div className={cn("text-sm font-medium mb-1", isBooked ? "text-muted-foreground" : "")}>
          {format(date, "d")}
        </div>
        <div
          className={cn(
            "text-[10px] leading-none font-medium flex items-center gap-0.5",
            isBooked ? "text-muted-foreground" : "text-primary",
          )}
        >
          <span>{dayPrice}</span>
          <span className="text-[8px]">AED</span>
        </div>
        {isBooked && <div className="absolute inset-0 bg-muted/50 dark:bg-muted/25 rounded-md" />}
      </div>
    )
  }

  // Replace the existing CalendarDialog component with this:
  const CalendarDialog = () => {
    const today = new Date();
    
    // Combine existing disabled dates with dates before check-in for checkout selection
    const getDisabledDates = () => {
      let disabledRanges = [...disabledDates];
      
      // When selecting checkout date, disable all dates before check-in
      if (selectedMode === 'checkout' && selectedDates?.from) {
        disabledRanges.push({ 
          from: new Date(0), // Beginning of time
          to: selectedDates.from // Include check-in date for same-day booking
        });
      }
      
      // Always disable past dates
      disabledRanges.push({
        from: new Date(0),
        to: addDays(today, -1)
      });
      
      return disabledRanges;
    };

    // Reset date selection function
    const handleResetDates = () => {
      setSelectedDates(undefined);
      setSelectedMode('checkin');
    };

    return (
      <Dialog open={showCalendar} onOpenChange={setShowCalendar}>
        <DialogContent className="sm:max-w-[800px] p-0 h-full sm:h-auto">
          <DialogHeader className="p-6 pb-0">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle>
                  {selectedMode === 'checkin' ? 'Select check-in date' : 'Select check-out date'}
                </DialogTitle>
                <DialogDescription>
                  {selectedMode === 'checkin' 
                    ? 'Pick your check-in date'
                    : selectedDates?.from && format(selectedDates.from, "yyyy-MM-dd") === format(today, "yyyy-MM-dd")
                      ? 'You can select the same day for a single night stay'
                      : 'Pick your check-out date'}
                </DialogDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleResetDates}
                className="flex items-center gap-1"
              >
                <X className="h-3 w-3" />
                Reset
              </Button>
            </div>
          </DialogHeader>
          <div className="p-6">
            <DayPicker
              mode="range"
              selected={selectedDates}
              onSelect={(range) => {
                if (!range) return;
                
                if (selectedMode === 'checkin') {
                  // When selecting check-in, clear any existing checkout date
                  setSelectedDates({ from: range.from, to: undefined });
                  if (range.from) {
                    setSelectedMode('checkout');
                  }
                } else {
                  // When selecting checkout, maintain the existing check-in date
                  setSelectedDates({ 
                    from: selectedDates?.from, 
                    to: range.to 
                  });
                  if (range.to) {
                    setShowCalendar(false);
                    setSelectedMode('checkin'); // Reset for next selection
                  }
                }
              }}
              numberOfMonths={numberOfMonths}
              disabled={getDisabledDates()}
              components={{ DayContent }}
              className="custom-calendar"
              defaultMonth={selectedDates?.from || today}
              fromDate={selectedMode === 'checkout' && selectedDates?.from 
                ? selectedDates.from 
                : today}
              styles={{
                months: { display: "flex", gap: "1rem" },
                caption: { color: "var(--primary)" },
                day: { margin: "0.1em" },
                head_cell: {
                  color: "var(--muted-foreground)",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                },
                nav_button: {
                  color: "var(--primary)",
                  background: "var(--muted)",
                  margin: "0 4px",
                },
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  useEffect(() => {
    const handleResize = () => {
      setNumberOfMonths(window.innerWidth >= 640 ? 2 : 1)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (variant === "mobile") {
    return (
      <>
        <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t p-4 flex items-center justify-between gap-4 w-full">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <div className="flex flex-col cursor-pointer">
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold">{formatPrice(price)} AED</span>
                  <span className="text-sm text-muted-foreground">/ night</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <span>
                    {selectedDates?.from && selectedDates?.to
                      ? `Total: ${formatPrice(total)} AED`
                      : "Add dates for total"}
                  </span>
                  <ChevronUp className="w-4 h-4" />
                </div>
              </div>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[90vh] p-0">
              <div className="h-full flex flex-col">
                <SheetHeader className="px-4 py-3 border-b flex flex-row items-center justify-between">
                  <div className="text-left">
                    <SheetTitle>Your stay</SheetTitle>
                    <SheetDescription>Select dates and guests</SheetDescription>
                  </div>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      {/* <X  className="h-4 w-4" /> */}
                    </Button>
                  </SheetClose>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto">
                  <div className="p-4 space-y-6">
                    {/* Date Selection */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Dates</h3>
                        {(selectedDates?.from || selectedDates?.to) && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={resetDates}
                            className="h-6 px-2 text-xs"
                          >
                            Reset dates
                          </Button>
                        )}
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-sm text-muted-foreground">Check-in</label>
                            <Button
  variant="outline"
  className="w-full justify-start text-left font-normal"
  onClick={() => {
    setSelectedMode('checkin');
    setShowCalendar(true);
  }}
>
  <Calendar className="mr-2 h-4 w-4" />
  {selectedDates?.from ? format(selectedDates.from, "MMM d, yyyy") : "Select date"}
</Button>



                          </div>
                          <div className="space-y-1.5">
                            <label className="text-sm text-muted-foreground">Check-out</label>
                            <Button
  variant="outline"
  className="w-full justify-start text-left font-normal"
  onClick={() => {
    setSelectedMode('checkout');
    setShowCalendar(true);
  }}
>
  <Calendar className="mr-2 h-4 w-4" />
  {selectedDates?.to ? format(selectedDates.to, "MMM d, yyyy") : "Select date"}
</Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Guest Selection */}
                    <div className="space-y-2">
                      <h3 className="font-medium">Guests</h3>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <Select value={guests} onValueChange={setGuests}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select guests" />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num} {num === 1 ? "guest" : "guests"}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Price Breakdown in mobile view */}
                    <div className="space-y-2">
                      <h3 className="font-medium">Price details</h3>
                      <div className="p-4 bg-muted/50 rounded-lg space-y-4">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span>
                              {nights === 1 
                                ? "Price for 1 night" 
                                : `Price × ${nights} nights`}
                            </span>
                            <span>{formatPrice(subtotal)} AED</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Cleaning fee</span>
                            <span>{formatPrice(cleaningFee)} AED</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Service fee</span>
                            <span>{formatPrice(serviceFee)} AED</span>
                          </div>
                          <div className="flex justify-between">
                            <span>VAT (5%)</span>
                            <span>{formatPrice(vat)} AED</span>
                          </div>
                          <div className="flex justify-between">
                            <span>
                              {nights === 1 
                                ? "DTCM fee (1 night × 15 AED)" 
                                : `DTCM fee (${nights} nights × 15 AED)`}
                            </span>
                            <span>{formatPrice(dtcmFee)} AED</span>
                          </div>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-semibold text-lg">
                          <span>Total</span>
                          <span>{formatPrice(total)} AED</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chat with Owner Section for Mobile */}
                <div className="p-3 sm:p-4 border-t bg-background">
                  <div className="space-y-3 p-3 sm:p-4 bg-primary/5 dark:bg-primary/10 rounded-lg border border-primary/20 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs sm:text-sm font-medium text-foreground">Need help with booking?</span>
                      </div>
                    </div>
                    <div className="w-full">
                      <ChatWithOwner propertyId={id} variant="outline" />
                    </div>
                  </div>
                  
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => {
                      if (selectedDates?.from && selectedDates?.to) {
                        proceedToCheckout()
                        setIsSheetOpen(false)
                      } else {
                        setShowCalendar(true)
                        setIsSheetOpen(false)
                      }
                    }}
                    disabled={isProcessing}
                  >
                    {selectedDates?.from && selectedDates?.to
                      ? isProcessing
                        ? "Processing..."
                        : "Reserve"
                      : "Check availability"}
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Button
            className="flex-shrink-0"
            onClick={() => {
              if (selectedDates?.from && selectedDates?.to) {
                proceedToCheckout()
              } else {
                setShowCalendar(true)
              }
            }}
            disabled={isProcessing}
          >
            {selectedDates?.from && selectedDates?.to
              ? isProcessing
                ? "Processing..."
                : "Reserve"
              : "Check availability"}
          </Button>
        </div>

        <CalendarDialog />
        <AuthForm open={showSignupForm} onOpenChange={setShowSignupForm} />
        <Toaster />

        {/* Add padding to prevent content from being hidden behind the fixed bottom bar */}
        <div className="h-[80px]" />
      </>
    )
  }


  return (
    <Card className="sticky top-4 md:top-24 w-full max-w-md mx-auto shadow-lg bg-card border-none">
      <CardHeader >
        {/* <div className="flex justify-between items-start flex-wrap gap-2">
          <div>
            <CardTitle className="text-xl sm:text-2xl font-bold text-foreground">
              From {formatPrice(Math.min(...[...priceByDate.values(), price]))} AED
              <span className="text-base font-normal text-muted-foreground"> / night</span>
            </CardTitle>
            <div className="flex gap-2 mt-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{booking?.data?.bookings?.length || 0} bookings this month</span>
            </div>
          </div>
          <Badge
            variant="secondary"
            className="bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30"
          >
            Premium Plus
          </Badge>
        </div> */}
      </CardHeader>

      <CardContent className="">
        {/* Replace the grid div containing the check-in/check-out buttons with: */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Check-in</label>
              {selectedDates?.from && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={resetDates}
                  className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
                >
                  Reset
                </Button>
              )}
            </div>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
              onClick={() => {
                setSelectedMode('checkin');
                setShowCalendar(true);
              }}
            >
              <Calendar className="mr-2 h-4 w-4" />
              {selectedDates?.from ? format(selectedDates.from, "MMM d, yyyy") : "Select date"}
            </Button>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Check-out</label>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
              onClick={() => {
                setSelectedMode('checkout');
                setShowCalendar(true);
              }}
            >
              <Calendar className="mr-2 h-4 w-4" />
              {selectedDates?.to ? format(selectedDates.to, "MMM d, yyyy") : "Select date"}
            </Button>
          </div>
        </div>

        {/* Remove the inline calendar and add the CalendarDialog */}
        <CalendarDialog />

        <div className="space-y-4">
          <div className="space-y-2">
            <Select value={guests} onValueChange={setGuests}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? "guest" : "guests"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-3 p-4 bg-muted/50 dark:bg-muted/10 rounded-lg">
  {selectedDates?.from && selectedDates?.to && (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>
          {nights === 1 
            ? "Price for 1 night" 
            : `Price × ${nights} nights`}
        </span>
        <span>{formatPrice(subtotal)} AED</span>
      </div>
      {nights > 0 && (
        <div className="text-xs text-muted-foreground">
          {nights === 1 
            ? "Single night rate applied" 
            : "Variable daily rates applied for your stay"}
        </div>
      )}
    </div>
  )}
  <Separator />
  <div className="flex justify-between font-semibold text-lg text-foreground">
    <span 
      onClick={() => setShowPriceBreakdown(true)}
      className="flex items-center gap-2 cursor-pointer hover:text-gray-600 text-sm"
    >
      Total before taxes
      <ChevronDown className="h-4 w-4" />
    </span>
    <span>
      {formatPrice(total)} AED
    </span>
  </div>
</div>

        {/* Chat with Owner Section */}
        <div className="space-y-3 p-3 sm:p-4 bg-primary/5 dark:bg-primary/10 rounded-lg border border-primary/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs sm:text-sm font-medium text-foreground">Need help with booking?</span>
            </div>
          </div>
          <div className="w-full">
            <ChatWithOwner propertyId={id} variant="outline" />
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-4 p-4 sm:p-6">
        <div className="hidden md:flex flex-col w-full gap-4">
          {/* <Button className="w-full" size="lg" onClick={() => setShowBookingModal(true)} disabled={!isFormValid}>
            {isPending ? "Processing..." : "Reserve Now"}
          </Button> */}
          <Button className="w-full" size="lg" onClick={proceedToCheckout} disabled={!isFormValid || isProcessing}>
            {isProcessing ? "Processing Payment..." : "Pay Now"}
          </Button>
        </div>

        <div className="hidden md:flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Lock className="w-4 h-4" />
          <span>Secure checkout with</span>
          <CreditCard className="w-4 h-4" />
        </div>
        <div className="hidden md:flex flex-col gap-2 p-4 rounded-lg bg-primary/5 dark:bg-primary/10">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground">Premium Protection included</span>
          </div>
        </div>
      </CardFooter>

      <Dialog open={showBookingModal} onOpenChange={setShowBookingModal}>
        <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Confirm Your Booking</DialogTitle>
            <DialogDescription>
              {nights === 1 
                ? "Please review your 1-night stay details" 
                : `Please review your ${nights}-night stay details`}
            </DialogDescription>
          </DialogHeader>

          {bookingStatus.message && (
            <Alert variant={bookingStatus.type === "error" ? "destructive" : "default"}>
              <AlertDescription>{bookingStatus.message}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-foreground">Guest Name</h4>
              <p className="text-sm text-muted-foreground">{guestName}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-foreground">Check-in</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedDates?.from && format(selectedDates.from, "MMM d, yyyy")}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground">Check-out</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedDates?.to && format(selectedDates.to, "MMM d, yyyy")}
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-foreground">Number of Guests</h4>
              <p className="text-sm text-muted-foreground">
                {guests} {Number.parseInt(guests) === 1 ? "guest" : "guests"}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground">Duration</h4>
              <p className="text-sm text-muted-foreground">
                {nights} {nights === 1 ? "night" : "nights"}
              </p>
            </div>
            <Separator />
            <div>
              <h4 className="font-medium text-foreground">Total Price</h4>
              <p className="text-2xl font-bold text-foreground">{formatPrice(total)} AED</p>
              <p className="text-xs text-muted-foreground mt-1">
                {nights === 1 
                  ? "Single night rate with applicable fees" 
                  : "Includes all applicable fees and taxes"}
              </p>
            </div>
          </div>
          <DialogFooter className="gap-2 mt-6">
            <Button
              variant="outline"
              onClick={() => {
                setShowBookingModal(false)
                setBookingStatus({ type: "", message: "" })
              }}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button onClick={handleBookingSubmit} disabled={isPending || !isFormValid}>
              {isPending ? "Processing..." : "Confirm Booking"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      <AuthForm open={showSignupForm} onOpenChange={setShowSignupForm} />
      
      <Dialog open={showPriceBreakdown} onOpenChange={setShowPriceBreakdown}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Price Breakdown</DialogTitle>
            <DialogDescription>
              {nights === 1 
                ? "Detailed breakdown for your 1-night stay" 
                : `Detailed breakdown for your ${nights}-night stay`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-between text-foreground">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="flex items-center gap-1">
                    <span>
                      {nights === 1 
                        ? "Price for 1 night" 
                        : `Price × ${nights} nights`}
                    </span>
                    <Info className="w-4 h-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    {nights === 1 
                      ? "Single night rate" 
                      : "Variable daily rates applied"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <span className="font-medium">{formatPrice(subtotal)} AED</span>
            </div>
            <div className="flex justify-between text-foreground">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="flex items-center gap-1">
                    <span>Cleaning fee</span>
                    <Info className="w-4 h-4" />
                  </TooltipTrigger>
                  <TooltipContent>One-time cleaning fee</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <span>{formatPrice(cleaningFee)} AED</span>
            </div>
            <div className="flex justify-between text-foreground">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="flex items-center gap-1">
                    <span>Service fee</span>
                    <Info className="w-4 h-4" />
                  </TooltipTrigger>
                  <TooltipContent>Platform service charge</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <span>{formatPrice(serviceFee)} AED</span>
            </div>
            <div className="flex justify-between text-foreground">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="flex items-center gap-1">
                    <span>VAT (5%)</span>
                    <Info className="w-4 h-4" />
                  </TooltipTrigger>
                  <TooltipContent>Value Added Tax applied on subtotal</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <span>{formatPrice(vat)} AED</span>
            </div>
            <div className="flex justify-between text-foreground">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="flex items-center gap-1 text-sm">
                    <span>
                      {nights === 1 
                        ? "DTCM fee (1 night × 15 AED)" 
                        : `DTCM fee (${nights} nights × 15 AED)`}
                    </span>
                    <Info className="w-4 h-4" />
                  </TooltipTrigger>
                  <TooltipContent>Dubai Tourism Dirham fee</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <span>{formatPrice(dtcmFee)} AED</span>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>{formatPrice(total)} AED</span>
          </div>
        </DialogContent>
      </Dialog>
      <style jsx global>{`
        .custom-calendar {
          width: 100%;
          max-width: 100%;
          margin: 0 auto;
        }

        .custom-calendar .rdp {
          margin: 0;
        }

        .custom-calendar .rdp-months {
          justify-content: space-between;
          gap: 1.5rem;
        }

        .custom-calendar .rdp-day {
          border-radius: 50%;
          transition: all 0.2s;
          width: 40px;
          height: 40px;
          color: var(--foreground);
          font-size: 0.875rem;
        }

        .custom-calendar .rdp-day:hover:not([disabled]) {
          background-color: hsl(var(--primary) / 0.1);
        }

        .custom-calendar .rdp-day_selected {
          background-color: hsl(var(--primary));
          color: hsl(var(--primary-foreground));
          font-weight: 600;
        }

        .custom-calendar .rdp-day_selected:hover {
          background-color: hsl(var(--primary));
        }

        .custom-calendar .rdp-day_range_middle {
          background-color: hsl(var(--primary) / 0.1);
          color: hsl(var(--primary));
          border-radius: 0;
        }

        .custom-calendar .rdp-day_range_start,
        .custom-calendar .rdp-day_range_end {
          background-color: hsl(var(--primary));
          color: hsl(var(--primary-foreground));
        }

        @media (max-width: 640px) {
          .custom-calendar {
            width: 100%;
          }
          
          .custom-calendar .rdp-month {
            width: 100%;
          }
          
          .custom-calendar .rdp-table {
            width: 100%;
          }
          
          .custom-calendar .rdp-day {
            width: 100%;
            height: 40px;
          }
          
          .custom-calendar .rdp-nav {
            padding: 0 1rem;
          }
          .custom-calendar .rdp-months {
            flex-direction: column;
          }
        }

        /* Dark mode adjustments */
        :root[class~='dark'] .custom-calendar .rdp-day_selected {
          background-color: hsl(var(--primary));
          color: hsl(var(--primary-foreground));
        }

        :root[class~='dark'] .custom-calendar .rdp-day_range_middle {
          background-color: hsl(var(--primary) / 0.2);
        }
      `}</style>
      <Toaster />
    </Card>
  )
}

