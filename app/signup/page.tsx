'use client'

import Link from "next/link"
import { useState } from "react"
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
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { signup } from "@/service/Auth"
import { AxiosError } from "axios"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { useAuthStore } from "@/Providers/auth-provider"
import { GoogleAuthButton } from "@/components/GoogleAuthButton"

// Types for our form
interface SignUpFormData {
  fullName: string
  email: string
  password: string
  phone: string
}

// Sign up page component
export default function SignUpPage() {
  const router = useRouter()
  const setAuth = useAuthStore((state) => state.login)
  const { toast } = useToast()
  const [error, setError] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<SignUpFormData>()

  const mutation = useMutation({
    mutationFn: signup,
    onSuccess: (response) => {
      const { accessToken, refreshToken, user } = response.data.data
      setAuth({ accessToken, refreshToken }, user)
      toast({
        title: "Account created!",
        description: "Your account has been created successfully. Redirecting to login...",
        duration: 3000,
      })

      setTimeout(() => {
        router.push('/login')
      }, 1000)
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

  const onSubmit = async (data: SignUpFormData) => {
    try {
      setError("")
      mutation.mutate(data)
    } catch (err) {
      setError("Failed to create account. Please try again.")
    } 
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-100 items-center justify-center p-8">
        <div className="relative w-full h-full mt-12">
          <img
            src="https://res.cloudinary.com/djcyhbk2e/image/upload/c_limit,f_auto,q_50,w_1400/v1/gvv/prod/nhfuiqnfartfnttg7pbn"
            alt="Dubai Skyline"
            className="rounded-2xl object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/20 rounded-2xl" />
          <div className="absolute bottom-8 left-8 text-white">
            <h2 className="text-3xl font-bold mb-2">Welcome to  Mybookings</h2>
            <p className="text-lg">Your gateway to luxury Mybookings in Dubai</p>
          </div>
        </div>
      </div>
      {/* Right side - Sign up form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
              Enter your information to create your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="grid gap-4">
              {error && (
                <div className="text-sm text-red-500">
                  {error}
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  {...register("fullName", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                />
                {errors.fullName && (
                  <span className="text-sm text-red-500">
                    {errors.fullName.message}
                  </span>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-sm text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phone">Phone No.</Label>
                <Input
                  id="phone"
                  type="tel"
                  {...register("phone", {
                    required: "Please Enter phone",
                   
                  })}
                />
                {errors.phone && (
                  <span className="text-sm text-red-500">
                    {errors.phone.message}
                  </span>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
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
                  <span className="text-sm text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>

             
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button 
                className="w-full" 
                type="submit"
                disabled={mutation.isPending }
              >
                {mutation.isPending ? "Creating Account..." : "Create Account"}
              </Button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              
              <GoogleAuthButton />
              
              <div className="text-sm text-center text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  Login
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

