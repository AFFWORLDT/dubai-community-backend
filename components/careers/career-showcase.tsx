import { JobListings } from "@/components/careers/job-listings"
import { CompanyCulture } from "@/components/careers/company-culture"
import { CareerBenefits } from "@/components/careers/career-benefits"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function CareerShowcase() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-background" />
        <div className="relative z-10 text-center space-y-4 px-4 max-w-4xl mx-auto">
          <Badge className="mb-4">We're Hiring</Badge>
          <h1 className="text-4xl md:text-6xl font-bold">Join Our Team</h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Help us revolutionize the luxury stay experience in Dubai
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Button size="lg" asChild>
              <a href="#positions">View Positions</a>
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Company Culture */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <CompanyCulture />
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container">
          <CareerBenefits />
        </div>
      </section>

      {/* Job Listings */}
      <section id="positions" className="py-20 bg-muted/50">
        <div className="container">
          <JobListings />
        </div>
      </section>
    </div>
  )
}

