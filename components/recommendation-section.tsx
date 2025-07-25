"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Brain, Hotel, Palmtree, Plane } from 'lucide-react'

export function RecommendationSection() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <section className="py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">AI Travel Planner</h2>
        <p className="text-muted-foreground">
          Let our AI plan your perfect Dubai experience
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Your Preferences</CardTitle>
            <CardDescription>
              Help us understand your ideal trip
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Travel Dates</label>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Budget Range</label>
              <Slider
                defaultValue={[500]}
                max={5000}
                step={100}
                className="py-4"
              />
              <div className="text-sm text-muted-foreground">
                Up to $500 per night
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Experience Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="luxury">Luxury & Relaxation</SelectItem>
                  <SelectItem value="adventure">Adventure & Sports</SelectItem>
                  <SelectItem value="culture">Culture & History</SelectItem>
                  <SelectItem value="family">Family Friendly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full">Generate AI Recommendations</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>AI Suggested Package</CardTitle>
            <CardDescription>
              Personalized based on your preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="flex items-center gap-4">
                <Hotel className="w-8 h-8 text-primary" />
                <div>
                  <h4 className="font-semibold">Luxury Stay</h4>
                  <p className="text-sm text-muted-foreground">
                    Atlantis The Royal
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Plane className="w-8 h-8 text-primary" />
                <div>
                  <h4 className="font-semibold">Transportation</h4>
                  <p className="text-sm text-muted-foreground">
                    Private airport transfer
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Palmtree className="w-8 h-8 text-primary" />
                <div>
                  <h4 className="font-semibold">Experiences</h4>
                  <p className="text-sm text-muted-foreground">
                    Desert safari, Burj Khalifa, Dubai Mall
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="secondary">Luxury</Badge>
              <Badge variant="secondary">Pool Access</Badge>
              <Badge variant="secondary">Sea View</Badge>
              <Badge variant="secondary">Fine Dining</Badge>
            </div>
            <div className="pt-4 border-t">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-muted-foreground">AI Confidence</div>
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-primary" />
                  <span className="font-semibold">98%</span>
                </div>
              </div>
              <Button className="w-full">Book This Package</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

