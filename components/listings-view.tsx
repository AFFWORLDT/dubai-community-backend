"use client"

import { useState } from "react"
import { ListingsGrid } from "@/components/listings-grid"
import { ListingsMap } from "@/components/listings-map"
import { ListingsFilters } from "@/components/listings-filters"
import { Button } from "@/components/ui/button"
import { Map, Grid } from 'lucide-react'

export function ListingsView() {
  const [view, setView] = useState<"grid" | "map">("grid")

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <div className="w-full flex flex-col">
        <div className="border-b bg-background">
          <div className="px-8 flex items-center justify-between py-4">
            {/* <ListingsFilters /> */}
            <div className="flex items-center gap-2">
              <Button
                variant={view === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setView("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={view === "map" ? "default" : "outline"}
                size="icon"
                onClick={() => setView("map")}
              >
                <Map className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          {view === "grid" ? <ListingsGrid /> : <ListingsMap />}
        </div>
      </div>
    </div>
  )
}

