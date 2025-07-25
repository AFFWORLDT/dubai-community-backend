"use client"

import { useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { PremiumCard } from "@/components/ui/premium-card"
import { Building2, Users, Award, TrendingUp } from 'lucide-react'

const stats = [
  {
    icon: Building2,
    value: 500,
    label: "Properties Listed",
    suffix: "+",
  },
  {
    icon: Users,
    value: 100000,
    label: "Happy Guests",
    suffix: "+",
  },
  {
    icon: Award,
    value: 25,
    label: "Industry Awards",
    suffix: "",
  },
  {
    icon: TrendingUp,
    value: 300,
    label: "YoY Growth",
    suffix: "%",
  },
]

export function StatsShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard
          key={stat.label}
          {...stat}
          isInView={isInView}
          delay={index * 0.1}
        />
      ))}
    </div>
  )
}

function StatCard({ 
  icon: Icon, 
  value, 
  label, 
  suffix,
  isInView,
  delay 
}: {
  icon: any
  value: number
  label: string
  suffix: string
  isInView: boolean
  delay: number
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 50
      const increment = value / steps
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current > value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)
      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
    >
      <PremiumCard className="p-6 h-full">
        <div className="space-y-4">
          <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <div className="text-3xl font-bold tabular-nums">
              {count}{suffix}
            </div>
            <div className="text-sm text-muted-foreground">
              {label}
            </div>
          </div>
        </div>
      </PremiumCard>
    </motion.div>
  )
}

