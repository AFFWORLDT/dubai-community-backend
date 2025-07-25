"use client";

import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateUser } from "@/service/Auth";
import toast from "react-hot-toast";

interface UseUpdateUsers {
  isPending: boolean;
  updateuser: (data: unknown) => void;
}

const useUpdateUser = (): UseUpdateUsers => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success("User Update successFully")
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      console.error({ error });
    },
  });

  return {
    updateuser: mutation.mutate,
    isPending: mutation.isPending,
  };
};

export default useUpdateUser;