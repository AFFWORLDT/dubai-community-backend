import { Suspense } from "react"
import { Metadata } from "next"
import { PropertyListingForm } from "@/components/property-listing/property-listing-form"
import { PropertyBenefits } from "@/components/property-listing/property-benefits"
import { ListingProcess } from "@/components/property-listing/listing-process"
import { PropertyRequirements } from "@/components/property-listing/property-requirements"
import { HostTestimonials } from "@/components/property-listing/host-testimonials"
import { ListingFAQ } from "@/components/property-listing/listing-faq"
import { MarketStats } from "@/components/property-listing/market-stats"
import { AnimatedSection } from "@/components/property-listing/animated-section"
import { LoadingCard } from "@/components/loading-card"
import { ErrorBoundary } from "@/components/error-boundary"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"



export default function ListPropertyPage() {
  return (
    <div className="min-h-screen bg-background overflow-x-scroll">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/video-poster.jpg"
        >
          <source 
            src="./../assets/list.mp4" 
            type="video/mp4" 
          />
        </video>
        <div className="absolute inset-0 " />
        <div className=" relative z-10 px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection delay={0.2}>
              <div className="text-white space-y-6">
                <Badge className="bg-primary hover:bg-primary/90">Premium Property Partners</Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  Transform Your Property Into a Luxury Revenue Stream
                </h1>
                <p className="text-lg sm:text-xl text-white/90 max-w-xl">
                  Join Dubai's most exclusive property rental platform. We handle everything from marketing to guest services, maximizing your property's potential.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90"
                  >
                    Start Earning Now
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="text-white border-white hover:bg-white hover:text-black"
                  >
                    Calculate Revenue
                  </Button>
                </div>
                <div className="flex items-center gap-6 pt-4">
                  <div>
                    <div className="text-3xl font-bold">500+</div>
                    <div className="text-sm text-white/70">Premium Properties</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">95%</div>
                    <div className="text-sm text-white/70">Occupancy Rate</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">24/7</div>
                    <div className="text-sm text-white/70">Host Support</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            {/* <div className="overflow-y-scroll ">
              <ErrorBoundary>
                <Suspense fallback={<LoadingCard />}>
                  <PropertyListingForm />
                </Suspense>
              </ErrorBoundary>
            </div> */}
          </div>
        </div>
      </section>

      {/* <div className="lg:hidden py-12 bg-muted/50 backdrop-blur-sm">
        <div className="container px-4">
          <ErrorBoundary>
            <Suspense fallback={<LoadingCard />}>
              <PropertyListingForm />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div> */}

      {/* Market Stats */}
      <section className="py-24 bg-background">
        <div className=" px-4">
          <AnimatedSection>
            <MarketStats />
          </AnimatedSection>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-muted">
        <div className=" px-4">
          <AnimatedSection>
            <PropertyBenefits />
          </AnimatedSection>
        </div>
      </section>

      {/* Listing Process */}
      <section className="py-24 bg-background">
        <div className=" px-4">
          <AnimatedSection>
            <ListingProcess />
          </AnimatedSection>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-24 bg-muted">
        <div className=" px-4">
          <AnimatedSection>
            <PropertyRequirements />
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background">
        <div className=" px-4">
          <AnimatedSection>
            <HostTestimonials />
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-muted">
        <div className=" px-4">
          <AnimatedSection>
            <ListingFAQ />
          </AnimatedSection>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className=" px-4 text-center">
          <AnimatedSection className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Maximize Your Property's Potential?
            </h2>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Join Dubai's leading luxury property platform and start earning more from your property
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="text-primary hover:text-primary/90"
              >
                List Your Property
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
              >
                Speak to an Expert
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}

