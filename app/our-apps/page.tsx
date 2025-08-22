'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Apple, 
  Play, 
  Facebook, 
  Instagram, 
  Youtube, 
  Download,
  Share2,
  Star,
  Users,
  TrendingUp,
  Smartphone,
  MessageCircle
} from 'lucide-react';

const socialPlatforms = [
  {
    name: 'Facebook',
    icon: Facebook,
    url: 'https://www.facebook.com/share/1CXoN6G49z/?mibextid=wwXIfr',
    color: 'bg-blue-600',
    description: 'Follow us for latest updates and exclusive offers',
    followers: '2.5K+'
  },
  {
    name: 'Instagram',
    icon: Instagram,
    url: 'https://www.instagram.com/mybookings.ae?igsh=MWo3cG90dmtpN216Ng%3D%3D&utm_source=qr',
    color: 'bg-gradient-to-r from-purple-500 to-pink-500',
    description: 'Discover luxury properties and stunning visuals',
    followers: '1.8K+'
  },
  {
    name: 'TikTok',
    icon: TrendingUp,
    url: 'https://www.tiktok.com/@mybookings.ae?_t=ZS-8z4SHTnS05B&_r=1',
    color: 'bg-black',
    description: 'Watch property tours and behind-the-scenes content',
    followers: '3.2K+'
  },
  {
    name: 'YouTube',
    icon: Youtube,
    url: 'https://youtube.com/@mybookingsae?si=Khx1LuINJC7fzK5s',
    color: 'bg-red-600',
    description: 'Property videos, tours, and expert insights',
    followers: '1.2K+'
  },
  {
    name: 'WhatsApp',
    icon: MessageCircle,
    url: 'https://whatsapp.com/channel/0029Vb1ikGr60eBYyzypyj3p',
    color: 'bg-green-500',
    description: 'Get instant updates and exclusive offers',
    followers: '5K+'
  }
];

const appStores = [
  {
    name: 'App Store',
    icon: Apple,
    url: 'https://apps.apple.com/in/app/mybookings-ae/id6749492256',
    color: 'bg-black',
    description: 'Download for iOS devices',
    rating: '4.8',
    downloads: '10K+',
    features: ['iOS 15.1+', 'iPad Support', 'Vision Pro Ready']
  },
  {
    name: 'Google Play',
    icon: Play,
    url: 'https://play.google.com/store/apps/details?id=com.mybookings.app&pcampaignid=web_share',
    color: 'bg-green-600',
    description: 'Download for Android devices',
    rating: '4.6',
    downloads: '25K+',
    features: ['Android 5.0+', '50.1 MB', 'Free Download']
  }
];

export default function OurAppsPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleDownload = (url: string) => {
    window.open(url, '_blank');
  };

  const handleSocialClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 py-16 sm:py-20 text-center">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-center justify-center mb-6">
              <Smartphone className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400 mr-3" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Our Apps & Social Media
              </h1>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto px-4">
              Experience unparalleled luxury in Dubai's most prestigious locations. 
              Download our apps and connect with us across all platforms.
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <Badge variant="secondary" className="text-sm sm:text-base px-4 py-2 bg-white/20 backdrop-blur-sm">
                <Smartphone className="w-4 h-4 mr-2" />
                Multi-Platform
              </Badge>
              <Badge variant="secondary" className="text-sm sm:text-base px-4 py-2 bg-white/20 backdrop-blur-sm">
                <Star className="w-4 h-4 mr-2" />
                Premium Experience
              </Badge>
              <Badge variant="secondary" className="text-sm sm:text-base px-4 py-2 bg-white/20 backdrop-blur-sm">
                <Users className="w-4 h-4 mr-2" />
                Growing Community
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 sm:py-16 mobile-scroll">
        {/* Mobile Apps Section */}
        <div className={`mb-16 sm:mb-20 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Download Our Mobile Apps
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Get the ultimate luxury booking experience on your mobile device. 
              Available on both iOS and Android platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {appStores.map((app, index) => (
              <Card 
                key={app.name}
                className="group border-0 bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mb-4">
                    <app.icon className="w-10 h-10 text-gray-700" />
                  </div>
                  <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">{app.name}</CardTitle>
                  <CardDescription className="text-gray-600">{app.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex justify-center items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span>{app.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4 text-blue-500" />
                      <span>{app.downloads}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {app.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    onClick={() => handleDownload(app.url)}
                    className={`w-full ${app.color} text-white font-semibold py-3 text-lg hover:opacity-90 transition-opacity duration-300 touch-target`}
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Separator className="my-12 sm:my-16 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        {/* Social Media Section */}
        <div className={`transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Connect With Us
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Follow us on social media for exclusive content, property updates, 
              and behind-the-scenes luxury experiences.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {socialPlatforms.map((platform, index) => (
              <Card 
                key={platform.name}
                className="group border-0 bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                onClick={() => handleSocialClick(platform.url)}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`mx-auto w-16 h-16 rounded-2xl ${platform.color} flex items-center justify-center mb-4`}>
                    <platform.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl font-bold text-gray-900">{platform.name}</CardTitle>
                  <CardDescription className="text-gray-600 text-sm">{platform.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="text-center">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-4">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span>{platform.followers} followers</span>
                  </div>
                  
                                     <Button 
                     variant="outline" 
                     className="w-full group-hover:bg-blue-50 group-hover:border-blue-300 transition-colors duration-300 touch-target"
                   >
                    <Share2 className="w-4 h-4 mr-2" />
                    Follow Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action Section */}
        <div className={`mt-16 sm:mt-20 text-center transition-all duration-700 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-2xl">
            <CardContent className="py-12 px-8">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                Ready to Experience Luxury?
              </h3>
              <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Download our apps today and discover Dubai's most prestigious properties. 
                Join our growing community of luxury travelers.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  onClick={() => handleDownload('https://apps.apple.com/in/app/mybookings-ae/id6749492256')}
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3 text-lg shadow-lg"
                >
                  <Apple className="w-5 h-5 mr-2" />
                  App Store
                </Button>
                <Button 
                  onClick={() => handleDownload('https://play.google.com/store/apps/details?id=com.mybookings.app&pcampaignid=web_share')}
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3 text-lg shadow-lg"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Google Play
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
