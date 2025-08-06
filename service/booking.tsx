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
        return res;
    } catch (error:any) {
        console.error('Error creating booking:', error);
        throw new Error(error);
    }
  }
  export const getBookingById = async (id:string): Promise<any> =>{
    try {
        const res = await api.get(`/api/v1/booking/bookings/${id}`)
        return res;
    } catch (error:any) {
        throw new Error(error);
    }
  }

  export const getPropertyBooking = async (id:string)=>{
    try {
        const response = await api.get(`/api/v1/booking/properties/${id}/bookings`);
return response;
    } catch (error:any) {
      throw new Error(error);
    }
}

export const ToggleWatchlist =   async (payload:any)=>{
  try {
    const res = await api.post("/api/v1/bookinguser/watchlist",payload)
    return res;
  } catch (error:any) {
    throw new Error(error);
  }
}
export const CancleBooking =   async (id:any,resion:any)=>{

    const res = await api.patch(`/api/v1/booking/bookings/${id}/cancle-request`,{resion})
    return res;
 
}
