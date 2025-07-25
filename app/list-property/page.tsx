import { Suspense } from "react"
import { Metadata } from "next"
import { PropertyListingForm } from "@/components/property-listing/property-listing-form"
import { PropertyBenefits } from "@/components/property-listing/property-benefits"
import { ListingProcess } from "@/components/property-listing/listing-process"
import { PropertyRequirements } from "@/components/property-listing/property-requirements"
import { HostTestimonials } from "@/components/property-listing/host-testimonials"
import { ListingFAQ } from "@/components/property-listing/listing-faq"
import { MarketStats } from "@/components/property-listing/market-stats"
import { AnimatedSection } from "@/components/property-listing/animated-section"
import { LoadingCard } from "@/components/loading-card"
import { ErrorBoundary } from "@/components/error-boundary"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Building, BarChart3, Clock, Shield, Star, Calendar } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

export const metadata: Metadata = {
  title: "List Your Property | MY Bookings",
  description: "Join Dubai's premier luxury vacation rental platform. List your property and maximize your rental income with professional management and global marketing.",
}

export default function ListPropertyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-16 sm:py-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/video-poster.jpg"
        >
          <source 
            src="/assets/list.mp4" 
            type="video/mp4" 
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 sm:to-transparent" />
        <div className="container relative z-10 px-4">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-center">
            <AnimatedSection delay={0.2}>
              <div className="text-white space-y-4 sm:space-y-6">
                <Badge className="bg-[#E53935] hover:bg-[#C62828] text-white px-3 sm:px-4 py-1 text-xs sm:text-sm uppercase tracking-wider">Exclusive Partnership</Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Turn Your <span className="text-[#E53935]">Luxury Property</span> Into a Premium Income Stream
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-xl">
                  Join MY Bookings, Dubai's most exclusive property rental platform. We handle everything from marketing to guest services, maximizing your property's value and occupancy.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Button 
                    size="lg" 
                    className="bg-[#E53935] hover:bg-[#C62828] text-white px-4 sm:px-6 h-12 sm:h-14 text-base sm:text-lg rounded-lg w-full sm:w-auto"
                  >
                    Start Earning Now <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="text-white border-white hover:bg-white hover:text-[#E53935] h-12 sm:h-14 text-base sm:text-lg rounded-lg w-full sm:w-auto"
                  >
                    Calculate Revenue
                  </Button>
                </div>
                <div className="flex flex-wrap items-center gap-3 sm:gap-6 pt-2 sm:pt-4">
                  <div className="bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-3 rounded-lg">
                    <div className="text-2xl sm:text-3xl font-bold">500+</div>
                    <div className="text-xs sm:text-sm text-white/70">Premium Properties</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-3 rounded-lg">
                    <div className="text-2xl sm:text-3xl font-bold">95%</div>
                    <div className="text-xs sm:text-sm text-white/70">Occupancy Rate</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-3 rounded-lg">
                    <div className="text-2xl sm:text-3xl font-bold">24/7</div>
                    <div className="text-xs sm:text-sm text-white/70">Host Support</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            <div className="hidden lg:block relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#2563eb]/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#2563eb]/20 rounded-full blur-3xl"></div>
              <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl p-6 rounded-xl">
                <ErrorBoundary>
                  <Suspense fallback={<LoadingCard />}>
                    <PropertyListingForm />
                  </Suspense>
                </ErrorBoundary>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Animated scroll indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/80">
          <span className="text-xs sm:text-sm mb-1 sm:mb-2">Scroll to explore</span>
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/50 rounded-full flex justify-center p-1">
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Mobile Form Section */}
      <div className="lg:hidden py-8 sm:py-12 bg-gradient-to-b from-[#2563eb]/10 to-background backdrop-blur-sm">
        <div className="container px-4">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">List Your Property</h2>
          <ErrorBoundary>
            <Suspense fallback={<LoadingCard />}>
              <PropertyListingForm />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>

      {/* Performance Metrics */}
      <section className="py-20 bg-background border-b">
        <div className="container px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <Badge className="bg-[#E53935]/10 text-[#E53935] mb-4">Performance</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Primevista By Numbers</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our property management expertise consistently delivers exceptional results for property owners
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              <MetricCard 
                icon={<Building className="w-10 h-10 text-[#E53935]" />}
                metric="98%" 
                label="Property Acceptance Rate" 
                description="Only the finest properties are accepted"
              />
              <MetricCard 
                icon={<Calendar className="w-10 h-10 text-[#E53935]" />}
                metric="95%" 
                label="Average Occupancy" 
                description="Keep your property booked year-round"
              />
              <MetricCard 
                icon={<BarChart3 className="w-10 h-10 text-[#E53935]" />}
                metric="37%" 
                label="Higher Revenue" 
                description="Compared to standard rental platforms"
              />
              <MetricCard 
                icon={<Star className="w-10 h-10 text-[#E53935]" />}
                metric="4.9/5" 
                label="Guest Satisfaction" 
                description="Consistently exceeding expectations"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Revenue Calculator */}
      <section className="py-20 bg-background border-b">
        <div className="container px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <Badge className="bg-[#E53935]/10 text-[#E53935] mb-4">Earnings Potential</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">See How Much You Could Earn</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Compare your potential earnings with Primevista versus traditional long-term rentals
              </p>
            </div>
            
            <div className="bg-muted/30 p-8 rounded-xl max-w-4xl mx-auto">
              <Tabs defaultValue="apartment" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="apartment">Apartment</TabsTrigger>
                  <TabsTrigger value="villa">Villa</TabsTrigger>
                  <TabsTrigger value="penthouse">Penthouse</TabsTrigger>
                </TabsList>
                <TabsContent value="apartment" className="space-y-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">1 Bedroom Apartment</h3>
                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span>Traditional Rental</span>
                            <span className="font-medium">AED 75,000/year</span>
                          </div>
                          <Progress value={50} className="h-3 bg-gray-200" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span>With Primevista</span>
                            <span className="font-medium text-[#E53935]">AED 150,000/year</span>
                          </div>
                          <Progress value={100} className="h-3 bg-[#E53935]" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">2 Bedroom Apartment</h3>
                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span>Traditional Rental</span>
                            <span className="font-medium">AED 110,000/year</span>
                          </div>
                          <Progress value={50} className="h-3 bg-gray-200" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span>With Primevista</span>
                            <span className="font-medium text-[#E53935]">AED 220,000/year</span>
                          </div>
                          <Progress value={100} className="h-3 bg-[#E53935]" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#E53935]/5 p-4 rounded-lg border border-[#E53935]/20">
                    <p className="text-sm flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-[#E53935]" />
                      <span>Results based on premium properties in Dubai Marina, Downtown Dubai, and Palm Jumeirah</span>
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="villa" className="space-y-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">3 Bedroom Villa</h3>
                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span>Traditional Rental</span>
                            <span className="font-medium">AED 180,000/year</span>
                          </div>
                          <Progress value={50} className="h-3 bg-gray-200" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span>With Primevista</span>
                            <span className="font-medium text-[#E53935]">AED 360,000/year</span>
                          </div>
                          <Progress value={100} className="h-3 bg-[#E53935]" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#E53935]/5 p-4 rounded-lg border border-[#E53935]/20">
                    <p className="text-sm flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-[#E53935]" />
                      <span>Results based on premium villas in Palm Jumeirah, Emirates Hills, and Jumeirah</span>
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="penthouse" className="space-y-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Luxury Penthouse</h3>
                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span>Traditional Rental</span>
                            <span className="font-medium">AED 350,000/year</span>
                          </div>
                          <Progress value={50} className="h-3 bg-gray-200" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span>With Primevista</span>
                            <span className="font-medium text-[#E53935]">AED 700,000/year</span>
                          </div>
                          <Progress value={100} className="h-3 bg-[#E53935]" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#E53935]/5 p-4 rounded-lg border border-[#E53935]/20">
                    <p className="text-sm flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-[#E53935]" />
                      <span>Results based on premium penthouses in Dubai Marina, Downtown Dubai, and DIFC</span>
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="mt-8 text-center">
                <Button className="bg-[#E53935] hover:bg-[#C62828] text-white">
                  Calculate Your Specific Property
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-muted">
        <div className="container px-4">
          <AnimatedSection>
            <PropertyBenefits />
          </AnimatedSection>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <Badge className="bg-[#2563eb]/10 text-[#2563eb] mb-4">Streamlined Process</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our simple 4-step process makes listing your property effortless
              </p>
            </div>
            <ListingProcess />
          </AnimatedSection>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-24 bg-muted">
        <div className="container px-4">
          <AnimatedSection>
            <PropertyRequirements />
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials with Video */}
      <section className="py-24 bg-gradient-to-b from-muted to-background">
        <div className="container px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <Badge className="bg-[#2563eb]/10 text-[#2563eb] mb-4">Success Stories</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Hosts Say</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Hear directly from property owners who have trusted Primevista with their luxury properties
              </p>
            </div>
            <HostTestimonials />
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-muted">
        <div className="container px-4">
          <AnimatedSection>
            <ListingFAQ />
          </AnimatedSection>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-r from-[#1d4ed8] to-[#2563eb] text-white">
        <div className="container px-4 text-center relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          
          <AnimatedSection className="space-y-8 relative z-10">
            <Badge className="bg-white/20 text-white mb-4">Join Now</Badge>
            <h2 className="text-3xl md:text-5xl font-bold">
              Ready to Maximize Your Property's Potential?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Join Dubai's leading luxury property platform and start earning premium income from your property
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="text-[#E53935] hover:text-[#C62828] bg-white hover:bg-white/90 h-14 px-8 text-lg rounded-lg"
              >
                List Your Property Now <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 h-14 px-8 text-lg rounded-lg"
              >
                Speak to an Expert
              </Button>
            </div>
            <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <Clock className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm">List in under 24 hours</p>
              </div>
              <div>
                <Shield className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm">Fully insured properties</p>
              </div>
              <div>
                <BarChart3 className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm">Maximize rental income</p>
              </div>
              <div>
                <Star className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm">5-star property management</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}

function MetricCard({ 
  icon, 
  metric, 
  label, 
  description 
}: { 
  icon: React.ReactNode; 
  metric: string; 
  label: string; 
  description: string;
}) {
  return (
    <Card className="p-6 border border-border/40 hover:border-[#E53935]/20 transition-all duration-300 hover:shadow-lg hover:shadow-[#E53935]/5">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="p-3 rounded-full bg-[#E53935]/10">
          {icon}
        </div>
        <div className="space-y-1">
          <div className="text-3xl font-bold">{metric}</div>
          <div className="text-lg font-medium">{label}</div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </Card>
  )
}

