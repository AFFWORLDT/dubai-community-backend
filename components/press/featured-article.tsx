"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { PremiumCard } from "@/components/ui/premium-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from 'lucide-react'

export function FeaturedArticle() {
  return (
    <PremiumCard variant="gold" className="p-1">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative aspect-[21/9] rounded-lg overflow-hidden"
      >
        <Image
          src="/placeholder.svg?height=600&width=1400"
          alt="Featured press release"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 p-8 flex flex-col justify-end">
          <Badge className="w-fit mb-4 bg-primary">Featured Story</Badge>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              ComsosMybookings Revolutionizes Luxury Travel with AI-Powered Experiences
            </h2>
            <p className="text-white/90 max-w-2xl">
              Leading travel platform introduces cutting-edge AI technology to deliver personalized luxury stays, setting new standards in hospitality innovation.
            </p>
            <Button 
              variant="default" 
              size="lg"
              className="group"
            >
              Read Full Story
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </PremiumCard>
  )
}

