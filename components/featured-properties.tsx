"use client"
import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star, ArrowRight, Heart, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useProperties } from "@/features/Properties/useProperties"

const getCurrentDailyPrice = (dailyPrices: any[]) => {
  if (!dailyPrices || !Array.isArray(dailyPrices) || dailyPrices.length === 0) return null;

  const today = new Date();
  const matchingPrice = dailyPrices.find((dp) => {
    const priceDate = new Date(dp.date);
    return priceDate.toDateString() === today.toDateString();
  });

  return matchingPrice?.price || null;
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US').format(price);
};

// Function to get short address
const getShortAddress = (address: string) => {
  if (!address) return "Dubai";
  
  // Split address by commas and take the first part (usually the street/area)
  const parts = address.split(',').map(part => part.trim());
  if (parts.length > 0) {
    // Return first part (area/street) + city if available
    return parts[0] + (parts.length > 1 ? `, ${parts[parts.length - 1]}` : '');
  }
  
  return address.length > 30 ? address.substring(0, 30) + '...' : address;
};

export function FeaturedProperties() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const { data: propertyList = [] } = useProperties({
    page: 1,
    limit: 10,
    filters: {}
  });

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const scrollAmount = 400

    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Featured Properties</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium properties in Dubai's most sought-after locations
          </p>
        </motion.div>

        <div className="relative">
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 p-2 rounded-full shadow-lg hover:bg-background"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-4 sm:gap-6 pb-6 px-2 sm:px-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {propertyList.map((property:any) => {
              const dailyPrice = getCurrentDailyPrice(property.dailyPrices);
              const shortAddress = getShortAddress(property?.address?.address || property?.city || "Dubai");
              
              return(
                <div key={property._id} className="min-w-[280px] sm:min-w-[300px] lg:min-w-[400px] snap-start">
                  <Link href={`/properties/${property._id}`}>
                    <Card className="group cursor-pointer overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl">
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={property.photos[0]?.url || "/placeholder.svg"}
                          alt={property.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {/* Pink Apartment Badge - Top Right */}
                        <Badge className="absolute top-4 right-4 bg-blue-500 text-white font-medium px-3 py-1 rounded-full">
                          {property.property_type || "Apartment"}
                        </Badge>
                        {/* Heart Icon - Top Left */}
                        <button className="absolute top-4 left-4 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors">
                          <Heart className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                      <CardContent className="p-4">
                        {/* Bold Title */}
                        <h3 className="font-bold text-lg mb-2 text-gray-900 line-clamp-1 group-hover:text-blue-500 transition-colors">
                          {property.title}
                        </h3>
                        
                        {/* Location with Star Icon */}
                        <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {shortAddress}
                          </span>
                        </div>
                        
                        {/* Price Section */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-baseline gap-1">
                            <span className="text-lg font-bold text-gray-900">
                              {dailyPrice ? formatPrice(dailyPrice) : formatPrice(property.price)} AED
                            </span>
                            <span className="text-sm text-gray-500">per night</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              );
            })}
          </div>

          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 p-2 rounded-full shadow-lg hover:bg-background"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  )
}