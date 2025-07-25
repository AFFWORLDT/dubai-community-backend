import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: "Alexander Williams",
    property: "Luxury Villa",
    image: "/dummy-profiles/profile1.jpg",
    propertyImage: "/dummy-properties/luxury-villa.jpg",
    quote: "Partnering with MY Bookings has been incredible. Their professional approach and attention to detail have made managing my property effortless.",
    rating: 5,
    location: "Palm Jumeirah"
  },
  {
    name: "Sophia Chen",
    property: "Premium Apartment",
    image: "/dummy-profiles/profile2.jpg",
    propertyImage: "/dummy-properties/premium-apartment.jpg",
    quote: "The team at MY Bookings has exceeded my expectations. Their marketing efforts have significantly increased my property's visibility and bookings.",
    rating: 5,
    location: "Downtown Dubai"
  },
  {
    name: "Rajan Patel",
    property: "Penthouse Suite",
    image: "/dummy-profiles/profile3.jpg",
    propertyImage: "/dummy-properties/penthouse-suite.jpg",
    quote: "The support and guidance provided by MY Bookings have been exceptional. They truly understand the luxury market in Dubai.",
    rating: 5,
    location: "Dubai Marina"
  },
]

export function HostTestimonials() {
  return (
    <div className="space-y-12">
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group">
            {/* Property Image Section */}
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={testimonial.propertyImage}
                alt={testimonial.property}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-2">
                  <div className="bg-[#2563eb] text-white text-xs font-medium px-2 py-1 rounded">
                    {testimonial.location}
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <h3 className="text-lg font-bold mt-1">{testimonial.property}</h3>
              </div>
            </div>
            
            <CardContent className="p-6 relative">
              {/* Quote Icon */}
              <div className="absolute -top-5 right-5 bg-[#2563eb] rounded-full p-2 shadow-lg">
                <Quote className="w-4 h-4 text-white" />
              </div>
              
              {/* Testimonial Content */}
              <div className="flex gap-4 items-start mb-4">
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover rounded-full border-2 border-white shadow-md"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-lg">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">Property Owner</p>
                </div>
              </div>
              
              <p className="text-muted-foreground mt-4 italic">
                "{testimonial.quote}"
              </p>
              
              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-[#2563eb]/10 flex items-center justify-center">
                    <Star className="w-4 h-4 text-[#2563eb]" />
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold">{testimonial.rating}.0</span>
                    <span className="text-muted-foreground"> average rating</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Video Section */}
      <div className="mt-20 bg-gradient-to-r from-[#2563eb]/5 to-[#2563eb]/10 p-8 rounded-xl shadow-lg">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="inline-block bg-[#2563eb]/10 text-[#2563eb] px-4 py-1 rounded-full text-sm font-medium">
              Host Success Stories
            </div>
            <h3 className="text-3xl font-bold">See How Our Hosts Are Succeeding</h3>
            <p className="text-lg text-muted-foreground">
              Watch testimonials from our property owners who have transformed their rental income with MY Bookings.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-2">
                <div className="h-6 w-6 rounded-full bg-[#2563eb]/10 flex items-center justify-center mt-0.5">
                  <Star className="w-3 h-3 text-[#2563eb]" />
                </div>
                <p>Properties managed with professional photography and staging</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-6 w-6 rounded-full bg-[#2563eb]/10 flex items-center justify-center mt-0.5">
                  <Star className="w-3 h-3 text-[#2563eb]" />
                </div>
                <p>Dedicated property manager for each listing</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-6 w-6 rounded-full bg-[#2563eb]/10 flex items-center justify-center mt-0.5">
                  <Star className="w-3 h-3 text-[#2563eb]" />
                </div>
                <p>Advanced pricing algorithms to maximize your earnings</p>
              </li>
            </ul>
          </div>
          
          <div className="relative h-80 rounded-xl overflow-hidden shadow-2xl border-8 border-white">
            <Image
              src="/dummy-properties/testimonial-video-thumbnail.jpg"
              alt="Host testimonial video"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-20 w-20 rounded-full bg-[#2563eb] flex items-center justify-center cursor-pointer hover:bg-[#1d4ed8] transition-colors duration-300 shadow-xl">
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

