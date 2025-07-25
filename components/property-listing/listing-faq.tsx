import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What are the fees for listing my property?",
    answer: "We operate on a commission-based model, taking a percentage of the booking revenue. The exact percentage depends on your property type and location. Contact us for detailed pricing.",
  },
  {
    question: "How long does the listing process take?",
    answer: "The typical listing process takes 5-7 business days, including property review, photography, and verification. Once approved, your property can start accepting bookings immediately.",
  },
  {
    question: "Do you provide photography services?",
    answer: "Yes, we provide professional photography services as part of our listing package to ensure your property is showcased in the best possible way.",
  },
  {
    question: "How do you screen guests?",
    answer: "We have a comprehensive screening process that includes identity verification, previous booking history review, and secure payment verification to ensure quality guests.",
  },
  {
    question: "What support do you provide hosts?",
    answer: "We provide 24/7 support, a dedicated account manager, handling of guest communications, booking management, and professional cleaning services coordination.",
  },
]

export function ListingFAQ() {
  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-muted-foreground text-lg">
          Find answers to common questions about listing your property
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}

