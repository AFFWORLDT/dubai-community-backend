import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, Target, Lightbulb } from 'lucide-react'

const values = [
  {
    icon: Heart,
    title: "Passion",
    description: "We're passionate about creating exceptional experiences",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We work together to achieve extraordinary results",
  },
  {
    icon: Target,
    title: "Excellence",
    description: "We strive for excellence in everything we do",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We embrace innovation and creative solutions",
  },
]

export function CompanyCulture() {
  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Our Culture</h2>
        <p className="text-muted-foreground text-lg">
          Join a team that values creativity, innovation, and excellence
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative aspect-video rounded-xl overflow-hidden">
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="Team collaboration"
            fill
            className="object-cover"
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {values.map((value) => {
            const Icon = value.icon
            return (
              <Card key={value.title}>
                <CardContent className="pt-6">
                  <Icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}

