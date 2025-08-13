"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu } from "lucide-react"
import { UserButton } from "@/components/user-button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuthStore } from "@/Providers/auth-provider"
import { Logo } from "@/components/ui/logo"

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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-blue-600 border-b border-blue-700">
        <div className="flex h-20 items-center px-4">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center">
              <Logo variant="mobile" />
              <span className="text-white font-bold text-xl sm:text-2xl md:text-3xl -ml-2">MYBOOKINGS</span>
            </Link>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-blue-600 shadow-lg border-b border-blue-700">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 md:h-16 items-center justify-between">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center">
            <div 
              onClick={() => window.location.href = '/'}
              className="flex items-center cursor-pointer"
            >
              <Logo variant="mobile" className="md:hidden" />
              <Logo variant="large" className="hidden md:block" />
              <span className="text-white font-bold text-xl sm:text-2xl md:text-3xl -ml-2">MYBOOKINGS</span>
            </div>
            <div className="hidden md:flex items-center space-x-8 ml-10">
              <div
                onClick={() => window.location.href = '/properties'}
                className="text-sm font-medium text-white hover:text-blue-100 transition-colors duration-200 relative group cursor-pointer"
              >
                Properties
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
              </div>
              <div
                onClick={() => window.location.href = '/about'}
                className="text-sm font-medium text-white hover:text-blue-100 transition-colors duration-200 relative group cursor-pointer"
              >
                About
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
              </div>
            </div>
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-blue-500 text-white">
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
                  className="hover:bg-blue-500 text-white border-white/20"
                  onClick={() => window.location.href = '/login'}
                >
                  Login
                </Button>
                <Button 
                  className="bg-white text-blue-600 hover:bg-blue-50 border-white"
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
                <Button variant="ghost" size="icon" className="md:hidden hover:bg-blue-500 text-white">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent 
  side="right" 
  className="w-[280px] sm:w-[320px] bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-950"
>
  <SheetHeader className="border-b border-blue-200 pb-4 mb-6">
    <Logo variant="small" />
  </SheetHeader>
  
  <div className="flex flex-col space-y-6">
    <div className="space-y-2">
      <div
        onClick={() => {
          window.location.href = '/properties';
          setMobileMenuOpen(false);
        }}
        className="flex items-center space-x-2 p-3 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition-all duration-200 cursor-pointer"
      >
        <span className="text-lg font-medium text-blue-900 dark:text-blue-100">Properties</span>
      </div>
      
      <div
        onClick={() => {
          window.location.href = '/about';
          setMobileMenuOpen(false);
        }}
        className="flex items-center space-x-2 p-3 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition-all duration-200 cursor-pointer"
      >
        <span className="text-lg font-medium text-blue-900 dark:text-blue-100">About</span>
      </div>
    </div>
    
    {isAuthenticated ? (
      <div className="space-y-2 pt-4 border-t border-blue-200 dark:border-blue-800">
        <div
          onClick={() => {
            window.location.href = '/profile';
            setMobileMenuOpen(false);
          }}
          className="flex items-center space-x-2 p-3 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition-all duration-200 cursor-pointer"
        >
          <span className="text-base text-blue-900 dark:text-blue-100">Profile</span>
        </div>
        
        <div
          onClick={() => {
            window.location.href = '/order';
            setMobileMenuOpen(false);
          }}
          className="flex items-center space-x-2 p-3 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition-all duration-200 cursor-pointer"
        >
          <span className="text-base text-blue-900 dark:text-blue-100">My Reserve</span>
        </div>
        
        <button
          onClick={() => {
            handleLogout()
            setMobileMenuOpen(false)
          }}
          className="w-full text-left p-3 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition-all duration-200"
        >
          <span className="text-base text-blue-900 dark:text-blue-100">Logout</span>
        </button>
      </div>
    ) : (
      <div className="space-y-3 pt-4 border-t border-blue-200 dark:border-blue-800">
        <Button 
          asChild 
          variant="outline" 
          className="w-full h-12 text-lg bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 border-blue-300 dark:border-blue-700 text-blue-900 dark:text-blue-100"
        >
          <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
            Login
          </Link>
        </Button>
        
        <Button 
          asChild 
          className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
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
