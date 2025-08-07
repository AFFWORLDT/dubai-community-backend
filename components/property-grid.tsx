'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ListingsFilters } from './listings-filters';
import { useProperties } from '@/features/Properties/useProperties';
import React, { useState, useCallback, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import PrettyLoader from './property/Pagination';
import Link from 'next/link';
import { Heart } from 'lucide-react';

interface FilterValues {
  address: string;
  city: string;
  bedrooms: string;
  category: string;
  area: string;
  [key: string]: string;
}

const getCurrentDailyPrice = (dailyPrices: any[]) => {
  if (!dailyPrices || !Array.isArray(dailyPrices) || dailyPrices.length === 0) return null;

  const today = new Date();
  const matchingPrice = dailyPrices.find((dp) => {
    const priceDate = new Date(dp.date);
    return priceDate.toDateString() === today.toDateString();
  });

  return matchingPrice?.price || null;
};

export function PropertyGrid() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [allLoadedProperties, setAllLoadedProperties] = useState<any[]>([]);

  const [filters, setFilters] = useState<FilterValues>({
    address: '',
    city: '',
    bedrooms: '',
    category: '',
    area: ''
  });
  
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.5,
  });

  const payload = {
    page: currentPage,
    limit: itemsPerPage,
    filters,
  }
  
  const { isLoading, data: propertyData, pagination } = useProperties(payload);

  React.useEffect(() => {
    if (propertyData) {
      setAllLoadedProperties(prevProperties => {
        const newProperties = propertyData.filter(
          (newProp: any) => 
            newProp.status !== false && 
            !prevProperties.some(existingProp => existingProp._id === newProp._id)
        );
        return [...prevProperties, ...newProperties];
      });
    }
  }, [propertyData]);

  React.useEffect(() => {
    if (inView && !isLoading && currentPage < (pagination?.totalPages || 0)) {
      setCurrentPage(prev => prev + 1);
    }
  }, [inView, isLoading, currentPage, pagination?.totalPages]);

  const handleFilterChange = useCallback((newFilters: FilterValues) => {
    setFilters(newFilters);
    setCurrentPage(1);
    setAllLoadedProperties([]);
  }, []);

  const handleViewDetails = useCallback((propertyId: string) => {
    window.location.href = `/properties/${propertyId}`;
  }, []);

  const filteredProperties = useMemo(() => {
    return allLoadedProperties.filter((property: any) => {
      const cityMatch = !filters.city || 
        property.city?.toLowerCase().includes(filters.city.toLowerCase());
      
      const addressMatch = !filters.address || 
        property.address?.address?.toLowerCase().includes(filters.address.toLowerCase());
      
      const bedroomsMatch = !filters.bedrooms || 
        property.bedrooms?.toString() === filters.bedrooms;
      
      const categoryMatch = !filters.category || 
        property.category?.toLowerCase().includes(filters.category.toLowerCase());
      
      const areaMatch = !filters.area || 
        property.area?.toLowerCase().includes(filters.area.toLowerCase());
  
      return cityMatch && addressMatch && bedroomsMatch && categoryMatch && areaMatch;
    });
  }, [allLoadedProperties, filters]);

  return (
    <section>
      <div className="flex justify-between items-center mt-9 mb-8">
       
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property: any) => {
          const currentPrice = getCurrentDailyPrice(property?.dailyPrices) || property?.price;
          return (
            <Card
              key={property._id}
              className="overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white"
              onClick={() => handleViewDetails(property._id)}
            >
              <CardHeader className="p-0">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={property?.photos?.[0]?.url || "/placeholder.svg"}
                    alt={property?.title || "Property"}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Pink Apartment Badge - Top Right */}
                  <Badge className="absolute top-4 right-4 bg-pink-500 text-white font-medium px-3 py-1 rounded-full">
                    {property?.property_type || property?.category || "Apartment"}
                  </Badge>
                  {/* Heart Icon - Top Left */}
                  <button className="absolute top-4 left-4 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                {/* Bold Title */}
                <h3 className="font-bold text-lg mb-2 text-gray-900 line-clamp-1 group-hover:text-pink-500 transition-colors">
                  {property?.title || "Untitled Property"}
                </h3>
                {/* Description */}
                <p className="text-gray-600 line-clamp-2 text-sm mb-3">
                  {property?.description || "No description available"}
                </p>
                {/* Price Section */}
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold text-gray-900">
                      {currentPrice} AED
                    </span>
                    <span className="text-sm text-gray-500">per night</span>
                  </div>
                  <Badge className="bg-pink-500 text-white font-medium px-3 py-1 rounded-full">
                    {property?.property_type || property?.category || "Apartment"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <PrettyLoader
        loadMoreRef={loadMoreRef}
        isLoading={isLoading}
        currentPage={currentPage}
        pagination={pagination}
      />
    </section>
  );
}