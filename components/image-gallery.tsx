"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface ImageGalleryProps {
  images: string[]
  title: string
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <>
      <div className="grid grid-cols-4 gap-2 h-[500px] md:h-[600px] p-2">
        <div className="col-span-2 row-span-2 relative rounded-lg overflow-hidden">
          <button
            onClick={() => setSelectedImage(images[0])}
            className="w-full h-full group"
          >
            <Image
              src={images[0]}
              alt={`${title} - Main Image`}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </button>
        </div>
        {images.slice(1).map((image, i) => (
          <div
            key={image}
            className={cn(
              "relative rounded-lg overflow-hidden",
              i === 2 && "hidden md:block",
              i === 3 && "hidden md:block"
            )}
          >
            <button
              onClick={() => setSelectedImage(image)}
              className="w-full h-full group"
            >
              <Image
                src={image}
                alt={`${title} - Image ${i + 2}`}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              {i === 3 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white group-hover:bg-black/60">
                  <span className="text-lg font-semibold">+{images.length - 4} more</span>
                </div>
              )}
            </button>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-3xl h-[80vh]">
          <DialogTitle className="sr-only">Image Gallery - {title}</DialogTitle>
          {selectedImage && (
            <div className="relative w-full h-full">
              <Image
                src={selectedImage}
                alt={title}
                fill
                className="object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

