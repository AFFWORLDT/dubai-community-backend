"use client"
import { getBooking } from "@/service/booking"; 
import { useQuery } from "@tanstack/react-query";

interface UsePropertiesReturn {
    isLoading: boolean;
    data: any;
    error: unknown;
  }
  
  export const useBookings = (): UsePropertiesReturn => {
    const { isLoading, data, error } = useQuery({
      queryKey: ['bookings'],
      queryFn: getBooking,
    });
  
    return {
      isLoading,
      data: data ?? [], 
      error,
    };
  };