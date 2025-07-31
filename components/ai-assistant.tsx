"use client"

import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"

export function WhatsAppAssistant() {

  const phoneNumber = "+971566354324" // Replace with the actual Dubai phone number

  const message = "Hi! I'm interested in booking a stay in Dubai."

  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-50">
      <Button
        size="lg"
        onClick={handleWhatsAppClick}
        className="rounded-full shadow-lg gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-3 sm:px-4 py-2 sm:py-3"
      >
        <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="hidden sm:inline">Chat on WhatsApp</span>
        <span className="sm:hidden">Chat</span>
      </Button>
    </div>
  )
}

