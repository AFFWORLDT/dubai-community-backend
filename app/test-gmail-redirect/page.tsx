'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/Providers/auth-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TestGmailRedirect() {
  const { isAuthenticated } = useAuthStore();
  const [redirectInfo, setRedirectInfo] = useState<any>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const referer = document.referrer;
      const urlParams = new URLSearchParams(window.location.search);
      
      setRedirectInfo({
        referer,
        isGmailRedirect: referer?.includes('google.com/url') || 
                       referer?.includes('mail.google.com') ||
                       urlParams.get('utm_source') === 'gmail',
        urlParams: Object.fromEntries(urlParams.entries()),
        isAuthenticated,
        currentUrl: window.location.href
      });
    }
  }, [isAuthenticated]);

  const handleOpenOrder = () => {
    if (typeof window !== 'undefined') {
      window.open('/order/test-booking-id', '_blank');
    }
  };

  const handleOpenGmailRedirect = () => {
    if (typeof window !== 'undefined') {
      window.open('/api/auth/gmail-redirect?url=' + encodeURIComponent('/order/test-booking-id'), '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Gmail Redirect Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div>
              <h3 className="font-semibold mb-2">Redirect Information:</h3>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                {JSON.stringify(redirectInfo, null, 2)}
              </pre>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Authentication Status:</h3>
              <p className={`font-medium ${isAuthenticated ? 'text-green-600' : 'text-red-600'}`}>
                {isAuthenticated ? '✅ Authenticated' : '❌ Not Authenticated'}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Test Links:</h3>
              <div className="space-y-2">
                <Button 
                  onClick={handleOpenOrder}
                  variant="outline"
                  className="w-full"
                >
                  Test Direct Order Link
                </Button>
                <Button 
                  onClick={handleOpenGmailRedirect}
                  variant="outline"
                  className="w-full"
                >
                  Test Gmail Redirect Link
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
