'use client'
import Link from "next/link"
import { useAuthStore } from "@/Providers/auth-provider" 
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMutation } from "@tanstack/react-query"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { useRouter } from "next/navigation"
import { login } from "@/service/Auth"
import { AxiosError } from "axios"

interface LoginFormData {
  email: string
  password: string
}

export default function LoginPage() {
  const setAuth = useAuthStore((state) => state.login)
  const router = useRouter()
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>()
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
   
      const { accessToken, refreshToken,user } = response.data.data
      setAuth({ accessToken, refreshToken }, user)
      router.push('/properties')
      toast({
        title: "Login SuccessFull",
        duration: 3000,
      })
   
    },
    onError: (error: AxiosError<{ message: string }>) => {
      if (error.response) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.response.data.message || "Something went wrong",
        })
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message || "Something went wrong",
        })
      }
    },
  });

  const onSubmit = (data: LoginFormData) => {

   mutation.mutate(data)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-100 items-center justify-center p-8">
        <div className="relative w-full h-full mt-16">
          <img
            src="https://media1.thrillophilia.com/filestore/x5evrxjv5si5z40e7hq5v9304e06_The_View_at_the_Palm_40f1da14a6.jpg"
            alt="Dubai Skyline"
            className="rounded-2xl object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/20 rounded-2xl" />
          <div className="absolute bottom-8 left-8 text-white">
            <h2 className="text-3xl font-bold mb-2">Welcome to Primevista Holidayhomes</h2>
            <p className="text-lg">Your gateway to luxury living in Dubai</p>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button className="w-full" type="submit">
                Sign in
              </Button>
              <div className="text-sm text-center text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
      <Toaster />
    </div>
  )
}