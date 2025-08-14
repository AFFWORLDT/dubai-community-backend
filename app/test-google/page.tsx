'use client';

import { GoogleAuthButton } from '@/components/GoogleAuthButton';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';

export default function TestGooglePage() {
  const { toast } = useToast();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Google Authentication Test
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Test the Google authentication flow
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
          <GoogleAuthButton>
            Test Google Sign In
          </GoogleAuthButton>
          
          <div className="text-center">
            <button
              onClick={() => {
                toast({
                  title: "Test Toast",
                  description: "This is a test toast message",
                });
              }}
              className="text-blue-600 hover:text-blue-800"
            >
              Test Toast Notification
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
