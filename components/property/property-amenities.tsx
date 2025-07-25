"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Wifi,
  Bath,
  Car,
  TreePine,
  Mountain,
  Shield,
  Home,
  Tv,
  Briefcase,
  Waves,
  Flame,
  Heart,
  BellRing,
  Timer,
  TableIcon as TableTennis,
  Snowflake,
  WashingMachine,
  Droplets,
  ChevronRight,
} from "lucide-react"

// Amenity categories with icons
const amenityCategories = {
  "Most popular": [
    { name: "wifi", icon: Wifi },
    { name: "air_conditioning", icon: Snowflake },
    { name: "parking", icon: Car },
    { name: "swimming_pool", icon: Waves },
  ],
  Bathroom: [
    { name: "Hairdryer", icon: Home },
    { name: "Shampoo", icon: Bath },
    { name: "Conditioner", icon: Bath },
    { name: "Shower Gel", icon: Bath },
    { name: "Body Soap", icon: Bath },
  ],
  Entertainment: [
    { name: "Tv", icon: Tv },
    { name: "Ping Pong Table", icon: TableTennis },
  ],
  Safety: [
    { name: "Smoke Alarm", icon: Shield },
    { name: "Fire Extinguisher", icon: Flame },
    { name: "First Aid Kit", icon: Heart },
  ],
  "Outdoor & Views": [
    { name: "Garden View", icon: TreePine },
    { name: "Mountain View", icon: Mountain },
  ],
  Workspace: [{ name: "Dedicated Workspace", icon: Briefcase }],
  Services: [
    { name: "Host Greets You", icon: BellRing },
    { name: "Long Term Stays Allowed", icon: Timer },
    { name: "Washer", icon: WashingMachine },
    { name: "Hot Water", icon: Droplets },
  ],
}

interface PropertyAmenitiesProps {
  amenities: string[]
}

export function PropertyAmenities({ amenities }: PropertyAmenitiesProps) {
  const [isOpen, setIsOpen] = useState(false)

  if (!amenities || amenities.length === 0) {
    return null
  }

  // Group amenities by category
  const groupedAmenities = Object.entries(amenityCategories).reduce(
    (acc, [category, categoryAmenities]) => {
      const matchingAmenities = categoryAmenities.filter(
        (amenity) => amenities.includes(amenity.name.toLowerCase()) || amenities.includes(amenity.name),
      )
      if (matchingAmenities.length > 0) {
        acc[category] = matchingAmenities
      }
      return acc
    },
    {} as Record<string, (typeof amenityCategories)[keyof typeof amenityCategories]>,
  )

  if (Object.keys(groupedAmenities).length === 0) {
    return null
  }

  // Get all available amenities in a flat array
  const allAvailableAmenities = Object.values(groupedAmenities).flat()

  // Take first 6 amenities for preview regardless of category
  const previewAmenities = allAvailableAmenities.slice(0, 6)
  const totalAmenities = allAvailableAmenities.length

  return (
    <section className="py-8">
      <h2 className="text-2xl font-semibold mb-8">What this place offers</h2>

      {/* Preview Section - Now using a single grid for all preview amenities */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {previewAmenities.map((amenity, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 group"
            >
              <div className="p-1">
                <amenity.icon className="w-6 h-6 text-foreground" />
              </div>
              <span className="text-base">{amenity.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Show All Button */}
      {totalAmenities > 6 && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="rounded-lg h-14 text-base font-medium w-full justify-between hover:border-foreground transition-colors"
            >
              Show all {totalAmenities} amenities
              <ChevronRight className="w-5 h-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl h-[90vh]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold">All amenities</DialogTitle>
            </DialogHeader>
            <div className="overflow-y-auto pr-6 -mr-6">
              <div className="space-y-8 py-4">
                {Object.entries(groupedAmenities).map(([category, items]) => (
                  <div key={category}>
                    <h3 className="text-xl font-semibold mb-6">{category}</h3>
                    <div className="grid gap-y-6">
                      {items.map((amenity, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-center gap-4"
                        >
                          <div className="p-1">
                            <amenity.icon className="w-6 h-6 text-foreground" />
                          </div>
                          <span className="text-base">{amenity.name}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  )
}

