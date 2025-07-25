"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from 'lucide-react'

export function ListingsMap() {
  const [selectedListing, setSelectedListing] = useState<number | null>(null)

  return (
    <div className="relative w-full h-full bg-muted">
      <Image
        src="/placeholder.svg?height=1080&width=1920"
        alt="Map"
        fill
        className="object-cover"
      />
      {/* Map Markers */}
      <div className="absolute left-[20%] top-[30%]">
        <MapMarker
          price={1200}
          selected={selectedListing === 1}
          onClick={() => setSelectedListing(1)}
        />
      </div>
      <div className="absolute left-[40%] top-[50%]">
        <MapMarker
          price={2500}
          selected={selectedListing === 2}
          onClick={() => setSelectedListing(2)}
        />
      </div>
      <div className="absolute left-[60%] top-[40%]">
        <MapMarker
          price={800}
          selected={selectedListing === 3}
          onClick={() => setSelectedListing(3)}
        />
      </div>
      {/* Selected Listing Card */}
      {selectedListing && (
        <Card className="absolute bottom-4 left-4 w-80">
          <CardContent className="p-4">
            <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&q=80"
                alt="Selected property"
                fill
                className="object-cover"
              />
              <Badge className="absolute top-2 left-2">Penthouse</Badge>
            </div>
            <h3 className="font-semibold">Luxury Penthouse with Burj Khalifa View</h3>
            <p className="text-sm text-muted-foreground">Downtown Dubai</p>
            <div className="flex items-center gap-2 mt-2 text-sm">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span>4.9</span>
              <span className="text-muted-foreground">(128 reviews)</span>
            </div>
            <div className="mt-2">
              <span className="font-semibold">$1,200</span>
              <span className="text-muted-foreground"> /night</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function MapMarker({
  price,
  selected,
  onClick,
}: {
  price: number
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`
        transform -translate-x-1/2 -translate-y-1/2
        px-3 py-1 rounded-full
        ${
          selected
            ? "bg-primary text-primary-foreground scale-110"
            : "bg-background text-foreground hover:scale-105"
        }
        shadow-lg transition-all duration-200
        font-semibold
      `}
    >
      ${price}
    </button>
  )
}

