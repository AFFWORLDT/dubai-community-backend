import { Metadata } from "next"
import { CancellationPolicy } from "@/components/cancellation/cancellation-policy"

export const metadata: Metadata = {
  title: "Cancellation Policy",
  description: "Learn about Primevista Holidayhomes cancellation policies and refund process",
}

export default function CancellationPage() {
  return <CancellationPolicy />
}

