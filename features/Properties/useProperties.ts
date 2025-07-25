"use client"

import { getAllProperties } from "@/service/Property"; 
import { useQuery } from "@tanstack/react-query";

// Define all required interfaces
interface Address {
  address: string;
}

interface GuestDetails {
  name: string;
}

interface BookingDetails {
  checkIn: Date;
  checkOut: Date;
  guestDetails: GuestDetails;
  amount: number;
}

interface BookingStatistics {
  totalRevenue: number;
  averageBookingValue: number;
  occupancyRate: number;
  currentlyBooked: boolean;
}

interface AvailabilityCalendar {
  startDate: Date;
  endDate: Date;
  bookedDates: BookingDetails[];
}

interface BookingInfo {
  totalBookings: number;
  allBookings: BookingDetails[];
  upcomingBookings: BookingDetails[];
  pastBookings: BookingDetails[];
  statistics: BookingStatistics;
  availabilityCalendar: AvailabilityCalendar;
}

interface Property {
  _id: string;
  address: Address;
  city: string;
  bedrooms: number;
  category: string;
  area: string;
  sno?: number;
  nickname?: string;
  title?: string;
  description?: string;
  photos?: Array<{url: string}>;
  property_type?: string;
  status?: boolean;
  owner: {
    _id: string;
    fullName: string;
    email: string;
  };
  bookingInfo: BookingInfo;
}

export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PropertyResponse {
  properties: Property[];
  pagination: PaginationInfo;
}

export interface PropertyFilters {
  address?: string;
  city?: string;
  bedrooms?: number;
  category?: string;
  area?: string;
  page?: number;
  limit?: number;
}

interface UsePropertiesReturn {
  isLoading: boolean;
  data: Property[];
  pagination?: PaginationInfo;
  error: unknown;
  isError: boolean;
  isFetching: boolean;
}

export const useProperties = (filters?: PropertyFilters): UsePropertiesReturn => {
  const {
    isLoading,
    data,
    error,
    isError,
    isFetching
  } = useQuery<PropertyResponse>({
    queryKey: ['properties', filters],
    queryFn: () => getAllProperties({
      ...filters,
      limit: 5
    }),
    select: (data) => {
      if (!data || !data.properties) {
        return {
          properties: [],
          pagination: {
            total: 0,
            page: 1,
            limit: 5,
            totalPages: 0
          }
        };
      }

      return {
        properties: data.properties.map(property => ({
          ...property,
          bookingInfo: property.bookingInfo ? {
            ...property.bookingInfo,
            allBookings: property.bookingInfo.allBookings?.map(booking => ({
              ...booking,
              checkIn: new Date(booking.checkIn),
              checkOut: new Date(booking.checkOut),
            })) || [],
            upcomingBookings: property.bookingInfo.upcomingBookings?.map(booking => ({
              ...booking,
              checkIn: new Date(booking.checkIn),
              checkOut: new Date(booking.checkOut),
            })) || [],
            pastBookings: property.bookingInfo.pastBookings?.map(booking => ({
              ...booking,
              checkIn: new Date(booking.checkIn),
              checkOut: new Date(booking.checkOut),
            })) || [],
            availabilityCalendar: property.bookingInfo.availabilityCalendar ? {
              ...property.bookingInfo.availabilityCalendar,
              startDate: new Date(property.bookingInfo.availabilityCalendar.startDate),
              endDate: new Date(property.bookingInfo.availabilityCalendar.endDate),
              bookedDates: property.bookingInfo.availabilityCalendar.bookedDates?.map(booking => ({
                ...booking,
                checkIn: new Date(booking.checkIn),
                checkOut: new Date(booking.checkOut),
              })) || [],
            } : null,
          } : null,
        })),
        pagination: data.pagination || {
          total: 0,
          page: 1,
          limit: 5,
          totalPages: 0
        },
      };
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return {
    isLoading,
    data: data?.properties ?? [],
    pagination: data?.pagination,
    error,
    isError,
    isFetching,
  };
};