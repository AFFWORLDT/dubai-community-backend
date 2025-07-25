import { Shield, Clock, Users, Star, Gift, Phone } from 'lucide-react'

const services = [
  {
    icon: Shield,
    title: "Verified Properties",
    description: "Every property is thoroughly vetted for quality and authenticity",
  },
  {
    icon: Clock,
    title: "24/7 Concierge",
    description: "Round-the-clock support for all your needs",
  },
  {
    icon: Users,
    title: "Personal Host",
    description: "Dedicated host for a seamless stay experience",
  },
  {
    icon: Star,
    title: "Premium Amenities",
    description: "Luxury amenities and services in every property",
  },
  {
    icon: Gift,
    title: "Special Perks",
    description: "Exclusive benefits for our valued guests",
  },
  {
    icon: Phone,
    title: "Priority Support",
    description: "VIP assistance throughout your stay",
  },
]

export function LuxuryServices() {
  return (
    <section className="py-24 bg-muted/50">
      <div className=" px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Luxury Services
          </h2>
          <p className="text-muted-foreground text-lg">
            Experience unparalleled service and attention to detail
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className="p-6 rounded-xl bg-background/50 backdrop-blur-xl border border-muted"
              >
                <Icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

