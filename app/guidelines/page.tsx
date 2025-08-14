import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Users, 
  Home, 
  Shield, 
  AlertTriangle, 
  Gavel, 
  Mail,
  MessageSquare,
  CheckCircle,
  XCircle,
  UserCheck,
  Building,
  Lock
} from 'lucide-react';

export default function GuidelinesPage() {
  const sections = [
    {
      title: "For Guests",
      icon: UserCheck,
      color: "text-blue-500",
      subsections: [
        {
          title: "Booking and Communication",
          items: [
            "Provide accurate information when booking",
            "Communicate respectfully with hosts",
            "Report any issues promptly",
            "Follow property rules and check-in procedures",
            "Respect the privacy and property of others"
          ]
        }
      ]
    },
    {
      title: "For Hosts",
      icon: Building,
      color: "text-green-500",
      subsections: [
        {
          title: "Listing and Hosting",
          items: [
            "Provide accurate property descriptions and photos",
            "Maintain clean and safe accommodations",
            "Respond to inquiries promptly",
            "Honor confirmed bookings",
            "Follow local regulations and laws"
          ]
        }
      ]
    },
    {
      title: "Safety and Security",
      icon: Shield,
      color: "text-purple-500",
      subsections: [
        {
          title: "",
          items: [
            "Verify your identity",
            "Follow security protocols",
            "Report suspicious activity",
            "Keep personal information private",
            "Use secure payment methods"
          ]
        }
      ]
    },
    {
      title: "Prohibited Activities",
      icon: XCircle,
      color: "text-blue-500",
      subsections: [
        {
          title: "",
          items: [
            "Discrimination or harassment",
            "Fraudulent activity",
            "Illegal activities",
            "Spam or solicitation",
            "Property damage or theft"
          ]
        }
      ]
    }
  ];

  const enforcements = [
    "Warnings",
    "Temporary suspension",
    "Permanent account termination",
    "Legal action if necessary"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12">
      <div className=" mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Users className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Community Guidelines
            </h1>

            <Card className="border-none shadow-lg bg-gradient-to-r from-primary/10 to-primary/5">
              <CardContent className="pt-6">
                <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  At mybookings, we believe in creating a respectful, inclusive, and safe
                  community for all our users. These guidelines help ensure everyone has a
                  positive experience.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Sections */}
          <div className="grid gap-8 md:grid-cols-2">
            {sections.map((section, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <section.icon className={`w-6 h-6 ${section.color}`} />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {section.subsections.map((subsection, subIndex) => (
                    <div key={subIndex} className="space-y-4">
                      {subsection.title && (
                        <h3 className="text-xl font-medium mb-2">{subsection.title}</h3>
                      )}
                      <ul className="space-y-2">
                        {subsection.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Enforcement Section */}
          <Card className="border-none shadow-lg mt-8">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Gavel className="w-6 h-6 text-orange-500" />
                Enforcement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Violations of these guidelines may result in:
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {enforcements.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-accent/50">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card className="border-none shadow-lg bg-gradient-to-r from-primary/10 to-primary/5">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Mail className="w-6 h-6 text-primary" />
                Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                If you have questions about our guidelines or need to report a violation,
                please contact us at{" "}
                <a 
                  href="mailto:support@mybookings.ae" 
                  className="text-primary hover:underline font-medium inline-flex items-center gap-1"
                >
                  support@mybookings.ae
                  <MessageSquare className="w-4 h-4" />
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}