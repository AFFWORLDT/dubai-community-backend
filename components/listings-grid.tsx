import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Heart } from 'lucide-react'

const listings = [
  {
    id: 1,
    title: "Luxury Penthouse with Burj Khalifa View",
    location: "Downtown Dubai",
    price: 1200,
    rating: 4.9,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&q=80",
    type: "Penthouse",
    beds: 3,
    baths: 3,
  },
  {
    id: 2,
    title: "Palm Jumeirah Beach Villa",
    location: "Palm Jumeirah",
    price: 2500,
    rating: 4.8,
    reviews: 96,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&q=80",
    type: "Villa",
    beds: 5,
    baths: 6,
  },
  {
    id: 3,
    title: "Marina Luxury Apartment",
    location: "Dubai Marina",
    price: 800,
    rating: 4.7,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&q=80",
    type: "Apartment",
    beds: 2,
    baths: 2,
  },
]

export function ListingsGrid() {
  return (
    <div className=" py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <Card key={listing.id} className="group overflow-hidden">
            <div className="relative aspect-[4/3]">
              <Image
                src={listing.image}
                alt={listing.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <button className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white">
                <Heart className="w-4 h-4" />
              </button>
              <Badge className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm hover:bg-white text-black">
                {listing.type}
              </Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold truncate">{listing.title}</h3>
              <p className="text-sm text-muted-foreground">{listing.location}</p>
              <div className="flex items-center gap-2 mt-2 text-sm">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <span>{listing.rating}</span>
                <span className="text-muted-foreground">
                  ({listing.reviews} reviews)
                </span>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                {listing.beds} beds · {listing.baths} baths
              </div>
              <div className="flex items-center gap-2">
                <div>
                  <span className="font-semibold">${listing.price}</span>
                  <span className="text-muted-foreground"> /night</span>
                </div>
                <Button asChild>
                  <Link href={`/listings/${listing.id}`}>View Details</Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

