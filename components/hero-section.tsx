"use client"

import Link from "next/link"
import Image from "next/image"
import {
  Search,
  X,
  Building2,
  MapPin,
  
  Home,
  Building,
  Waves,
  BuildingIcon as Buildings,
} from "lucide-react"
import { useState, useEffect, useRef, useCallback } from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useProperties } from "@/features/Properties/useProperties"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"

type Property = {
  _id: string
  title: string
  area: string
  city: string
  category: string
  bedrooms: string
  bathrooms: string
  price: number
  photos: Array<{ url: string }>
  amenities: string[]
  description: string
}



const popularCities = [
  {
    name: "Dubai Marina",
    image: "/placeholder.svg?height=100&width=100",
    type: "area",
    icon: Waves,
    description: "Ultimate waterfront luxury",
  },
  {
    name: "Palm Jumeirah",
    image: "/placeholder.svg?height=100&width=100",
    type: "area",
    icon: Building2,
    description: "Iconic island Mybookings",
  },
  {
    name: "Downtown Dubai",
    image: "/placeholder.svg?height=100&width=100",
    type: "area",
    icon: Buildings,
    description: "City's heart of luxury",
  },
]

// Add suggested searches when the search is empty
const suggestedSearches = [
  { query: "Dubai Marina", label: "Luxury waterfront properties" },
  { query: "Palm Jumeirah", label: "Exclusive island residences" },
  { query: "Downtown Dubai", label: "Premium city center homes" },
]

