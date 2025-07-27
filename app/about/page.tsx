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
} from "lucide-react";
import { StatsCounter } from "@/components/stats-counter";
import { AchievementCard } from "@/components/achievement-card";
import { TrustBadges } from "@/components/trust-badges";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-110 brightness-125"
        >
          <source
            src="/assets/about.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/30" />
        <div className="relative z-10 text-center text-white space-y-6 px-8 py-10 max-w-5xl mx-auto rounded-2xl bg-black/20 backdrop-blur-sm border border-white/10">
          <div className="inline-block bg-white/95 rounded-full px-6 py-2 shadow-xl">
            <div className="flex items-center text-primary">
              <Crown className="w-5 h-5 mr-2" />
              <span className="text-lg font-medium">Dubai's Premier Luxury Platform</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white drop-shadow-lg">
            Redefining Luxury Stays in Dubai
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto leading-relaxed font-light drop-shadow-lg">
            Experience unparalleled luxury with Dubai's most exclusive accommodations
          </p>
          <div className="flex gap-4 justify-center mt-8">
            <Button 
              size="lg" 
              className="text-lg px-8 bg-white text-primary hover:bg-white/90 shadow-xl border-2 border-white"
            >
              Explore Properties
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 bg-white/10 text-white border-2 border-white hover:bg-white/20 shadow-xl"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              Our Impact
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Numbers That Define Excellence
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatsCounter
              icon={<Building2 className="w-8 h-8 text-primary" />}
              value={500}
              label="Premium Properties"
              duration={2000}
            />
            <StatsCounter
              icon={<Users className="w-8 h-8 text-primary" />}
              value={50000}
              label="Happy Guests"
              duration={2000}
            />
            <StatsCounter
              icon={<Star className="w-8 h-8 text-primary" />}
              value={98}
              label="Satisfaction Rate"
              suffix="%"
              duration={2000}
            />
            <StatsCounter
              icon={<Shield className="w-8 h-8 text-primary" />}
              value={100}
              label="Verified Hosts"
              suffix="%"
              duration={2000}
            />
          </div>
        </div>
      </section>

      {/* Luxury Features Section */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              <Crown className="w-4 h-4 mr-2" />
              Luxury Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Experience Unparalleled Luxury
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-background p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <Heart className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Personalized Service</h3>
              <p className="text-muted-foreground">Tailored experiences for every guest</p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <Clock className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">24/7 Concierge</h3>
              <p className="text-muted-foreground">Round-the-clock luxury assistance</p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <CheckCircle2 className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-muted-foreground">Highest standards of luxury</p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <Sparkles className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Exclusive Benefits</h3>
              <p className="text-muted-foreground">Special perks for our guests</p>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              <Trophy className="w-4 h-4 mr-2" />
              Recognition
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Award-Winning Excellence
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Recognized as Dubai's leading luxury accommodation platform
            </p>
          </div>

          <Tabs defaultValue="2024" className="w-full">
            <TabsList className="w-full justify-center mb-8">
              <TabsTrigger value="2024">2024</TabsTrigger>
              <TabsTrigger value="2023">2023</TabsTrigger>
              <TabsTrigger value="2022">2022</TabsTrigger>
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
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <TrustBadges />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            Begin Your Journey
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Experience Dubai's Finest Accommodations
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Join thousands of satisfied guests who have experienced luxury stays
            with us
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
              <Link href="/properties">Browse Properties</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
