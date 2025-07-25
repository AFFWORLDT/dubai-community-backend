import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CancleBooking } from '@/service/booking'; 
import toast from 'react-hot-toast';

export const useCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ bookingId, resion }: { bookingId: string, resion: string }) => {
      return CancleBooking(bookingId,  resion )
    },
    onSuccess: (data) => {
      toast.success(data?.data?.message)
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Something went wrong');  
    },
  });
};
