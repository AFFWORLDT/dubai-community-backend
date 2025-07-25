import { Suspense } from "react"
import { Metadata } from "next"
import { PropertyGallery } from "@/components/property/property-gallery"
import { PropertyInfo } from "@/components/property/property-info"
import { PropertyAmenities } from "@/components/property/property-amenities"
import { PropertyLocation } from "@/components/property/property-location"
import { PropertyReviews } from "@/components/property/property-reviews"
import { PropertyPolicies } from "@/components/property/property-policies"
import { SimilarProperties } from "@/components/property/similar-properties"
import { PropertyViewer3D } from "@/components/property-viewer/property-viewer-3d"
import { BookingCard } from "@/components/booking-card"
import { HostInfo } from "@/components/property/host-info"
import { SkeletonCard } from "@/components/ui/skeleton-card"

interface PageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // In a real app, fetch property data here
  return {
    title: "Luxury Penthouse with Burj Khalifa View | MY Bookings",
    description: "Experience luxury living with breathtaking views of the Burj Khalifa and Dubai skyline",
  }
}

// This would typically come from your database or API
const getPropertyData = async (id: string) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return {
    id: id,
    title: "Luxury Penthouse with Burj Khalifa View",
    location: "Downtown Dubai",
    price: 1200,
    rating: 4.9,
    reviews: 128,
    description: "Experience luxury living with breathtaking views of the Burj Khalifa and Dubai skyline. This stunning penthouse features modern amenities and premium furnishings.",
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
    ],
    beds: 3,
    baths: 3,
    guests: 6,
    size: 2500,
    amenities: [
      { name: "High-Speed WiFi", category: "Technology" },
      { name: "Smart TV", category: "Technology" },
      { name: "Sonos Sound System", category: "Technology" },
      { name: "Private Pool", category: "Outdoor" },
      { name: "BBQ Area", category: "Outdoor" },
      { name: "Terrace", category: "Outdoor" },
      { name: "Gym Access", category: "Fitness" },
      { name: "Spa Access", category: "Fitness" },
      { name: "24/7 Security", category: "Safety" },
      { name: "Secure Parking", category: "Safety" },
      { name: "Concierge Service", category: "Services" },
      { name: "Daily Housekeeping", category: "Services" },
    ],
    locations: {
      address: "Downtown Dubai, Sheikh Mohammed bin Rashid Blvd",
      coordinates: {
        lat: 25.197197,
        lng: 55.274376
      },
      nearby: [
        { name: "Dubai Mall", distance: "5 minutes walk" },
        { name: "Burj Khalifa", distance: "7 minutes walk" },
        { name: "Dubai Fountain", distance: "5 minutes walk" },
        { name: "Dubai Opera", distance: "10 minutes walk" },
      ]
    },
    host: {
      name: "Sarah Ahmed",
      type: "Premium Host",
      response_rate: 100,
      response_time: "within an hour",
      joined: "2020",
      listings: 5,
      verified: true,
      superhost: true,
      image: "/placeholder.svg?height=150&width=150",
    },
    policies: {
      check_in: "3:00 PM",
      check_out: "11:00 AM",
      cancellation: "Flexible - Free cancellation up to 48 hours before check-in",
      house_rules: [
        "No smoking",
        "No parties or events",
        "Pets not allowed",
        "Check-in after 3:00 PM",
        "Check-out before 11:00 AM",
        "Maximum 6 guests",
      ],
      security_deposit: 1000,
    }
  }
}

export default async function PropertyPage({ params }: PageProps) {
  const propertyData = await getPropertyData(params.id)

  return (
    <div className="min-h-screen bg-background">
      {/* <Suspense fallback={<SkeletonCard imageHeight="h-[600px]" />}>
        <PropertyGallery images={propertyData.images} />
      </Suspense>

      <div className="container px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
        
          <div className="lg:col-span-2 space-y-12">
            <Suspense fallback={<SkeletonCard />}>
              <PropertyInfo 
                title={propertyData.title}
                location={propertyData.locations.address} 
                description={propertyData.description}
                beds={propertyData.beds}
                baths={propertyData.baths}
                guests={propertyData.guests}
                size={propertyData.size}
              />
            </Suspense>

            <Suspense fallback={<SkeletonCard />}>
              <PropertyViewer3D />
            </Suspense>

            <Suspense fallback={<SkeletonCard />}>
              <PropertyAmenities amenities={propertyData.amenities} />
            </Suspense>

            <Suspense fallback={<SkeletonCard />}>
              <PropertyLocation 
                address={propertyData.locations.address}
                coordinates={propertyData.locations.coordinates}
                nearby={propertyData.locations.nearby}
              />
            </Suspense>

            <Suspense fallback={<SkeletonCard />}>
              <HostInfo host={{
                fullName: "",
                type: "",
                response_rate: 0,
                response_time: "",
                createdAt: "",
                listings: 0,
                verified: false,
                superhost: false,
                image: ""
              }} />
            </Suspense>

            <Suspense fallback={<SkeletonCard />}>
              <PropertyReviews 
                rating={propertyData.rating}
                reviews={propertyData.reviews}
              />
            </Suspense>

            <Suspense fallback={<SkeletonCard />}>
              <PropertyPolicies policies={propertyData.policies} />
            </Suspense>
          </div>

        
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Suspense fallback={<SkeletonCard />}>
                <BookingCard 
                  price={propertyData.price} id={""}                 
                />
              </Suspense>
            </div>
          </div>
        </div>

        <Suspense fallback={<SkeletonCard />}>
          <SimilarProperties currentId={propertyData.id} />
        </Suspense>
      </div> */}
    </div>
  )
}

