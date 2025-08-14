"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, Users, Bed, Bath, Maximize, Medal, Calendar } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

interface PropertyInfoProps {
  title: string
  location: string
  description: string
  beds: number
  baths: number
  guests: number
  size: number
  rating?: number
  reviews?: number
  isSuperhost?: boolean
  bedrooms?:any;
  propertyId: string;
  createdAt?: string;
}

export function PropertyInfo({
  title,
  location,
  description,
  beds,
  baths,
  guests,
  rating = 4.9,
  reviews = 284,
  isSuperhost = true,
  bedrooms,
  propertyId,
  createdAt
}: PropertyInfoProps) {
  const [showFullDescription, setShowFullDescription] = useState(false)

  const renderDescription = () => {
    if (showFullDescription) {
      return description
    }

    const words = description.split(" ")
    const truncated = words.slice(0, 60).join(" ")

    return words.length > 60 ? `${truncated}...` : description
  }

  const formatListingDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 max-w-3xl"
    >
      <div>
        <h1 className="text-2xl font-semibold tracking-tight mb-2">{title}</h1>
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex items-center gap-4 flex-wrap text-sm">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="font-medium">{rating}</span>
              <span className="text-muted-foreground">·</span>
              <button className="underline font-medium">{reviews} reviews</button>
              <span className="text-muted-foreground">·</span>
              <span>{location}</span>
            </div>
            {isSuperhost && (
              <>
                <span className="text-muted-foreground">·</span>
                <Badge variant="outline" className="rounded-md font-normal border-primary/20">
                  <Medal className="w-3 h-3 mr-1 text-primary" />
                  Superhost
                </Badge>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        <div className="flex items-start gap-3">
          <div>
            <div className="font-medium text-sm">{guests} Guests</div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div>
            <div className="font-medium text-sm">{beds} Room</div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div>
            <div className="font-medium text-sm">{baths} Bathrooms</div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div>
         {bedrooms>0? (<div className="font-medium text-sm"> {bedrooms} Bedroom</div>):null}
          </div>
        </div>
      </div>

      {/* Listing Date */}
      {createdAt && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>Listed on {formatListingDate(createdAt)}</span>
        </div>
      )}

      <Separator />

      <div>
        <p className="text-base leading-relaxed">{renderDescription()}</p>
        {description.split(" ").length > 60 && (
          <button
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="text-black font-medium underline mt-4 hover:opacity-80"
          >
            {showFullDescription ? "Show less" : "Show more"}
          </button>
        )}
      </div>
    </motion.div>
  )
}

