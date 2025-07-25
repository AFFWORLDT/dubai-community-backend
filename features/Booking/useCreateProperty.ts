"use client";

import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createBooking } from "@/service/booking";
import toast from "react-hot-toast";

interface UseProperties {
  isPending: boolean;
  createBookings: (data: unknown) => void;
}

const useCreateProperty = (): UseProperties => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      toast.success("Booking SuccessFully")
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (error:any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  return {
    createBookings: mutation.mutate,
    isPending: mutation.isPending,
  };
};

export default useCreateProperty;