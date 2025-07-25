import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2,
  Users,
  Star,
  Shield,
  Trophy,
  Award,
  Globe2,
  ThumbsUp,
  Sparkles,
  Crown,
  Heart,
  Clock,
  CheckCircle2,
  Rocket,
  BookOpen,
  Map,
  Home,
  Landmark,
  Quote,
  ArrowRight,
  Play,
  ChevronRight,
  TrendingUp,
  Smartphone
} from "lucide-react";
import { StatsCounter } from "@/components/stats-counter";
import { AchievementCard } from "@/components/achievement-card";
import { TrustBadges } from "@/components/trust-badges";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Customer testimonials
const testimonials = [
  {
    name: "Alexander Williams",
    role: "Property Owner",
    image: "/placeholder-user.jpg",
    quote: "Partnering with MY Bookings Holiday Homes has been incredible. Their professional approach and attention to detail have made managing my property effortless."
  },
  {
    name: "Sophia Chen",
    role: "Property Owner",
    image: "/placeholder-user.jpg",
    quote: "The team at MY Bookings Holiday Homes has exceeded my expectations. Their marketing efforts have significantly increased my property's visibility and bookings."
  },
  {
    name: "Rajan Patel",
    role: "Property Owner",
    image: "/placeholder-user.jpg",
    quote: "The support and guidance provided by MY Bookings Holiday Homes have been exceptional. They truly understand the luxury market in Dubai."
  },
  {
    name: "Elena Rodriguez",
    role: "Frequent Guest",
    image: "/placeholder-user.jpg",
    quote: "Every stay booked through MY Bookings has been nothing short of extraordinary. The attention to detail and personalized service is unmatched."
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Updated with parallax effect, animation and interactive particles */}
      <section className="relative h-[95vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-110 brightness-110"
        >
          <source
            src="/assets/about.mp4"
            type="video/mp4"
          />
        </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/30 to-black/70" />
          
          {/* Interactive floating elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-[10%] w-6 h-6 rounded-full bg-primary/30 animate-float-slow"></div>
            <div className="absolute top-[40%] left-[20%] w-4 h-4 rounded-full bg-white/20 animate-float-medium"></div>
            <div className="absolute top-[30%] right-[15%] w-8 h-8 rounded-full bg-primary/20 animate-float-fast"></div>
            <div className="absolute bottom-[20%] left-[30%] w-5 h-5 rounded-full bg-white/30 animate-float-medium"></div>
            <div className="absolute bottom-[35%] right-[25%] w-4 h-4 rounded-full bg-primary/30 animate-float-slow"></div>
          </div>
        </div>
        <div className="relative z-10 text-center text-white space-y-6 sm:space-y-8 px-4 sm:px-8 py-8 sm:py-16 max-w-6xl mx-auto rounded-3xl bg-black/60 backdrop-blur-sm border border-white/30 shadow-2xl animate-in zoom-in-50 duration-700">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-auto whitespace-nowrap">
            <Badge className="px-6 py-2.5 text-base bg-gradient-to-r from-primary to-primary/80 text-white border-none shadow-xl rounded-full">
              <Crown className="w-5 h-5 mr-2" />
              <span className="font-medium tracking-wide">PREMIUM LUXURY VACATION HOMES</span>
            </Badge>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-tight text-white drop-shadow-lg animate-in slide-in-from-bottom duration-1000">
            Redefining <span className="text-primary font-extrabold">Luxury</span>
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white/90 animate-in slide-in-from-bottom duration-1000 delay-300">
            Holiday Homes in Dubai
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed font-light drop-shadow-lg animate-in slide-in-from-bottom duration-1000 delay-500">
            Connecting discerning travelers with Dubai's most exclusive accommodations since 2018
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 justify-center mt-6 sm:mt-10 animate-in slide-in-from-bottom duration-1000 delay-700">
            <Button 
              size="lg" 
              className="text-base sm:text-lg px-6 sm:px-10 py-5 sm:py-7 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-xl border-none rounded-full group transition-all duration-300 w-full sm:w-auto"
            >
              <Link href="/properties" className="flex items-center gap-2 justify-center w-full">
                Discover Properties
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-base sm:text-lg px-6 sm:px-10 py-5 sm:py-7 bg-white/10 text-white border-2 border-white hover:bg-white/20 shadow-xl rounded-full group w-full sm:w-auto"
            >
              <Link href="/contact" className="flex items-center gap-2 justify-center w-full">
                Get In Touch
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
          <div className="w-10 h-16 rounded-full border-2 border-white/70 flex items-start justify-center p-2">
            <div className="w-2 h-4 bg-white/70 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - NEW SECTION */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-muted/20 to-transparent"></div>
        <div className="absolute -left-20 top-1/4 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -right-20 bottom-1/4 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-6 px-6 py-2 text-base border-primary text-primary rounded-full">
              <ThumbsUp className="w-5 h-5 mr-2" />
              Why Choose Us
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              The <span className="text-primary font-extrabold">MY Bookings</span> Difference
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              What sets us apart from other holiday home providers in Dubai
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl border border-muted/20 transition-all duration-300 hover:-translate-y-2">
              <div className="mb-6 w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:rotate-6 transition-all duration-500">
                <Shield className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                Verified Luxury Properties
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Every property undergoes our 50-point inspection to ensure it meets our luxury standards before being listed.
              </p>
              <div className="mt-6 flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform duration-300">
                <span>Learn more</span>
                <ChevronRight className="w-5 h-5 ml-1" />
              </div>
            </div>
            
            {/* Feature 2 */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl border border-muted/20 transition-all duration-300 hover:-translate-y-2">
              <div className="mb-6 w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:rotate-6 transition-all duration-500">
                <Clock className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                24/7 Dedicated Concierge
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Our guest experience team is available around the clock to handle any request, from airport transfers to private chefs.
              </p>
              <div className="mt-6 flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform duration-300">
                <span>Discover services</span>
                <ChevronRight className="w-5 h-5 ml-1" />
              </div>
            </div>
            
            {/* Feature 3 */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl border border-muted/20 transition-all duration-300 hover:-translate-y-2">
              <div className="mb-6 w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:rotate-6 transition-all duration-500">
                <Sparkles className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                Exclusive Guest Benefits
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Enjoy special privileges at Dubai's top restaurants, spas, and attractions as a MY Bookings guest.
              </p>
              <div className="mt-6 flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform duration-300">
                <span>View benefits</span>
                <ChevronRight className="w-5 h-5 ml-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey Timeline - NEW SECTION */}
      <section className="py-16 sm:py-28 bg-gradient-to-b from-white to-muted/10 relative">
        <div className="absolute right-0 top-40 w-60 h-60 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute left-0 bottom-40 w-60 h-60 bg-primary/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-20">
            <Badge variant="outline" className="mb-4 sm:mb-6 px-4 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base border-primary text-primary rounded-full">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
              Our Journey
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-8">
              Growing With <span className="text-primary font-extrabold">Excellence</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Milestones in our journey to becoming Dubai's leading luxury stay provider
            </p>
          </div>

          <div className="relative">
            {/* Vertical Timeline Line - Hidden on mobile, shown on md screens */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 transform -translate-x-1/2 z-0 hidden md:block"></div>
            
            {/* Mobile Timeline Line - Shown on mobile, hidden on md screens */}
            <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-primary/20 z-0 md:hidden"></div>
            
            {/* Timeline Items */}
            <div className="space-y-12 sm:space-y-16 md:space-y-24 relative z-10">
              {/* 2018 - Foundation */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-16">
                <div className="md:text-right md:w-1/2 space-y-2 md:space-y-4 pl-16 sm:pl-20 md:pl-0">
                  <div className="text-primary font-bold text-2xl sm:text-3xl md:text-4xl">2018</div>
                  <h3 className="text-xl sm:text-2xl font-bold">Foundation</h3>
                  <p className="text-base sm:text-lg text-muted-foreground">
                    MY Bookings Holiday Homes was founded with a vision to transform Dubai's luxury accommodation market, starting with just 5 properties.
                  </p>
                </div>
                <div className="absolute left-4 sm:left-8 md:left-1/2 transform md:-translate-x-1/2 mt-1 md:mt-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
                    <Home className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                  </div>
                </div>
                <div className="md:w-1/2 hidden md:block"></div>
              </div>
              
              {/* 2019 - Growth */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-16">
                <div className="md:w-1/2 hidden md:block"></div>
                <div className="absolute left-4 sm:left-8 md:left-1/2 transform md:-translate-x-1/2 mt-1 md:mt-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                  </div>
                </div>
                <div className="md:w-1/2 space-y-2 md:space-y-4 pl-16 sm:pl-20 md:pl-0">
                  <div className="text-primary font-bold text-2xl sm:text-3xl md:text-4xl">2019</div>
                  <h3 className="text-xl sm:text-2xl font-bold">Rapid Growth</h3>
                  <p className="text-base sm:text-lg text-muted-foreground">
                    Expanded our portfolio to 50+ properties and established partnerships with luxury service providers across Dubai.
                  </p>
                </div>
              </div>
              
              {/* 2020 - Resilience */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-16">
                <div className="md:text-right md:w-1/2 space-y-2 md:space-y-4 pl-16 sm:pl-20 md:pl-0">
                  <div className="text-primary font-bold text-2xl sm:text-3xl md:text-4xl">2020</div>
                  <h3 className="text-xl sm:text-2xl font-bold">Resilience & Innovation</h3>
                  <p className="text-base sm:text-lg text-muted-foreground">
                    Adapted to global challenges with new safety protocols and flexible booking policies, setting new industry standards.
                  </p>
                </div>
                <div className="absolute left-4 sm:left-8 md:left-1/2 transform md:-translate-x-1/2 mt-1 md:mt-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                  </div>
                </div>
                <div className="md:w-1/2 hidden md:block"></div>
              </div>
              
              {/* 2021 - Digital Transformation */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-16">
                <div className="md:w-1/2 hidden md:block"></div>
                <div className="absolute left-4 sm:left-8 md:left-1/2 transform md:-translate-x-1/2 mt-1 md:mt-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
                    <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                  </div>
                </div>
                <div className="md:w-1/2 space-y-2 md:space-y-4 pl-16 sm:pl-20 md:pl-0">
                  <div className="text-primary font-bold text-2xl sm:text-3xl md:text-4xl">2021</div>
                  <h3 className="text-xl sm:text-2xl font-bold">Digital Transformation</h3>
                  <p className="text-base sm:text-lg text-muted-foreground">
                    Launched our advanced booking platform and mobile app, making luxury stays more accessible than ever.
                  </p>
                </div>
              </div>
              
              {/* 2022 - Awards */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-16">
                <div className="md:text-right md:w-1/2 space-y-2 md:space-y-4 pl-16 sm:pl-20 md:pl-0">
                  <div className="text-primary font-bold text-2xl sm:text-3xl md:text-4xl">2022</div>
                  <h3 className="text-xl sm:text-2xl font-bold">Award Recognition</h3>
                  <p className="text-base sm:text-lg text-muted-foreground">
                    Received multiple industry awards for service excellence and became Dubai's fastest-growing luxury accommodation provider.
                  </p>
                </div>
                <div className="absolute left-4 sm:left-8 md:left-1/2 transform md:-translate-x-1/2 mt-1 md:mt-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
                    <Trophy className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                  </div>
                </div>
                <div className="md:w-1/2 hidden md:block"></div>
              </div>
              
              {/* 2023 - Present */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-16">
                <div className="md:w-1/2 hidden md:block"></div>
                <div className="absolute left-4 sm:left-8 md:left-1/2 transform md:-translate-x-1/2 mt-1 md:mt-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                  </div>
                </div>
                <div className="md:w-1/2 space-y-2 md:space-y-4 pl-16 sm:pl-20 md:pl-0">
                  <div className="text-primary font-bold text-2xl sm:text-3xl md:text-4xl">2023 - Present</div>
                  <h3 className="text-xl sm:text-2xl font-bold">Market Leadership</h3>
                  <p className="text-base sm:text-lg text-muted-foreground">
                    Today, we proudly manage 750+ premium properties, have served 75,000+ guests, and continue to set the standard for luxury holiday homes in Dubai.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section - Enhanced with animations and better visuals */}
      <section className="py-16 sm:py-24 md:py-32 bg-gradient-to-b from-white to-muted/10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-center">
            <div className="space-y-6 sm:space-y-8 max-w-xl">
              <Badge variant="outline" className="px-4 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base border-primary text-primary rounded-full mb-4">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                Our Inspiring Journey
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">The MY Bookings <span className="text-primary font-extrabold">Story</span></h2>
              <Separator className="w-24 sm:w-32 h-1 sm:h-1.5 bg-primary rounded-full" />
              <div className="space-y-4 sm:space-y-6">
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                  Founded in 2018, MY Bookings Holiday Homes began with a simple yet ambitious vision: to transform the luxury accommodation experience in Dubai.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                  Our founder recognized a gap in the market for truly exceptional holiday homes that combined the privacy and space of a residence with the amenities and services of a five-star hotel.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                  Today, we're proud to offer a curated collection of Dubai's most prestigious properties, each vetted to meet our exacting standards for luxury, comfort, and location.
                </p>
              </div>
              <div className="pt-4 sm:pt-6">
                <Button variant="outline" size="lg" className="gap-2 text-primary border-primary px-6 sm:px-8 rounded-full group hover:bg-primary hover:text-white transition-all duration-300 w-full sm:w-auto">
                  <Link href="/contact" className="flex items-center justify-center w-full">
                    Learn More About Our Values
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative mt-8 md:mt-0">
              <div className="absolute w-full h-full bg-primary/5 rounded-2xl -translate-x-4 sm:-translate-x-8 translate-y-4 sm:translate-y-8"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px] border-4 sm:border-8 border-white">
                <Image 
                  src="/assets/about-story.jpg" 
                  alt="MY Bookings Story" 
                  fill 
                  className="object-cover hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="absolute -bottom-4 sm:-bottom-8 -left-4 sm:-left-8 bg-primary text-white p-4 sm:p-8 rounded-xl sm:rounded-2xl shadow-xl">
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold">5+ Years</p>
                <p className="text-sm sm:text-base md:text-lg">of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Updated with better visuals and 3D effect */}
      <section className="py-16 sm:py-24 md:py-36 bg-gradient-to-b from-muted/5 to-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute -left-40 top-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute -right-40 bottom-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <Badge variant="secondary" className="mb-4 sm:mb-6 px-4 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base rounded-full">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
              Our Impact in Numbers
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-8">
              Numbers That Define <span className="text-primary font-extrabold">Excellence</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We take pride in our achievements and the trust our clients place in us
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            <div className="group perspective">
              <div className="relative transform transition-all duration-700 preserve-3d group-hover:rotate-y-180">
                <div className="backface-hidden rounded-2xl border border-primary/10 shadow-xl p-4 sm:p-6">
            <StatsCounter
                    icon={<Building2 className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-primary" />}
                    value={750}
                    label="Premium Properties"
                    duration={2500}
                  />
                </div>
                <div className="absolute inset-0 rotate-y-180 backface-hidden bg-primary text-white rounded-2xl flex flex-col items-center justify-center p-4 sm:p-8 text-center shadow-xl">
                  <Building2 className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mb-2 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">Premium Properties</h3>
                  <p className="text-sm sm:text-base">Each property is hand-selected to meet our luxury standards</p>
                </div>
              </div>
            </div>
            
            <div className="group perspective">
              <div className="relative transform transition-all duration-700 preserve-3d group-hover:rotate-y-180">
                <div className="backface-hidden rounded-2xl border border-primary/10 shadow-xl p-4 sm:p-6">
            <StatsCounter
                    icon={<Users className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-primary" />}
                    value={75000}
                    label="Happy Guests"
                    duration={2500}
                  />
                </div>
                <div className="absolute inset-0 rotate-y-180 backface-hidden bg-primary text-white rounded-2xl flex flex-col items-center justify-center p-4 sm:p-8 text-center shadow-xl">
                  <Users className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mb-2 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">Happy Guests</h3>
                  <p className="text-sm sm:text-base">Visitors from around the world who've experienced our luxury stays</p>
                </div>
              </div>
            </div>
            
            <div className="group perspective">
              <div className="relative transform transition-all duration-700 preserve-3d group-hover:rotate-y-180">
                <div className="backface-hidden rounded-2xl border border-primary/10 shadow-xl p-4 sm:p-6">
            <StatsCounter
                    icon={<Star className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-primary" />}
                    value={99}
                    label="Satisfaction Rate"
                    suffix="%"
                    duration={2500}
                  />
                </div>
                <div className="absolute inset-0 rotate-y-180 backface-hidden bg-primary text-white rounded-2xl flex flex-col items-center justify-center p-4 sm:p-8 text-center shadow-xl">
                  <Star className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mb-2 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">Satisfaction Rate</h3>
                  <p className="text-sm sm:text-base">Our commitment to excellence reflects in our guest satisfaction</p>
                </div>
              </div>
            </div>
            
            <div className="group perspective">
              <div className="relative transform transition-all duration-700 preserve-3d group-hover:rotate-y-180">
                <div className="backface-hidden rounded-2xl border border-primary/10 shadow-xl p-4 sm:p-6">
            <StatsCounter
                    icon={<Shield className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-primary" />}
                    value={100}
                    label="Verified Properties"
                    suffix="%"
                    duration={2500}
                  />
                </div>
                <div className="absolute inset-0 rotate-y-180 backface-hidden bg-primary text-white rounded-2xl flex flex-col items-center justify-center p-4 sm:p-8 text-center shadow-xl">
                  <Shield className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mb-2 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">Verified Properties</h3>
                  <p className="text-sm sm:text-base">Every property undergoes our rigorous verification process</p>
                </div>
              </div>
            </div>
          </div>

          {/* Added Achievements Summary */}
          <div className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
            <div className="bg-white/50 backdrop-blur-sm border border-primary/10 rounded-2xl p-6 sm:p-8 shadow-lg">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold">Industry Recognition</h3>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground">
                Recognized with 15+ industry awards for excellence in guest experience and property management.
              </p>
            </div>
            
            <div className="bg-white/50 backdrop-blur-sm border border-primary/10 rounded-2xl p-6 sm:p-8 shadow-lg">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Globe2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold">Global Clientele</h3>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground">
                Serving guests from 120+ countries, creating memorable experiences for travelers from around the world.
              </p>
            </div>
            
            <div className="bg-white/50 backdrop-blur-sm border border-primary/10 rounded-2xl p-6 sm:p-8 shadow-lg">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <ThumbsUp className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold">Top-Rated Service</h3>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground">
                Maintaining a 4.9/5 average rating across all major review platforms, setting the industry standard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values - Enhanced Feature Section with animations */}
      <section className="py-16 sm:py-24 md:py-36 bg-gradient-to-b from-white to-white relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 rounded-full"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <Badge variant="outline" className="mb-4 sm:mb-6 px-4 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base border-primary text-primary rounded-full">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
              Our Core Values
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-8">
              What Sets Us <span className="text-primary font-extrabold">Apart</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our commitment to excellence is built on these foundational principles
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            <Card className="bg-gradient-to-br from-background to-muted/20 border-none shadow-2xl hover:shadow-primary/10 hover:shadow-2xl transition-all duration-500 overflow-hidden group rounded-2xl">
              <div className="h-2 sm:h-3 bg-primary w-full"></div>
              <CardContent className="p-6 sm:p-8 md:p-10 relative">
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-primary/10 transition-colors duration-500"></div>
                <div className="mb-6 sm:mb-8 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
                  <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 group-hover:text-primary transition-colors duration-300">Uncompromising Quality</h3>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                  Every property in our collection is hand-selected and regularly inspected to ensure it meets our exacting standards for luxury, comfort, and design.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-background to-muted/20 border-none shadow-2xl hover:shadow-primary/10 hover:shadow-2xl transition-all duration-500 overflow-hidden group rounded-2xl">
              <div className="h-2 sm:h-3 bg-primary w-full"></div>
              <CardContent className="p-6 sm:p-8 md:p-10 relative">
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-primary/10 transition-colors duration-500"></div>
                <div className="mb-6 sm:mb-8 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
                  <Users className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 group-hover:text-primary transition-colors duration-300">Personalized Service</h3>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                  We believe luxury is in the details. Our dedicated concierge team provides personalized support to ensure every stay is tailored to individual preferences.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-background to-muted/20 border-none shadow-2xl hover:shadow-primary/10 hover:shadow-2xl transition-all duration-500 overflow-hidden group rounded-2xl">
              <div className="h-2 sm:h-3 bg-primary w-full"></div>
              <CardContent className="p-6 sm:p-8 md:p-10 relative">
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-primary/10 transition-colors duration-500"></div>
                <div className="mb-6 sm:mb-8 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
                  <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 group-hover:text-primary transition-colors duration-300">Trust & Security</h3>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                  We prioritize trust and transparency in every interaction, ensuring our guests feel secure and confident throughout their booking journey.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-background to-muted/20 border-none shadow-2xl hover:shadow-primary/10 hover:shadow-2xl transition-all duration-500 overflow-hidden group rounded-2xl">
              <div className="h-2 sm:h-3 bg-primary w-full"></div>
              <CardContent className="p-6 sm:p-8 md:p-10 relative">
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-primary/10 transition-colors duration-500"></div>
                <div className="mb-6 sm:mb-8 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
                  <Map className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 group-hover:text-primary transition-colors duration-300">Prime Locations</h3>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                  Our properties are situated in Dubai's most desirable neighborhoods, offering easy access to attractions, dining, and shopping venues.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-background to-muted/20 border-none shadow-2xl hover:shadow-primary/10 hover:shadow-2xl transition-all duration-500 overflow-hidden group rounded-2xl">
              <div className="h-2 sm:h-3 bg-primary w-full"></div>
              <CardContent className="p-6 sm:p-8 md:p-10 relative">
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-primary/10 transition-colors duration-500"></div>
                <div className="mb-6 sm:mb-8 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
                  <Landmark className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 group-hover:text-primary transition-colors duration-300">Exclusive Amenities</h3>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                  From private pools and stunning views to smart home features and designer furnishings, our properties offer amenities that enhance every moment.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-background to-muted/20 border-none shadow-2xl hover:shadow-primary/10 hover:shadow-2xl transition-all duration-500 overflow-hidden group rounded-2xl">
              <div className="h-2 sm:h-3 bg-primary w-full"></div>
              <CardContent className="p-6 sm:p-8 md:p-10 relative">
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-primary/10 transition-colors duration-500"></div>
                <div className="mb-6 sm:mb-8 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
                  <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 group-hover:text-primary transition-colors duration-300">24/7 Support</h3>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                  Our dedicated support team is available around the clock to address any needs or concerns, ensuring a seamless and enjoyable experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials - Enhanced Section */}
      <section className="py-36 bg-gradient-to-b from-white to-muted/20 relative overflow-hidden">
        <div className="absolute top-40 right-0 w-60 h-60 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-0 w-60 h-60 bg-primary/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-6 px-6 py-2 text-base border-primary text-primary rounded-full">
              <Star className="w-5 h-5 mr-2" />
              Testimonials
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              What Our <span className="text-primary font-extrabold">Clients Say</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Hear directly from property owners and guests who have experienced our premium services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-muted/10 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl relative h-full">
                  <div className="absolute -top-4 -left-4">
                    <div className="text-6xl text-primary/10 font-serif">"</div>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-6 relative">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20">
                      <Image 
                        src={testimonial.image || "/placeholder-user.jpg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{testimonial.name}</h3>
                      <p className="text-primary text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4 flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 text-yellow-400 inline-block" fill="#facc15" />
                    ))}
                  </div>
                  
                  <p className="text-muted-foreground italic relative">
                    <span className="relative z-10">"{testimonial.quote}"</span>
                  </p>
                  
                  <div className="absolute -bottom-4 -right-4">
                    <div className="text-6xl text-primary/10 font-serif rotate-180">"</div>
            </div>
            </div>
            </div>
            ))}
            </div>
          
          <div className="text-center mt-16">
            <Button variant="outline" size="lg" className="gap-2 text-primary border-primary rounded-full px-8 py-6 text-lg hover:bg-primary hover:text-white transition-all duration-300 group">
              <Link href="/properties" className="flex items-center">
                View All Testimonials
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Awards Section - Keep and enhance */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 px-4 py-1.5">
              <Trophy className="w-4 h-4 mr-2" />
              Recognition
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Award-Winning <span className="text-primary">Excellence</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Recognized as Dubai's leading luxury accommodation platform
            </p>
          </div>

          <Tabs defaultValue="2024" className="w-full">
            <TabsList className="w-full justify-center mb-8 bg-muted/50 p-1 rounded-full">
              <TabsTrigger value="2024" className="rounded-full">2024</TabsTrigger>
              <TabsTrigger value="2023" className="rounded-full">2023</TabsTrigger>
              <TabsTrigger value="2022" className="rounded-full">2022</TabsTrigger>
            </TabsList>
            <TabsContent value="2024" className="space-y-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AchievementCard
                  icon={<Trophy className="w-8 h-8 text-primary" />}
                  title="Best Luxury Booking Platform"
                  organization="Dubai Tourism Awards"
                  description="Recognized for exceptional service in luxury accommodations"
                />
                <AchievementCard
                  icon={<Star className="w-8 h-8 text-primary" />}
                  title="5-Star Excellence"
                  organization="Luxury Travel Guide"
                  description="Highest rated booking platform in Dubai"
                />
                <AchievementCard
                  icon={<Award className="w-8 h-8 text-primary" />}
                  title="Innovation in Travel"
                  organization="Middle East Tourism Summit"
                  description="Leading the way in travel technology"
                />
              </div>
            </TabsContent>
            <TabsContent value="2023" className="space-y-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AchievementCard
                  icon={<Globe2 className="w-8 h-8 text-primary" />}
                  title="Global Excellence"
                  organization="World Travel Awards"
                  description="Best regional booking platform"
                />
                <AchievementCard
                  icon={<ThumbsUp className="w-8 h-8 text-primary" />}
                  title="Customer Choice"
                  organization="TripAdvisor"
                  description="Voted best by travelers"
                />
                <AchievementCard
                  icon={<Shield className="w-8 h-8 text-primary" />}
                  title="Safety & Security"
                  organization="International Travel Association"
                  description="Outstanding safety measures"
                />
              </div>
            </TabsContent>
            <TabsContent value="2022" className="space-y-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AchievementCard
                  icon={<Trophy className="w-8 h-8 text-primary" />}
                  title="Emerging Platform"
                  organization="Dubai Business Council"
                  description="Best new travel platform"
                />
                <AchievementCard
                  icon={<Star className="w-8 h-8 text-primary" />}
                  title="Service Excellence"
                  organization="Hospitality Awards"
                  description="Outstanding customer service"
                />
                <AchievementCard
                  icon={<Award className="w-8 h-8 text-primary" />}
                  title="Tech Innovation"
                  organization="Travel Tech Awards"
                  description="Revolutionary booking experience"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Trust & Recognition */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <TrustBadges />
        </div>
      </section>

      {/* CTA Section - ENHANCED */}
      <section className="py-32 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern"></div>
          </div>
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-6 px-6 py-2 text-base border-white bg-white/20 text-white rounded-full">
                <Sparkles className="w-5 h-5 mr-2" />
            Begin Your Journey
          </Badge>
              <h2 className="text-5xl md:text-6xl font-bold mb-8">
                Experience Dubai's Finest Holiday Homes
          </h2>
              <p className="text-xl mb-12 text-primary-foreground/90 max-w-3xl mx-auto">
                Join thousands of satisfied guests who have experienced luxury stays with us. Your perfect Dubai holiday home is just a click away.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" variant="secondary" className="text-lg px-10 py-7 bg-white text-primary hover:bg-white/90 rounded-full" asChild>
                  <Link href="/properties" className="flex items-center gap-2">
                    Browse Properties
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-10 py-7 border-white text-white hover:bg-white/10 rounded-full" asChild>
                  <Link href="/contact" className="flex items-center gap-2">
                    Contact Us
                    <ChevronRight className="w-5 h-5" />
                  </Link>
            </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Premium Properties</h3>
                <p className="text-white/80">
                  Explore our collection of carefully curated luxury properties in Dubai's most prestigious locations.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Safe & Secure</h3>
                <p className="text-white/80">
                  Book with confidence knowing every property meets our rigorous standards for quality and security.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
                  <ThumbsUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Exceptional Service</h3>
                <p className="text-white/80">
                  Experience personalized service and support throughout your stay, available 24/7 for your convenience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Showcase Section - ENHANCED */}
      <section className="py-36 bg-gradient-to-b from-muted/30 to-white relative overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <Badge variant="outline" className="mb-6 px-6 py-2 text-base border-primary text-primary rounded-full">
              <Play className="w-5 h-5 mr-2" />
              Experience Luxury
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              See <span className="text-primary font-extrabold">Our World</span> in Action
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Immerse yourself in the luxury experience through our showcase videos
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 relative">
            {/* Decorative element */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/5 rounded-full blur-xl"></div>
            
            {/* Video 1 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20">
                <div className="w-20 h-20 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-500">
                  <Play className="w-8 h-8 text-white" fill="white" />
                </div>
              </div>
              <div className="absolute w-full h-full bg-primary/5 rounded-3xl transform rotate-3 scale-95 z-0"></div>
              <div className="relative overflow-hidden rounded-3xl bg-muted shadow-2xl border-8 border-white z-10 transition-transform duration-500 group-hover:-translate-y-2">
                <video 
                  className="w-full h-[450px] object-cover"
                  poster="/assets/video-thumbnail-1.jpg"
                  controls
                >
                  <source src="/assets/showcase-video-1.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Luxury Living Experience</h3>
                  <p className="text-white/90">Explore our portfolio of premium properties</p>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg rotate-12 z-0"></div>
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg -rotate-12 z-0"></div>
            </div>

            {/* Video 2 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20">
                <div className="w-20 h-20 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-500">
                  <Play className="w-8 h-8 text-white" fill="white" />
                </div>
              </div>
              <div className="absolute w-full h-full bg-primary/5 rounded-3xl transform -rotate-3 scale-95 z-0"></div>
              <div className="relative overflow-hidden rounded-3xl bg-muted shadow-2xl border-8 border-white z-10 transition-transform duration-500 group-hover:-translate-y-2">
                <video 
                  className="w-full h-[450px] object-cover"
                  poster="/assets/video-thumbnail-2.jpg"
                  controls
                >
                  <source src="/assets/showcase-video-2.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Dubai's Finest Accommodations</h3>
                  <p className="text-white/90">Tour our most exclusive holiday homes</p>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg -rotate-12 z-0"></div>
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg rotate-12 z-0"></div>
            </div>
          </div>
          
          {/* Video description */}
          <div className="mt-16 text-center">
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our showcase videos offer a glimpse into the extraordinary experiences that await you in our luxury properties. From breathtaking views to designer interiors, immerse yourself in the MY Bookings lifestyle.
            </p>
            <Button variant="outline" className="mt-8 gap-2 text-primary border-primary rounded-full px-8 py-6 text-lg hover:bg-primary hover:text-white transition-all duration-300 group">
              <Link href="/properties" className="flex items-center">
                Browse All Properties
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
