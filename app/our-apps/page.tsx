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
  Zap
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

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownload = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #3b82f6 2px, transparent 2px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-yellow-400 mr-3 animate-pulse" />
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Our Apps & Social Media
              </h1>
              <Sparkles className="w-8 h-8 text-yellow-400 ml-3 animate-pulse" />
            </div>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Experience unparalleled luxury in Dubai's most prestigious locations. 
              Download our apps and connect with us across all platforms.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="text-lg px-4 py-2 bg-white/20 backdrop-blur-sm border-white/30">
                <Globe className="w-4 h-4 mr-2" />
                Multi-Platform
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2 bg-white/20 backdrop-blur-sm border-white/30">
                <Star className="w-4 h-4 mr-2" />
                Premium Experience
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2 bg-white/20 backdrop-blur-sm border-white/30">
                <Users className="w-4 h-4 mr-2" />
                Growing Community
              </Badge>
            </div>
          </div>
        </div>
        
        {/* Enhanced Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-400/20 rounded-full blur-xl animate-pulse delay-500"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-indigo-400/20 rounded-full blur-xl animate-pulse delay-1500"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative">
        {/* Floating Download Button */}
        <div className="fixed bottom-8 right-8 z-50">
          <Button 
            onClick={() => handleDownload('https://play.google.com/store/apps/details?id=com.mybookings.app&pcampaignid=web_share')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-110 rounded-full w-16 h-16 p-0"
          >
            <Download className="w-6 h-6" />
          </Button>
        </div>

        {/* Mobile Apps Section */}
        <div className={`mb-20 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <Zap className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Download Our Mobile Apps
              </h2>
              <Zap className="w-8 h-8 text-blue-600 ml-3" />
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get the ultimate luxury booking experience on your mobile device. 
              Available on both iOS and Android platforms.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {appStores.map((app, index) => (
              <Card 
                key={app.name}
                className={`group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white/90 backdrop-blur-sm relative overflow-hidden ${app.color.includes('black') ? 'hover:shadow-blue-500/25' : 'hover:shadow-green-500/25'}`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Gradient Border Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${app.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg`}></div>
                <div className="relative bg-white rounded-lg p-6">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <app.icon className="w-10 h-10 text-gray-700" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900">{app.name}</CardTitle>
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
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      onClick={() => handleDownload(app.url)}
                      className={`w-full ${app.color} text-white font-semibold py-3 text-lg group-hover:scale-105 transition-transform duration-300 shadow-lg`}
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download Now
                    </Button>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <Separator className="my-16 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        {/* Social Media Section */}
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Connect With Us
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Follow us on social media for exclusive content, property updates, 
              and behind-the-scenes luxury experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {socialPlatforms.map((platform, index) => (
              <Card 
                key={platform.name}
                className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white/90 backdrop-blur-sm cursor-pointer relative overflow-hidden"
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => handleDownload(platform.url)}
              >
                {/* Gradient Border Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${platform.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg`}></div>
                <div className="relative bg-white rounded-lg p-6">
                  <CardHeader className="text-center pb-4">
                    <div className={`mx-auto w-16 h-16 rounded-2xl ${platform.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <platform.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">{platform.name}</CardTitle>
                    <CardDescription className="text-gray-600 text-sm">{platform.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="text-center">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-4">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span>{platform.followers} followers</span>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-blue-50 group-hover:border-blue-300 transition-colors duration-300"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Follow Now
                    </Button>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action Section */}
        <div className={`mt-20 text-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-2xl relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, #ffffff 2px, transparent 2px)`,
                backgroundSize: '30px 30px'
              }}></div>
            </div>
            <CardContent className="py-12 px-8 relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Experience Luxury?
              </h3>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Download our apps today and discover Dubai's most prestigious properties. 
                Join our growing community of luxury travelers.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  onClick={() => handleDownload('https://apps.apple.com/in/app/mybookings-ae/id6749492256')}
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Apple className="w-5 h-5 mr-2" />
                  App Store
                </Button>
                <Button 
                  onClick={() => handleDownload('https://play.google.com/store/apps/details?id=com.mybookings.app&pcampaignid=web_share')}
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
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
