"use client"

import { motion } from "framer-motion"
import { MapPin } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PropertyLocationProps {
  address: string
  coordinates: {
    lat: number
    lng: number
  }
  nearby: Array<{
    name: string
    distance: string
  }>
}

export function PropertyLocation({ address, coordinates, nearby }: PropertyLocationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-xl font-semibold mb-4">Location</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <MapPin className="w-5 h-5 text-primary mt-1" />
            <span>{address}</span>
          </div>
          <div className="aspect-[16/9] relative rounded-lg overflow-hidden bg-muted">
            {/* Map would go here - using placeholder for now */}
            <div className="absolute inset-0 opacity-50 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/55.2708,25.2048,12/800x400@2x?access_token=YOUR_MAPBOX_TOKEN')] bg-cover bg-center" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                <MapPin className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Nearby Places</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {nearby?.map((place) => (
            <Card key={place?.name}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{place?.name}</span>
                  <span className="text-sm text-muted-foreground">{place?.distance}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

