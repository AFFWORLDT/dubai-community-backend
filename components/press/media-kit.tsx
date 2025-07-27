"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, FileText, ImageIcon, Video, Package } from 'lucide-react'

const mediaResources = [
  {
    title: "Brand Assets",
    description: "Logos, icons, and brand guidelines",
    icon: Package,
    fileSize: "12.5 MB",
  },
  {
    title: "Image Library",
    description: "High-resolution photos and images",
    icon: ImageIcon,
    fileSize: "256 MB",
  },
  {
    title: "Press Releases",
    description: "Latest press releases and statements",
    icon: FileText,
    fileSize: "3.2 MB",
  },
  {
    title: "Video Content",
    description: "B-roll footage and promotional videos",
    icon: Video,
    fileSize: "1.2 GB",
  },
]

export function MediaKit() {
  return (
    <section className="py-24">
      <div className=" px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl font-bold">Media Kit</h2>
            <p className="text-muted-foreground text-lg">
              Download official  Mybookings media resources, including logos, images, and press materials
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mediaResources.map((resource, index) => {
              const Icon = resource.icon
              return (
                <motion.div
                  key={resource.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6 space-y-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{resource.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {resource.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            {resource.fileSize}
                          </span>
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          <div className="text-center">
            <Button size="lg">
              <Download className="mr-2 h-4 w-4" />
              Download Complete Media Kit
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

