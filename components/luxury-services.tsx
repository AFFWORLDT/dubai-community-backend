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
    <section className="py-12 sm:py-16 md:py-24 bg-muted/50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Luxury Services
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Experience unparalleled service and attention to detail
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className="p-4 sm:p-6 rounded-xl bg-background/50 backdrop-blur-xl border border-muted"
              >
                <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm sm:text-base">{service.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

