/**
 * Utility functions for handling profile images
 */

/**
 * Checks if a URL is a Google profile image
 */
export const isGoogleProfileImage = (url?: string): boolean => {
  if (!url) return false;
  return url.includes('googleusercontent.com') || url.includes('lh3.googleusercontent.com');
};

/**
 * Fixes common issues with Google profile image URLs
 */
export const fixGoogleProfileImageUrl = (url?: string): string => {
  if (!url || !isGoogleProfileImage(url)) {
    return url || '';
  }
  
  // Handle truncated URLs (common issue)
  if (url.includes('lh3.googleusercontent.com/a/') && !url.includes('=')) {
    // The URL from the image description appears to be truncated
    // Try to complete it with common Google profile image parameters
    const baseUrl = url.split('/a/')[0] + '/a/' + url.split('/a/')[1];
    console.log('Fixing truncated Google profile URL:', url, '->', baseUrl + '=s200-c');
    return baseUrl + '=s200-c';
  }
  
  return url;
};

/**
 * Gets a fallback image URL for Google profile images
 * This can be used when the original URL has CORS issues
 */
export const getGoogleProfileImageFallback = (originalUrl?: string): string => {
  if (!originalUrl || !isGoogleProfileImage(originalUrl)) {
    return originalUrl || '';
  }
  
  // Check if the URL is truncated (common issue with Google profile images)
  if (originalUrl.includes('lh3.googleusercontent.com/a/') && !originalUrl.includes('=')) {
    // The URL might be truncated, try to complete it
    const baseUrl = originalUrl.split('/a/')[0] + '/a/' + originalUrl.split('/a/')[1];
    if (baseUrl !== originalUrl) {
      console.log('Attempting to fix truncated Google profile URL:', originalUrl, '->', baseUrl);
      return baseUrl + '=s200-c';
    }
  }
  
  // Try to get a different size or format that might work better
  // Google profile images can be accessed with different size parameters
  try {
    const url = new URL(originalUrl);
    // Remove any existing size parameters
    url.searchParams.delete('sz');
    // Add a larger size parameter that might work better
    url.searchParams.set('sz', '200');
    return url.toString();
  } catch {
    // If URL parsing fails, try to add size parameter manually
    if (originalUrl.includes('lh3.googleusercontent.com/a/')) {
      const separator = originalUrl.includes('?') ? '&' : '?';
      return originalUrl + separator + 'sz=200';
    }
    return originalUrl;
  }
};

/**
 * Validates if an image URL is accessible
 */
export const validateImageUrl = async (url?: string): Promise<boolean> => {
  if (!url) return false;
  
  try {
    const response = await fetch(url, { 
      method: 'HEAD',
      mode: 'no-cors' // This might help with CORS issues
    });
    return true;
  } catch (error) {
    console.log('Image URL validation failed:', url, error);
    return false;
  }
};

/**
 * Gets the best available profile image URL
 */
export const getBestProfileImageUrl = async (originalUrl?: string): Promise<string> => {
  if (!originalUrl) return '';
  
  // If it's a Google profile image, try the fallback first
  if (isGoogleProfileImage(originalUrl)) {
    const fallbackUrl = getGoogleProfileImageFallback(originalUrl);
    const isValid = await validateImageUrl(fallbackUrl);
    if (isValid) {
      return fallbackUrl;
    }
  }
  
  // Try the original URL
  const isValid = await validateImageUrl(originalUrl);
  if (isValid) {
    return originalUrl;
  }
  
  // Return empty string if neither works
  return '';
};
