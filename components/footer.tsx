import Link from "next/link"
import { Building2, Facebook, Instagram, Youtube } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Logo } from "@/components/ui/logo"

const footerLinks = {
  company: [
    { label: "About", href: "/about" },
    { label: "Our Apps", href: "/our-apps" },
    { label: "Contact", href: "/contact" },
    { label: "Corporate Contact", href: "/corporate-contact" },
    // { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
  ],
  support: [
    { label: "Help Center", href: "/help" },
    { label: "Safety", href: "/safety" },
    { label: "Cancellation", href: "/cancellation" },
    { label: "FAQ", href: "/faq" },
  ],
  legal: [
    { label: "Terms", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Guidelines", href: "/guidelines" },
    { label: "Host Terms", href: "/host-terms" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t bg-background w-full">
      <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Property Host CTA */}
        <div className="mb-8 sm:mb-12 p-4 sm:p-6 bg-gradient-to-r from-teal-500 to-teal-800 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Become a Property Host</h3>
            <p className="text-white">
              List your property on Dubai's premier luxury stays platform
            </p>
          </div>
          <Button size="lg" className="bg-primary whitespace-nowrap" asChild>
            <Link href="/list-property">List Your Property</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
          <Link href="/" className="flex items-center space-x-2">
              <Logo variant="large" />
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Your premier destination for luxury stays in Dubai.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://www.facebook.com/share/1CXoN6G49z/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-4 w-4" />
                  <span className="sr-only">Facebook</span>
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://www.instagram.com/mybookings.ae?igsh=MWo3cG90dmtpN216Ng%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-4 w-4" />
                  <span className="sr-only">Instagram</span>
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://youtube.com/@mybookingsae?si=Khx1LuINJC7fzK5s" target="_blank" rel="noopener noreferrer">
                  <Youtube className="h-4 w-4" />
                  <span className="sr-only">YouTube</span>
                </a>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()}  Mybookings. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Button variant="link" size="sm" className="text-muted-foreground" asChild>
              <Link href="/terms">Terms</Link>
            </Button>
            <Button variant="link" size="sm" className="text-muted-foreground" asChild>
              <Link href="/privacy">Privacy</Link>
            </Button>
            <Button variant="link" size="sm" className="text-muted-foreground" asChild>
              <Link href="/cookies">Cookies</Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}

