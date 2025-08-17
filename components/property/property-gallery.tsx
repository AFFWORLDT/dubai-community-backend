"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Grid, Heart, Share, X, ChevronLeft, ChevronRight } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "../ui/toaster"
import useToggleWatchList from "@/features/Booking/useToggleWatchList"
import useUser from "@/features/user/useUser"

interface PropertyGalleryProps {
  images?: string[]
  propertyData?: {
    title: string
    description: string
    price: string
    location: string
    _id: string
  }
}
const getAllImagesFlattened = (images: any[]) => {
  return images.map((img: any) => img.url || img)
}

export function PropertyGallery({
  images = [],
  propertyData = {
    title: "",
    description: "",
    price: "",
    location: "",
    _id: "",
  },
}: PropertyGalleryProps) {
  const [isSaved, setIsSaved] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showAllPhotos, setShowAllPhotos] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(-1)
  const { toast } = useToast()
  const [isSharing, setIsSharing] = useState(false)
  const { data } = useUser()
  const watchlist = data?.data?.data?.watchlist

  // Get unique categories
  const categories = Array.from(new Set(images.map((img: any) => img.category)))

  // Filter images by category
  const getImagesByCategory = (category: string) => {
    return images.filter((img: any) => img.category === category)
  }

  // Flatten all images for navigation
  const allImages = images.flatMap((img: any) => (typeof img === "object" && img.url ? [img.url] : [img]))

  useEffect(() => {
    if (watchlist && propertyData?._id) {
      const exists = watchlist.some((item: any) => item._id === propertyData._id)
      setIsSaved(exists)
    }
  }, [watchlist, propertyData?._id])

  const { toggleWatch } = useToggleWatchList()

  const handleWishlistToggle = async (_id: string) => {
    if (!_id) return

    try {
      setIsAnimating(true)
      const newSavedState = !isSaved
      setIsSaved(newSavedState)

      const data = {
        action: newSavedState ? "save" : "unsave",
        propertyId: _id,
      }

      toggleWatch(data)

      toast({
        title: newSavedState ? "Added to wishlist" : "Removed from wishlist",
        description: newSavedState
          ? "Property has been added to your wishlist."
          : "Property has been removed from your wishlist.",
      })
    } catch (error) {
      console.error("Error updating wishlist:", error)
      setIsSaved((prev) => !prev)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update wishlist status.",
      })
    } finally {
      setTimeout(() => {
        setIsAnimating(false)
      }, 1000)
    }
  }

  const handleShare = async () => {
    if (isSharing) return

    setIsSharing(true)
    const currentUrl = window.location.href
    const shareData = {
      title: propertyData.title,
      text: `Check out this property: ${propertyData.title}`,
      url: currentUrl,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
        toast({
          title: "Shared successfully!",
          description: "The property details have been shared.",
        })
      } else {
        await navigator.clipboard.writeText(`${shareData.text}\n\nView property at: ${shareData.url}`)
        toast({
          title: "Link copied!",
          description: "Property link has been copied to your clipboard.",
        })
      }
    } catch (error) {
      console.error("Error sharing:", error)
      toast({
        variant: "destructive",
        title: "Sharing failed",
        description: "There was an error sharing the property details.",
      })
    } finally {
      setIsSharing(false)
    }
  }

  const openImageModal = (image: any, categoryIndex: number, category?: string) => {
    const allFlattenedImages = getAllImagesFlattened(images)
    const imageUrl = typeof image === "string" ? image : image.url

    let globalIndex
    if (category) {
      // Calculate the global index based on the category
      const categoriesBeforeCurrent = categories.slice(0, categories.indexOf(category))
      const previousImagesCount = categoriesBeforeCurrent.reduce(
        (count, cat) => count + getImagesByCategory(cat).length,
        0,
      )
      globalIndex = previousImagesCount + categoryIndex
    } else {
      // Find the index in the flattened array for non-categorized images
      globalIndex = allFlattenedImages.findIndex((img) => {
        const imgUrl = typeof img === "string" ? img : img.url
        return imgUrl === imageUrl
      })
    }

    setSelectedImage(imageUrl)
    setSelectedImageIndex(globalIndex)
    setShowAllPhotos(false)
  }
  const handleNextImage = () => {
    const allFlattenedImages = getAllImagesFlattened(images)
    if (allFlattenedImages.length <= 1) return

    const nextIndex = (selectedImageIndex + 1) % allFlattenedImages.length
    const nextImage = allFlattenedImages[nextIndex]
    setSelectedImage(typeof nextImage === "string" ? nextImage : nextImage.url)
    setSelectedImageIndex(nextIndex)
  }

  const handlePreviousImage = () => {
    const allFlattenedImages = getAllImagesFlattened(images)
    if (allFlattenedImages.length <= 1) return

    const prevIndex = (selectedImageIndex - 1 + allFlattenedImages.length) % allFlattenedImages.length
    const prevImage = allFlattenedImages[prevIndex]
    setSelectedImage(typeof prevImage === "string" ? prevImage : prevImage.url)
    setSelectedImageIndex(prevIndex)
  }
  const displayImages:any = images?.slice(0, 5)
  const remainingCount = Math.max(0, images.length - 5)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return

      if (e.key === "ArrowRight") {
        handleNextImage()
      } else if (e.key === "ArrowLeft") {
        handlePreviousImage()
      } else if (e.key === "Escape") {
        setSelectedImage(null)
        setSelectedImageIndex(-1)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedImage]) //The issue was here.  handleNextImage and handlePreviousImage were removed from the dependency array.

  return (
    <>
      {/* Main Gallery Grid */}
      <div className="relative px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 h-[300px] sm:h-[400px] md:h-[600px]">
          {displayImages[0] && (
            <div className="relative col-span-1 sm:col-span-2 sm:row-span-2 rounded-t-xl sm:rounded-t-none sm:rounded-l-xl overflow-hidden">
              <Image
                src={displayImages[0]?.url || "/placeholder.svg"}
                alt="Property main image"
                fill
                className="object-cover cursor-pointer transition-transform hover:scale-105"
                onClick={() => openImageModal(displayImages[0], 0)}
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}

          {displayImages.slice(1).map((image: any, index: any) => (
            <div
              key={index}
              className={`hidden sm:block relative ${
                index === displayImages.length - 2
                  ? "rounded-tr-xl"
                  : index === displayImages.length - 1
                    ? "rounded-br-xl"
                    : ""
              }`}
            >
              <Image
                src={image?.url || "/placeholder.svg"}
                alt={`Property image ${index + 2}`}
                fill
                className="object-cover cursor-pointer transition-transform hover:scale-105"
                onClick={() => openImageModal(image, index + 1)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {index === displayImages.length - 1 && remainingCount > 0 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white text-lg font-medium">+{remainingCount} more</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-white/90 backdrop-blur-sm hover:bg-white"
            onClick={handleShare}
            disabled={isSharing}
          >
            {isSharing ? (
              <span className="animate-spin text-black">⏳</span>
            ) : (
              <Share className="h-3 w-3 sm:h-4 sm:w-4 text-black" />
            )}
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => handleWishlistToggle(propertyData._id)}
            className={`bg-white/80 hover:bg-white transition-all duration-300
              ${isAnimating ? "scale-125" : "scale-100"}
              hover:shadow-lg mr-2`}
          >
            <Heart
              className={`h-4 w-4 transition-all duration-300
                ${isSaved ? "fill-blue-500 text-blue-500" : "text-gray-500"}
                ${isAnimating ? "animate-ping-once" : ""}
                hover:scale-110`}
            />
          </Button>
        </div>

        {/* Show All Photos Button */}
        <Button
          variant="outline"
          className="absolute bottom-4 right-4 gap-2 bg-white/90 backdrop-blur-sm hover:bg-white text-sm sm:text-base mr-2"
          onClick={() => setShowAllPhotos(true)}
        >
          <Grid className="h-3 w-3 sm:h-4 sm:w-4 text-black" />
          <span className="hidden sm:inline text-black">Show all photos</span>
          <span className="sm:hidden text-black">All photos</span>
        </Button>

        <Badge variant="default" className="absolute top-4 left-4 bg-primary/90 text-xs sm:text-sm ml-2">
          Premium Plus
        </Badge>
      </div>

      {/* Show All Photos Modal */}
      <Dialog open={showAllPhotos} onOpenChange={setShowAllPhotos}>
        <DialogContent className="max-w-7xl h-[90vh] p-0">
          <DialogTitle className="sr-only">All Photos - {propertyData?.title}</DialogTitle>
          <div className="relative h-full overflow-y-auto bg-white">
            <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b p-4">
              <div className="flex items-center justify-between max-w-6xl mx-auto">
                <h1 className="text-2xl font-semibold">All Photos</h1>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full hover:bg-gray-100"
                  onClick={() => setShowAllPhotos(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="max-w-6xl mx-auto p-6 space-y-12">
              {categories.map((category) => (
                <section key={category} className="scroll-mt-20">
                  <div className="flex items-center gap-4 mb-6">
                    <h2 className="text-2xl font-semibold capitalize">{category.replace("-", " ")}</h2>
                    <div className="h-px flex-1 bg-gray-200" />
                    <Badge variant="outline" className="text-sm">
                      {getImagesByCategory(category).length} photos
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getImagesByCategory(category).map((image: any, index) => (
                      <motion.div
                        key={image._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 cursor-pointer"
                        onClick={() => openImageModal(image, index, category)}
                      >
                        <Image
                          src={image.url || "/placeholder.svg"}
                          alt={`${category} image ${index + 1}`}
                          fill
                          className="object-cover transition duration-300 group-hover:scale-105 pointer-events-none"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Individual Image Modal */}
      <Dialog
        open={!!selectedImage}
        onOpenChange={() => {
          setSelectedImage(null)
          setSelectedImageIndex(-1)
        }}
      >
        <DialogContent className="max-w-7xl h-[90vh] p-0 sm:p-0">
          <DialogTitle className="sr-only">Image Viewer - {propertyData?.title}</DialogTitle>
          <div className="relative h-full flex items-center justify-center p-4 sm:p-6 bg-teal/90">
            <Button
              variant="outline"
              size="icon"
              className="absolute top-3 right-3 z-50 rounded-full"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Add image counter */}
            <div className="absolute top-3 left-3 z-50">
              <Badge variant="outline" className="bg-white/10 backdrop-blur-sm">
                {selectedImageIndex + 1} / {allImages.length}
              </Badge>
            </div>

            {allImages.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-50 rounded-full"
                  onClick={handlePreviousImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-50 rounded-full"
                  onClick={handleNextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}

            {selectedImage && (
              <div className="relative w-full h-full transition-opacity duration-300 ease-in-out">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
                </div>
                <Image
                  src={selectedImage || "/placeholder.svg"}
                  alt="Selected property image"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  onLoadingComplete={(img) => {
                    img.classList.remove("opacity-0")
                    img.classList.add("opacity-100")
                  }}
                />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Toaster />
    </>
  )
}

