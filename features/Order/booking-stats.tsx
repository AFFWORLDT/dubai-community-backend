import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CheckCircle2, Clock, XCircle } from 'lucide-react';

export function BookingStats({ details }: any) {
  // Get total bookings count
  const totalBookings = details?.data?.data?.length || 0;

  // Filter bookings by status
  // const confirmedBookings = details?.data?.data?.filter(
  //   (booking: any) => booking.status === "Hosting"
  // ).length || 0;

  const confirmedBookings = details?.data?.data?.filter(
    (booking: any) => booking.status === "Confirmed" || booking.status === "Hosting"
  ).length || 0;

  const pendingBookings = details?.data?.data?.filter(
    (booking: any) => booking.status === "Pending"
  ).length || 0;

  const cancelledBookings = details?.data?.data?.filter(
    (booking: any) => booking.status === "Fail" || booking.status==="Cancelled"
  ).length || 0;

  // Calculate percentages
  const confirmedPercentage = totalBookings ? ((confirmedBookings / totalBookings) * 100).toFixed(0) : 0;
  const pendingPercentage = totalBookings ? ((pendingBookings / totalBookings) * 100).toFixed(0) : 0;
  const cancelledPercentage = totalBookings ? ((cancelledBookings / totalBookings) * 100).toFixed(0) : 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="transition-all hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
          <Calendar className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalBookings}</div>
        </CardContent>
      </Card>
      
      <Card className="transition-all hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{confirmedBookings}</div>
          <p className="text-xs text-muted-foreground">
            {confirmedPercentage}% of total bookings
          </p>
        </CardContent>
      </Card>
      
      <Card className="transition-all hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending</CardTitle>
          <Clock className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingBookings}</div>
          <p className="text-xs text-muted-foreground">
            {pendingPercentage}% of total bookings
          </p>
        </CardContent>
      </Card>
      
      <Card className="transition-all hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
          <XCircle className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{cancelledBookings}</div>
          <p className="text-xs text-muted-foreground">
            {cancelledPercentage}% of total bookings
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default BookingStats;