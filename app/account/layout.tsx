import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu } from 'lucide-react'

export const metadata: Metadata = {
  title: "Account |  Mybookings",
  description: "Manage your  Mybookings account",
}

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-6xl items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="font-semibold">
               Mybookings
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/account"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Account
              </Link>
              <Link
                href="/account/bookings"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Bookings
              </Link>
              <Link
                href="/account/favorites"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Favorites
              </Link>
            </nav>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/account">Account</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/account/bookings">Bookings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/account/favorites">Favorites</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  )
}

