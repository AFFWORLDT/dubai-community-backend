"use client"

import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ExperienceFiltersProps {
  priceRange: number[]
  onPriceRangeChange: (value: number[]) => void
  selectedDate?: Date
  onDateChange: (date?: Date) => void
}

const features = [
  { id: "private", label: "Private Experience" },
  { id: "transport", label: "Transport Included" },
  { id: "meals", label: "Meals Included" },
  { id: "guide", label: "Professional Guide" },
  { id: "photos", label: "Photo Package" },
]

const durations = [
  { id: "0-3", label: "0-3 hours" },
  { id: "3-6", label: "3-6 hours" },
  { id: "6-12", label: "6-12 hours" },
  { id: "full-day", label: "Full day" },
]

export function ExperienceFilters({
  priceRange,
  onPriceRangeChange,
  selectedDate,
  onDateChange,
}: ExperienceFiltersProps) {
  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Price Range */}
        <div className="space-y-4">
          <Label>Price Range</Label>
          <Slider
            min={0}
            max={1000}
            step={50}
            value={priceRange}
            onValueChange={onPriceRangeChange}
            className="py-4"
          />
          <div className="flex items-center justify-between text-sm">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>

        {/* Date Selection */}
        <div className="space-y-4">
          <Label>Select Date</Label>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onDateChange}
            className="rounded-md border"
          />
        </div>

        {/* Features */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="features">
            <AccordionTrigger>Features</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                {features.map((feature) => (
                  <div key={feature.id} className="flex items-center space-x-2">
                    <Checkbox id={feature.id} />
                    <label
                      htmlFor={feature.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {feature.label}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Duration */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="duration">
            <AccordionTrigger>Duration</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                {durations.map((duration) => (
                  <div key={duration.id} className="flex items-center space-x-2">
                    <Checkbox id={duration.id} />
                    <label
                      htmlFor={duration.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {duration.label}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}

