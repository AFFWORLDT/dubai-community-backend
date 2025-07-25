"use client"

import { useEffect, useRef } from "react"
import { MapPin } from 'lucide-react'

interface PropertyMapProps {
  address: string
  coordinates: {
    lat: number
    lng: number
  }
}

export function PropertyMap({ address, coordinates }: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // In a real app, initialize your map library here (Google Maps, Mapbox, etc.)
    // For now, we'll show a placeholder with the coordinates
  }, [coordinates])

  return (
    <div className="space-y-2">
      <div className="flex items-start gap-2 text-sm">
        <MapPin className="w-4 h-4 text-primary mt-1" />
        <span>{address}</span>
      </div>
      <div
        ref={mapRef}
        className="w-full h-[400px] rounded-lg bg-muted relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-50 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/55.2708,25.2048,12/800x400@2x?access_token=YOUR_MAPBOX_TOKEN')] bg-cover bg-center" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
            <MapPin className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  )
}

