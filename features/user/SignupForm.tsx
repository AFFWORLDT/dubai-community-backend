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

interface AuthFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AuthForm({ open, onOpenChange }: AuthFormProps) {
  const [isSignup, setIsSignup] = useState(false)
  const setAuth = useAuthStore((state) => state.login)
  const [error, setError] = useState("")

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
            className="w-full h-10 sm:h-12 text-sm sm:text-base mt-6" 
            disabled={mutation.isPending }
          >
            {mutation.isPending 
              ? (isSignup ? "Signing up..." : "Logging in...") 
              : (isSignup ? "Sign up" : "Log in")
            }
          </Button>
          <div className="text-center text-sm sm:text-base mt-4">
            <span className="text-muted-foreground">
              {isSignup ? "Already have an account? " : "Don't have an account? "}
            </span>
            <Button
              variant="link"
              className="p-0 h-auto font-normal text-sm sm:text-base"
              onClick={toggleMode}
              type="button"
            >
              {isSignup ? "Log in" : "Sign up"}
            </Button>
          </div>
        </form>
      </DialogContent>
      <Toaster/>
    </Dialog>
  )
}