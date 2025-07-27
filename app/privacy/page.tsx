import React from 'react';
import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield, Mail, Cookie, UserCog, Database, Layout } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | DubaiStays",
  description: "Privacy policy and data protection information for DubaiStays users",
};

const PolicySection = ({ title, icon, children }:any) => (
  <Card className="mb-8 dark:bg-gray-800">
    <CardContent className="pt-6">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h2 className="text-2xl font-semibold dark:text-white">{title}</h2>
      </div>
      {children}
    </CardContent>
  </Card>
);

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full px-4 py-32">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4 dark:text-white">Privacy Policy</h1>
          <p className="text-muted-foreground dark:text-gray-400">Last updated: January 5, 2025</p>
        </div>

        <ScrollArea className="space-y-6">
          <PolicySection 
            title="Information We Collect" 
            icon={<Database className="h-6 w-6 text-primary dark:text-blue-400"/>}
          >
            <div className="space-y-4">
              <p className="text-muted-foreground dark:text-gray-400">We collect the following types of information:</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Personal identification information",
                  "Booking information and preferences",
                  "Payment information",
                  "Device and usage information"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <div className="h-2 w-2 rounded-full bg-primary dark:bg-blue-400"/>
                    <span className="text-sm text-muted-foreground dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </PolicySection>

          <PolicySection 
            title="How We Use Your Information" 
            icon={<Layout className="h-6 w-6 text-primary dark:text-blue-400"/>}
          >
            <div className="space-y-4">
              <p className="text-muted-foreground dark:text-gray-400">Your information is used for:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Processing your bookings and payments",
                  "Providing customer support",
                  "Sending booking confirmations and updates",
                  "Improving our services",
                  "Marketing communications (with your consent)"
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground dark:text-gray-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </PolicySection>

          <PolicySection 
            title="Data Protection" 
            icon={<Shield className="h-6 w-6 text-primary dark:text-blue-400"/>}
          >
            <p className="text-muted-foreground dark:text-gray-400 leading-relaxed">
              We implement various security measures to maintain the safety of your personal
              information when you enter, submit, or access your personal information. All
              payment information is encrypted using industry-standard SSL technology.
            </p>
          </PolicySection>

          <PolicySection 
            title="Your Rights" 
            icon={<UserCog className="h-6 w-6 text-primary dark:text-blue-400"/>}
          >
            <div className="space-y-4">
              <p className="text-muted-foreground dark:text-gray-400">You have the right to:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  "Access your personal data",
                  "Correct inaccurate data",
                  "Request deletion of your data",
                  "Object to data processing",
                  "Data portability"
                ].map((right, i) => (
                  <div key={i} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground dark:text-gray-300">{right}</p>
                  </div>
                ))}
              </div>
            </div>
          </PolicySection>

          <PolicySection 
            title="Cookies" 
            icon={<Cookie className="h-6 w-6 text-primary dark:text-blue-400"/>}
          >
            <p className="text-muted-foreground dark:text-gray-400 leading-relaxed">
              We use cookies to improve your browsing experience, analyze site traffic, and
              personalize content. You can control cookies through your browser settings.
            </p>
          </PolicySection>

          <PolicySection 
            title="Contact Us" 
            icon={<Mail className="h-6 w-6 text-primary dark:text-blue-400"/>}
          >
            <p className="text-muted-foreground dark:text-gray-400">
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <a 
                href="mailto:privacy@dubaistays.com" 
                className="text-primary dark:text-blue-400 hover:underline font-medium"
              >
                privacy@dubaistays.com
              </a>
            </p>
          </PolicySection>
        </ScrollArea>
      </div>
    </div>
  );
}