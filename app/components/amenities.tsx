import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Wifi,
  Car,
  Waves,
  Dumbbell,
  Coffee,
  UtensilsCrossed,
  Shield,
  ArrowRight,
} from "lucide-react";

const amenities = [
  {
    icon: <Wifi className="w-6 h-6" />,
    title: "High-Speed WiFi",
    description: "Stay connected with premium internet access throughout your stay",
  },
  {
    icon: <Car className="w-6 h-6" />,
    title: "Valet Parking",
    description: "Complimentary 24/7 valet service with secure parking",
  },
  {
    icon: <Waves className="w-6 h-6" />,
    title: "Infinity Pool",
    description: "Temperature-controlled pools with panoramic Dubai views",
  },
  {
    icon: <Dumbbell className="w-6 h-6" />,
    title: "Fitness Center",
    description: "State-of-the-art equipment with personal trainers available",
  },
  {
    icon: <Coffee className="w-6 h-6" />,
    title: "Premium Lounge",
    description: "Exclusive lounge with premium refreshments and services",
  },
  {
    icon: <UtensilsCrossed className="w-6 h-6" />,
    title: "Fine Dining",
    description: "Multiple world-class restaurants with diverse cuisines",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "24/7 Security",
    description: "Advanced security systems with professional staff",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Luxury Services",
    description: "Personalized concierge and housekeeping services",
  },
];

export function Amenities() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-16">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            Premium Amenities
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            World-Class Facilities
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Indulge in luxury with our comprehensive range of premium amenities and services
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {amenities.map((amenity, index) => (
            <div
              key={index}
              className="bg-background p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-primary/20 transition-colors">
                <div className="text-primary">{amenity.icon}</div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{amenity.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{amenity.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button size="lg" variant="outline" className="px-8 py-6 text-lg hover:bg-primary hover:text-white transition-colors">
            Explore All Amenities
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
} 