import { Card, CardContent } from "@/components/ui/card"
import { Check } from 'lucide-react'

const requirements = [
  {
    category: "Property Standards",
    items: [
      "Located in prime Dubai locations",
      "High-end furnishings and amenities",
      "Professional cleaning service",
      "High-speed internet",
      "Modern appliances",
    ],
  },
  {
    category: "Documentation",
    items: [
      "Valid property ownership/rental documents",
      "Dubai Tourism license",
      "Insurance coverage",
      "Bank account details",
      "Tax registration",
    ],
  },
  {
    category: "Service Standards",
    items: [
      "24/7 guest support",
      "Professional check-in process",
      "Regular maintenance",
      "Emergency contact availability",
      "Quick response times",
    ],
  },
]

export function PropertyRequirements() {
  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Property Requirements</h2>
        <p className="text-muted-foreground text-lg">
          Ensure your property meets our quality standards
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {requirements.map((req) => (
          <Card key={req.category}>
            <CardContent className="pt-6">
              <h3 className="font-semibold text-lg mb-4">{req.category}</h3>
              <ul className="space-y-3">
                {req.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

