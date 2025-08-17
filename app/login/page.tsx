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
import { useRouter, useSearchParams } from "next/navigation"
import { login } from "@/service/Auth"
import { AxiosError } from "axios"
import { useState, Suspense } from "react"
import { Eye, EyeOff } from "lucide-react"
import { GoogleAuthButton } from "@/components/GoogleAuthButton"

interface LoginFormData {
  email: string
  password: string
}

function LoginPageInner() {
  const setAuth = useAuthStore((state) => state.login)
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnUrl = searchParams.get('returnUrl')
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
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
      
      // Redirect to return URL if available, otherwise to properties
      if (returnUrl) {
        router.push(returnUrl)
        toast({
          title: "Login Successful",
          description: "Redirecting you to your booking...",
          duration: 3000,
        })
      } else {
        router.push('/properties')
        toast({
          title: "Login Successful",
          duration: 3000,
        })
      }
   
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
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
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              <div className="mt-6">
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

                <div className="mt-6">
                  <GoogleAuthButton />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <div className="text-center text-sm">
                <Link
                  href="/forgot-password"
                  className="text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
                </Link>
              </div>
              <div className="text-center text-sm">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="text-blue-600 hover:text-blue-500"
                >
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading login page...</p>
        </div>
      </div>
    }>
      <LoginPageInner />
    </Suspense>
  )
}