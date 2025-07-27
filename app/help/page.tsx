import { Metadata } from "next"
import { HelpCenter } from "@/components/help/help-center"

export const metadata: Metadata = {
  title: "Help Center",
  description: "Get help and support for your  Mybookings experience",
}

export default function HelpPage() {
  return <HelpCenter />
}

