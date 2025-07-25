import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, TrendingUp, Users, Building2 } from 'lucide-react'

const statistics = [
  {
    value: "4.9/5",
    label: "Average Rating",
    icon: Star,
    description: "From verified guests worldwide",
  },
  {
    value: "#1",
    label: "Booking Platform",
    icon: TrendingUp,
    description: "For luxury stays in Dubai",
  },
  {
    value: "1M+",
    label: "Happy Guests",
    icon: Users,
    description: "From over 100 countries",
  },
  {
    value: "500+",
    label: "Premium Properties",
    icon: Building2,
    description: "Exclusively curated collection",
  },
]

const recognitions = [
  "Featured in Forbes",
  "Recommended by Condé Nast Traveler",
  "Top Pick by Luxury Travel Magazine",
  "Best of 2024 by Travel + Leisure",
  "Dubai Tourism Excellence Award",
  "Verified by Luxury Hotel Association",
]

export function WorldwideRecognition() {
  return (
    <section className="py-24 bg-muted">
      <div className=" px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4" variant="outline">Global Recognition</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Setting Global Standards in Luxury Travel
          </h2>
          <p className="text-muted-foreground text-lg">
            Trusted by millions worldwide for exceptional Dubai experiences
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {statistics.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label} className="relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent" />
                <CardContent className="pt-8 p-6 text-center">
                  <Icon className="w-8 h-8 mx-auto mb-4 text-primary" />
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="font-medium mb-2">{stat.label}</div>
                  <p className="text-sm text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {recognitions.map((recognition) => (
            <Badge
              key={recognition}
              variant="secondary"
              className="text-sm py-2 px-4 bg-background/50 backdrop-blur-sm"
            >
              {recognition}
            </Badge>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            Trusted by leading luxury hotel brands and verified by international travel associations
          </p>
        </div>
      </div>
    </section>
  )
}

