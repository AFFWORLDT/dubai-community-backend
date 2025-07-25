import Image from "next/image"
import { Button } from "@/components/ui/button"

const experiences = [
  {
    title: "Desert Safari",
    description: "Experience the thrill of dune bashing and traditional Arabian nights",
    image: "https://img.freepik.com/free-photo/arab-people-with-camel-caravan_1004-19.jpg?t=st=1736743903~exp=1736747503~hmac=1ef8d39fd80bfe04111a7ccf7dee935852fc7e05209db0b4652c6fdc8d1562e8&w=1800",
  },
  {
    title: "Yacht Tours",
    description: "Cruise through Dubai Marina with stunning skyline views",
    image: "https://img.freepik.com/free-photo/shanghai-skyline-sunny-day-china_1127-3139.jpg?t=st=1736832466~exp=1736836066~hmac=683861c6084f325e5eb5f77a310fd47f4685c3b11abae847aa71000907c38c5a&w=1800",
  },
  {
    title: "Fine Dining",
    description: "Indulge in world-class cuisine at exclusive restaurants",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&q=80",
  },
]

export function ExperienceShowcase() {
  return (
    <section className="py-24 bg-muted">
      <div className=" px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Curated Experiences
          </h2>
          <p className="text-muted-foreground text-lg">
            Enhance your stay with our exclusive collection of luxury experiences
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {experiences.map((experience) => (
            <div
              key={experience.title}
              className="group relative overflow-hidden rounded-xl"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={experience.image}
                  alt={experience.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">{experience.title}</h3>
                <p className="text-white/80 mb-4">{experience.description}</p>
                <Button variant="outline" className="w-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20">
                  Learn More
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

