"use client"

import { useState } from "react"
import { ExperienceGrid } from "@/components/experiences/experience-grid"
import { ExperienceFilters } from "@/components/experiences/experience-filters"
import { ExperienceCategories } from "@/components/experiences/experience-categories"
import { FeaturedExperiences } from "@/components/experiences/featured-experiences"

export function ExperienceShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedDate, setSelectedDate] = useState<Date>()

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://videos.pexels.com/videos/aerial-view-of-dubai-city-3661216" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white space-y-4 px-4">
          <h1 className="text-4xl md:text-6xl font-bold">Extraordinary Experiences</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Discover unique activities and unforgettable adventures in Dubai
          </p>
        </div>
      </section>

      {/* Featured Experiences */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <FeaturedExperiences />
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container">
          <ExperienceCategories
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters */}
            <div className="lg:col-span-1">
              <ExperienceFilters
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
              />
            </div>
            {/* Experience Grid */}
            <div className="lg:col-span-3">
              <ExperienceGrid
                category={selectedCategory}
                priceRange={priceRange}
                selectedDate={selectedDate}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

