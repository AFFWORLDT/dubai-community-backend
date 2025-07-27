"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, Home, DollarSign } from 'lucide-react'

const stats = [
  {
    icon: TrendingUp,
    value: 25,
    label: "Average ROI",
    suffix: "%",
    description: "Annual return on investment",
  },
  {
    icon: Users,
    value: 50000,
    label: "Active Users",
    suffix: "+",
    description: "Monthly active platform users",
  },
  {
    icon: Home,
    value: 98,
    label: "Occupancy Rate",
    suffix: "%",
    description: "Average property occupancy",
  },
  {
    icon: DollarSign,
    value: 15000,
    label: "Average Income",
    prefix: "$",
    description: "Monthly rental income",
  },
]

export function MarketStats() {
  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Dubai Property Market Stats</h2>
        <p className="text-muted-foreground text-lg">
          See why property owners choose ComsosMybookings for maximum returns
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
    </div>
  )
}

function StatCard({
  icon: Icon,
  value,
  label,
  suffix,
  prefix,
  description,
}: {
  icon: any
  value: number
  label: string
  suffix?: string
  prefix?: string
  description: string
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
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
  }, [value])

  return (
    <Card className="relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent" />
      <CardContent className="pt-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-2 rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-110">
            <Icon className="w-6 h-6" />
          </div>
          <div className="font-semibold text-2xl tabular-nums">
            {prefix}
            {count}
            {suffix}
          </div>
        </div>
        <h3 className="font-semibold mb-2">{label}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

