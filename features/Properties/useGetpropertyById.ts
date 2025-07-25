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
  });

  return { isLoading, data, error };
};
