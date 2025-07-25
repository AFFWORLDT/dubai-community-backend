"use client"

import { getPropertyBooking } from "@/service/booking"; 
import { useQuery } from "@tanstack/react-query";

interface UsePropertiesReturns {
  isLoading: boolean;
  data: any;
  error: any;
}

export const useGetBookingonProperty = (id: string): UsePropertiesReturns => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["bookings", id],
    queryFn: async () => getPropertyBooking(id),
    enabled: !!id, 
  });

  return { isLoading, data, error };
};
