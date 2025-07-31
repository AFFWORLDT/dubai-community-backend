import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Settings, BarChart3, Target, Cookie, Mail, ExternalLink } from 'lucide-react';

const CookiePolicy = () => {
  const cookieTypes = [
    {
      title: "Essential Cookies",
      description: "Required for basic website functionality. Cannot be disabled.",
      icon: Shield,
      color: "text-green-500"
    },
    {
      title: "Preference Cookies",
      description: "Remember your settings and preferences.",
      icon: Settings,
      color: "text-blue-500"
    },
    {
      title: "Analytics Cookies",
      description: "Help us understand how visitors interact with our website.",
      icon: BarChart3,
      color: "text-purple-500"
    },
    {
      title: "Marketing Cookies",
      description: "Used to deliver relevant advertisements and track campaign performance.",
      icon: Target,
      color: "text-orange-500"
    }
  ];

  const useCases = [
    "Essential website functionality",
    "Remembering your preferences",
    "Authentication and security",
    "Analytics and performance",
    "Personalized content and ads"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12">
      <div className="mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Cookie className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Cookie Policy
            </h1>

          </div>

          {/* What Are Cookies */}
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Cookie className="w-6 h-6 text-primary" />
                What Are Cookies?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Cookies are small text files that are stored on your computer or mobile device
                when you visit a website. They are widely used to make websites work more
                efficiently and provide a better user experience.
              </p>
            </CardContent>
          </Card>

          {/* Types of Cookies */}
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Types of Cookies We Use</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                {cookieTypes.map((type, index) => (
                  <div key={index} className="group p-4 rounded-lg border bg-card hover:bg-accent transition-colors">
                    <div className="flex gap-4">
                      <div className={`${type.color} transition-transform group-hover:scale-110`}>
                        <type.icon size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">{type.title}</h3>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* How We Use Cookies */}
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">How We Use Cookies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {useCases.map((useCase, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span className="text-muted-foreground">{useCase}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Managing Cookies */}
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Settings className="w-6 h-6 text-primary" />
                Managing Cookies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                You can control and/or delete cookies as you wish. You can delete all cookies
                that are already on your computer and you can set most browsers to prevent them
                from being placed. However, if you do this, you may have to manually adjust some
                preferences every time you visit a site, and some services and functionalities
                may not work.
              </p>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Mail className="w-6 h-6 text-primary" />
                Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                If you have any questions about our Cookie Policy, please contact us at{" "}
                <a 
                  href="mailto:info@mybookings.ae" 
                  className="text-primary hover:underline font-medium inline-flex items-center gap-1"
                >
                  info@mybookings.ae
                  <ExternalLink className="w-4 h-4" />
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;