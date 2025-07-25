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
import { Eye, EyeOff, CheckCircle2, XCircle, AlertCircle, Mail, User, Phone, Lock, ArrowRight, Loader2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"

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
  const [showPassword, setShowPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<SignUpFormData>()

  const password = watch("password", "")
  
  // Calculate password strength
  const calculatePasswordStrength = (password: string) => {
    if (!password) return 0
    
    let strength = 0
    
    // Length check
    if (password.length >= 8) strength += 25
    
    // Character variety checks
    if (/[A-Z]/.test(password)) strength += 25
    if (/[0-9]/.test(password)) strength += 25
    if (/[^A-Za-z0-9]/.test(password)) strength += 25
    
    return strength
  }
  
  // Update password strength whenever password changes
  useState(() => {
    setPasswordStrength(calculatePasswordStrength(password))
  })

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const getStrengthColor = () => {
    if (passwordStrength < 25) return "bg-red-500"
    if (passwordStrength < 50) return "bg-orange-500"
    if (passwordStrength < 75) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getStrengthText = () => {
    if (passwordStrength < 25) return "Weak"
    if (passwordStrength < 50) return "Fair"
    if (passwordStrength < 75) return "Good"
    return "Strong"
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
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60 rounded-2xl" />
          <div className="absolute bottom-8 left-8 text-white">
            <h2 className="text-3xl font-bold mb-2">Welcome to MY Bookings</h2>
            <p className="text-lg">Your gateway to luxury living in Dubai</p>
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-[#60A5FA] w-5 h-5" />
                <span>Premium properties in exclusive locations</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-[#60A5FA] w-5 h-5" />
                <span>24/7 concierge and support services</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-[#60A5FA] w-5 h-5" />
                <span>Seamless booking experience</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Right side - Sign up form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-4 sm:p-8">
        <Card className="w-full max-w-md shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-2">
            <div className="flex justify-center mb-2">
              <img
                src="/assets/logo.png"
                alt="Primevista Logo"
                className="h-12 object-contain"
              />
            </div>
            <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
            <CardDescription className="text-center">
              Enter your information to create your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="grid gap-5 pt-4">
              {error && (
                <div className="text-sm bg-red-50 text-red-500 p-3 rounded-md flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}
              
              <div className="grid gap-3">
                <div className="grid gap-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      id="name"
                      className="pl-10 h-11 border-gray-300 focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-primary"
                      placeholder="Enter your full name"
                      {...register("fullName", {
                        required: "Name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters",
                        },
                      })}
                    />
                  </div>
                  {errors.fullName && (
                    <span className="text-sm text-red-500 flex items-center gap-1">
                      <XCircle className="w-4 h-4" />
                      {errors.fullName.message}
                    </span>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      className="pl-10 h-11 border-gray-300 focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-primary"
                      placeholder="Enter your email address"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                  </div>
                  {errors.email && (
                    <span className="text-sm text-red-500 flex items-center gap-1">
                      <XCircle className="w-4 h-4" />
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      className="pl-10 h-11 border-gray-300 focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-primary"
                      placeholder="Enter your phone number"
                      {...register("phone", {
                        required: "Phone number is required",
                      })}
                    />
                  </div>
                  {errors.phone && (
                    <span className="text-sm text-red-500 flex items-center gap-1">
                      <XCircle className="w-4 h-4" />
                      {errors.phone.message}
                    </span>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className="pl-10 pr-10 h-11 border-gray-300 focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-primary"
                      placeholder="Create a secure password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters",
                        },
                      })}
                      onChange={(e) => setPasswordStrength(calculatePasswordStrength(e.target.value))}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      className="absolute right-1 top-1 h-9 w-9 p-0 text-gray-400"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      <span className="sr-only">
                        {showPassword ? "Hide password" : "Show password"}
                      </span>
                    </Button>
                  </div>
                  {errors.password && (
                    <span className="text-sm text-red-500 flex items-center gap-1">
                      <XCircle className="w-4 h-4" />
                      {errors.password.message}
                    </span>
                  )}

                  {/* Password strength meter */}
                  {password && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Password strength:</span>
                        <span className={passwordStrength >= 75 ? "text-green-500" : passwordStrength >= 50 ? "text-yellow-500" : "text-red-500"}>
                          {getStrengthText()}
                        </span>
                      </div>
                      <Progress value={passwordStrength} className={`h-1.5 ${getStrengthColor()}`} />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 pb-6 pt-2">
              <Button 
                type="submit" 
                className="w-full h-11 bg-[#60A5FA] hover:bg-[#3B82F6] text-white transition-all duration-200"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    Create Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                )}
              </Button>

              <div className="text-center text-sm">
                <span className="text-gray-600">Already have an account? </span>
                <Link href="/login" className="text-[#60A5FA] hover:text-[#3B82F6] font-medium">
                  Login instead
                </Link>
              </div>

              <div className="text-center text-xs text-gray-600">
                By signing up, you agree to our{" "}
                <Link href="/terms" className="text-[#60A5FA] hover:text-[#3B82F6]">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-[#60A5FA] hover:text-[#3B82F6]">
                  Privacy Policy
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

