'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/Providers/auth-provider';
import { useToast } from '@/components/ui/use-toast';

interface GmailRedirectHandlerProps {
  children: React.ReactNode;
}

function GmailRedirectHandlerInner({ children }: GmailRedirectHandlerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated } = useAuthStore();
  const { toast } = useToast();
  const [isHandlingRedirect, setIsHandlingRedirect] = useState(false);

  useEffect(() => {
    // Check if this is a Gmail redirect
    const referer = document.referrer;
    const isGmailRedirect = referer?.includes('google.com/url') || 
                           referer?.includes('mail.google.com') ||
                           searchParams.get('utm_source') === 'gmail';

    if (isGmailRedirect && !isHandlingRedirect) {
      setIsHandlingRedirect(true);
      
      // If user is not authenticated, redirect to login with return URL
      if (!isAuthenticated) {
        const currentPath = window.location.pathname + window.location.search;
        const loginUrl = `/login?returnUrl=${encodeURIComponent(currentPath)}`;
        
        toast({
          title: "Authentication Required",
          description: "Please login to view your booking details",
          duration: 3000,
        });
        
        router.push(loginUrl);
      } else {
        // User is authenticated, show success message
        toast({
          title: "Welcome back!",
          description: "You have been successfully redirected to your booking",
          duration: 3000,
        });
      }
    }
  }, [isAuthenticated, router, searchParams, toast, isHandlingRedirect]);

  return <>{children}</>;
}

export function GmailRedirectHandler({ children }: GmailRedirectHandlerProps) {
  return (
    <Suspense fallback={<>{children}</>}>
      <GmailRedirectHandlerInner>{children}</GmailRedirectHandlerInner>
    </Suspense>
  );
}
