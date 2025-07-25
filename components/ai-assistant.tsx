"use client"

import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"

export function WhatsAppAssistant() {

  const phoneNumber = "+971555067557" // Replace with the actual Dubai phone number

  const message = "Hi! I'm interested in booking a stay in Dubai."

  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Button
        size="lg"
        onClick={handleWhatsAppClick}
        className="rounded-full shadow-lg gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
      >
        <MessageSquare className="w-5 h-5" />
        <span>Chat on WhatsApp</span>
      </Button>
    </div>
  )
}

