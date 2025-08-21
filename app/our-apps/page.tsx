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
  Smartphone, 
  Globe, 
  Download,
  Share2,
  Star,
  Users,
  TrendingUp,
  Sparkles,
  Zap,
  Menu,
  X
} from 'lucide-react';

const socialPlatforms = [
  {
    name: 'Facebook',
    icon: Facebook,
    url: 'https://www.facebook.com/share/1CXoN6G49z/?mibextid=wwXIfr',
    color: 'bg-blue-600 hover:bg-blue-700',
    description: 'Follow us for latest updates and exclusive offers',
    followers: '2.5K+',
    category: 'Social Media',
    gradient: 'from-blue-500 to-blue-600'
  },
  {
    name: 'Instagram',
    icon: Instagram,
    url: 'https://www.instagram.com/mybookings.ae?igsh=MWo3cG90dmtpN216Ng%3D%3D&utm_source=qr',
    color: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
    description: 'Discover luxury properties and stunning visuals',
    followers: '1.8K+',
    category: 'Social Media',
    gradient: 'from-purple-500 via-pink-500 to-red-500'
  },
  {
    name: 'TikTok',
    icon: TrendingUp,
    url: 'https://www.tiktok.com/@mybookings.ae?_t=ZS-8z4SHTnS05B&_r=1',
    color: 'bg-black hover:bg-gray-800',
    description: 'Watch property tours and behind-the-scenes content',
    followers: '3.2K+',
    category: 'Social Media',
    gradient: 'from-gray-800 to-black'
  },
  {
    name: 'YouTube',
    icon: Youtube,
    url: 'https://youtube.com/@mybookingsae?si=Khx1LuINJC7fzK5s',
    color: 'bg-red-600 hover:bg-red-700',
    description: 'Property videos, tours, and expert insights',
    followers: '1.2K+',
    category: 'Social Media',
    gradient: 'from-red-500 to-red-600'
  }
];

const appStores = [
  {
    name: 'App Store',
    icon: Apple,
    url: 'https://apps.apple.com/in/app/mybookings-ae/id6749492256',
    color: 'bg-black hover:bg-gray-800',
    description: 'Download for iOS devices',
    rating: '4.8',
    downloads: '10K+',
    category: 'Mobile App',
    features: ['iOS 15.1+', 'iPad Support', 'Vision Pro Ready'],
    gradient: 'from-gray-800 to-black'
  },
  {
    name: 'Google Play',
    icon: Play,
    url: 'https://play.google.com/store/apps/details?id=com.mybookings.app&pcampaignid=web_share',
    color: 'bg-green-600 hover:bg-green-700',
    description: 'Download for Android devices',
    rating: '4.6',
    downloads: '25K+',
    category: 'Mobile App',
    features: ['Android 5.0+', '50.1 MB', 'Free Download'],
    gradient: 'from-green-500 to-green-600'
  }
];

