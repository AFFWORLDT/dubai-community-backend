import api from "@/utils/ApiUrl";
import { AxiosResponse } from "axios";

export const getMonthlyBookingPrice = async (): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await api.get(`/api/v1/booking/monthly-booking-price`);
    return response?.data;
  } catch (error:any) {
    console.error('Error getting monthly booking price:', error);
    throw new Error(error);
  }
};

export const getPropertyMonthlyRent = async (propertyId: string): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await api.get(`/api/v1/booking/property/${propertyId}/monthly-rent`);
    return response?.data;
  } catch (error:any) {
    console.error('Error getting property monthly rent:', error);
    throw new Error(error);
  }
};

export const createBooking = async (payload:any): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await api.post(`/api/v1/booking/bookings`, payload);
      return response?.data;
    } catch (error:any) {
      console.error('Error creating booking:', error);
      throw new Error(error);
    }
  };

  export const getBooking = async (): Promise<any> =>{
    try {
        const res = await api.get(`/api/v1/booking/bookings`)
        return res.data;
    } catch (error:any) {
        console.error('Error getting bookings:', error);
        throw new Error(error);
    }
  }
  export const getBookingById = async (id:string): Promise<any> =>{
    try {
        const res = await api.get(`/api/v1/booking/bookings/${id}`)
        return res.data;
    } catch (error:any) {
        console.error('Error getting booking by ID:', error);
        throw new Error(error);
    }
  }

  export const getPropertyBooking = async (id:string)=>{
    try {
        const response = await api.get(`/api/v1/booking/properties/${id}/bookings`);
        return response.data;
    } catch (error:any) {
      console.error('Error getting property bookings:', error);
      throw new Error(error);
    }
}

export const ToggleWatchlist =   async (payload:any)=>{
  try {
    const res = await api.post("/api/v1/bookinguser/watchlist",payload)
    return res.data;
  } catch (error:any) {
    console.error('Error toggling watchlist:', error);
    throw new Error(error);
  }
}

export const CancleBooking =   async (id:any,resion:any)=>{
  try {
    const res = await api.patch(`/api/v1/booking/bookings/${id}/cancle-request`,{resion})
    return res.data;
  } catch (error:any) {
    console.error('Error cancelling booking:', error);
    throw new Error(error);
  }
}
