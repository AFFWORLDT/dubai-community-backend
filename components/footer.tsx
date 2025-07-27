import Link from "next/link"
import { Building2, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const footerLinks = {
  company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
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
  ],
}

export function Footer() {
  return (
    <footer className="border-t bg-background w-full">
      <div className=" px-4 py-12">
        {/* Property Host CTA */}
        <div className="mb-12 p-6  bg-gradient-to-r from-teal-500 to-teal-800 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
          <Link href="/" className="flex items-center space-x-2">
              <img
                src="./../assets/logo.png"
                className="w-40 sm:w-56 h-8 sm:h-12 object-contain"
                alt="ComsosMybookings Logo"
              />
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Your premier destination for luxury stays in Dubai.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Twitter</span>
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-4 w-4" />
                  <span className="sr-only">Facebook</span>
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://www.instagram.com/MybookingsMybookingsdubai/" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-4 w-4" />
                  <span className="sr-only">Instagram</span>
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">LinkedIn</span>
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
            © {new Date().getFullYear()} ComsosMybookings. All rights reserved.
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

