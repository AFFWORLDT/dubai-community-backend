 import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, DollarSign, HelpCircle } from 'lucide-react'

const policies = [
  {
    type: "Flexible",
    refund: "Full refund",
    deadline: "48 hours before check-in",
    description: "Cancel up to 48 hours before check-in for a full refund.",
    details: [
      "Full refund if cancelled 48 hours before check-in",
      "First night charged if cancelled within 48 hours",
      "Service fee non-refundable if cancelled within 48 hours",
    ],
  },
  {
    type: "Moderate",
    refund: "50% refund",
    deadline: "5 days before check-in",
    description: "Cancel up to 5 days before check-in for a 50% refund.",
    details: [
      "50% refund if cancelled 5 days before check-in",
      "No refund if cancelled within 5 days",
      "Service fee non-refundable if cancelled within 5 days",
    ],
  },
  {
    type: "Strict",
    refund: "No refund",
    deadline: "7 days before check-in",
    description: "Cancel up to 7 days before check-in for a partial refund.",
    details: [
      "50% refund if cancelled 7 days before check-in",
      "No refund if cancelled within 7 days",
      "Service fee non-refundable",
    ],
  },
]

const faqs = [
  {
    question: "How do I cancel my booking?",
    answer: "You can cancel your booking through your account dashboard. Go to 'My Bookings', select the booking you want to cancel, and click the 'Cancel Booking' button.",
  },
  {
    question: "When will I receive my refund?",
    answer: "Refunds are typically processed within 5-7 business days after cancellation. The time it takes for the refund to appear in your account depends on your payment method and financial institution.",
  },
  {
    question: "What if I need to cancel due to an emergency?",
    answer: "We understand that emergencies happen. Please contact our support team immediately, and we'll work with you to find the best solution. In certain cases, we may be able to provide additional assistance.",
  },
  {
    question: "Can I modify my booking instead of cancelling?",
    answer: "Yes, you can modify your booking dates subject to availability and any price differences. Modifications made close to the check-in date may be subject to the property's cancellation policy.",
  },
]

export function CancellationPolicy() {
  return (
    <div className=" py-10">
      <div className="px-4 py-10 mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Cancellation Policy</h1>
          <p className="text-muted-foreground text-lg">
            Understanding our cancellation policies and refund process
          </p>
        </div>

        {/* Policy Types */}
        <section className="grid gap-6">
          {policies.map((policy) => (
            <Card key={policy.type}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl">{policy.type}</CardTitle>
                    <CardDescription>{policy.description}</CardDescription>
                  </div>
                  <Badge
                    variant={
                      policy.type === "Flexible"
                        ? "default"
                        : policy.type === "Moderate"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {policy.refund}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Deadline: {policy.deadline}</span>
                  </div>
                  <ul className="space-y-2">
                    {policy.details.map((detail, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Process */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Cancellation Process</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="p-2 w-10 h-10 rounded-full bg-primary/10 text-primary mb-2">
                  <Calendar className="h-6 w-6" />
                </div>
                <CardTitle>1. Request Cancellation</CardTitle>
                <CardDescription>
                  Submit your cancellation request through your account dashboard
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="p-2 w-10 h-10 rounded-full bg-primary/10 text-primary mb-2">
                  <Clock className="h-6 w-6" />
                </div>
                <CardTitle>2. Review Policy</CardTitle>
                <CardDescription>
                  System checks applicable policy and calculates refund amount
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="p-2 w-10 h-10 rounded-full bg-primary/10 text-primary mb-2">
                  <DollarSign className="h-6 w-6" />
                </div>
                <CardTitle>3. Receive Refund</CardTitle>
                <CardDescription>
                  Refund is processed according to the applicable policy
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* FAQs */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Support */}
        <section className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">Need More Help?</h2>
          <p className="text-muted-foreground">
            Our support team is here to assist you with cancellations
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
            <Button variant="outline">
              <HelpCircle className="mr-2 h-4 w-4" />
              View Help Center
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}

