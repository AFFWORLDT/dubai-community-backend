"use client"

import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface PremiumCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "silver" | "gold" | "platinum" | "diamond"
  children: React.ReactNode
  hover?: boolean
  shine?: boolean
  tilt?: boolean
}

export function PremiumCard({ 
  variant = "silver", 
  children, 
  className,
  hover = true,
  shine = true,
  tilt = false,
  ...props 
}: PremiumCardProps) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    if (!tilt) return
    const { left, top, width, height } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const background = useMotionTemplate`radial-gradient(
    650px circle at ${mouseX}px ${mouseY}px,
    var(--premium-shine) 0%,
    transparent 100%
  )`

  const variants = {
    silver: {
      base: "bg-gradient-to-b from-white/90 to-white/40 dark:from-zinc-900/90 dark:to-zinc-900/40",
      border: "border-white/20 dark:border-white/10",
      shadow: "shadow-[0_8px_16px_rgb(0_0_0/0.1)]",
      shine: "before:from-white/10 before:via-white/25 before:to-white/10",
    },
    gold: {
      base: "bg-gradient-to-b from-amber-100/90 to-amber-100/40 dark:from-amber-900/90 dark:to-amber-900/40",
      border: "border-amber-200/20 dark:border-amber-500/10",
      shadow: "shadow-[0_8px_16px_rgb(251_191_36/0.1)]",
      shine: "before:from-amber-100/10 before:via-amber-100/25 before:to-amber-100/10",
    },
    platinum: {
      base: "bg-gradient-to-b from-slate-100/90 to-slate-100/40 dark:from-slate-800/90 dark:to-slate-800/40",
      border: "border-slate-200/20 dark:border-slate-500/10",
      shadow: "shadow-[0_8px_16px_rgb(148_163_184/0.1)]",
      shine: "before:from-slate-100/10 before:via-slate-100/25 before:to-slate-100/10",
    },
    diamond: {
      base: "bg-gradient-to-b from-blue-100/90 to-blue-100/40 dark:from-blue-900/90 dark:to-blue-900/40",
      border: "border-blue-200/20 dark:border-blue-500/10",
      shadow: "shadow-[0_8px_16px_rgb(59_130_246/0.1)]",
      shine: "before:from-blue-100/10 before:via-blue-100/25 before:to-blue-100/10",
    },
  }

  if (!mounted) {
    return null
  }

  return (
    <motion.div
      whileHover={hover ? { 
        scale: 1.02,
        transition: { duration: 0.2 }
      } : undefined}
      onMouseMove={onMouseMove}
      style={tilt ? {
        '--premium-shine': 'rgba(255, 255, 255, 0.05)',
      } as React.CSSProperties : undefined}
      className={cn(
        "relative overflow-hidden rounded-xl backdrop-blur-sm",
        variants[variant].base,
        "border",
        variants[variant].border,
        variants[variant].shadow,
        shine && [
          "before:absolute before:inset-0 before:bg-gradient-to-r",
          variants[variant].shine,
          "before:animate-shimmer"
        ],
        className
      )}
      {...props}
    >
      {tilt && (
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
          style={{ background }}
        />
      )}
      {children}
    </motion.div>
  )
}

