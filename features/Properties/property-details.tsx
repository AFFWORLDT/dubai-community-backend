"use client"
import React, { useState } from 'react';
import { useGetpropertyById } from "./useGetpropertyById";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Home, Users, Bath, Car, Wifi, Wind, Dumbbell, GlassWater, Star } from 'lucide-react';
import Calendar from 'react-calendar';

interface PropertyDetailsProps {
  id: string;
}

export function PropertyDetails({ id }: PropertyDetailsProps) {
  const { isLoading, data: property } = useGetpropertyById(id);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [guests, setGuests] = useState(1);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

  if (isLoading) {
    return <PropertyDetailsSkeleton />;
  }

  if (!property?.data?.data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-muted-foreground">Property not found</p>
      </div>
    );
  }

  const propertyData = property?.data?.data;

  const amenityIcons = {
    air_conditioning: <Wind className="w-5 h-5" />,
    swimming_pool: <GlassWater className="w-5 h-5" />,
    gym: <Dumbbell className="w-5 h-5" />,
    parking: <Car className="w-5 h-5" />,
    wifi: <Wifi className="w-5 h-5" />
  };

  const handleDateChange = (value:any) => {
    if (!selectedStartDate) {
      setSelectedStartDate(value);
    } else if (!selectedEndDate && value > selectedStartDate) {
      setSelectedEndDate(value);
    } else {
      setSelectedStartDate(value);
      setSelectedEndDate(null);
    }
  };

  const calculateNights = () => {
    if (selectedStartDate && selectedEndDate) {
      const diffTime = Math.abs(selectedEndDate.getTime() - selectedStartDate.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const totalPrice = calculateNights() * propertyData.price;

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gray-50">
      {/* Hero Section */}
     <div className="mb-12">
  <div className="grid grid-cols-2 gap-4" style={{border:"1px solid red"}}>
    <div className="h-[480px]">
      <img 
        src={propertyData.photos[0]}
        alt="Main property view"
        className="w-full h-full object-cover rounded-xl shadow-lg"
      />
    </div>
    <div className="grid grid-cols-2 gap-4">
      {propertyData.photos.slice(1, 5).map((photo: string, index: number) => (
        <div key={index} className="h-[px]">
          <img 
            src={photo}
            alt={`Property photo ${index + 1}`}
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>
      ))}
    </div>
  </div>
</div>
      {/* Main Content */}
      <div className="grid grid-cols-3 gap-12">
        {/* Left Column */}
        <div className="col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">{propertyData.title}</h1>
                <p className="text-xl text-gray-600">
                  {propertyData.city}, {propertyData.country}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-6 h-6 text-yellow-400 fill-current" />
                <span className="text-xl font-semibold">4.9</span>
              </div>
            </div>

            <div className="flex gap-8 py-6 border-y">
              <div className="flex items-center gap-3">
                <Home className="w-6 h-6 text-gray-600" />
                <span className="text-lg">{propertyData.category}</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-gray-600" />
                <span className="text-lg">{propertyData.guest_no} guests</span>
              </div>
              <div className="flex items-center gap-3">
                <Bath className="w-6 h-6 text-gray-600" />
                <span className="text-lg">{propertyData.bathrooms} bathrooms</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">About this place</h2>
            <p className="text-lg text-gray-600 leading-relaxed">{propertyData.description}</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">What this place offers</h2>
            <div className="grid grid-cols-2 gap-6">
              {propertyData.amenities.map((amenity: string) => (
                <div key={amenity} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  {amenityIcons[amenity as keyof typeof amenityIcons]}
                  <span className="text-lg capitalize">{amenity.replace('_', ' ')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Booking Card */}
        <div className="col-span-1">
          <Card className="sticky top-8">
            <CardContent className="p-6 space-y-6">
              <div className="text-3xl font-bold">
                {propertyData.price} AED <span className="text-lg font-normal text-gray-600">/ night</span>
              </div>

              <div className="space-y-6">
                <div className="border rounded-xl p-4">
                  <Calendar
                    onChange={handleDateChange}
                    value={date}
                    className="w-full"
                    tileContent={({ date }) => (
                      <div className="text-xs mt-1 text-gray-600">
                        {propertyData.price} AED
                      </div>
                    )}
                    tileClassName={({ date }) => {
                      if (selectedStartDate && selectedEndDate) {
                        return date >= selectedStartDate && date <= selectedEndDate
                          ? 'bg-blue-100'
                          : '';
                      }
                      return '';
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Number of Guests</label>
                  <Input
                    type="number"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    min={1}
                    max={parseInt(propertyData.guest_no)}
                    className="w-full"
                  />
                </div>

                <Button className="w-full h-12 text-lg">
                  Reserve
                </Button>

                <div className="pt-4 border-t space-y-2">
                  <div className="flex justify-between text-lg">
                    <span>{propertyData.price} AED × {calculateNights()} nights</span>
                    <span>{totalPrice} AED</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{totalPrice} AED</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Host Information */}
      <div className="mt-12 bg-white p-8 rounded-xl shadow-sm">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-gray-200 rounded-full" />
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              Hosted by {propertyData.owner.fullName}
            </h2>
            <p className="text-gray-600">
              Member since {new Date(propertyData.owner.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PropertyDetailsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-96 w-full rounded-xl" />
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-44 w-full rounded-lg" />
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-12">
          <div className="col-span-2 space-y-8">
            <Skeleton className="h-64 w-full rounded-xl" />
            <Skeleton className="h-48 w-full rounded-xl" />
            <Skeleton className="h-72 w-full rounded-xl" />
          </div>
          <Skeleton className="h-[600px] w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;