import { useState, useEffect } from 'react';
import { isGoogleProfileImage, getGoogleProfileImageFallback, fixGoogleProfileImageUrl } from '@/utils/imageUtils';

interface UseProfileImageReturn {
  imageUrl: string | null;
  isLoading: boolean;
  hasError: boolean;
  retry: () => void;
}

export const useProfileImage = (originalUrl?: string): UseProfileImageReturn => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const maxAttempts = 4;

  const testImageUrl = async (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
      
      // Timeout after 5 seconds
      setTimeout(() => resolve(false), 5000);
    });
  };

  const loadImage = async () => {
    if (!originalUrl) {
      setImageUrl(null);
      setHasError(false);
      return;
    }

    setIsLoading(true);
    setHasError(false);

    try {
      // First attempt: original URL
      if (attempts === 0) {
        const isValid = await testImageUrl(originalUrl);
        if (isValid) {
          setImageUrl(originalUrl);
          setIsLoading(false);
          return;
        }
      }

      // Second attempt: fixed Google profile image URL
      if (attempts === 1 && isGoogleProfileImage(originalUrl)) {
        const fixedUrl = fixGoogleProfileImageUrl(originalUrl);
        const isValid = await testImageUrl(fixedUrl);
        if (isValid) {
          setImageUrl(fixedUrl);
          setIsLoading(false);
          return;
        }
      }

      // Third attempt: Google profile image fallback
      if (attempts === 2 && isGoogleProfileImage(originalUrl)) {
        const fallbackUrl = getGoogleProfileImageFallback(originalUrl);
        const isValid = await testImageUrl(fallbackUrl);
        if (isValid) {
          setImageUrl(fallbackUrl);
          setIsLoading(false);
          return;
        }
      }

      // Fourth attempt: Try with different Google image parameters
      if (attempts === 3 && isGoogleProfileImage(originalUrl)) {
        try {
          const url = new URL(originalUrl);
          url.searchParams.set('sz', '150');
          const alternativeUrl = url.toString();
          const isValid = await testImageUrl(alternativeUrl);
          if (isValid) {
            setImageUrl(alternativeUrl);
            setIsLoading(false);
            return;
          }
        } catch (error) {
          console.log('Failed to create alternative Google image URL');
        }
      }

      // All attempts failed
      setHasError(true);
      setImageUrl(null);
    } catch (error) {
      console.log('Error loading profile image:', error);
      setHasError(true);
      setImageUrl(null);
    } finally {
      setIsLoading(false);
    }
  };

  const retry = () => {
    if (attempts < maxAttempts) {
      setAttempts(prev => prev + 1);
    }
  };

  useEffect(() => {
    setAttempts(0);
    loadImage();
  }, [originalUrl]);

  useEffect(() => {
    if (attempts > 0 && attempts <= maxAttempts) {
      loadImage();
    }
  }, [attempts]);

  return {
    imageUrl,
    isLoading,
    hasError,
    retry
  };
};
