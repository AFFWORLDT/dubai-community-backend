import { Button } from "@/components/ui/button"
import { Compass, Utensils, Palmtree, Camera, Plane, Music } from 'lucide-react'

interface ExperienceCategoriesProps {
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

const categories = [
  { id: "all", label: "All Experiences", icon: Compass },
  { id: "adventure", label: "Adventure", icon: Palmtree },
  { id: "culinary", label: "Culinary", icon: Utensils },
  { id: "photography", label: "Photography", icon: Camera },
  { id: "tours", label: "Tours", icon: Plane },
  { id: "entertainment", label: "Entertainment", icon: Music },
]

export function ExperienceCategories({
  selectedCategory,
  onSelectCategory,
}: ExperienceCategoriesProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center">Browse by Category</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className="flex items-center gap-2"
              onClick={() => onSelectCategory(category.id)}
            >
              <Icon className="w-4 h-4" />
              {category.label}
            </Button>
          )
        })}
      </div>
    </div>
  )
}

