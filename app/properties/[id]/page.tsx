"use client";

import { Suspense } from "react";
import { PropertyGallery } from "@/components/property/property-gallery";
import { PropertyInfo } from "@/components/property/property-info";
import { PropertyAmenities } from "@/components/property/property-amenities";
import { BookingCard } from "@/components/booking-card";
import { SkeletonCard } from "@/components/ui/skeleton-card";
import { useGetpropertyById } from "@/features/Properties/useGetpropertyById";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PropertyReviews } from "@/components/property/property-reviews";
import { PropertyPolicies } from "@/components/property/property-policies";
import { MapPin } from "lucide-react";

export const runtime = 'edge';

interface PageProps {
  params: {
    id: string;
  };
}

const PropertyDetailsSkeleton = () => {
  return (
    <div className="space-y-8">
      <SkeletonCard imageHeight="h-[65vh]" />
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-32 w-full" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/4" />
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-24 rounded-lg" />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-48 w-full rounded-lg" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/4" />
        <div className="grid gap-6 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
};

const PropertyPage = ({ params }: PageProps) => {
  const { isLoading, data: propertyFromHook } = useGetpropertyById(params.id);
  const property = propertyFromHook?.data?.data;

  if (isLoading) {
    return <PropertyDetailsSkeleton />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto">
        {/* Gallery Section */}
        <div className="z-10 bg-background/80 backdrop-blur-sm mt-16 sm:mt-20">
          <Suspense
            fallback={<SkeletonCard imageHeight="h-[50vh] sm:h-[65vh]" />}
          >
            <PropertyGallery
              images={property?.photos}
              propertyData={property}
            />
          </Suspense>
        </div>

        {/* Main Content Section */}
        <div className="mx-auto px-4 sm:px-6 md:px-12 lg:px-24 py-6 sm:py-8 pb-[calc(100px+1.5rem)] lg:pb-8">
          <div className="grid gap-6 lg:gap-x-24 lg:grid-cols-[1fr,auto]">
            {/* Left Column - Property Details */}
            <div className="space-y-6 sm:space-y-8">
              {/* Property Info */}
              <Suspense
                fallback={
                  <div className="space-y-4">
                    <Skeleton className="h-32 w-full" />
                  </div>
                }
              >
                <PropertyInfo
                  title={property?.title}
                  location={property?.address?.address}
                  description={property?.description}
                  beds={property?.category}
                  baths={property?.bathrooms}
                  guests={property?.guest_no}
                  size={property?.size}
                  bedrooms={property?.bedrooms}
                  propertyId={property?._id}
                  createdAt={property?.createdAt}
                />
              </Suspense>

              <Separator />

              {/* Amenities */}
              <Suspense
                fallback={
                  <div className="space-y-4">
                    <Skeleton className="h-8 w-1/4" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Skeleton key={i} className="h-24 rounded-lg" />
                      ))}
                    </div>
                  </div>
                }
              >
                <PropertyAmenities amenities={property?.amenities} />
              </Suspense>

              {/* Policies */}
              <Suspense
                fallback={
                  <div className="space-y-4">
                    <Skeleton className="h-48 w-full rounded-lg" />
                  </div>
                }
              >
                <PropertyPolicies data={property} />
              </Suspense>
            </div>

            {/* Right Column - Desktop Booking Card */}
            <div className="w-[370px] relative hidden lg:block">
              <div
                className="sticky top-24"
                style={{
                  position: "-webkit-sticky",
                  marginTop: "var(--margin-top, 0px)",
                }}
              >
                <Card className="overflow-hidden border shadow-lg">
                  <Suspense fallback={<SkeletonCard />}>
                    <BookingCard
                      price={property?.price}
                      id={property?._id}
                      dailyPrice={property?.dailyPrices}
                      cleaningFee={property?.cleaningfee}
                      monthlyRent={property?.monthlyRent}
                      yearlyRent={property?.yearlyRent}
                      depositMonth={property?.depositMonth}
                      depositYear={property?.depositYear}
                      commisionMonth={property?.commisionMonth}
                      commisionYear={property?.commisionYear}
                    />
                  </Suspense>
                </Card>
              </div>
            </div>
          </div>

          {/* Full Width Reviews Section */}
          <Separator className="my-8 sm:my-12" />
          <div id="reviews" className="scroll-mt-20 sm:scroll-mt-24">
            <Suspense
              fallback={
                <div className="space-y-4">
                  <Skeleton className="h-8 w-1/4" />
                  <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
                    {[1, 2, 3, 4].map((i) => (
                      <Skeleton key={i} className="h-32 rounded-lg" />
                    ))}
                  </div>
                </div>
              }
            >
              <PropertyReviews propertyId={property?._id}/>
            </Suspense>
          </div>

          {/* Full Width Map Section */}
          <Separator className="my-8 sm:my-12" />

          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-semibold">
                Where you'll be
              </h2>
              <MapPin className="w-5 h-5 text-indigo-600" />
            </div>

            <div className="aspect-[16/5] w-full rounded-xl overflow-hidden border relative">
              {/* Map Container */}
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d${
                  property?.location?.latitude || "3610.178787593566"
                }!2d${property?.location?.longitude || "55.2707828"}!3d${
                  property?.location?.latitude || "25.197197"
                }!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x${
                  property?.location?.latitude || "0"
                }%3A0x${
                  property?.location?.longitude || "0"
                }!2s${encodeURIComponent(
                  property?.address?.address || "Dubai"
                )}!5e0!3m2!1sen!2sae!4v1644856015000!5m2!1sen!2sae&markers=color:blue%7C${
                  property?.location?.latitude || "25.197197"
                },${property?.location?.longitude || "55.2707828"}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl"
              />

              {/* Custom Marker Overlay */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="relative">
                  <MapPin className="w-8 h-8 text-blue-500" />
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden z-50">
        <div className="bg-background/80 backdrop-blur-sm border-t p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <Suspense fallback={<SkeletonCard />}>
            <BookingCard
              price={property?.price}
              id={property?._id}
              dailyPrice={property?.dailyPrices}
              cleaningFee={property?.cleaningfee}
              variant="mobile"
              monthlyRent={property?.monthlyRent}
              yearlyRent={property?.yearlyRent}
              depositMonth={property?.depositMonth}
              depositYear={property?.depositYear}
              commisionMonth={property?.commisionMonth}
              commisionYear={property?.commisionYear}
            />
          </Suspense>
        </div>
      </div>
      <div className="h-[100px] lg:h-0" />
    </div>
  );
};

export default PropertyPage;
