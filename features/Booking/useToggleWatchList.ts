"use client";

import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToggleWatchlist } from "@/service/booking";
import toast from "react-hot-toast";

interface UseProperties {
  isPending: boolean;
  toggleWatch: (data: unknown) => void;
}

const useToggleWatchlist = (): UseProperties => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ToggleWatchlist,
    onSuccess: (data) => {
    
      toast.success(data?.data?.message)
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      console.error({ error });
    },
  });

  return {
    toggleWatch: mutation.mutate,
    isPending: mutation.isPending,
  };
};

export default useToggleWatchlist;