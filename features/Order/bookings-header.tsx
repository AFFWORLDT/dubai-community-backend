import { Button } from "@/components/ui/button"
import { PlusCircle } from 'lucide-react'

export function BookingsHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
        <p className="text-muted-foreground">Manage your bookings and reservations</p>
      </div>
      <div className="flex items-center gap-2">
        <Button className="bg-red-500 text-white hover:bg-red-600">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Booking
        </Button>
     
      </div>
    </div>
  )
}

