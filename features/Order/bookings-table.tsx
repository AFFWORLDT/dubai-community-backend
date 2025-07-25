"use client"

import { CalendarDays, MoreHorizontal, Search } from 'lucide-react'
import { format } from "date-fns"
import { useRouter } from 'next/navigation'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useCancelBooking } from '../Booking/useCancleBooking'
import { CancellationModal } from './CancleBookingTable'
import { useState } from 'react'


export function BookingsTable({bookings}:any) {
  const [selectedBookingId, setSelectedBookingId] = useState<string | any>(null);
const router =useRouter()
const { mutate: cancelBooking, isPending } = useCancelBooking();

const handleCancelBooking = (reason: any) => {  
  if (selectedBookingId) {
    cancelBooking({ 
      bookingId: selectedBookingId, 
      resion: reason 
    });
    setSelectedBookingId(null);
  }
};

  return (
    <div className="space-y-4">
   
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Guest</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings?.data?.data?.map((booking:any) => (
              <TableRow key={booking._id} className="group">
                <TableCell>
                  <div>
                    <div className="font-medium">{booking?.guest}</div>
                  </div>
                </TableCell>
                <TableCell>{booking?.property?.title}</TableCell>
                <TableCell>
  <div className="flex items-center gap-2">
    <CalendarDays className="h-4 w-4 text-green-500" />
    <span>
      {booking?.checkIn && !isNaN(new Date(booking?.checkIn).getTime())
        ? format(new Date(booking?.checkIn), "PP")
        : "N/A"}
    </span>
  </div>
</TableCell>

                <TableCell>
                  <StatusBadge status={booking?.status} />
                </TableCell>
                <TableCell className="text-right font-medium">
                  {booking?.rent.toFixed(2)} AED
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[160px]">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={()=>router.push(`/order/${booking?._id}`)}>
                        View details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Send reminder
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
            className="text-red-600" 
            onClick={() => setSelectedBookingId(booking._id)}
          >
            Cancel Request
          </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <CancellationModal
        isOpen={!!selectedBookingId}
        onClose={() => setSelectedBookingId(null)}
        onConfirm={handleCancelBooking}
        isPending={isPending}
      />
      </div>
    </div>
  )
}

type StatusType = "Completed" | "Pending" | "Confirmed" | "Fail" | "Hosting" | "Cancelled" | "Request"

interface StatusConfig {
  className: string
  label: string
}

const statusConfigs: Record<StatusType, StatusConfig> = {
  Completed: {
    className: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
    label: "Completed",
  },
  Pending: {
    className: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
    label: "Pending",
  },
  Confirmed: {
    className: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
    label: "Confirmed",
  },
  Fail: {
    className: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
    label: "Fail",
  },
  Hosting: {
    className: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
    label: "Hosting",
  },
  Cancelled: {
    className: "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20",
    label: "Cancelled",
  },
  Request: {
    className: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
    label: "Request",
  },
}

interface StatusBadgeProps {
  status: string
}

export function StatusBadge({ status }: StatusBadgeProps) {
  // Normalize the status string to match our expected format
  const normalizedStatus = (status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()) as StatusType

  // Get the config for this status, or fall back to a default
  const statusConfig = statusConfigs[normalizedStatus] || {
    className: "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20",
    label: "Unknown",
  }

  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset transition-colors ${statusConfig.className}`}
    >
      {statusConfig.label}
    </span>
  )
}

