"use client";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ForgetPassword } from "@/service/Auth";
import toast from "react-hot-toast";

interface UseForgetPass {
  isPending: boolean;
  forgetPass: (data: unknown) => void;
}

const useForgetPass = (): UseForgetPass => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ForgetPassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success('Password reset link sent to your email');
    },
    onError: (error:any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  return {
    forgetPass: mutation.mutate,
    isPending: mutation.isPending,
  };
};

export default useForgetPass;