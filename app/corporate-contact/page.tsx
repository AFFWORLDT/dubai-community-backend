"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, HelpCircle, Building2, Users, Briefcase, FileText, MessageSquare, Shield } from "lucide-react"

export default function CorporateContactPage() {
  const contactCategories = [
    {
      title: "Need help with a booking?",
      links: [
        { text: "Visit my Bookings page", href: "/order", icon: HelpCircle }
      ]
    },
    {
      title: "Are you a property needing help?",
      links: [
        { text: "Contact Partner Support", href: "/contact", icon: Building2 },
        { text: "Visit Partner Community", href: "/help", icon: Users }
      ]
    },
    {
      title: "Want legal information about My Bookings?",
      links: [
        { text: "Here's the necessary details", href: "/terms", icon: FileText }
      ]
    },
    {
      title: "Do you have a question?",
      links: [
        { text: "Go to our Help Center", href: "/help", icon: HelpCircle }
      ]
    },
    {
      title: "Questions about My Bookings for Business?",
      links: [
        { text: "Read more about our service", href: "/about", icon: Building2 }
      ]
    },
    {
      title: "Are you from the press?",
      links: [
        { text: "Visit our Press Centre", href: "/press", icon: MessageSquare }
      ]
    },
    {
      title: "Do you represent a public authority?",
      links: [
        { text: "Submit an official request", href: "/contact", icon: Shield }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Corporate Contact
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find the right contact information for your specific inquiry
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {contactCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-foreground">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {category.links.map((link, linkIndex) => {
                    const IconComponent = link.icon
                    return (
                      <Link key={linkIndex} href={link.href}>
                        <Button
                          variant="link"
                          className="p-0 h-auto text-blue-600 hover:text-blue-800 font-medium text-left"
                        >
                          <IconComponent className="w-4 h-4 mr-2" />
                          {link.text}
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </Button>
                      </Link>
                    )
                  })}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground">
                General Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-medium text-foreground">Email</h3>
                <p className="text-muted-foreground">info@mybookings.ae</p>
              </div>
              <div className="space-y-3">
                <h3 className="font-medium text-foreground">Phone</h3>
                <p className="text-muted-foreground">+971 56 635 4324</p>
              </div>
              <div className="space-y-3">
                <h3 className="font-medium text-foreground">Address</h3>
                <p className="text-muted-foreground">
                  2/137 Great Eastern Highway, Rivervale. 6103, Western Australia
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-medium text-foreground">Business Hours</h3>
                <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
} 