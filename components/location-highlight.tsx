import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MapPin } from 'lucide-react'

const locations = [
  {
    name: "Downtown Dubai",
    properties: 150,
    image: "https://images.unsplash.com/photo-1546412414-e1885259563a?w=800&h=600&q=80",
  },
  {
    name: "Palm Jumeirah",
    properties: 120,
    image: "https://www.agbi.com/tachyon/2024/09/Palm-Jumeirah-scaled.jpg",
  },
  {
    name: "Dubai Marina",
    properties: 200,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&q=80",
  },
  {
    name: "Business Bay",
    properties: 180,
    image: "https://images.unsplash.com/photo-1533395427226-788cee25cc7b?w=800&h=600&q=80",
  },
]

export function LocationHighlight() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-background">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Prime Locations
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Explore Dubai's most prestigious neighborhoods
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {locations.map((location) => (
            <div
              key={location.name}
              className="group relative overflow-hidden rounded-xl aspect-[4/5]"
            >
              <Image
                src={location.image}
                alt={location.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 text-white">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{location.name}</h3>
                <div className="flex items-center gap-2 text-white/80">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm sm:text-base">{location.properties} properties</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

