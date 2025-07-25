import { Metadata } from "next"
import { PropertyGrid } from "@/components/property-grid"

export const metadata: Metadata = {
  title: "Properties | Primevista Holidayhomes",
  description: "Browse our collection of luxury properties in Dubai",
}

export default function PropertiesPage() {
  return (

    <div className="py-10 px-8">
      
      <PropertyGrid />
     
    </div>

  )
}

