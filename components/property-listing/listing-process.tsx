import { Card, CardContent } from "@/components/ui/card"
import { ClipboardList, Camera, CheckCircle, Calendar } from 'lucide-react'

const steps = [
  {
    icon: ClipboardList,
    title: "Submit Details",
    description: "Fill out our property submission form with all relevant details",
  },
  {
    icon: Camera,
    title: "Property Review",
    description: "Our team will review and photograph your property",
  },
  {
    icon: CheckCircle,
    title: "Verification",
    description: "Complete our verification process and quality checks",
  },
  {
    icon: Calendar,
    title: "Go Live",
    description: "Your property goes live and starts receiving bookings",
  },
]

export function ListingProcess() {
  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">How It Works</h2>
        <p className="text-muted-foreground text-lg">
          List your property in four simple steps
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <Card key={step.title} className="relative">
              <CardContent className="pt-6">
                <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <Icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

