"use client"; // Ensure this is a client component

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface AchievementCardProps {
  icon: React.ReactNode; // Change this to accept ReactNode
  title: string;
  organization: string;
  description: string;
}

export function AchievementCard({
  icon,
  title,
  organization,
  description,
}: AchievementCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="group hover:shadow-lg transition-all duration-300">
        <CardContent className="p-6 text-center">
          <div className="mb-4 relative">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              {icon /* Render the icon directly */}
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-sm text-primary mb-3">{organization}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
