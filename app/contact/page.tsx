import { Metadata } from "next"
import { ContactForm } from "@/components/contact-form"
import { OfficeLocations } from "@/components/office-locations"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Clock, Mail, MessageSquare, Phone } from 'lucide-react'


export default function ContactPage() {
  return (
    <div className="px-8  py-32 w-full">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Contact Information */}
        <div className="space-y-6">
          <div>
            <Badge className="mb-4">Contact Us</Badge>
            <h1 className="text-3xl font-bold mb-4">Get in Touch</h1>
            <p className="text-muted-foreground text-lg">
              Our team is here to help you with any questions or concerns about your luxury stay in Dubai.
            </p>
          </div>

          <div className="grid gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Phone Support</h3>
                <p className="text-muted-foreground">24/7 Concierge Service</p>
                <a href="tel:+971555067557" className="text-primary font-medium">+971 55 506 7557</a>
                </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-muted-foreground">Response within 24 hours</p>
                <a href="mailto:Operations@Mybookings.com" className="text-primary font-medium">Operations@Mybookings.com</a>
                </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Live Chat</h3>
                <p className="text-muted-foreground">Available 24/7</p>
                <p className="text-primary font-medium">Start a conversation</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Office Hours</h3>
                <p className="text-muted-foreground">Sunday - Thursday</p>
                <p className="text-primary font-medium">9:00 AM - 6:00 PM GST</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <ContactForm />
      </div>

      <Separator className="my-16" />

      {/* Office Locations */}
      <OfficeLocations />
    </div>
  )
}

