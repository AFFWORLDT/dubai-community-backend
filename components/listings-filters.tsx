'use client'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FilterIcon, XCircle } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"

interface FilterValues {
  address: string;
  city: string;
  bedrooms: string;
  category: string;
  area: string;
  [key: string]: string;
}

interface ListingsFiltersProps {
  filters: FilterValues;
  setFilters: (filters: FilterValues) => void;
  propertyData: any[];
}

export function ListingsFilters({ filters, setFilters, propertyData }: ListingsFiltersProps) {
  const cities = [...new Set(propertyData.map(property => property.city))]
  const addresses = [...new Set(propertyData.map(property => property.address?.address))]
  const bedrooms = [...new Set(propertyData.map(property => property.bedrooms?.toString()))]
  const categories = [...new Set(propertyData.map(property => property.category))]
  const areas = [...new Set(propertyData.map(property => property.area))]

  const handleFilterChange = (type: keyof FilterValues, value: string) => {
    if (!value.trim()) {
      const newFilters = { ...filters }
      delete newFilters[type]
      setFilters(newFilters)
    } else {
      setFilters({ ...filters, [type]: value })
    }
  }

  const resetFilters = () => {
    setFilters({} as FilterValues)
  }

  const getDisplayValue = (key: keyof FilterValues) => {
    return filters[key] ? `(${filters[key]})` : ''
  }

  const filterButtons = [
    { label: 'City', key: 'city', options: ['', ...cities], icon: <FilterIcon className="h-4 w-4" /> },
    { label: 'Address', key: 'address', options: ['', ...addresses] },
    { label: 'Bedrooms', key: 'bedrooms', options: ['', ...bedrooms] },
    { label: 'Category', key: 'category', options: ['', ...categories] },
    { label: 'Area', key: 'area', options: ['', ...areas] },
  ]

  const hasActiveFilters = Object.keys(filters).length > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-lg shadow-sm"
    >
      <div className="flex flex-wrap gap-2 items-center">
        <AnimatePresence>
          {filterButtons.map((filter, index) => (
            <motion.div
              key={filter.key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.1 }}
              className="flex-grow sm:flex-grow-0"
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto min-w-[120px] transition-all duration-200 hover:shadow-md"
                  >
                    {filter.icon && <span className="mr-2">{filter.icon}</span>}
                    {filter.label} {getDisplayValue(filter.key as keyof FilterValues)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300"
                >
                  {filter.options.filter(Boolean).map((option) => (
                    <DropdownMenuItem
                      key={option}
                      onClick={() => handleFilterChange(filter.key as keyof FilterValues, option)}
                      className="hover:bg-gray-100 transition-colors"
                    >
                      {option}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>
          ))}
        </AnimatePresence>

        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex-grow sm:flex-grow-0"
          >
            <Button
              variant="destructive"
              onClick={resetFilters}
              className="w-full sm:w-auto gap-2 hover:bg-primary transition-colors bg-primary"
            >
              <XCircle className="h-4 w-4" />
              Reset Filters
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default ListingsFilters;