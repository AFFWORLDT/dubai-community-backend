"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useDebounce } from "use-debounce"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PremiumCard } from "@/components/ui/premium-card"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Calendar, Building, X } from 'lucide-react'
import Image from "next/image"

interface SearchResult {
  id: string
  type: "property" | "location" | "experience"
  title: string
  description: string
  image?: string
  price?: number
  rating?: number
  location?: string
  date?: string
}

export function SmartSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [debouncedQuery] = useDebounce(query, 300)
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (debouncedQuery.length > 2) {
      setIsLoading(true)
      // Simulate API call
      setTimeout(() => {
        setResults([
          {
            id: "1",
            type: "property",
            title: "Luxury Penthouse",
            description: "Stunning views of Dubai skyline",
            image: "/placeholder.svg?height=100&width=100",
            price: 500,
            rating: 4.9,
            location: "Downtown Dubai",
          },
          {
            id: "2",
            type: "location",
            title: "Palm Jumeirah",
            description: "Iconic artificial archipelago",
            image: "/placeholder.svg?height=100&width=100",
          },
          {
            id: "3",
            type: "experience",
            title: "Desert Safari",
            description: "Adventure in the Arabian Desert",
            image: "/placeholder.svg?height=100&width=100",
            date: "Available daily",
            price: 150,
          },
        ])
        setIsLoading(false)
      }, 500)
    } else {
      setResults([])
    }
  }, [debouncedQuery])

  const getIcon = (type: SearchResult["type"]) => {
    switch (type) {
      case "property":
        return <Building className="w-4 h-4" />
      case "location":
        return <MapPin className="w-4 h-4" />
      case "experience":
        return <Calendar className="w-4 h-4" />
    }
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search properties, locations, or experiences..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          className="pl-9"
          onFocus={() => setIsOpen(true)}
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={() => {
              setQuery("")
              setResults([])
            }}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (query || results.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 z-50"
          >
            <PremiumCard className="p-2">
              {isLoading ? (
                <div className="p-4 text-center text-muted-foreground">
                  Searching...
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-2">
                  {results.map((result) => (
                    <motion.button
                      key={result.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="w-full text-left"
                      onClick={() => {
                        // Handle result click
                        setIsOpen(false)
                      }}
                    >
                      <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted">
                        {result.image && (
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                            <Image
                              src={result.image}
                              alt={result.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              <span className="mr-1">{getIcon(result.type)}</span>
                              {result.type}
                            </Badge>
                          </div>
                          <h4 className="font-medium truncate">{result.title}</h4>
                          <p className="text-sm text-muted-foreground truncate">
                            {result.description}
                          </p>
                        </div>
                        {result.price && (
                          <div className="text-right">
                            <div className="font-semibold">${result.price}</div>
                            <div className="text-xs text-muted-foreground">per night</div>
                          </div>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              ) : query.length > 2 ? (
                <div className="p-4 text-center text-muted-foreground">
                  No results found
                </div>
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  Type at least 3 characters to search
                </div>
              )}
            </PremiumCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

