import { Metadata } from "next"
import { Inter } from 'next/font/google'
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { ChatButton } from "@/components/chat/chat-button"
import { ChatNotification } from "@/components/chat/chat-notification"
import { ChatProvider } from "@/components/chat/chat-context"
import { GmailRedirectHandler } from "@/components/GmailRedirectHandler"
import "./globals.css"
import QueryProvider from "@/Providers/querry-provider"
import { GoogleOAuthProvider } from '@react-oauth/google'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: " Mybookings - Luxury Stays in Dubai",
    template: "%s |  Mybookings"
  },
  description: "Find and book luxury stays in Dubai with AI-powered recommendations",
  keywords: ["Dubai", "Luxury", "Accommodation", "Booking", "Travel", "Vacation Rentals"],
  authors: [{ name: " Mybookings" }],
  creator: " Mybookings",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https:// mybookings.ae",
    title: " Mybookings - Luxury Stays in Dubai",
    description: "Find and book luxury stays in Dubai with AI-powered recommendations",
    siteName: " Mybookings",
  },
  twitter: {
    card: "summary_large_image",
    title: " Mybookings - Luxury Stays in Dubai",
    description: "Find and book luxury stays in Dubai with AI-powered recommendations",
    creator: "@ Mybookings",
  },
  icons: {
    icon: "/favicon.ico",
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
       <GoogleOAuthProvider clientId="85619322786-so039or9l7dfqovbfcmlkc99vant0o9p.apps.googleusercontent.com">
         <QueryProvider>
         <Toaster />
         <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ChatProvider>
              <GmailRedirectHandler>
                <div className="flex min-h-screen flex-col bg-background text-foreground">
                  <Navbar />
                  <main className="flex-1">{children}</main>
                  <Footer />
                  <ChatButton />
                  <ChatNotification />
                </div>
              </GmailRedirectHandler>
            </ChatProvider>
            {/* <Toaster richColors closeButton position="top-center" /> */}
          </ThemeProvider>
         </QueryProvider>
       </GoogleOAuthProvider>
      </body>
    </html>
  )
}

