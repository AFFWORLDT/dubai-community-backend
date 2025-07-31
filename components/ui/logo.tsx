import Image from "next/image"
import { useState } from "react"

interface LogoProps {
  className?: string
  alt?: string
  variant?: "default" | "small" | "large"
}

export function Logo({ className = "", alt = "Mybookings Logo", variant = "default" }: LogoProps) {
  const [imageError, setImageError] = useState(false)

  const getSizeClasses = () => {
    switch (variant) {
      case "small":
        return "w-24 sm:w-28 md:w-32 h-6 sm:h-7 md:h-8"
      case "large":
        return "w-36 sm:w-44 md:w-56 lg:w-64 h-9 sm:h-11 md:h-14 lg:h-16"
      default:
        return "w-28 sm:w-36 md:w-44 lg:w-48 h-7 sm:h-9 md:h-10"
    }
  }

  // Fallback text logo if image fails to load
  if (imageError) {
    return (
      <div className={`${getSizeClasses()} flex items-center justify-center bg-primary text-white font-bold rounded ${className}`}>
        <span className="text-xs sm:text-sm md:text-base">Mybookings</span>
      </div>
    )
  }

  return (
    <Image
      src="/assets/logo.png"
      alt={alt}
      width={200}
      height={50}
      className={`${getSizeClasses()} object-contain transition-all duration-200 ${className}`}
      onError={() => setImageError(true)}
      priority
    />
  )
} 