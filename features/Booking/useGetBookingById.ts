import { useQuery } from "@tanstack/react-query";
import { getBookingById } from "@/service/booking";

const useGetBookingById =(id:string)=>{
    const { data, error, isLoading } = useQuery({
        queryKey: ["bookings", id],
        queryFn: () => getBookingById(id),
        enabled: !!id, 
    });
    return { data, error, isLoading };
}

export default useGetBookingById