export default function OurAppsPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    
    // Set initial mobile state
    setIsMobile(window.innerWidth < 768);
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleDownload = (url: string) => {
    // Add mobile-specific handling
    if (isMobile) {
      // For mobile, try to open in app store if possible
      if (url.includes('apps.apple.com')) {
        // Try to open in App Store app
        window.location.href = url;
      } else if (url.includes('play.google.com')) {
        // Try to open in Play Store app
        window.location.href = url;
      } else {
        window.open(url, '_blank');
      }
    } else {
      window.open(url, '_blank');
    }
  };

  const handleSocialClick = (url: string) => {
    if (isMobile) {
      // For mobile, try to open in native app if available
      if (url.includes('instagram.com')) {
        // Try to open in Instagram app
        const instagramUrl = url.replace('https://www.instagram.com', 'instagram://user');
        window.location.href = instagramUrl;
        // Fallback to web if app not available
        setTimeout(() => {
          window.open(url, '_blank');
        }, 1000);
      } else if (url.includes('facebook.com')) {
        // Try to open in Facebook app
        const facebookUrl = url.replace('https://www.facebook.com', 'fb://page');
        window.location.href = facebookUrl;
        // Fallback to web if app not available
        setTimeout(() => {
          window.open(url, '_blank');
        }, 1000);
      } else {
        window.open(url, '_blank');
      }
    } else {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Mobile-specific viewport optimization */}
      <style jsx>{`
        @media (max-width: 768px) {
          .mobile-optimized {
            -webkit-overflow-scrolling: touch;
            overscroll-behavior: contain;
          }
        }
      `}</style>

      {/* Background Pattern - Reduced for mobile */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #3b82f6 2px, transparent 2px)`,
          backgroundSize: isMobile ? '30px 30px' : '50px 50px'
        }}></div>
      </div>

      {/* Hero Section - Mobile Optimized */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 container mx-auto px-4 py-12 sm:py-16 md:py-20 text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-center justify-center mb-4 flex-wrap">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 mr-2 sm:mr-3 animate-pulse" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
                Our Apps & Social Media
              </h1>
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 ml-2 sm:ml-3 animate-pulse" />
            </div>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-6 sm:mb-8 max-w-3xl mx-auto px-2">
              Experience unparalleled luxury in Dubai's most prestigious locations. 
              Download our apps and connect with us across all platforms.
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 px-2">
              <Badge variant="secondary" className="text-sm sm:text-lg px-3 py-2 sm:px-4 bg-white/20 backdrop-blur-sm border-white/30">
                <Globe className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                Multi-Platform
              </Badge>
              <Badge variant="secondary" className="text-sm sm:text-lg px-3 py-2 sm:px-4 bg-white/20 backdrop-blur-sm border-white/30">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                Premium Experience
              </Badge>
              <Badge variant="secondary" className="text-sm sm:text-lg px-3 py-2 sm:px-4 bg-white/20 backdrop-blur-sm border-white/30">
                <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                Growing Community
              </Badge>
            </div>
          </div>
        </div>
        
        {/* Enhanced Floating Elements - Mobile Optimized */}
        <div className="absolute top-20 left-10 w-16 h-16 sm:w-20 sm:h-20 bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 sm:w-32 sm:h-32 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 sm:w-16 sm:h-16 bg-pink-400/20 rounded-full blur-xl animate-pulse delay-500"></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 sm:w-24 sm:h-24 bg-indigo-400/20 rounded-full blur-xl animate-pulse delay-1500"></div>
      </div>

      <div className="container mx-auto px-4 py-12 sm:py-16 relative mobile-optimized">
        {/* Floating Download Button - Mobile Optimized */}
        <div className={`fixed ${isMobile ? 'bottom-4 right-4' : 'bottom-8 right-8'} z-50`}>
          <Button 
            onClick={() => handleDownload('https://play.google.com/store/apps/details?id=com.mybookings.app&pcampaignid=web_share')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-110 active:scale-95 rounded-full w-14 h-14 sm:w-16 sm:h-16 p-0 touch-manipulation"
            aria-label="Quick Download"
          >
            <Download className="w-5 h-5 sm:w-6 sm:h-6" />
          </Button>
        </div>

        {/* Mobile Menu Toggle - Only visible on mobile */}
        {isMobile && (
          <div className="md:hidden mb-6">
            <Button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              variant="outline"
              className="w-full bg-white/90 backdrop-blur-sm border-blue-200 touch-manipulation"
            >
              {showMobileMenu ? (
                <>
                  <X className="w-4 h-4 mr-2" />
                  Hide Quick Links
                </>
              ) : (
                <>
                  <Menu className="w-4 h-4 mr-2" />
                  Show Quick Links
                </>
              )}
            </Button>
          </div>
        )}

        {/* Mobile Quick Links Menu */}
        {isMobile && showMobileMenu && (
          <div className="md:hidden mb-8 p-4 bg-white/90 backdrop-blur-sm rounded-lg border border-blue-200 shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Quick Access</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => handleDownload('https://apps.apple.com/in/app/mybookings-ae/id6749492256')}
                className="bg-black text-white hover:bg-gray-800 text-sm py-3 touch-manipulation active:scale-95"
              >
                <Apple className="w-4 h-4 mr-2" />
                iOS App
              </Button>
              <Button
                onClick={() => handleDownload('https://play.google.com/store/apps/details?id=com.mybookings.app&pcampaignid=web_share')}
                className="bg-green-600 text-white hover:bg-green-700 text-sm py-3 touch-manipulation active:scale-95"
              >
                <Play className="w-4 h-4 mr-2" />
                Android App
              </Button>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Button
                onClick={() => handleSocialClick('https://www.instagram.com/mybookings.ae?igsh=MWo3cG90dmtpN216Ng%3D%3D&utm_source=qr')}
                variant="outline"
                className="text-sm py-3 touch-manipulation active:scale-95"
              >
                <Instagram className="w-4 h-4 mr-2" />
                Instagram
              </Button>
              <Button
                onClick={() => handleSocialClick('https://www.facebook.com/share/1CXoN6G49z/?mibextid=wwXIfr')}
                variant="outline"
                className="text-sm py-3 touch-manipulation active:scale-95"
              >
                <Facebook className="w-4 h-4 mr-2" />
                Facebook
              </Button>
            </div>
          </div>
        )}

        {/* Mobile Apps Section - Mobile Optimized */}
        <div className={`mb-16 sm:mb-20 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12 sm:mb-16">
            <div className="flex items-center justify-center mb-4 flex-wrap">
              <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mr-2 sm:mr-3" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                Download Our Mobile Apps
              </h2>
              <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 ml-2 sm:ml-3" />
            </div>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-2">
              Get the ultimate luxury booking experience on your mobile device. 
              Available on both iOS and Android platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {appStores.map((app, index) => (
              <Card 
                key={app.name}
                className={`group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 active:scale-95 border-0 bg-white/90 backdrop-blur-sm relative overflow-hidden touch-manipulation ${app.color.includes('black') ? 'hover:shadow-blue-500/25' : 'hover:shadow-green-500/25'}`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Gradient Border Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${app.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg`}></div>
                <div className="relative bg-white rounded-lg p-4 sm:p-6">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <app.icon className="w-8 h-8 sm:w-10 sm:h-10 text-gray-700" />
                    </div>
                    <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">{app.name}</CardTitle>
                    <CardDescription className="text-gray-600 text-sm sm:text-base">{app.description}</CardDescription>
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
                        <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      onClick={() => handleDownload(app.url)}
                      className={`w-full ${app.color} text-white font-semibold py-3 sm:py-3 text-base sm:text-lg group-hover:scale-105 transition-transform duration-300 shadow-lg active:scale-95 touch-manipulation`}
                    >
                      <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Download Now
                    </Button>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <Separator className="my-12 sm:my-16 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        {/* Social Media Section - Mobile Optimized */}
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Connect With Us
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-2">
              Follow us on social media for exclusive content, property updates, 
              and behind-the-scenes luxury experiences.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {socialPlatforms.map((platform, index) => (
              <Card 
                key={platform.name}
                className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 active:scale-95 border-0 bg-white/90 backdrop-blur-sm cursor-pointer relative overflow-hidden touch-manipulation"
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => handleSocialClick(platform.url)}
              >
                {/* Gradient Border Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${platform.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg`}></div>
                <div className="relative bg-white rounded-lg p-4 sm:p-6">
                  <CardHeader className="text-center pb-4">
                    <div className={`mx-auto w-12 h-12 sm:w-16 sm:h-16 rounded-2xl ${platform.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <platform.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl font-bold text-gray-900">{platform.name}</CardTitle>
                    <CardDescription className="text-gray-600 text-xs sm:text-sm leading-relaxed">{platform.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="text-center">
                    <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-600 mb-4">
                      <Users className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                      <span>{platform.followers} followers</span>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full text-xs sm:text-sm group-hover:bg-blue-50 group-hover:border-blue-300 transition-colors duration-300 py-2 sm:py-2"
                    >
                      <Share2 className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                      Follow Now
                    </Button>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action Section - Mobile Optimized */}
        <div className={`mt-16 sm:mt-20 text-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-2xl relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, #ffffff 2px, transparent 2px)`,
                backgroundSize: isMobile ? '20px 20px' : '30px 30px'
              }}></div>
            </div>
            <CardContent className="py-8 sm:py-12 px-4 sm:px-8 relative z-10">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                Ready to Experience Luxury?
              </h3>
              <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
                Download our apps today and discover Dubai's most prestigious properties. 
                Join our growing community of luxury travelers.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <Button 
                  onClick={() => handleDownload('https://apps.apple.com/in/app/mybookings-ae/id6749492256')}
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-6 sm:px-8 py-3 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 touch-manipulation"
                >
                  <Apple className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  App Store
                </Button>
                <Button 
                  onClick={() => handleDownload('https://play.google.com/store/apps/details?id=com.mybookings.app&pcampaignid=web_share')}
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-6 sm:px-8 py-3 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 touch-manipulation"
                >
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
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
