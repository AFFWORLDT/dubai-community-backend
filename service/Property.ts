import api from "@/utils/ApiUrl";
import { PropertyResponse,PropertyFilters } from "@/features/Properties/useProperties"; 
import { AxiosResponse } from "axios";

export const getAllProperties = async (filters?: PropertyFilters): Promise<PropertyResponse> => {
  try {
    const response = await api.get<AxiosResponse<PropertyResponse>>("/api/v1/property/property", {
      params: filters,
    });
    return response.data.data;
  } catch (error: any) {
    console.error('Error fetching properties:', error.message);
    throw error;
  }
};

export const getPropertyById = async (id: string) => {
  try {
    const response = await api.get(`/api/v1/property/property/special/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching property by ID:', error.message);
    throw error;
  }
};

