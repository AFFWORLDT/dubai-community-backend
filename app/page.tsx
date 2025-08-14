import { HeroSection } from "@/components/hero-section"
import { FeaturedProperties } from "@/components/featured-properties"
import { ExperienceShowcase } from "@/components/experience-showcase"
import { LocationHighlight } from "@/components/location-highlight"
import { LuxuryServices } from "@/components/luxury-services"
import { AwardsShowcase } from "@/components/awards-showcase"
import { WorldwideRecognition } from "@/components/worldwide-recognition"
import { WhatsAppAssistant } from "@/components/ai-assistant"
import { Testimonials } from "./components/testimonials"
import { Amenities } from "./components/amenities"
import { BookingSearchBar } from "@/components/booking-search-bar"

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      {/* <BookingSearchBar /> */}
      <FeaturedProperties />
      <ExperienceShowcase />
      <Amenities />
      <Testimonials />
      <AwardsShowcase />
      <LocationHighlight />
      <WorldwideRecognition />
      <LuxuryServices />
      {/* <WhatsAppAssistant /> */}
    </main>
  )
}

