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
        {filteredProperties.map((property: any) => (
          <Card
            key={property._id}
            className="overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            onClick={() => handleViewDetails(property._id)}
          >
            <CardHeader className="p-0">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={property?.photos?.[0]?.url || "/placeholder.svg"}
                  alt={property?.title || "Property"}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <Badge className="absolute top-4 right-4 bg-primary text-white">
                  {property?.property_type || property?.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <h3 className="font-semibold text-xl mb-3 line-clamp-1 group-hover:text-primary transition-colors">
                {property?.title || "Untitled Property"}
              </h3>
              <p className="text-muted-foreground line-clamp-2 text-sm">
                {property?.description || "No description available"}
              </p>
            </CardContent>
            {/* <CardFooter className="px-6 py-4 border-t flex justify-between items-center">
              <div>
                <span className="text-2xl font-bold text-blue-600">
                  {getCurrentDailyPrice(property?.dailyPrices) || property?.price} AED
                </span>
                <span className="text-sm text-muted-foreground ml-1">/night</span>
              </div>
            </CardFooter> */}
          </Card>
        ))}
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