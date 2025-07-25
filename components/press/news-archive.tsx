"use client"

import { useState, Suspense } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { VirtualList } from "@/components/ui/virtual-list"
import { SkeletonCard } from "@/components/ui/skeleton-card"
import { PremiumCard } from "@/components/ui/premium-card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search } from 'lucide-react'

// ... existing newsItems array ...

function NewsItem({ item }: { item: typeof newsItems[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      <PremiumCard
        variant={item.category === "Awards" ? "gold" : "silver"}
        className="mb-4"
        hover={false}
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge>{item.category}</Badge>
              <time className="text-sm text-muted-foreground">
                {new Date(item.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p className="text-sm text-muted-foreground">
              Source: {item.source}
            </p>
          </div>
          <Button variant="outline">Read Article</Button>
        </div>
      </PremiumCard>
    </motion.div>
  )
}

export function NewsArchive() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredNews = newsItems.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <section className="py-24 bg-muted/50">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl font-bold">News Archive</h2>
            <p className="text-muted-foreground text-lg">
              Browse our complete archive of news coverage and press mentions
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Growth">Growth</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Awards">Awards</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="h-[600px]">
            <Suspense fallback={<SkeletonCards />}>
              <AnimatePresence mode="wait">
                <VirtualList
                  items={filteredNews}
                  itemHeight={120}
                  renderItem={(item) => <NewsItem item={item} />}
                />
              </AnimatePresence>
            </Suspense>
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg">
              Load More
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function SkeletonCards() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <SkeletonCard key={i} imageHeight="h-24" rows={1} />
      ))}
    </div>
  )
}

