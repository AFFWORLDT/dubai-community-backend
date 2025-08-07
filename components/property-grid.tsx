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
import { Heart, Star, MapPin, Grid3X3, List, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

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

type ViewMode = 'grid' | 'list' | 'mobile';

export function PropertyGrid() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [allLoadedProperties, setAllLoadedProperties] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

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

  const renderPropertyCard = (property: any, isMobileView = false) => {
    const currentPrice = getCurrentDailyPrice(property?.dailyPrices) || property?.price;
    const shortAddress = getShortAddress(property?.address?.address || property?.city || "Dubai");
    
    if (isMobileView) {
      return (
        <Card
          key={property._id}
          className="overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white"
          onClick={() => handleViewDetails(property._id)}
        >
          <div className="flex">
            <div className="relative w-24 h-24 flex-shrink-0">
              <Image
                src={property?.photos?.[0]?.url || "/placeholder.svg"}
                alt={property?.title || "Property"}
                fill
                className="object-cover"
                loading="lazy"
              />
              <Badge className="absolute top-1 right-1 bg-pink-500 text-white text-xs px-1 py-0.5 rounded-full">
                {property?.property_type || property?.category || "Apartment"}
              </Badge>
            </div>
            <CardContent className="p-3 flex-1">
              <h3 className="font-bold text-sm mb-1 text-gray-900 line-clamp-1 group-hover:text-pink-500 transition-colors">
                {property?.title || "Untitled Property"}
              </h3>
              <div className="flex items-center gap-1 mb-1 text-xs text-gray-600">
                <Star className="w-3 h-3 text-yellow-400" />
                <span className="flex items-center gap-1">
                  <MapPin className="w-2 h-2" />
                  {shortAddress}
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-bold text-gray-900">
                  {currentPrice} AED
                </span>
                <span className="text-xs text-gray-500">per night</span>
              </div>
            </CardContent>
          </div>
        </Card>
      );
    }

    if (viewMode === 'list') {
      return (
        <Card
          key={property._id}
          className="overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white"
          onClick={() => handleViewDetails(property._id)}
        >
          <div className="flex">
            <div className="relative w-32 h-24 flex-shrink-0">
              <Image
                src={property?.photos?.[0]?.url || "/placeholder.svg"}
                alt={property?.title || "Property"}
                fill
                className="object-cover"
                loading="lazy"
              />
              <Badge className="absolute top-2 right-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
                {property?.property_type || property?.category || "Apartment"}
              </Badge>
            </div>
            <CardContent className="p-4 flex-1">
              <h3 className="font-bold text-base mb-2 text-gray-900 line-clamp-1 group-hover:text-pink-500 transition-colors">
                {property?.title || "Untitled Property"}
              </h3>
              <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {shortAddress}
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-bold text-gray-900">
                  {currentPrice} AED
                </span>
                <span className="text-sm text-gray-500">per night</span>
              </div>
            </CardContent>
          </div>
        </Card>
      );
    }

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
                {currentPrice} AED
              </span>
              <span className="text-sm text-gray-500">per night</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <section>
      <div className="flex justify-between items-center mt-9 mb-8">
        <div className="flex items-center gap-2">
          {/* Left side content can be added here if needed */}
        </div>
        
        <div className="flex items-center gap-2">
          <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as ViewMode)}>
            <ToggleGroupItem value="grid" aria-label="Grid view">
              <Grid3X3 className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view">
              <List className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="mobile" aria-label="Mobile view">
              <Smartphone className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
      
      <div className={
        viewMode === 'grid' 
          ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          : viewMode === 'list'
          ? "grid grid-cols-1 gap-4"
          : "grid grid-cols-1 gap-3"
      }>
        {filteredProperties.map((property: any) => 
          renderPropertyCard(property, viewMode === 'mobile')
        )}
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