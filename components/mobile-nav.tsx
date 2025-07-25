"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu, Search } from 'lucide-react'

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="md:hidden"
          size="icon"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 mt-4">
          <Link
            href="/search"
            className="flex items-center gap-2 text-lg"
            onClick={() => setOpen(false)}
          >
            <Search className="h-5 w-5" />
            Search
          </Link>
          <Link
            href="/listings"
            className="text-lg"
            onClick={() => setOpen(false)}
          >
            Properties
          </Link>
          <Link
            href="/experiences"
            className="text-lg"
            onClick={() => setOpen(false)}
          >
            Experiences
          </Link>
          <Link
            href="/about"
            className="text-lg"
            onClick={() => setOpen(false)}
          >
            About
          </Link>
          <Link
            href="/login"
            className="text-lg"
            onClick={() => setOpen(false)}
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="text-lg"
            onClick={() => setOpen(false)}
          >
            Sign up
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-lg">Theme</span>
            <ThemeToggle />
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

