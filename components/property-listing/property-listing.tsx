import { PropertyBenefits } from "./property-benefits"
import { ListingProcess } from "./listing-process"
import { PropertyRequirements } from "./property-requirements"
import { HostTestimonials } from "./host-testimonials"
import { ListingFAQ } from "./listing-faq"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function PropertyListing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://videos.pexels.com/videos/aerial-view-of-dubai-city-3661216" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center space-y-4 px-4 text-white">
          <Badge className="mb-4">Property Partners</Badge>
          <h1 className="text-4xl md:text-6xl font-bold">List Your Property With Us</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Join Dubai's premier luxury accommodation platform
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Button size="lg" variant="default" className="bg-primary">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:text-white">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container">
          <PropertyBenefits />
        </div>
      </section>

      {/* Listing Process */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <ListingProcess />
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20">
        <div className="container">
          <PropertyRequirements />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <HostTestimonials />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container">
          <ListingFAQ />
        </div>
      </section>
    </div>
  )
}

