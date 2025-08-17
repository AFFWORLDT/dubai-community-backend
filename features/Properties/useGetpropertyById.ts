"use client"
import { getPropertyById } from "@/service/Property";
import { useQuery } from "@tanstack/react-query";

interface UsePropertiesReturn {
  isLoading: boolean;
  data: any;
  error: any;
}

export const useGetpropertyById = (id: string): UsePropertiesReturn => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => getPropertyById(id),
    enabled: !!id,
    retry: 3,
    retryDelay: 1000,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  return { isLoading, data, error };
};
