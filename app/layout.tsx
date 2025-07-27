import { Metadata } from "next"
import { Inter } from 'next/font/google'
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from 'react-hot-toast';
import "./globals.css"
import QueryProvider from "@/Providers/querry-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "ComsosLiving - Luxury Stays in Dubai",
    template: "%s | ComsosLiving"
  },
  description: "Find and book luxury stays in Dubai with AI-powered recommendations",
  keywords: ["Dubai", "Luxury", "Accommodation", "Booking", "Travel", "Vacation Rentals"],
  authors: [{ name: "ComsosLiving" }],
  creator: "ComsosLiving",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ComsosLiving.com",
    title: "ComsosLiving - Luxury Stays in Dubai",
    description: "Find and book luxury stays in Dubai with AI-powered recommendations",
    siteName: "ComsosLiving",
  },
  twitter: {
    card: "summary_large_image",
    title: "ComsosLiving - Luxury Stays in Dubai",
    description: "Find and book luxury stays in Dubai with AI-powered recommendations",
    creator: "@ComsosLiving",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
       <QueryProvider>
       <Toaster />
       <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col bg-background text-foreground">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          {/* <Toaster richColors closeButton position="top-center" /> */}
        </ThemeProvider>
       </QueryProvider>
      </body>
    </html>
  )
}

