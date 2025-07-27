import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Sarah Anderson",
    role: "Business Executive, New York",
    image: "/images/testimonial-1.jpg",
    content: "The epitome of luxury Mybookings in Dubai. Every detail was meticulously crafted for comfort and elegance. The service exceeded all expectations.",
    rating: 5,
    location: "Palm Jumeirah Villa",
    duration: "1 Month Stay"
  },
  {
    name: "Michael Chen",
    role: "International Investor, Singapore",
    image: "/images/testimonial-2.jpg",
    content: "Exceptional service and stunning properties. The team went above and beyond to ensure a perfect stay. The attention to detail is unmatched.",
    rating: 5,
    location: "Downtown Dubai Penthouse",
    duration: "2 Week Stay"
  },
  {
    name: "Elena Rodriguez",
    role: "Luxury Travel Blogger, Madrid",
    image: "/images/testimonial-3.jpg",
    content: "A truly remarkable experience. The properties are even more beautiful in person than in photos. The concierge service is world-class.",
    rating: 5,
    location: "Dubai Marina Apartment",
    duration: "3 Week Stay"
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-b from-muted/50 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Star className="w-4 h-4 mr-2" />
            Guest Experiences
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Guests Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover why discerning travelers choose our luxury accommodations
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-background p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group"
            >
              <Quote className="w-12 h-12 text-primary/10 absolute top-6 right-6" />
              <div className="flex items-center mb-6">
                <div className="relative w-20 h-20 rounded-full overflow-hidden mr-4 ring-2 ring-primary/20">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 80px) 100vw, 80px"
                    priority={index === 0}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex items-center mb-4 space-x-4">
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-primary font-medium">Verified Stay</span>
              </div>
              <p className="text-muted-foreground mb-4 italic leading-relaxed">"{testimonial.content}"</p>
              <div className="pt-4 border-t border-muted">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-foreground">{testimonial.location}</span>
                  <span className="text-primary">{testimonial.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-muted/30 p-6 rounded-xl max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-4 text-muted-foreground">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="ml-2 font-medium">4.9 average rating</span>
            </div>
            <span className="text-primary/30">•</span>
            <span>Over 10,000 verified reviews</span>
            <span className="text-primary/30">•</span>
            <span>Trusted by luxury travelers</span>
          </div>
        </div>
      </div>
    </section>
  );
} 