"use client"
import { BookingsTable } from "@/features/Order/bookings-table"
import { BookingStats } from "@/features/Order/booking-stats" 
import { useBookings } from "@/features/Booking/useBooking"

export default function BookingsPage() {
  const {  data }=useBookings()

  return (
    <div className="min-h-screen bg-background">
      <div className="h-[200px] w-full bg-gradient-to-br from-teal-500/50 via-teal-500/20 to-transparent dark:from-tral-500/20 dark:via-teal-500/10" />
      <div className="  mx-auto py-10 space-y-8 mt-2 px-4">

        <BookingStats details={data}/>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <BookingsTable bookings={data} />
        </div>
      </div>
    </div>
  )
}