// Update the styles in your component
export function HeroSection() {
  // ... (previous state and handlers remain the same)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<string | null>(null)
  const [date, setDate] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })
  const [guests, setGuests] = useState({
    adults: 2,
    children: 0,
    infants: 0,
  })
  const searchRef = useRef<HTMLDivElement>(null)
  const { data: properties } = useProperties()
  const propertyList = properties?.filter((property: any) => property.status === true) || []

  // Update the search results type
  const [searchResults, setSearchResults] = useState<{
    locations: typeof popularCities
    properties: Property[]
  }>({
    locations: [],
    properties: [],
  })

  // Update the search handler to include better city and area matching
  const handleSearch = useCallback(() => {
    if (searchQuery.length > 1) {
      // Search in popular cities first
      const cityResults = popularCities.filter((location) =>
        location.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )

      // Search in properties
      const propertyResults = propertyList
        .filter(
          (property: any) =>
            property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            property.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
            property.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
            property.category.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        .slice(0, 5)

      // Group results by type
      const results: any = {
        locations: cityResults,
        properties: propertyResults,
      }

      setSearchResults(results)
      setIsSearchOpen(true)
    } else {
      setSearchResults({ locations: [], properties: [] })
      setIsSearchOpen(false)
    }
  }, [searchQuery, propertyList])

  // Update search results when query changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch()
    }, 300)
    return () => clearTimeout(timeoutId)
  }, [handleSearch])

  // Handle click outside search
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false)
        setActiveTab(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSubmit = () => {
    const params = new URLSearchParams()
    if (searchQuery) params.append("search", searchQuery)
    if (date.from) params.append("checkIn", format(date.from, "yyyy-MM-dd"))
    if (date.to) params.append("checkOut", format(date.to, "yyyy-MM-dd"))
    if (guests.adults !== 2) params.append("adults", guests.adults.toString())
    if (guests.children > 0) params.append("children", guests.children.toString())
    if (guests.infants > 0) params.append("infants", guests.infants.toString())

    window.location.href = `/properties?${params.toString()}`
  }

  const getTotalGuests = () => {
    const total = guests.adults + guests.children
    return `${total} guest${total !== 1 ? "s" : ""}${guests.infants ? `, ${guests.infants} infant${guests.infants !== 1 ? "s" : ""}` : ""}`
  }

  const handleTabClick = (tab: string) => {
    if (activeTab === tab) {
      setActiveTab(null)
    } else {
      setActiveTab(tab)
    }
  }

  const [isDateDialogOpen, setIsDateDialogOpen] = useState(false)
  const [tempDate, setTempDate] = useState<{ from: Date | undefined; to: Date | undefined }>({ from: date.from, to: date.to })
  const [isGuestsDialogOpen, setIsGuestsDialogOpen] = useState(false)
  const [tempGuests, setTempGuests] = useState({ ...guests })



  // Auto-save guests when changed
  useEffect(() => {
    if (isGuestsDialogOpen && (tempGuests.adults !== guests.adults || tempGuests.children !== guests.children || tempGuests.infants !== guests.infants)) {
      setGuests(tempGuests);
      setIsGuestsDialogOpen(false);
    }
  }, [tempGuests, guests, isGuestsDialogOpen]);

  return (
    <section className="relative h-screen w-screen flex items-center justify-center overflow-hidden">
      {/* Video Background with enhanced overlay */}
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover scale-[1.02] transform hover:scale-[1.03] transition-transform duration-[1.5s] ease-out">
        <source src="./../assets/hero.mp4" />
      </video>

      {/* Luxury gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-black/10 via-transparent to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 flex flex-col justify-center h-full">
        <div className="w-full mx-auto grid lg:grid-cols-1 gap-8 sm:gap-16 items-center mt-[-50px]">
          {/* Hero Text with enhanced animations */}
          <div className="space-y-6 sm:space-y-8 text-left">
            <div className="overflow-hidden">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-[1.1] sm:leading-[1.2] tracking-tight animate-fade-up [animation-delay:200ms] [text-shadow:_0_4px_12px_rgb(0_0_0_/_20%)]">
              WELCOME TO MY BOOKINGS  <br className="hidden sm:block" />
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-widest inline-block bg-gradient-to-r from-white via-white to-white/70 text-transparent bg-clip-text">Your Holiday </span>
                <span className="inline-block bg-gradient-to-r from-white via-white to-primary-200 text-transparent bg-clip-text"> Your Home</span>
              </h1>
            </div>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-2xl font-light leading-relaxed tracking-wide animate-fade-up [animation-delay:400ms] [text-shadow:_0_2px_8px_rgb(0_0_0_/_10%)]">
            Find Every Luxury Home, All in One Destination.
            </p>
          </div>

          {/* Search Bar Container with enhanced styling */}
          <div ref={searchRef} className="relative animate-fade-up [animation-delay:600ms] w-full max-w-[1000px]">
            <div className="flex flex-col gap-4 sm:gap-6">
              {/* Main Search Bar with glass effect */}
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl md:rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.20)] transition-all duration-500 flex flex-col md:flex-row items-stretch p-2 sm:p-3 border border-white/20">
                {/* Check in Button */}
                <button
                  onClick={() => { setTempDate(date); setIsDateDialogOpen(true); }}
                  className={cn(
                    "flex-1 flex flex-col justify-center text-left px-3 sm:px-4 py-3 md:py-0 rounded-xl md:rounded-full transition-all duration-300",
                  )}
                >
                  <span className="text-xs font-semibold text-gray-800">Dates</span>
                  <span className="text-sm text-gray-600 truncate mt-0.5">
                    {date.from && date.to ? `${format(date.from, "MMM d")} - ${format(date.to, "MMM d")}` : "Add dates"}
                  </span>
                </button>
                {/* Horizontal Divider for mobile */}
                <div className="h-px w-full bg-gray-200 my-1 md:hidden" />
                {/* Who Button with Search */}
                <div className="flex-1 flex flex-col md:flex-row items-center">
                  <button
                    onClick={() => { setTempGuests(guests); setIsGuestsDialogOpen(true); }}
                    className={cn(
                      "flex-1 w-full flex flex-col justify-center text-left px-3 sm:px-4 py-3 md:py-0 rounded-xl md:rounded-l-full md:rounded-r-none transition-all duration-300 h-full",
                    )}
                  >
                    <span className="text-xs font-semibold text-gray-800">Who</span>
                    <span className="text-sm text-gray-600 truncate mt-0.5">{getTotalGuests()}</span>
                  </button>
                  {/* Enhanced Search Button */}
                  <button
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl md:rounded-full px-6 sm:px-8 py-4 sm:py-5 flex items-center justify-center gap-3 transition-all duration-300 mt-4 md:mt-0 md:ml-3 shadow-xl shadow-blue-500/30 hover:shadow-blue-600/40 w-full md:w-auto hover:scale-105 transform font-bold border border-blue-400/20"
                  >
                    <Search className="w-6 h-6 sm:w-7 sm:h-7 text-white stroke-2" />
                    <span className="font-bold text-base sm:text-lg text-white">Search</span>
                  </button>
                </div>
              </div>
              {/* Unified Date Dialog Popup */}
              <Dialog open={isDateDialogOpen} onOpenChange={setIsDateDialogOpen}>
                <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] overflow-y-auto">
                  <DialogHeader className="pb-4">
                    <DialogTitle className="text-xl sm:text-2xl">Select Dates</DialogTitle>
                    <DialogDescription className="text-sm sm:text-base">Check in - Check out</DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col items-center justify-center">
                    <CalendarComponent
                      mode="range"
                      selected={tempDate}
                      onSelect={(range) => {
                        if (range?.from && range?.to) {
                          setTempDate({ from: range.from, to: range.to });
                          setDate({ from: range.from, to: range.to });
                          setIsDateDialogOpen(false);
                        } else if (range?.from) {
                          setTempDate({ from: range.from, to: undefined });
                        }
                      }}
                      className="rounded-xl border-0 w-full"
                      numberOfMonths={2}
                      defaultMonth={tempDate.from || new Date()}
                    />
                  </div>
                </DialogContent>
              </Dialog>

              {/* Guests Dialog Popup */}
              <Dialog open={isGuestsDialogOpen} onOpenChange={setIsGuestsDialogOpen}>
                <DialogContent className="max-w-md w-[95vw] max-h-[90vh] overflow-y-auto">
                  <DialogHeader className="pb-4">
                    <DialogTitle className="text-xl sm:text-2xl">Select Guests</DialogTitle>
                  </DialogHeader>
                  <div className="divide-y space-y-2">
                    {[
                      {
                        title: "Adults",
                        description: "Ages 13 or above",
                        value: tempGuests.adults,
                        onChange: (value: number) => setTempGuests({ ...tempGuests, adults: value }),
                        min: 1,
                      },
                      {
                        title: "Children",
                        description: "Ages 2-12",
                        value: tempGuests.children,
                        onChange: (value: number) => setTempGuests({ ...tempGuests, children: value }),
                        min: 0,
                      },
                      {
                        title: "Infants",
                        description: "Under 2",
                        value: tempGuests.infants,
                        onChange: (value: number) => setTempGuests({ ...tempGuests, infants: value }),
                        min: 0,
                      },
                    ].map((item, index) => (
                      <div key={item.title} className="flex items-center justify-between py-4 sm:py-6 first:pt-0 last:pb-0">
                        <div className="flex-1 mr-4">
                          <h4 className="font-semibold text-gray-900 text-base sm:text-lg">{item.title}</h4>
                          <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3">
                          <button
                            onClick={() => item.onChange(Math.max(item.min, item.value - 1))}
                            disabled={item.value <= item.min}
                            className={`w-12 h-12 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center text-lg font-bold transition-all duration-300 touch-manipulation ${item.value <= item.min ? 'border-gray-200 text-gray-200 cursor-not-allowed' : 'border-primary text-primary hover:bg-primary/10 active:bg-primary/20'}`}
                          >
                            –
                          </button>
                          <span className="w-8 sm:w-8 text-center font-medium text-gray-900 text-base sm:text-lg">{item.value}</span>
                          <button
                            onClick={() => item.onChange(item.value + 1)}
                            className="w-12 h-12 sm:w-10 sm:h-10 rounded-full border border-primary text-primary flex items-center justify-center text-lg font-bold hover:bg-primary/10 active:bg-primary/20 transition-all duration-300 touch-manipulation"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>

              {/* Enhanced Location Dropdown */}
              {activeTab === "location" && (
                <div className="absolute left-0 right-0 top-[calc(100%+12px)] bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] p-4 sm:p-6 md:p-8 max-h-[80vh] md:max-h-[640px] overflow-y-auto animate-fade-in w-full">
                  {/* Search Input with enhanced styling */}
                  <div className="relative mb-8">
                    <input
                      type="text"
                      placeholder="Search location or property type"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full h-12 pl-12 pr-4 rounded-full border border-gray-200 bg-gray-50/50 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 transition-all duration-300"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  <div className="space-y-8">
                    {!searchQuery ? (
                      // Show suggestions only when there's no search query
                      <>
                        {/* Suggested Searches */}
                        <div className="mb-8 animate-fade-in">
                          <h4 className="text-sm font-semibold text-gray-900 mb-4">Suggested Searches</h4>
                          <div className="flex flex-wrap gap-2">
                            {suggestedSearches.map((suggestion) => (
                              <button
                                key={suggestion.query}
                                onClick={() => {
                                  setSearchQuery(suggestion.query)
                                }}
                                className="group px-4 py-2 rounded-full border border-gray-200 hover:border-primary-400 transition-all duration-300 bg-white hover:bg-primary-50"
                              >
                                <span className="text-sm text-gray-600 group-hover:text-primary-600">
                                  {suggestion.label}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>

                       
                        {/* Popular Cities */}
                        <div className="animate-fade-in [animation-delay:200ms]">
                          <h4 className="text-sm font-semibold text-gray-900 mb-4">Popular Locations</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {popularCities.map((location) => (
                              <button
                                key={location.name}
                                onClick={() => {
                                  setSearchQuery(location.name)
                                  setActiveTab(null)
                                }}
                                className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-all duration-300 group hover:border-primary-200"
                              >
                                <div className="relative w-16 h-16 rounded-xl overflow-hidden flex items-center justify-center bg-primary-50 group-hover:bg-primary-100 transition-colors duration-300">
                                  <location.icon className="w-8 h-8 text-primary-500" />
                                </div>
                                <div className="flex flex-col items-start">
                                  <span className="font-medium text-gray-900">{location.name}</span>
                                  <span className="text-xs text-gray-500 mb-1">{location.description}</span>
                                  <Badge
                                    variant="outline"
                                    className="bg-primary-50 text-primary-600 border-primary-200 group-hover:bg-primary-100 transition-colors duration-300"
                                  >
                                    {location.type === "city" ? "City" : "Area"}
                                  </Badge>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      // Show only search results when there's a search query
                      <div className="space-y-8 animate-fade-in">
                        {/* Location Results */}
                        {searchResults.locations.length > 0 && (
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900 mb-4">Locations</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {searchResults.locations.map((location) => (
                                <button
                                  key={location.name}
                                  onClick={() => {
                                    setSearchQuery(location.name)
                                    setActiveTab(null)
                                  }}
                                  className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-all group"
                                >
                                  <div className="relative w-16 h-16 rounded-xl overflow-hidden flex items-center justify-center bg-[#5BC4BC]/10 group-hover:bg-[#5BC4BC]/20 transition-colors">
                                    <location.icon className="w-8 h-8 text-[#5BC4BC]" />
                                  </div>
                                  <div className="flex flex-col items-start">
                                    <span className="font-medium text-gray-900">{location.name}</span>
                                    <span className="text-xs text-gray-500 mb-1">{location.description}</span>
                                    <Badge
                                      variant="outline"
                                      className="bg-[#5BC4BC]/10 text-[#5BC4BC] border-[#5BC4BC]/20"
                                    >
                                      {location.type === "city" ? "City" : "Area"}
                                    </Badge>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Property Results */}
                        {searchResults.properties.length > 0 && (
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900 mb-4">Properties</h4>
                            <div className="space-y-4">
                              {searchResults.properties.map((property) => (
                                <Link
                                  href={`/properties/${property._id}`}
                                  key={property._id}
                                  className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-xl transition-all group"
                                  onClick={() => setIsSearchOpen(false)}
                                >
                                  <div className="relative h-20 w-20 rounded-lg overflow-hidden flex-shrink-0">
                                    <Image
                                      src={property.photos?.[0]?.url || "/placeholder.svg?height=80&width=80"}
                                      alt={property.title}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-gray-900 truncate">{property.title}</h4>
                                    <p className="text-sm text-gray-500 flex items-center gap-1 mb-1">
                                      <div className="w-5 h-5 rounded-full bg-[#5BC4BC]/10 flex items-center justify-center">
                                        <MapPin className="w-3 h-3 text-[#5BC4BC]" />
                                      </div>
                                      {property.area}, {property.city}
                                    </p>
                                    <div className="flex items-center gap-2">
                                      <Badge
                                        variant="outline"
                                        className="bg-[#5BC4BC]/10 text-[#5BC4BC] border-[#5BC4BC]/20"
                                      >
                                        {property.category}
                                      </Badge>
                                    </div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* No Results Message */}
                        {searchResults.locations.length === 0 && searchResults.properties.length === 0 && (
                          <div className="text-center py-8 text-gray-500">
                            <p className="font-medium">No results found</p>
                            <p className="text-sm mt-1">Try searching for cities, areas, or properties</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Enhanced Calendar Dropdown */}
              {activeTab === "dates" && (
                <div className="absolute left-0 right-0 top-[calc(100%+12px)] bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] p-4 sm:p-6 md:p-8 animate-fade-in overflow-y-auto max-h-[80vh]">
                  <div className="grid md:grid-cols-2 gap-4 md:gap-8">
                    <div>
                      <h4 className="text-sm font-semibold mb-4 text-gray-900">Check in</h4>
                      <CalendarComponent
                        mode="single"
                        selected={date.from}
                        onSelect={(day) => setDate({ ...date, from: day })}
                        className="rounded-xl border-0 [&_.rdp-day_button:hover]:bg-primary-50 [&_.rdp-day_button:focus]:bg-primary-50 [&_.rdp-day_button:focus]:ring-primary-500/20 [&_.rdp-day_button.rdp-day_selected]:bg-primary-500"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-4 text-gray-900">Check out</h4>
                      <CalendarComponent
                        mode="single"
                        selected={date.to}
                        onSelect={(day) => setDate({ ...date, to: day })}
                        disabled={(day) => (date.from ? day <= date.from : false)}
                        className="rounded-xl border-0 [&_.rdp-day_button:hover]:bg-primary-50 [&_.rdp-day_button:focus]:bg-primary-50 [&_.rdp-day_button:focus]:ring-primary-500/20 [&_.rdp-day_button.rdp-day_selected]:bg-primary-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Enhanced Guests Dropdown */}
              {/* This section is removed as guests are now in a dialog */}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Floating Features with glass effect */}
      <div className="absolute bottom-2 sm:bottom-4 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent py-2 sm:py-4 z-20">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex gap-1 sm:gap-2 flex-wrap justify-center">
            {[
              { icon: "✨", label: "Exclusive Properties" },
              { icon: "🔐", label: "VIP Concierge Service" },
              { icon: "👑", label: "Luxury Amenities" },
              { icon: "🌊", label: "Stunning Views" },
              { icon: "🚁", label: "Helipad Access" },
            ].map((feature) => (
              <div
                key={feature.label}
                className="flex items-center gap-1 sm:gap-2 bg-white/15 backdrop-blur-xl rounded-full px-2 sm:px-3 py-1 sm:py-1.5 text-white hover:bg-white/25 transition-all duration-300 border border-white/10 shadow-lg hover:scale-105 transform whitespace-nowrap"
              >
                <span className="text-sm sm:text-base">{feature.icon}</span>
                <span className="text-xs font-medium tracking-wide hidden sm:inline">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </section>
  )
}

