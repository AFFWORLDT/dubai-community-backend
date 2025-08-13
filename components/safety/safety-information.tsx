import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AlertTriangle, Phone, Shield, UserCheck, Lock, Map, Bell, FileCheck } from 'lucide-react'

const emergencyContacts = [
  { name: "Police", number: "999" },
  { name: "Ambulance", number: "998" },
  { name: "Fire Department", number: "997" },
  { name: "Tourist Police", number: "901" },
]

const safetyFeatures = [
  {
    icon: Shield,
    title: "Verified Properties",
    description: "All properties undergo strict safety inspections",
  },
  {
    icon: UserCheck,
    title: "Identity Verification",
    description: "All hosts and guests are verified",
  },
  {
    icon: Lock,
    title: "Secure Payments",
    description: "Your payments are protected and encrypted",
  },
  {
    icon: Bell,
    title: "24/7 Support",
    description: "Round-the-clock assistance for emergencies",
  },
]

const safetyGuidelines = [
  {
    icon: Map,
    title: "Know Your Location",
    items: [
      "Save the property's exact address",
      "Familiarize yourself with emergency exits",
      "Learn the neighborhood",
    ],
  },
  {
    icon: FileCheck,
    title: "Documentation",
    items: [
      "Keep copies of important documents",
      "Save emergency contact numbers",
      "Take photos of valuable items",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Emergency Prepatealness",
    items: [
      "Locate fire extinguishers and first aid kits",
      "Review evacuation procedures",
      "Save local emergency numbers",
    ],
  },
]

export function SafetyInformation() {
  return (
    <div className=" py-10">
      <div className="px-4 py-10 mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Your Safety is Our Priority</h1>
          <p className="text-muted-foreground text-lg">
            Important safety information and guidelines for your stay
          </p>
        </div>

        {/* Emergency Contacts */}
        <section>
          <Card className="border-primary border-blue-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Phone className="h-5 w-5 text-primary" />
             <span className="text-primary">   Emergency Contacts</span>
              </CardTitle>
              <CardDescription>
                Save these numbers for quick access during emergencies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {emergencyContacts.map((contact) => (
                  <div
                    key={contact.name}
                    className="text-center p-4 rounded-lg bg-muted"
                  >
                    <div className="font-semibold">{contact.name}</div>
                    <div className="text-xl font-bold text-primary">
                      {contact.number}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Safety Features */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Safety Features</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {safetyFeatures.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title}>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-primary/10 text-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                        <CardDescription>{feature.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </section>

        <Separator />

        {/* Safety Guidelines */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Safety Guidelines</h2>
          <div className="grid gap-6">
            {safetyGuidelines.map((guideline) => {
              const Icon = guideline.icon
              return (
                <Card key={guideline.title}>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-primary/10 text-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                      <CardTitle>{guideline.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {guideline.items.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">Need Immediate Assistance?</h2>
          <p className="text-muted-foreground">
            Our support team is available 24/7 for emergency situations
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-primary">
              <Phone className="mr-2 h-4 w-4" />
              Emergency Support
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/help">View Help Center</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}

