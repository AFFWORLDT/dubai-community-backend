"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useProfileImage } from "@/hooks/useProfileImage";

interface ProfileAvatarProps {
  profileImg?: string;
  fullName?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const ProfileAvatar = ({ 
  profileImg, 
  fullName, 
  size = "md",
  className = "" 
}: ProfileAvatarProps) => {
  const { imageUrl, isLoading, hasError, retry } = useProfileImage(profileImg);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Reset imageLoaded when imageUrl changes
  useEffect(() => {
    setImageLoaded(false);
  }, [imageUrl]);

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12", 
    lg: "h-24 w-24"
  };

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleImageError = () => {
    console.log('Profile image failed to load, retrying...');
    retry();
  };

  const handleImageLoad = () => {
    console.log('Profile image loaded successfully');
    setImageLoaded(true);
  };

  const shouldShowImage = imageUrl && !hasError && !isLoading;

  return (
    <Avatar className={`${sizeClasses[size]} border-2 border-red-500/10 ${className}`}>
      {shouldShowImage && (
        <AvatarImage
          src={imageUrl}
          alt={`${fullName || 'User'} profile`}
          onError={handleImageError}
          onLoad={handleImageLoad}
          style={{ 
            objectFit: 'cover'
          }}
        />
      )}
      <AvatarFallback 
        className="bg-gradient-to-br from-red-100 to-red-200 text-red-700 font-semibold"
        style={{ 
          display: shouldShowImage && imageLoaded ? 'none' : 'flex' 
        }}
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500"></div>
        ) : (
          getInitials(fullName)
        )}
      </AvatarFallback>
    </Avatar>
  );
};

export default ProfileAvatar;
