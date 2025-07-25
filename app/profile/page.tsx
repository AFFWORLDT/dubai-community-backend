"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MapPin,
  Heart,
  Mail,
  User,
  Settings,
  Clock,
  Building,
  History,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useUser from "@/features/user/useUser";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import useToggleWatchlist from "@/features/Booking/useToggleWatchList";
import { Toaster } from "@/components/ui/toaster";
import EditModal from "@/features/user/EditModal";
import { useRouter } from "next/navigation";
interface Booking {
  checkIn: string;
}
function formatDate(date: any) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
const getCurrentDailyPrice = (dailyPrices: any[]) => {
  if (!dailyPrices || !Array.isArray(dailyPrices) || dailyPrices.length === 0)
    return null;

  const today = new Date();
  const matchingPrice = dailyPrices.find((dp) => {
    const priceDate = new Date(dp.date);
    return priceDate.toDateString() === today.toDateString();
  });

  return matchingPrice?.price || null;
};
export default function UserProfile() {
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading } = useUser();
  const user = data?.data?.data?.user;
  const booking = data?.data?.data?.bookings;
  const watchlist = data?.data?.data?.watchlist;
  const mergedArray = []
    .concat(booking?.pending ?? [])
    .concat(booking?.hosting ?? [])
    .concat(booking?.ConfirmedBookings ?? []);

  const sortBooking = mergedArray
    .filter((item) => item !== undefined)
    .sort((a: Booking, b: Booking) => {
      return new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime();
    });
  const top3Bookings = sortBooking.slice(0, 3);
  const history = booking?.completed ?? [];

  const { toggleWatch } = useToggleWatchlist();
  const handleWishlistToggle = (_id: string) => {
    if (!_id) return;

    try {
      setIsAnimating(true);

      const newSavedState = !isSaved;
      setIsSaved(newSavedState);

      const data = {
        action: newSavedState ? "save" : "unsave",
        propertyId: _id,
      };

      toggleWatch(data);
    } catch (error) {
      console.error("Error updating wishlist:", error);

      // Revert the state on error
      setIsSaved((prev) => !prev);

      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update wishlist status.",
      });
    } finally {
      // Reset animation after a delay
      setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
    }
  };

  const handleViewDetails = (propertyId: string) => {
    router.push(`/properties/${propertyId}`);
  };

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-black pt-4 md:p-6 lg:pt-8 mt-10">
      <div className="mx-auto w-full space-y-6">
        {/* Profile Header */}
        <Card className="relative overflow-hidden">
          <CardContent className="pt-6 px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="h-24 w-24 border-2 border-red-500/10">
                {user?.profileImg ? (
                  <AvatarImage src={user.profileImg} alt="User profile" />
                ) : (
                  <AvatarFallback>
                    {user?.fullName
                      ?.split(" ")
                      .map((name: string) => name.charAt(0))
                      .join("") || "U"}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="text-center md:text-left flex-1">
                <h1 className="text-2xl font-bold">{user?.fullName}</h1>
                <p className="text-muted-foreground">
                  Member since {new Date(user?.createdAt).getFullYear()}
                </p>
                <div className="mt-2 flex items-center justify-center md:justify-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {user?.location || "NA"}
                  </span>
                </div>
              </div>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="bg-primary hover:bg-teal-300 text-white"
                  onClick={() => setIsOpen(true)}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="text-center">
              <CardDescription>Saved Properties</CardDescription>
              <CardTitle className="flex items-center justify-center gap-2">
                <Heart className="h-4 w-4 text-red-500 fill-current" />
                {watchlist?.length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <CardDescription>Active Bookings</CardDescription>
              <CardTitle className="flex items-center justify-center gap-2">
                <Building className="h-4 w-4" />
                {mergedArray?.length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <CardDescription>Past Stays</CardDescription>
              <CardTitle className="flex items-center justify-center gap-2">
                <History className="h-4 w-4" />
                {booking?.completed.length ?? []}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="bookings" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px] [&>[data-state=active]]:bg-primary [&>[data-state=active]]:text-white">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Current Bookings</h2>
            {top3Bookings?.length > 0 ? (
              top3Bookings.map((booking: any) => {
                const checkInDate = new Date(booking?.checkIn);
                const checkOutDate = new Date(booking?.checkOut);
                return (
                  <Card key={booking?._id}>
                    <CardContent className="flex flex-col md:flex-row gap-4 p-4">
                      <img
                        src={booking?.property?.photos[0]?.url}
                        alt={`Property ${booking?.property?.title}`}
                        className="rounded-lg w-full md:w-48 h-32 object-cover"
                      />
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">
                              {booking?.property?.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {booking?.property?.address?.address}
                            </p>
                          </div>
                          <Badge variant="secondary">Upcoming</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {formatDate(new Date(checkInDate))} -{" "}
                              {formatDate(new Date(checkOutDate))}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{booking?.guest}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                          <p className="font-semibold">
                            {booking?.rent} AED total
                          </p>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="bg-primary hover:bg-teal-300 text-white"
                              onClick={() =>
                                router.push(`/order/${booking?._id}`)
                              }
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <p className="justify-center flex font-bold text-lg w-full min-h-40 items-center">
                No Current Booking Found
              </p>
            )}
          </TabsContent>

          <TabsContent value="saved" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {watchlist?.length > 0 ? (
                watchlist?.map((property: any) => {
                  const dailyPrice = getCurrentDailyPrice(
                    property?.dailyPrices
                  );
                  return (
                    <Card
                      key={property._id}
                      className="overflow-hidden"
                      onClick={() => handleViewDetails(property._id)}
                    >
                      <div className="relative">
                        <img
                          src={property?.photos[0]?.url}
                          alt={`Saved Property ${property}`}
                          className="h-48 w-full object-cover"
                        />
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => {
                            handleWishlistToggle(property?._id);
                          }}
                          className={`absolute top-2 right-2 bg-white/80 hover:bg-white transition-all duration-300
             ${isAnimating ? "scale-125" : "scale-100"}
             hover:shadow-lg`}
                        >
                          <Heart
                            className={`h-4 w-4 transition-all duration-300
               ${isSaved ? "fill-red-500 text-red-500" : "text-gray-500"}
               ${isAnimating ? "animate-ping-once" : ""}
               hover:scale-110`}
                          />
                          {/* Additional heart for double-layer effect */}
                          <Heart
                            className={`h-4 w-4 absolute top-0 left-0 right-0 bottom-0 m-auto
               transition-all duration-300
               ${
                 isSaved
                   ? "fill-red-500 text-red-500"
                   : "text-gray-500 opacity-0"
               }
               ${isAnimating ? "animate-pop" : ""}`}
                          />
                        </Button>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold">
                          {property?.address?.address || "NA"}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {property?.city}
                        </p>
                        <p className="mt-2 font-semibold">
                          {" "}
                          {dailyPrice
                            ? `${dailyPrice} AED`
                            : `${property?.price} AED`}
                          /night
                        </p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button className="w-full bg-primary hover:bg-teal-300 text-white">
                          Check Availability
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })
              ) : (
                <p className="justify-center flex font-bold text-lg w-full min-h-40 items-center">
                  No Saved Property Found
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            {history?.length > 0 ? (
              history.map((stay: any) => (
                <Card key={stay?._id}>
                  <CardContent className="flex flex-col md:flex-row gap-4 p-4">
                    <img
                      src={stay?.property?.photos[0]?.url}
                      alt={`Property ${stay?.property?.title}`}
                      className="rounded-lg w-full md:w-48 h-32 object-cover"
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">
                            {stay?.property?.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {stay?.property?.address?.address}
                          </p>
                        </div>
                        <Badge variant="secondary">Completed</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {formatDate(new Date(stay?.checkIn))} -{" "}
                            {formatDate(new Date(stay?.checkOut))}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{stay?.nights} nights</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <p className="font-semibold">{stay?.rent} AED total</p>
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-primary hover:bg-teal-300 text-white"
                        >
                          View Receipt
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="justify-center flex font-bold text-lg w-full min-h-40 items-center">
                No Complet Booking Found{" "}
              </p>
            )}
          </TabsContent>
        </Tabs>

        {/* Account Details */}
        <Card>
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">Email Verified</Badge>
              {/* <Badge variant="outline">Phone Verified</Badge>
              <Badge variant="outline">ID Verified</Badge> */}
            </div>
          </CardContent>
        </Card>
      </div>
      <EditModal isOpen={isOpen} setIsOpen={setIsOpen} user={user} />
      <Toaster />
    </div>
  );
}

const Skeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50/50 pt-4 md:p-6 lg:pt-8 mt-10">
      <div className="mx-auto w-full space-y-6">
        {/* Profile Header Skeleton */}
        <Card className="relative overflow-hidden">
          <CardContent className="pt-6 px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="h-24 w-24 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="flex-1 space-y-2">
                <div className="h-6 w-1/2 bg-gray-200 rounded-md animate-pulse"></div>
                <div className="h-4 w-1/4 bg-gray-200 rounded-md animate-pulse"></div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-4 w-1/4 bg-gray-200 rounded-md animate-pulse"></div>
                </div>
              </div>
              <div className="h-10 w-32 bg-gray-200 rounded-md animate-pulse"></div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats Skeleton */}
        <div className="grid gap-4 md:grid-cols-3">
          {[...Array(3)].map((_, idx) => (
            <Card key={idx}>
              <CardHeader className="text-center space-y-2">
                <div className="h-4 w-1/2 bg-gray-200 mx-auto rounded-md animate-pulse"></div>
                <div className="h-6 w-1/3 bg-gray-200 mx-auto rounded-md animate-pulse"></div>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Tabs Skeleton */}
        <Tabs className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            {[...Array(3)].map((_, idx) => (
              <div
                key={idx}
                className="h-10 w-full bg-gray-200 rounded-md animate-pulse"
              ></div>
            ))}
          </TabsList>

          {/* Tab Content Skeleton */}
          <TabsContent value={""}>
            <div className="space-y-4">
              {[...Array(3)].map((_, idx) => (
                <Card key={idx}>
                  <CardContent className="flex flex-col md:flex-row gap-4 p-4">
                    <div className="h-32 w-full md:w-48 bg-gray-200 rounded-md animate-pulse"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-6 w-1/2 bg-gray-200 rounded-md animate-pulse"></div>
                      <div className="h-4 w-1/4 bg-gray-200 rounded-md animate-pulse"></div>
                      <div className="h-4 w-1/3 bg-gray-200 rounded-md animate-pulse"></div>
                      <div className="h-10 w-24 bg-gray-200 rounded-md animate-pulse"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Account Details Skeleton */}
        <Card>
          <CardHeader>
            <div className="h-6 w-1/3 bg-gray-200 rounded-md animate-pulse"></div>
          </CardHeader>
          <CardContent className="space-y-2">
            {[...Array(3)].map((_, idx) => (
              <div
                key={idx}
                className="h-4 w-1/2 bg-gray-200 rounded-md animate-pulse"
              ></div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
