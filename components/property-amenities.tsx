import { PocketIcon as Pool, Dumbbell, Shield, Home, Tv, Wifi, Car, Coffee, TreePine, Headphones } from 'lucide-react'

interface Amenity {
  name: string
  category: string
}

interface PropertyAmenitiesProps {
  amenities: Amenity[]
}

const categoryIcons = {
  Outdoor: TreePine,
  Fitness: Dumbbell,
  Safety: Shield,
  Technology: Wifi,
  Views: Home,
  Parking: Car,
  Entertainment: Headphones,
  Services: Coffee,
}

export function PropertyAmenities({ amenities }: PropertyAmenitiesProps) {
  // Group amenities by category
  const groupedAmenities = amenities.reduce((acc, amenity) => {
    if (!acc[amenity.category]) {
      acc[amenity.category] = []
    }
    acc[amenity.category].push(amenity)
    return acc
  }, {} as Record<string, Amenity[]>)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Amenities</h2>
      <div className="grid gap-6">
        {Object.entries(groupedAmenities).map(([category, items]) => (
          <div key={category}>
            <h3 className="font-semibold mb-4">{category}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {items.map((amenity) => {
                const Icon = categoryIcons[category as keyof typeof categoryIcons] || Home
                return (
                  <div key={amenity.name} className="flex items-center gap-2">
                    <Icon className="w-5 h-5 text-primary" />
                    <span>{amenity.name}</span>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

