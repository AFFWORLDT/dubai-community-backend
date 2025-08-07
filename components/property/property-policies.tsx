"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, AlertTriangle, Shield } from 'lucide-react'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

interface PropertyData {
  Check_in_Message: string
  cleaningfee: number
  Check_in_time:string;
  Check_out_time:string;
  otherNotes:string;
  term: {
    smoking: boolean
    drinking: boolean
    pets: boolean
    children: boolean
    party: boolean
  }
  guest_no: string
}

interface PropertyPoliciesProps {
  data: PropertyData
}

export function PropertyPolicies({ data }: PropertyPoliciesProps) {
  // Construct house rules based on the terms and other data
  const houseRules = [
    data.term.smoking===false && "No smoking",
    data.term.pets===false && "No pets allowed",
    data.term.party===false && "No parties or events",
    `Maximum ${data.guest_no} guests`,
    "No unregistered guests",
    data.term.children===false && "No Child Allowed below 12",
    // data.term.drinking && 'No Alchol Allowed'
  ].filter(Boolean) // Remove falsy values

  const policies = {
    check_in: data.Check_in_time,
    check_out: data.Check_out_time,
    cancellation:data.otherNotes||"All bookings are final and non-refundable. No cancellations, modifications, or refunds will be accepted after reservation.",
    house_rules: houseRules,
  }

  return (
    <motion.div initial="hidden" animate="show" variants={container} className="space-y-4 md:space-y-8 px-4 md:px-0">
      <motion.h2 variants={item} className="text-xl md:text-2xl font-semibold tracking-tight">
        Property Policies
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <motion.div variants={item}>
          <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-start gap-4">
                <div className="p-1.5 md:p-2 rounded-lg bg-primary/10">
                  <Clock className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-sm md:text-base font-semibold">Check-in/Check-out Times</h3>
                  <div className="space-y-2 text-xs md:text-sm text-muted-foreground">
                    <p className="flex items-center justify-between">
                      Check-in
                      <span className="font-medium text-foreground">{policies.check_in}</span>
                    </p>
                    <p className="flex items-center justify-between">
                      Check-out
                      <span className="font-medium text-foreground">{policies.check_out}</span>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-start gap-4">
                <div className="p-1.5 md:p-2 rounded-lg bg-primary/10">
                  <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-sm md:text-base font-semibold">Cancellation Policy</h3>
                  <p className="text-sm md:text-sm text-muted-foreground leading-relaxed">{policies.cancellation}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={item}>
        <Card className="transition-all hover:shadow-lg hover:-translate-y-1">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-start gap-4">
              <div className="p-1.5 md:p-2 rounded-lg bg-primary/10">
                <Shield className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              </div>
              <div className="flex-1 space-y-4">
                <h3 className="text-sm md:text-base font-semibold">House Rules</h3>
                <ul className="grid grid-cols-1 xs:grid-cols-2 gap-x-4 md:gap-x-6 gap-y-2 md:gap-y-3">
                  {policies.house_rules.map((rule, index) => (
                    <motion.li
                      key={index}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        show: {
                          opacity: 1,
                          x: 0,
                          transition: { delay: index * 0.1 },
                        },
                      }}
                      className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-muted-foreground"
                    >
                      <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-primary/70" />
                      {rule}
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-border">
                  
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
