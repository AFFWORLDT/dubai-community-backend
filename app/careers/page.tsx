import { Metadata } from "next"
import { CareerShowcase } from "@/components/careers/career-showcase"

export const metadata: Metadata = {
  title: "Careers | ComsosMybookings",
  description: "Join our team and help shape the future of luxury stays in Dubai",
}

export default function CareersPage() {
  return <CareerShowcase />
}

