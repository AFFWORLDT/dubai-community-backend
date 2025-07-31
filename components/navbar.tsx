"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Building2, Menu } from "lucide-react"
import { UserButton } from "@/components/user-button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuthStore } from "@/Providers/auth-provider"

const Navbar = () => {
  const router = useRouter()
  const { isAuthenticated, logout } = useAuthStore()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    window.location.href = "/"
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <Building2 className="h-6 w-6" />
              <span className="font-bold"> Mybookings</span>
            </Link>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background shadow-sm border-b">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center">
            <div 
              onClick={() => window.location.href = '/'}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <img
                src="/assets/logo.png"
                className="w-32 sm:w-40 md:w-48 h-8 sm:h-10 object-contain transition-all duration-200"
                alt=" Mybookings Logo"
              />
            </div>
            <div className="hidden md:flex items-center space-x-8 ml-10">
              <div
                onClick={() => window.location.href = '/properties'}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200 relative group cursor-pointer"
              >
                Properties
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
              </div>
              <div
                onClick={() => window.location.href = '/about'}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200 relative group cursor-pointer"
              >
                About
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
              </div>
            </div>
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-accent">
                    <UserButton />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 p-2">
                  <DropdownMenuItem 
                    onClick={() => window.location.href = '/profile'} 
                    className="cursor-pointer hover:bg-accent rounded-md p-2"
                  >
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => window.location.href = '/order'} 
                    className="cursor-pointer hover:bg-accent rounded-md p-2"
                  >
                    My Reserve
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer hover:bg-accent rounded-md p-2">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  className="hover:bg-accent"
                  onClick={() => window.location.href = '/login'}
                >
                  Login
                </Button>
                <Button 
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => window.location.href = '/signup'}
                >
                  Sign up
                </Button>
              </div>
            )}
            <ThemeToggle />
          </div>

          {/* Mobile Menu */}
          <div className="flex md:hidden items-center space-x-3">
            <ThemeToggle />
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden hover:bg-accent">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent 
  side="right" 
  className="w-[280px] sm:w-[320px] bg-gradient-to-b from-teal-50 to-teal-100 dark:from-teal-900 dark:to-teal-950"
>
  <SheetHeader className="border-b pb-4 mb-6">
    <img
      src="/assets/logo.png"
      className="w-32 h-8 object-contain"
      alt=" Mybookings Logo"
    />
  </SheetHeader>
  
  <div className="flex flex-col space-y-6">
    <div className="space-y-2">
      <div
        onClick={() => {
          window.location.href = '/properties';
          setMobileMenuOpen(false);
        }}
        className="flex items-center space-x-2 p-3 rounded-lg hover:bg-white/50 dark:hover:bg-white/10 transition-all duration-200 cursor-pointer"
      >
        <span className="text-lg font-medium">Properties</span>
      </div>
      
      <div
        onClick={() => {
          window.location.href = '/about';
          setMobileMenuOpen(false);
        }}
        className="flex items-center space-x-2 p-3 rounded-lg hover:bg-white/50 dark:hover:bg-white/10 transition-all duration-200 cursor-pointer"
      >
        <span className="text-lg font-medium">About</span>
      </div>
    </div>
    
    {isAuthenticated ? (
      <div className="space-y-2 pt-4 border-t border-teal-200 dark:border-teal-800">
        <div
          onClick={() => {
            window.location.href = '/profile';
            setMobileMenuOpen(false);
          }}
          className="flex items-center space-x-2 p-3 rounded-lg hover:bg-white/50 dark:hover:bg-white/10 transition-all duration-200 cursor-pointer"
        >
          <span className="text-base">Profile</span>
        </div>
        
        <div
          onClick={() => {
            window.location.href = '/order';
            setMobileMenuOpen(false);
          }}
          className="flex items-center space-x-2 p-3 rounded-lg hover:bg-white/50 dark:hover:bg-white/10 transition-all duration-200 cursor-pointer"
        >
          <span className="text-base">My Reserve</span>
        </div>
        
        <button
          onClick={() => {
            handleLogout()
            setMobileMenuOpen(false)
          }}
          className="w-full text-left p-3 rounded-lg hover:bg-white/50 dark:hover:bg-white/10 transition-all duration-200"
        >
          <span className="text-base">Logout</span>
        </button>
      </div>
    ) : (
      <div className="space-y-3 pt-4 border-t border-teal-200 dark:border-teal-800">
        <Button 
          asChild 
          variant="outline" 
          className="w-full h-12 text-lg bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20"
        >
          <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
            Login
          </Link>
        </Button>
        
        <Button 
          asChild 
          className="w-full h-12 text-lg bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600"
        >
          <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
            Sign up
          </Link>
        </Button>
      </div>
    )}
  </div>
</SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}

export { Navbar }
