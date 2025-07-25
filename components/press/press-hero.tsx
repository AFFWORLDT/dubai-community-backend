"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download } from 'lucide-react'

export function PressHero() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      <div className=" px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center space-y-6"
        >
          <Badge className="mb-4">Press Room</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Primevista Holidayhomes Press & Media Center
          </h1>
          <p className="text-xl text-muted-foreground">
            Get the latest news, press releases, and media resources from Dubai's premier luxury stays platform
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg">
              Latest News
            </Button>
            <Button size="lg" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Media Kit
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

