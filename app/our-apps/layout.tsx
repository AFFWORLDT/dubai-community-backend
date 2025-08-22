import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Apps & Social Media - MyBookings.ae',
  description: 'Download MyBookings.ae mobile apps for iOS and Android. Connect with us on Facebook, Instagram, TikTok, and YouTube for luxury property updates.',
  keywords: 'MyBookings, Dubai, luxury properties, mobile app, iOS, Android, social media, Facebook, Instagram, TikTok, YouTube',
  openGraph: {
    title: 'Our Apps & Social Media - MyBookings.ae',
    description: 'Download our mobile apps and connect with us on social media for the ultimate luxury booking experience in Dubai.',
    type: 'website',
    locale: 'en_US',
    siteName: 'MyBookings.ae',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Apps & Social Media - MyBookings.ae',
    description: 'Download our mobile apps and connect with us on social media for the ultimate luxury booking experience in Dubai.',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
}

export default function OurAppsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
