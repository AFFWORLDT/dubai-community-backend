"use client";

import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateUser } from "@/service/Auth";
import { useToast } from "@/components/ui/use-toast";

interface UseUpdateUsers {
  isPending: boolean;
  updateuser: (data: unknown) => void;
}

const useUpdateUser = (): UseUpdateUsers => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "User updated successfully",
        duration: 3000,
      })
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