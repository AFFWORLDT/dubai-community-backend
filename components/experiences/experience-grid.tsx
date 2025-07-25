import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Star, Users } from 'lucide-react'

interface ExperienceGridProps {
  category: string
  priceRange: number[]
  selectedDate?: Date
}

const experiences = [
  {
    id: 1,
    title: "Desert Safari & BBQ Dinner",
    description: "Experience the thrill of dune bashing followed by a traditional BBQ dinner",
    price: 150,
    duration: "6 hours",
    rating: 4.9,
    reviews: 128,
    category: "adventure",
    image: "/placeholder.svg?height=400&width=600",
    maxParticipants: 6,
  },
  {
    id: 2,
    title: "Yacht Tour Dubai Marina",
    description: "Luxury yacht tour around Dubai Marina and Palm Jumeirah",
    price: 299,
    duration: "3 hours",
    rating: 4.8,
    reviews: 96,
    category: "luxury",
    image: "/placeholder.svg?height=400&width=600",
    maxParticipants: 12,
  },
  {
    id: 3,
    title: "Private Chef Experience",
    description: "Exclusive dining experience with a Michelin-starred chef",
    price: 399,
    duration: "4 hours",
    rating: 5.0,
    reviews: 64,
    category: "culinary",
    image: "/placeholder.svg?height=400&width=600",
    maxParticipants: 8,
  },
  // Add more experiences...
]

export function ExperienceGrid({
  category,
  priceRange,
  selectedDate,
}: ExperienceGridProps) {
  const filteredExperiences = experiences.filter((experience) => {
    const matchesCategory = category === "all" || experience.category === category
    const matchesPrice = experience.price >= priceRange[0] && experience.price <= priceRange[1]
    return matchesCategory && matchesPrice
  })

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredExperiences.map((experience) => (
        <Card key={experience.id} className="group overflow-hidden">
          <CardHeader className="p-0">
            <div className="relative aspect-[4/3]">
              <Image
                src={experience.image}
                alt={experience.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <Badge className="absolute top-4 right-4">
                Top Rated
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <h3 className="font-semibold text-xl mb-2">{experience.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {experience.description}
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {experience.duration}
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                Up to {experience.maxParticipants}
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between items-center">
            <div>
              <div className="flex items-center gap-1 mb-1">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <span className="font-medium">{experience.rating}</span>
                <span className="text-muted-foreground">
                  ({experience.reviews})
                </span>
              </div>
              <div>
                <span className="text-2xl font-bold">${experience.price}</span>
                <span className="text-muted-foreground"> /person</span>
              </div>
            </div>
            <Button asChild>
              <Link href={`/experiences/${experience.id}`}>Book Now</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

