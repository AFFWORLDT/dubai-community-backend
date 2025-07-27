import { Card, CardContent } from "@/components/ui/card"
import { BadgePercent, Shield, Users, Wallet, Clock, HeartHandshake } from 'lucide-react'

const benefits = [
  {
    icon: BadgePercent,
    title: "Competitive Commission",
    description: "Earn more with our industry-leading commission structure",
  },
  {
    icon: Shield,
    title: "Property Protection",
    description: "Comprehensive insurance and damage protection",
  },
  {
    icon: Users,
    title: "Quality Guests",
    description: "Verified guests and thorough screening process",
  },
  {
    icon: Wallet,
    title: "Secure Payments",
    description: "Guaranteed payments and transparent pricing",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock assistance for you and your guests",
  },
  {
    icon: HeartHandshake,
    title: "Personal Account Manager",
    description: "Dedicated support for your property",
  },
]

export function PropertyBenefits() {
  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Why List With Us</h2>
        <p className="text-muted-foreground text-lg">
          Join thousands of successful property owners who trust ComsosLiving
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

