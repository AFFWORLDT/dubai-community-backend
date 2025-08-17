'use client';

import { useGoogleLogin } from '@react-oauth/google';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { googleAuth } from '@/service/googleAuth';
import { useAuthStore } from '@/Providers/auth-provider';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { AxiosError } from 'axios';
import { FcGoogle } from 'react-icons/fc';
import { Suspense } from 'react';

interface GoogleAuthButtonProps {
  className?: string;
  children?: React.ReactNode;
}

function GoogleAuthButtonInner({ className, children }: GoogleAuthButtonProps) {
  const setAuth = useAuthStore((state) => state.login);
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('returnUrl');
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: googleAuth,
    onSuccess: (response) => {
      console.log('Google auth success response:', response);
      const { accessToken, refreshToken, user } = response.data.data;
      setAuth({ accessToken, refreshToken }, user);
      
      // Redirect to return URL if available, otherwise to properties
      if (returnUrl) {
        router.push(returnUrl);
        toast({
          title: "Google Authentication Successful",
          description: "Redirecting you to your booking...",
          duration: 3000,
        });
      } else {
        router.push('/properties');
        toast({
          title: "Google Authentication Successful",
          description: "Welcome! You have been successfully authenticated.",
          duration: 3000,
        });
      }
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.error('Google auth mutation error:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      
      if (error.response) {
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: error.response.data.message || "Google authentication failed",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: error.message || "Google authentication failed",
        });
      }
    },
  });

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        console.log('=== Google Login Success ===');
        console.log('Token response:', tokenResponse);
        
        // Get user info from Google using access token
        console.log('Fetching user info from Google...');
        const userInfoResponse = await fetch(
          `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`
        );
        
        if (!userInfoResponse.ok) {
          console.error('Failed to get user info from Google:', userInfoResponse.status, userInfoResponse.statusText);
          throw new Error('Failed to get user info from Google');
        }
        
        const userInfo = await userInfoResponse.json();
        console.log('Google user info received:', userInfo);
        
        // Create a token that our backend can understand
        // We'll send the access token and user info together
        const authData = {
          access_token: tokenResponse.access_token,
          user_info: userInfo
        };
        
        console.log('Sending auth data to backend:', authData);
        
        // Send the authentication data to our backend
        mutation.mutate(JSON.stringify(authData));
        
      } catch (error) {
        console.error('Error in Google login flow:', error);
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: "Failed to complete Google authentication. Please try again.",
        });
      }
    },
    onError: (error) => {
      console.error('Google login error:', error);
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "Google login failed. Please try again.",
      });
    },
    scope: 'openid email profile',
  });

  return (
    <Button
      type="button"
      variant="outline"
      className={`w-full ${className}`}
      onClick={() => login()}
      disabled={mutation.isPending}
    >
      {mutation.isPending ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
          Signing in...
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <FcGoogle className="w-5 h-5" />
          {children || "Continue with Google"}
        </div>
      )}
    </Button>
  );
}

export function GoogleAuthButton(props: GoogleAuthButtonProps) {
  return (
    <Suspense fallback={
      <Button
        type="button"
        variant="outline"
        className={`w-full ${props.className}`}
        disabled
      >
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
          Loading...
        </div>
      </Button>
    }>
      <GoogleAuthButtonInner {...props} />
    </Suspense>
  );
}
