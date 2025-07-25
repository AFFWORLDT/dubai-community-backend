import { Card, CardContent } from "@/components/ui/card"
import { Plane, Heart, GraduationCap, Coffee, Gem, Laptop } from 'lucide-react'

const benefits = [
  {
    icon: Plane,
    title: "Travel Benefits",
    description: "Exclusive travel perks and discounts on stays",
  },
  {
    icon: Heart,
    title: "Health Insurance",
    description: "Comprehensive health and dental coverage",
  },
  {
    icon: GraduationCap,
    title: "Learning & Development",
    description: "Professional development opportunities",
  },
  {
    icon: Coffee,
    title: "Work-Life Balance",
    description: "Flexible working hours and remote options",
  },
  {
    icon: Gem,
    title: "Competitive Pay",
    description: "Above-market salary and equity options",
  },
  {
    icon: Laptop,
    title: "Equipment",
    description: "Latest tech and tools for your work",
  },
]

export function CareerBenefits() {
  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Benefits & Perks</h2>
        <p className="text-muted-foreground text-lg">
          We offer competitive benefits to keep you happy, healthy, and productive
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit) => {
          const Icon = benefit.icon
          return (
            <Card key={benefit.title} className="relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent" />
              <CardContent className="pt-6">
                <Icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

