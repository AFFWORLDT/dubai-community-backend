import { Metadata } from "next"
import { SafetyInformation } from "@/components/safety/safety-information"

export const metadata: Metadata = {
  title: "Safety Information",
  description: "Safety guidelines and emergency information for  Mybookings guests",
}

export default function SafetyPage() {
  return <SafetyInformation />
}

