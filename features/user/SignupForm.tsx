"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useMutation } from "@tanstack/react-query"
import { login, signup } from "@/service/Auth"
import toast, { Toaster } from "react-hot-toast"
import { AxiosError } from "axios"
import { useAuthStore } from "@/Providers/auth-provider"
import Link from "next/link"
import { Loader2 } from "lucide-react"

interface AuthFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AuthForm({ open, onOpenChange }: AuthFormProps) {
  const [isSignup, setIsSignup] = useState(false)
  const setAuth = useAuthStore((state) => state.login)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const mutation = useMutation({
    mutationFn: isSignup ? signup : login,
    onSuccess: (response) => {
      console.log(response);
      
      const { accessToken, refreshToken, user } = response.data.data
      setAuth({ accessToken, refreshToken }, user)
      toast.success(response?.data?.message)
      onOpenChange(false)
    },
    onError: (error: AxiosError<{ message: string }>) => {
      if (error.response) {
        toast.error(error?.response?.data?.message)
      } 
    }
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const data = isSignup 
        ? {
            fullName: formData.get("fullName"),
            email: formData.get("email"),
            password: formData.get("password"),
            phone: formData.get("phone"),
          }
        : {
            email: formData.get("email"),
            password: formData.get("password"),
          }

      mutation.mutate(data)
      onOpenChange(false)
     
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    } 
  }

  const toggleMode = () => {
    setIsSignup(!isSignup)
    setError("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full sm:max-w-sm md:max-w-lg mx-auto p-4 sm:p-6 md:p-8">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-xl sm:text-2xl font-semibold text-center">
            {isSignup ? "Create an account" : "Welcome back"}
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-center">
            {isSignup 
              ? "Sign up to continue with your booking" 
              : "Login to continue with your booking"
            }
          </DialogDescription>
        </DialogHeader>
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          {isSignup && (
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm sm:text-base">Full Name</Label>
              <Input 
                id="fullName" 
                name="fullName" 
                required 
                className="h-10 sm:h-12"
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm sm:text-base">Email</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              required 
              className="h-10 sm:h-12"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm sm:text-base">Password</Label>
            <Input 
              id="password" 
              name="password" 
              type="password" 
              required 
              minLength={isSignup ? 8 : undefined}
              className="h-10 sm:h-12"
            />
          </div>
          {isSignup && (
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm sm:text-base">Phone Number</Label>
              <Input 
                id="phone" 
                name="phone" 
                type="tel" 
                required 
                className="h-10 sm:h-12"
              />
            </div>
          )}
          <Button
            type="submit"
            className="w-full bg-[#60A5FA] hover:bg-[#3B82F6] text-white transition-all duration-200"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </div>
            ) : (
              "Create Account"
            )}
          </Button>
          <div className="mt-4 text-center">
            <span className="text-gray-600">Already have an account? </span>
            <Link href="/login" className="text-[#60A5FA] hover:text-[#3B82F6] font-medium">
              Login instead
            </Link>
          </div>
          <div className="mt-4 text-center text-sm text-gray-600">
            By signing up, you agree to our{" "}
            <Link href="/terms" className="text-[#60A5FA] hover:text-[#3B82F6]">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-[#60A5FA] hover:text-[#3B82F6]">
              Privacy Policy
            </Link>
          </div>
        </form>
      </DialogContent>
      <Toaster/>
    </Dialog>
  )
}