"use client"
import { ListingsView } from "@/components/listings-view"
import { ProtectedRoute } from "@/components/Protected"


export default function ListingsPage() {
  return (
  
    <div className="min-h-[calc(100vh-4rem)] px-4">
      <ListingsView />
    </div>

  )
}

