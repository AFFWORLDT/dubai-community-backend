"use client"

import { useEffect, useState } from "react"
import { type LucideIcon } from 'lucide-react'
import { useInView } from "react-intersection-observer"

interface StatsCounterProps {
  icon: React.ReactNode; // Update to accept React nodes
  value: number;
  label: string;
  suffix?: string;
  duration?: number;
}

export function StatsCounter({
  icon,
  value,
  label,
  suffix = "",
  duration = 2000,
}: StatsCounterProps) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const increment = value / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start > value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [inView, value, duration]);

  return (
    <div
      ref={ref}
      className="text-center p-6 rounded-lg bg-background/50 backdrop-blur-sm border border-border transition-all duration-300 hover:scale-105"
    >
      <div className="w-8 h-8 mx-auto mb-4 text-primary">{icon}</div> {/* Render the icon */}
      <div className="text-3xl font-bold mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}