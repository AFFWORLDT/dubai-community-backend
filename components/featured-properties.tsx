"use client"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useProperties } from "@/features/Properties/useProperties"
import { useRef } from 'react'

interface DailyPrice {
  date: string;
  price: number;
}

const formatPrice = (price: number | undefined) => {
  if (!price) return "0";
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const getCurrentDailyPrice = (dailyPrices?: DailyPrice[]): number | null => {
  if (!dailyPrices || !Array.isArray(dailyPrices) || dailyPrices.length === 0) return null;
  
  const today = new Date();
  const matchingPrice = dailyPrices.find(dp => {
    const priceDate = new Date(dp.date);
    return priceDate.toDateString() === today.toDateString();
  });
  
  return matchingPrice?.price || null;
};

export function FeaturedProperties() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { data: properties } = useProperties();
  const propertyList: any[] = properties?.filter((property: any) => property.status === true) || [];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-8 sm:py-12 bg-gradient-to-b from-background to-muted/50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Featured Properties
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Discover our handpicked selection of the most exclusive properties in Dubai
          </p>
        </div>

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
              return(
                <div key={property._id} className="min-w-[280px] sm:min-w-[300px] lg:min-w-[400px] snap-start">
                  <Link href={`/properties/${property._id}`}>
                    <Card className="group cursor-pointer overflow-hidden bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl">
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={property.photos[0]?.url}
                          alt={property.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <Badge className="absolute top-4 left-4 bg-primary text-white font-medium px-3 py-1 rounded-full">
                          {property.property_type}
                        </Badge>
                      </div>
                      <CardContent className="p-6 space-y-4">
                        <div className="space-y-2">
                          <h3 className="text-xl font-semibold line-clamp-1 group-hover:text-primary transition-colors">
                            {property.title}
                          </h3>
                          <p className="text-muted-foreground flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-400" />
                            {property.city}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="rounded-full hover:bg-primary hover:text-white transition-colors"
                            >
                              <ArrowRight className="w-4 h-4" />
                            </Button>
                          </p>
                        </div>
                        {/* <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">Starting from</p>
                              <p className="text-lg font-bold text-primary">
                                {dailyPrice ? `${formatPrice(dailyPrice)} AED` : `${formatPrice(property.price)} AED`}
                                <span className="text-sm font-normal text-muted-foreground"> /night</span>
                              </p>
                            </div>
                           
                          </div>
                        </div> */}
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

        <div className="text-center mt-12">
          <Link href="/properties">
            <Button
              variant="outline"
              size="lg"
              className="group"
            >
              View All Properties
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}