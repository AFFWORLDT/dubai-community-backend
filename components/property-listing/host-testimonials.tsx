import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: "Property Owner",
    property: "Luxury Villa",
    image: "/placeholder.svg?height=100&width=100",
    quote: "Partnering with ComsosMybookings has been incredible. Their professional approach and attention to detail have made managing my property effortless.",
    rating: 5,
  },
  {
    name: "Property Owner",
    property: "Premium Apartment",
    image: "/placeholder.svg?height=100&width=100",
    quote: "The team at ComsosMybookings has exceeded my expectations. Their marketing efforts have significantly increased my property's visibility and bookings.",
    rating: 5,
  },
  {
    name: "Property Owner",
    property: "Penthouse Suite",
    image: "/placeholder.svg?height=100&width=100",
    quote: "The support and guidance provided by ComsosMybookings have been exceptional. They truly understand the luxury market in Dubai.",
    rating: 5,
  },
]

export function HostTestimonials() {
  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Host Testimonials</h2>
        <p className="text-muted-foreground text-lg">
          Hear from our successful property partners
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card key={index}>
            <CardContent className="pt-6 text-center">
              <div className="relative w-20 h-20 mx-auto mb-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <div className="flex justify-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4 italic">
                "{testimonial.quote}"
              </p>
              <div className="font-semibold">{testimonial.name}</div>
              <div className="text-sm text-muted-foreground">
                {testimonial.property}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

