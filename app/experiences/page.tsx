import { Metadata } from "next"
import { ExperienceShowcase } from "@/components/experiences/experience-showcase"

export const metadata: Metadata = {
  title: "Luxury Experiences | ComsosMybookings",
  description: "Discover and book exclusive experiences in Dubai",
}

export default function ExperiencesPage() {
  return <ExperienceShowcase />
}

