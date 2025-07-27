"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { PremiumCard } from "@/components/ui/premium-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from 'lucide-react'

const pressReleases = [
  {
    id: 1,
    title: " Mybookings Announces Record Growth in Luxury Property Listings",
    date: "January 5, 2025",
    category: "Company News",
    excerpt: " Mybookings sees 200% year-over-year growth in premium property listings, solidifying its position as Dubai's leading luxury stays platform.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    title: "New Partnership with Dubai Tourism Board Announced",
    date: "December 15, 2024",
    category: "Partnerships",
    excerpt: "Strategic partnership aims to promote Dubai's luxury accommodation sector and enhance tourist experiences.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    title: " Mybookings Launches Sustainable Tourism Initiative",
    date: "December 1, 2024",
    category: "Sustainability",
    excerpt: "New program focuses on promoting eco-friendly practices in luxury accommodations across Dubai.",
    image: "/placeholder.svg?height=400&width=600",
  },
]

export function PressReleases() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section className="py-24 bg-muted/50">
      <div className=" px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold">Latest Press Releases</h2>
            <Button variant="outline">View All</Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pressReleases.map((release, index) => (
              <div key={release.id} >
                <PremiumCard
                  variant={index === 0 ? "gold" : "silver"}
                  className="h-full"
                  onMouseEnter={() => setHoveredId(release.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={release.image}
                      alt={release.title}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-4 left-4">
                      {release.category}
                    </Badge>
                  </div>
                  <div className="p-6 space-y-4">
                    <time className="text-sm text-muted-foreground">
                      {release.date}
                    </time>
                    <h3 className="text-xl font-semibold line-clamp-2">
                      {release.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-3">
                      {release.excerpt}
                    </p>
                    <motion.div
                      animate={{
                        x: hoveredId === release.id ? 5 : 0,
                      }}
                      className="flex items-center text-primary"
                    >
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </motion.div>
                  </div>
                </PremiumCard>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

