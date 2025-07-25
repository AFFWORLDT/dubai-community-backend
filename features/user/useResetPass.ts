"use client";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ResetPass } from "@/service/Auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface UseRestPass {
  isPending: boolean;
  resetPass: (data: unknown) => void;
}

const useResetPass = (): UseRestPass => {
  const queryClient = useQueryClient();
  const router:any = useRouter();
  const mutation = useMutation({
    mutationFn: ResetPass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success('Password reset successFully');
      router.push("/login")
    },
    onError: (error:any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  return {
    resetPass: mutation.mutate,
    isPending: mutation.isPending,
  };
};

export default useResetPass;