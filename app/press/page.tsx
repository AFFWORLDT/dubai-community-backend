import { Suspense } from "react"
import { Metadata } from "next"
import { PressHero } from "@/components/press/press-hero"
import { FeaturedArticle } from "@/components/press/featured-article"
import { StatsShowcase } from "@/components/press/stats-showcase"
import { PressReleases } from "@/components/press/press-releases"
import { MediaKit } from "@/components/press/media-kit"
import { PressContacts } from "@/components/press/press-contacts"
import { LoadingCard } from "@/components/loading-card"
import { ErrorBoundary } from "@/components/error-boundary"

export const metadata: Metadata = {
  title: "Press & Media | ComsosLiving",
  description: "Latest news, press releases, and media resources from ComsosLiving - Dubai's premier luxury stays platform",
  openGraph: {
    title: "Press & Media | ComsosLiving",
    description: "Latest news, press releases, and media resources from ComsosLiving",
    images: [
      {
        url: "/og-press.jpg",
        width: 1200,
        height: 630,
        alt: "ComsosLiving Press Room"
      }
    ]
  }
}

export default function PressPage() {
  return (
    <div className="min-h-screen bg-background">
      <ErrorBoundary>
        <Suspense fallback={<LoadingCard />}>
          <PressHero />
        </Suspense>
      </ErrorBoundary>

      <section className="py-12">
        <div className=" px-4">
          <ErrorBoundary>
            <Suspense fallback={<LoadingCard />}>
              <FeaturedArticle />
            </Suspense>
          </ErrorBoundary>
        </div>
      </section>

      <section className="py-12 bg-muted/50">
        <div className=" px-4">
          <ErrorBoundary>
            <Suspense fallback={<LoadingCard />}>
              <StatsShowcase />
            </Suspense>
          </ErrorBoundary>
        </div>
      </section>

      <ErrorBoundary>
        <Suspense fallback={<LoadingCard />}>
          <PressReleases />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<LoadingCard />}>
          <MediaKit />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<LoadingCard />}>
          {/* <NewsArchive /> */}
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<LoadingCard />}>
          <PressContacts />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

