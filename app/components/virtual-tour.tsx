import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Cube, Eye, ArrowRight } from "lucide-react";
import Image from "next/image";

export function VirtualTour() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Cube className="w-4 h-4 mr-2" />
            Virtual Experience
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Immersive Virtual Property Tours
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience our properties in stunning 360° detail before booking
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-video rounded-2xl overflow-hidden group">
            <Image
              src="/images/virtual-tour-1.jpg"
              alt="Luxury Apartment Virtual Tour"
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
              <div className="text-white">
                <h3 className="text-xl font-semibold mb-2">Palm Jumeirah Villa</h3>
                <p className="text-sm text-white/80">6 Bedrooms • 8 Bathrooms • 12,000 sq ft</p>
              </div>
              <Button variant="secondary" size="sm" className="ml-auto">
                <Eye className="w-4 h-4 mr-2" />
                Start Tour
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-background p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Why Virtual Tours?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mr-4">
                    <Eye className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Detailed Preview</h4>
                    <p className="text-muted-foreground">Explore every corner of the property in high detail</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mr-4">
                    <Cube className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">360° Views</h4>
                    <p className="text-muted-foreground">Get a complete perspective of each room and space</p>
                  </div>
                </li>
              </ul>
            </div>

            <Button className="w-full" size="lg">
              View All Virtual Tours
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
} 