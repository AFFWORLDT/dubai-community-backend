"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Clock, Home, Medal } from 'lucide-react'

interface HostInfoProps {
  host: {
    fullName: string
    type: string
    response_rate: number
    response_time: string
    createdAt: string
    listings: number
    verified: boolean
    superhost: boolean
    image: string
  }
}

export function HostInfo({ host }: HostInfoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold text-teal-950 dark:text-teal-50">
        Hosted by {host?.fullName}
      </h2>
      
      <Card className="border-teal-100 dark:border-teal-800 shadow-lg shadow-teal-100/20 dark:shadow-teal-900/30">
        <CardContent className="p-8">
          <div className="flex items-start gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Avatar className="w-20 h-20 border-2 border-teal-200 dark:border-teal-700">
                <AvatarImage src={host?.image} alt={host?.fullName} />
                <AvatarFallback className="bg-teal-50 text-teal-900 text-lg">
                  {host?.fullName ? host.fullName.split(' ').map(n => n[0]).join('') : 'H'}
                </AvatarFallback>
              </Avatar>
            </motion.div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                {host?.superhost && (
                  <Badge variant="secondary" className="bg-teal-50 text-teal-700 dark:bg-teal-900 dark:text-teal-100 font-medium px-3 py-1">
                    <Medal className="w-3.5 h-3.5 mr-1.5" />
                    Superhost
                  </Badge>
                )}
              
                  <Badge variant="secondary" className="bg-teal-50 text-teal-700 dark:bg-teal-900 dark:text-teal-100 font-medium px-3 py-1">
                    <Shield className="w-3.5 h-3.5 mr-1.5" />
                    Verified
                  </Badge>
           
              </div>
              <div className="space-y-3 text-sm text-teal-600 dark:text-teal-300">
                <motion.div 
                  className="flex items-center gap-3"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Clock className="w-4 h-4" />
                  <span>Responds {host?.response_time}</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-3"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Home className="w-4 h-4" />
                  <span>{host?.listings} properties listed</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-3 pl-7"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <span>Joined in {host?.createdAt}</span>
                </motion.div>
              </div>
            </div>
            <Button className="bg-teal-600 hover:bg-teal-700 text-white dark:bg-teal-700 dark:hover:bg-teal-600">
              Contact Host
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
