import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Award, Star, Globe2 } from 'lucide-react'

const awards = [
  {
    title: "Best Luxury Booking Platform",
    organization: "World Travel Awards",
    year: "2024",
    icon: Trophy,
    description: "Recognition for exceptional luxury travel experiences",
    image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&h=400&q=80",
  },
  {
    title: "Excellence in Customer Service",
    organization: "International Travel Awards",
    year: "2024",
    icon: Award,
    description: "Highest rated customer satisfaction in luxury accommodations",
    image: "https://images.unsplash.com/photo-1617440168937-c6497eaa8db5?w=800&h=400&q=80",
  },
  {
    title: "Top Luxury Marketplace",
    organization: "Forbes Travel Guide",
    year: "2024",
    icon: Star,
    description: "Leading platform for premium travel experiences",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=400&q=80",
  },
  {
    title: "Global Excellence Award",
    organization: "Luxury Travel Guide",
    year: "2024",
    icon: Globe2,
    description: "Setting worldwide standards in luxury travel",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=400&q=80",
  },
]

export function AwardsShowcase() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-background via-muted/50 to-background">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Award-Winning Excellence
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Recognized globally for setting new standards in luxury travel
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {awards.map((award) => {
            const Icon = award.icon
            return (
              <Card key={award.title} className="group hover:shadow-lg transition-all duration-300 bg-background/50 backdrop-blur-sm border-primary/10">
                <CardContent className="p-4 sm:p-6 text-center space-y-3 sm:space-y-4">
                  <div className="relative h-16 sm:h-20 mb-4 sm:mb-6">
                    <Image
                      src={award.image}
                      alt={award.organization}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <Icon className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-primary" />
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg mb-1">{award.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                      {award.organization}
                    </p>
                    <span className="inline-block px-2 sm:px-3 py-1 rounded-full text-xs bg-primary/10 text-primary">
                      {award.year}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {award.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

