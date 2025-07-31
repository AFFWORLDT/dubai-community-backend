"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, Globe, Clock } from 'lucide-react'

const contacts = [
  {
    title: "Media Inquiries",
    email: "press@ mybookings.ae",
    phone: "+971 4 123 4567",
    icon: Mail,
  },
  {
    title: "Corporate Communications",
    email: "communications@ mybookings.ae",
    phone: "+971 4 123 4568",
    icon: Globe,
  },
]

export function PressContacts() {
  return (
    <section className="py-24">
      <div className=" px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl font-bold">Press Contacts</h2>
            <p className="text-muted-foreground text-lg">
              Get in touch with our media relations team
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {contacts.map((contact, index) => {
              const Icon = contact.icon
              return (
                <motion.div
                  key={contact.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-semibold">{contact.title}</h3>
                          <div className="space-y-1 text-sm">
                            <p className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-muted-foreground" />
                              <a href={`mailto:${contact.email}`} className="text-primary hover:underline">
                                {contact.email}
                              </a>
                            </p>
                            <p className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-muted-foreground" />
                              <a href={`tel:${contact.phone}`} className="text-primary hover:underline">
                                {contact.phone}
                              </a>
                            </p>
                            <p className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span>24/7 Media Support</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          <div className="text-center bg-muted rounded-lg p-8">
            <h3 className="text-xl font-semibold mb-4">Need Immediate Assistance?</h3>
            <p className="text-muted-foreground mb-6">
              Our media relations team is available 24/7 for urgent press inquiries
            </p>
            <Button size="lg">
              Contact Press Team
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

