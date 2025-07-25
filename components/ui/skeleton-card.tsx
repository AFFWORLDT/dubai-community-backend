"use client"

import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

interface SkeletonCardProps {
  imageHeight?: string
  rows?: number
}

export function SkeletonCard({ imageHeight = "h-48", rows = 3 }: SkeletonCardProps) {
  return (
    <Card className="overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="p-4 space-y-4"
      >
        <Skeleton className={`w-full ${imageHeight}`} />
        <Skeleton className="h-4 w-3/4" />
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
        <div className="flex justify-between items-center pt-4">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </motion.div>
    </Card>
  )
}

