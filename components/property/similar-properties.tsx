"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { cn } from "@/lib/utils"

const similarProperties = [
  {
    id: "luxury-penthouse-2",
    title: "Modern Penthouse with Pool",
    location: "Dubai Marina",
    price: 1500,
    rating: 4.8,
    reviews: 96,
    image: "/placeholder.svg?height=400&width=600",
    badge: "Premium Plus",
  },
  {
    id: "luxury-penthouse-3",
    title: "Luxury Villa with Beach Access",
    location: "Palm Jumeirah",
    price: 2000,
    rating: 4.9,
    reviews: 124,
    image: "/placeholder.svg?height=400&width=600",
    badge: "Premium Plus",
  },
  {
    id: "luxury-penthouse-4",
    title: "Sky Villa with Private Pool",
    location: "Downtown Dubai",
    price:1800,
    rating: 4.7,
    reviews: 82,
    image: "/placeholder.svg?height=400&width=600",
    badge: "Premium Plus",
  },
]

interface SimilarPropertiesProps {
  currentId: string
}

export function SimilarProperties({ currentId }: SimilarPropertiesProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef
      const scrollAmount = direction === "left" ? -current.offsetWidth : current.offsetWidth
      current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-12"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Similar Properties</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-4"
      >
        {similarProperties
          .filter(property => property.id !== currentId)
          .map((property) => (
            <Card
              key={property.id}
              className={cn(
                "flex-shrink-0 w-[300px]",
                "hover:shadow-lg transition-shadow duration-200"
              )}
            >
              <Link href={`/listings/${property.id}`}>
                <div className="relative aspect-[4/3]">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                  <Badge
                    className="absolute top-4 left-4 bg-primary/90"
                  >
                    {property.badge}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-1">{property.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{property.location}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      <span className="text-sm font-medium">{property.rating}</span>
                      <span className="text-sm text-muted-foreground">
                        ({property.reviews})
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold">${property.price}</span>
                      <span className="text-sm text-muted-foreground"> /night</span>
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
      </div>
    </motion.div>
  )
}

