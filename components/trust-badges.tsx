"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const trustBadges = [
  {
    name: "Dubai Tourism Board",
    logo: "https://pakistantourntravel.com/wp-content/uploads/2020/06/Image-3-1.jpg",
  },
  {
    name: "Luxury Travel Association",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0zYZNuP1EERBDoRoCPOQd7hDR5LI1ZI3vPg&s",
  },
  {
    name: "International Hotels Group",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7fQnrRp0YiGyzexHJM70w6k-axNkSc4QdSw&s",
  },
  {
    name: "World Travel Awards",
    logo: "https://e8t95d9vg4g.exactdn.com/wp-content/uploads/2024/02/WTA_LOGO-removebg-preview.png?strip=all&lossy=1&ssl=1",
  },
  {
    name: "Forbes Travel Guide",
    logo: "https://media.licdn.com/dms/image/D5612AQH3ZwCc9_L99A/article-cover_image-shrink_720_1280/0/1722197410191?e=2147483647&v=beta&t=AI8-7SIuqr2Y0BeI830LGI7AThpHg_Do5Z0bPpP21bI",
  },
  {
    name: "Condé Nast Traveler",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ25Y8UgFyNnDc1MUfLYiwQm6C0vLfZnUQ7A&s",
  },
]

export function TrustBadges() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Trusted By Industry Leaders</h2>
        <p className="text-muted-foreground">
          Recognized and certified by leading organizations in the travel industry
        </p>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center"
      >
        {trustBadges.map((badge) => (
          <div
            key={badge.name}
            className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300"
          >
            <Image
              src={badge.logo}
              alt={badge.name}
              width={120}
              height={60}
              className="object-cover aspect-auto w-32 h-32"
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

