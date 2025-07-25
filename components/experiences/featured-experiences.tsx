import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const featuredExperiences = [
  {
    id: 1,
    title: "VIP Desert Safari",
    description: "Luxury desert experience with private transport and gourmet dining",
    image: "/placeholder.svg?height=600&width=800",
    price: 499,
    badge: "Premium",
  },
  {
    id: 2,
    title: "Helicopter Tour",
    description: "Aerial tour of Dubai's iconic landmarks with champagne service",
    image: "/placeholder.svg?height=600&width=800",
    price: 799,
    badge: "Exclusive",
  },
  {
    id: 3,
    title: "Yacht Dinner Cruise",
    description: "Private yacht experience with 5-course fine dining",
    image: "/placeholder.svg?height=600&width=800",
    price: 999,
    badge: "Luxury",
  },
]

export function FeaturedExperiences() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Featured Experiences</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Discover our handpicked selection of premium experiences in Dubai
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {featuredExperiences.map((experience) => (
          <Card key={experience.id} className="group overflow-hidden">
            <div className="relative aspect-[4/3]">
              <Image
                src={experience.image}
                alt={experience.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <Badge className="absolute top-4 right-4 bg-primary/90">
                {experience.badge}
              </Badge>
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">{experience.title}</h3>
              <p className="text-muted-foreground mb-4">{experience.description}</p>
              <div className="flex items-center justify-between">
                <div className="font-semibold">
                  From ${experience.price}
                  <span className="text-muted-foreground font-normal"> /person</span>
                </div>
                <Button asChild>
                  <Link href={`/experiences/${experience.id}`}>View Details</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

