import Link from "next/link"
import { Building2, Facebook, Instagram, Youtube, Apple, Play } from 'lucide-react'
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
              <img 
                src="/images/footer.jpeg" 
                alt="MyBookings Logo" 
                className="h-12 w-auto"
              />
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
              <Button variant="ghost" size="icon" asChild>
                <a href="https://apps.apple.com/in/app/mybookings-ae/id6749492256" target="_blank" rel="noopener noreferrer">
                  <Apple className="h-4 w-4" />
                  <span className="sr-only">App Store</span>
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://play.google.com/store/apps/details?id=com.mybookings.app&pcampaignid=web_share" target="_blank" rel="noopener noreferrer">
                  <Play className="h-4 w-4" />
                  <span className="sr-only">Google Play</span>
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://whatsapp.com/channel/0029Vb1ikGr60eBYyzypyj3p" target="_blank" rel="noopener noreferrer">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  <span className="sr-only">WhatsApp Channel</span>
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

