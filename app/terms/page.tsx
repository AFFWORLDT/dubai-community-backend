import React from 'react';
import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, BookOpen, Calendar, Shield, UserCircle2, Lock, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Terms & Conditions | Mybookings",
  description: "Terms and conditions for using Mybookings",
};

const sections = [
  { id: "introduction", title: "Introduction", icon: BookOpen },
  { id: "booking-terms", title: "Booking Terms", icon: Calendar },
  { id: "cancellation", title: "Cancellation Policy", icon: Shield },
  { id: "responsibilities", title: "User Responsibilities", icon: UserCircle2 },
  { id: "privacy", title: "Privacy & Data", icon: Lock },
  { id: "contact", title: "Contact", icon: Phone }
];

const BulletListItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-3 group p-4 rounded-lg hover:bg-muted/50 transition-all duration-300">
    <div className="h-2 w-2 mt-2 rounded-full bg-primary group-hover:scale-150 transition-transform" />
    <span className="leading-relaxed">{children}</span>
  </li>
);

export default function TermsPage() {
  return (
    <>
      <Head>
        <title>Terms & Conditions | Mybookings</title>
        <description>Terms and conditions for using Mybookings</description>
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-purple-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-teal-600 to-teal-600 text-white overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,teal-300,teal-500)] opacity-75"></div>
            <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:20px_20px]"></div>
          </div>
          <div className="relative max-w-6xl mx-auto px-4 py-24">
            <h1 className="text-5xl font-bold mb-6 animate-in slide-in-from-left duration-500">
              Terms & Conditions
            </h1>
            <p className="text-xl text-teal-100 max-w-2xl animate-in slide-in-from-left duration-500 delay-200">
              Please read these terms carefully before using our services. These guidelines ensure a smooth and secure experience for all users.
            </p>
            <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-tl from-white/10 to-transparent"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="flex gap-12">
            {/* Table of Contents */}
            <Card className="sticky top-8 w-72 hidden lg:block h-fit bg-white/80 backdrop-blur-sm border-none shadow-xl">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-6 text-primary">Quick Navigation</h2>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="flex items-center gap-3 p-3 text-sm text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all duration-300 group"
                    >
                      <section.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                      {section.title}
                      <ChevronRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </a>
                  ))}
                </nav>
              </CardContent>
            </Card>
            
            {/* Content Sections */}
            <div className="flex-1 max-w-4xl">
              <div className="space-y-16">
                {/* Introduction */}
                <section id="introduction" className="scroll-m-20 bg-white/60 rounded-2xl p-8 shadow-lg backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <BookOpen className="h-8 w-8 text-primary" />
                    <h2 className="text-3xl font-semibold text-gray-900">Introduction</h2>
                  </div>
                  <div className="mt-6 space-y-4 text-gray-600 dark:text-gray-400">
                    <p>
                      Welcome to Mybookings. These terms and conditions outline the rules and regulations for the use of our
                      website and services.
                    </p>
                  </div>
                </section>

                {/* Booking Terms */}
                <section id="booking-terms" className="scroll-m-20 bg-white/60 rounded-2xl p-8 shadow-lg backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <Calendar className="h-8 w-8 text-primary" />
                    <h2 className="text-3xl font-semibold text-gray-900">Booking Terms</h2>
                  </div>
                  <div className="mt-6 space-y-4 text-gray-600 dark:text-gray-400">
                    <p>
                      By booking through Mybookings, you agree to the following terms:
                    </p>
                    <ul className="list-none space-y-2 bg-white/60 rounded-xl overflow-hidden">
                      {[
                        "All bookings are subject to availability and confirmation",
                        "A valid ctealit card is requiteal to secure your booking",
                        "Prices are in USD unless otherwise stated",
                        "Additional fees may apply (cleaning, security deposit, etc.)"
                      ].map((item, i) => (
                        <BulletListItem key={i}>{item}</BulletListItem>
                      ))}
                    </ul>
                  </div>
                </section>

                {/* Cancellation Policy */}
                <section id="cancellation" className="scroll-m-20 bg-white/60 rounded-2xl p-8 shadow-lg backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <Shield className="h-8 w-8 text-primary" />
                    <h2 className="text-3xl font-semibold text-gray-900">Cancellation Policy</h2>
                  </div>
                  <div className="space-y-6">
                    <p className="text-gray-600 leading-relaxed text-lg">
                      Our standard cancellation policy is as follows:
                    </p>
                    <ul className="list-none space-y-2 bg-white/60 rounded-xl overflow-hidden">
                      {[
                        "Free cancellation up to 48 hours before check-in",
                        "Cancellations within 48 hours of check-in are non-refundable",
                        "No-shows will be charged the full amount",
                        "Special conditions may apply during peak seasons"
                      ].map((item, i) => (
                        <BulletListItem key={i}>{item}</BulletListItem>
                      ))}
                    </ul>
                  </div>
                </section>

                {/* User Responsibilities */}
                <section id="responsibilities" className="scroll-m-20 bg-white/60 rounded-2xl p-8 shadow-lg backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <UserCircle2 className="h-8 w-8 text-primary" />
                    <h2 className="text-3xl font-semibold text-gray-900">User Responsibilities</h2>
                  </div>
                  <div className="mt-6 space-y-4 text-gray-600 dark:text-gray-400">
                    <p>
                      Users of Mybookings agree to:
                    </p>
                    <ul className="list-none space-y-2 bg-white/60 rounded-xl overflow-hidden">
                      {[
                        "Provide accurate personal and payment information",
                        "Respect property rules and regulations",
                        "Report any issues promptly",
                        "Not engage in fraudulent activities"
                      ].map((item, i) => (
                        <BulletListItem key={i}>{item}</BulletListItem>
                      ))}
                    </ul>
                  </div>
                </section>

                {/* Privacy & Data */}
                <section id="privacy" className="scroll-m-20 bg-white/60 rounded-2xl p-8 shadow-lg backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <Lock className="h-8 w-8 text-primary" />
                    <h2 className="text-3xl font-semibold text-gray-900">Privacy & Data</h2>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    We take your privacy seriously. Please refer to our Privacy Policy for details on how we collect, use, and
                    protect your personal information.
                  </p>
                </section>

                {/* Contact */}
                <section id="contact" className="scroll-m-20 bg-white/60 rounded-2xl p-8 shadow-lg backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <Phone className="h-8 w-8 text-teal-600" />
                    <h2 className="text-3xl font-semibold text-gray-900">Contact</h2>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    If you have any questions about these Terms & Conditions, please contact us at{" "}
                    <a href="mailto:Operations@Mybookings.com" className="text-teal-600 hover:text-teal-700 underline transition-colors">
                      Operations@Mybookings.com
                    </a>
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}