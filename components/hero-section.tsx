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
  Volume2,
  VolumeX,
} from "lucide-react"
import { useState, useEffect, useRef, useCallback } from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useProperties } from "@/features/Properties/useProperties"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
    description: "Iconic island living",
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
  const [currentVideo, setCurrentVideo] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Handle audio mute/unmute
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = 0.2;
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      setIsMuted(!isMuted);
    }
  };

  // Handle video end and switch to next video
  const handleVideoEnd = () => {
    setCurrentVideo(currentVideo === 1 ? 2 : 1);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [currentVideo]);

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

  const [showCalendarDialog, setShowCalendarDialog] = useState(false)
  const [showGuestsDialog, setShowGuestsDialog] = useState(false)

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
    if (tab === "dates") {
      setShowCalendarDialog(true)
    } else if (tab === "guests") {
      setShowGuestsDialog(true)
    } else if (activeTab === tab) {
      setActiveTab(null)
    } else {
      setActiveTab(tab)
    }
  }

  return (
    <section className="relative min-h-[80vh] w-full flex items-center justify-center overflow-hidden">
      {/* Audio Element */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        className="hidden"
      >
        <source src="/assets/ambient.mp3" type="audio/mp3" />
      </audio>

      {/* Sound Control Button */}
      <button
        onClick={toggleAudio}
        className="absolute bottom-4 left-4 z-50 p-2 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-all duration-300 border border-white/10"
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6 text-white" />
        ) : (
          <Volume2 className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Video Background with enhanced overlay */}
      <video 
        ref={videoRef}
        autoPlay 
        loop
        playsInline
        muted={isMuted}
        className="absolute inset-0 w-full h-full object-cover scale-[1.02] transform hover:scale-[1.03] transition-transform duration-[1.5s] ease-out"
        onLoadedData={() => {
          if (videoRef.current) {
            videoRef.current.play().catch(error => {
              console.error("Video autoplay failed:", error);
            });
          }
        }}
      >
        <source src="/assets/bg-hero-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Enhanced luxury gradient overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-black/10 via-transparent to-transparent opacity-60" />
        {/* Golden accent layer */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#c4a564]/20 via-transparent to-[#916f3a]/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col justify-center h-full">
        <div className="w-full mx-auto grid grid-cols-1 gap-10 md:gap-16 items-center mt-[-30px] md:mt-[-50px]">
          {/* Hero Text */}
          <div className="space-y-6 md:space-y-8 text-left">
            <div className="overflow-hidden">
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.1] tracking-tight [text-shadow:none] force-gpu">
                Discover
                <br className="hidden sm:block" />
                <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-wider inline-block text-white force-gpu" style={{
                  WebkitTextFillColor: 'transparent',
                  WebkitBackgroundClip: 'text',
                  backgroundImage: 'linear-gradient(to right, #ffffff, #f5ebd7, #e5c785)',
                } as React.CSSProperties}>
                  Ultimate
                </span>
                <span className="inline-block text-white force-gpu" style={{
                  WebkitTextFillColor: 'transparent',
                  WebkitBackgroundClip: 'text',
                  backgroundImage: 'linear-gradient(to right, #c4a564, #f5ebd7, #916f3a)',
                } as React.CSSProperties}>
                  {" "}Luxury
                </span>
              </h1>
            </div>
            <p className="text-base sm:text-lg md:text-2xl text-white font-medium max-w-2xl md:max-w-3xl [text-shadow:none] force-gpu">
              Experience unparalleled luxury in Dubai's most prestigious locations
            </p>
          </div>
          {/* Search Section */}
          <div className="w-full max-w-4xl backdrop-blur-md bg-white/20 rounded-xl sm:rounded-2xl p-2 md:p-4 animate-fade-up [animation-delay:600ms] border border-white/30 shadow-[0_8px_32px_rgba(255,255,255,0.15)]">
            <div className="flex flex-col gap-4 md:gap-6">
              {/* Main Search Bar */}
              <div className="bg-white/95 backdrop-blur-xl rounded-xl md:rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.15)] transition-all duration-500 flex flex-col md:flex-row items-stretch p-2 md:p-3 border border-white">
                {/* Dates Button */}
                <button
                  onClick={() => handleTabClick("dates")}
                  className={cn(
                    "flex-1 flex flex-col justify-center text-left px-3 py-2 md:py-0 rounded-lg md:rounded-full transition-all duration-300",
                    activeTab === "dates"
                      ? "bg-white shadow-[0_6px_20px_rgba(0,0,0,0.12)] scale-[1.02]"
                      : "hover:bg-gray-50",
                  )}
                >
                  <span className="text-xs font-semibold text-gray-800">Dates</span>
                  <span className="text-sm text-gray-600 truncate mt-0.5">
                    {date.from && date.to 
                      ? `${format(date.from, "MMM d")} - ${format(date.to, "MMM d")}` 
                      : "Add dates"}
                  </span>
                </button>
                {/* Divider for mobile */}
                <div className="h-px w-full bg-gray-200 my-1 md:hidden" />
                {/* Who Button and Search */}
                <div className="flex-1 flex flex-col md:flex-row items-center">
                  <button
                    onClick={() => handleTabClick("guests")}
                    className={cn(
                      "flex-1 w-full flex flex-col justify-center text-left px-3 py-2 md:py-0 rounded-lg md:rounded-l-full md:rounded-r-none transition-all duration-300 h-full",
                      activeTab === "guests"
                        ? "bg-white shadow-[0_6px_20px_rgba(0,0,0,0.12)] scale-[1.02]"
                        : "hover:bg-gray-50",
                    )}
                  >
                    <span className="text-xs font-semibold text-gray-800">Who</span>
                    <span className="text-sm text-gray-600 truncate mt-0.5">{getTotalGuests()}</span>
                  </button>
                  {/* Search Button */}
                  <button
                    onClick={handleSubmit}
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg md:rounded-full px-6 py-3 flex items-center gap-3 transition-all duration-300 mt-3 md:mt-0 md:ml-2 shadow-lg hover:shadow-xl w-full md:w-auto justify-center text-base font-semibold"
                  >
                    <Search className="w-5 h-5" />
                    <span>Search</span>
                  </button>
                </div>
              </div>
             
              
            </div>
             
          </div>
          {/* Features Section */}
            <div className="flex items-center justify-items-center flex-wrap gap-2 md:gap-4 mt-4 md:mt-8 animate-fade-up [animation-delay:800ms]">
            {[
              { icon: "✦", text: "Exclusive Properties" },
              { icon: "🎯", text: "VIP Concierge Service" },
              { icon: "✧", text: "Luxury Amenities" },
              { icon: "⚜", text: "Stunning Views" },
              { icon: "🛦", text: "Helipad Access" }
            ].map((feature, index) => (
              <div
                key={index}
                    className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all duration-300 shadow-[0_4px_16px_rgba(255,255,255,0.1)]"
              >
                <span className="text-white">{feature.icon}</span>
                    <span className="text-white text-xs md:text-sm font-medium hidden sm:inline-block">
                  {feature.text}
                </span>
              </div>
            ))}
              </div>
        </div>
      </div>

      {/* Calendar Dialog */}
      <Dialog open={showCalendarDialog} onOpenChange={setShowCalendarDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Select Dates</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div>
              <h4 className="text-sm font-semibold mb-4 text-gray-900">Check in - Check out</h4>
              <div className="grid md:grid-cols-2 gap-4 md:gap-8">
                <div>
                  <CalendarComponent
                    mode="single"
                    selected={date.from}
                    onSelect={(day) => setDate({ ...date, from: day })}
                    className="rounded-xl border-0 [&_.rdp-day_button:hover]:bg-primary-50 [&_.rdp-day_button:focus]:bg-primary-50 [&_.rdp-day_button:focus]:ring-primary-500/20 [&_.rdp-day_button.rdp-day_selected]:bg-primary-500"
                  />
                </div>
                <div>
                  <CalendarComponent
                    mode="single"
                    selected={date.to}
                    onSelect={(day) => {
                      setDate({ ...date, to: day })
                      if (day) {
                        setShowCalendarDialog(false)
                      }
                    }}
                    disabled={(day) => (date.from ? day <= date.from : false)}
                    className="rounded-xl border-0 [&_.rdp-day_button:hover]:bg-primary-50 [&_.rdp-day_button:focus]:bg-primary-50 [&_.rdp-day_button:focus]:ring-primary-500/20 [&_.rdp-day_button.rdp-day_selected]:bg-primary-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Guests Dialog */}
      <Dialog open={showGuestsDialog} onOpenChange={setShowGuestsDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Select Guests</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {[
              {
                title: "Adults",
                description: "Ages 13 or above",
                value: guests.adults,
                onChange: (value: number) => setGuests({ ...guests, adults: value }),
                min: 1,
              },
              {
                title: "Children",
                description: "Ages 2-12",
                value: guests.children,
                onChange: (value: number) => setGuests({ ...guests, children: value }),
                min: 0,
              },
              {
                title: "Infants",
                description: "Under 2",
                value: guests.infants,
                onChange: (value: number) => setGuests({ ...guests, infants: value }),
                min: 0,
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className={cn(
                  "flex items-center justify-between py-4",
                  index !== 2 && "border-b border-gray-200",
                )}
              >
                <div>
                  <h4 className="font-semibold text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => item.onChange(Math.max(item.min, item.value - 1))}
                    disabled={item.value <= item.min}
                    className={cn(
                      "w-8 h-8 rounded-full border transition-all duration-300 flex items-center justify-center",
                      item.value <= item.min
                        ? "border-gray-200 text-gray-200 cursor-not-allowed"
                        : "border-gray-300 text-gray-700 hover:border-gray-900 hover:bg-gray-50",
                    )}
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-medium text-gray-900">{item.value}</span>
                  <button
                    onClick={() => item.onChange(item.value + 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 text-gray-700 flex items-center justify-center hover:border-gray-900 hover:bg-gray-50 transition-all duration-300"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}

