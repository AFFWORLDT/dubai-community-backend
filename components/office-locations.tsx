"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail } from 'lucide-react'

const offices = [
  {
    city: "Dubai",
    address: "Office 118, Building Al Attar Business Centre, Al Barsha, beside ibis hotel, al barsha 1, Dubai,",
    email: "hello@MybookingsMybookings.ae",
  },
  // {
  //   city: "Abu Dhabi",
  //   address: "Al Maryah Island, Abu Dhabi Global Market Square",
  //   phone: "+971 2 123 4567",
  //   email: "abudhabi@ Mybookings.com",
  //   image: "/placeholder.svg?height=200&width=300",
  // },
  // {
  //   city: "Sharjah",
  //   address: "Al Majaz Waterfront, Corniche Street",
  //   phone: "+971 6 123 4567",
  //   email: "sharjah@ Mybookings.com",
  //   image: "/placeholder.svg?height=200&width=300",
  // },
]

export function OfficeLocations() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Our Offices</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Visit us at any of our locations across the UAE
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offices.map((office, index) => (
          <motion.div
            key={office.city}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="./../assets/logo.png"
                  alt={office.city}
                  fill
                  className="object-contain"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">{office.city}</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-primary" />
                    <p className="text-sm text-muted-foreground">{office.address}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-primary" />
                    <a href="tel:+971509677988" className="text-primary font-medium"> ‪+971 56 635 4324‬</a>
                    </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-primary" />
                    <p className="text-sm text-muted-foreground">{office.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

