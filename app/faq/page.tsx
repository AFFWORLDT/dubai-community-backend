import { Metadata } from "next"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { NewsletterSignup } from "@/components/newsletter-signup"

export const metadata: Metadata = {
  title: "FAQ | MY Bookings",
  description: "Frequently asked questions about MY Bookings",
}

const faqs = {
  booking: [
    {
      question: "How do I make a booking?",
      answer: "You can make a booking by selecting your desired property and dates, then following the simple checkout process. We accept various payment methods and provide instant confirmation.",
    },
    {
      question: "What is your cancellation policy?",
      answer: "Our standard cancellation policy allows free cancellation up to 48 hours before check-in. However, policies may vary by property and season. Specific details are always displayed during booking.",
    },
    {
      question: "Are there any hidden fees?",
      answer: "No, we believe in transparent pricing. All fees, including cleaning fees and service charges, are clearly displayed before you complete your booking.",
    },
  ],
  payment: [
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, and digital wallets including Visa, Mastercard, American Express, Apple Pay, and Google Pay.",
    },
    {
      question: "When will I be charged?",
      answer: "A deposit of 30% is required at the time of booking. The remaining balance is due 30 days before your check-in date.",
    },
  ],
  stay: [
    {
      question: "What time is check-in and check-out?",
      answer: "Standard check-in time is 3:00 PM and check-out is 11:00 AM. Early check-in or late check-out may be available upon request.",
    },
    {
      question: "Do you provide airport transfers?",
      answer: "Yes, we can arrange luxury airport transfers for an additional fee. This service can be added during the booking process or arranged later through our concierge.",
    },
  ],
}

export default function FAQPage() {
  return (
    <div className="px-4 py-10">
      <div className="text-center mb-10">
        <Badge className="mb-4">FAQ</Badge>
        <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-muted-foreground text-lg">
          Find answers to common questions about MY Bookings
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Booking Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.booking.map((faq, index) => (
              <AccordionItem key={index} value={`booking-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <Separator />

        <div>
          <h2 className="text-xl font-semibold mb-4">Payment & Pricing</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.payment.map((faq, index) => (
              <AccordionItem key={index} value={`payment-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <Separator />

        <div>
          <h2 className="text-xl font-semibold mb-4">During Your Stay</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.stay.map((faq, index) => (
              <AccordionItem key={index} value={`stay-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      <div className="mt-16">
        <NewsletterSignup />
      </div>
    </div>
  )
}

