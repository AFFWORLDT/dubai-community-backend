import { Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface Review {
  id: string
  user: {
    name: string
    image?: string
  }
  rating: number
  comment: string
  date: string
}


const hotelReviews: Review[] = [
  {
    id: "1",
    user: {
      name: "Sarah Johnson",
      image: "/placeholder.svg?height=40&width=40",
    },
    rating: 5,
    comment:
      "Absolutely loved my stay at Cosmos Living! The modern amenities and stunning city views exceeded my expectations. The staff was incredibly attentive, and the rooftop pool is a must-visit spot. Will definitely be returning for my next business trip.",
    date: "February 10, 2024",
  },
  {
    id: "2",
    user: {
      name: "Michael Chen",
      image: "/placeholder.svg?height=40&width=40",
    },
    rating: 4,
    comment:
      "Great location with easy access to restaurants and shopping. The room was spacious and well-designed. Only minor issue was some noise from the street, but the comfortable bed made up for it.",
    date: "February 5, 2024",
  },
  {
    id: "3",
    user: {
      name: "Emma Rodriguez",
    },
    rating: 5,
    comment:
      "The attention to detail at Cosmos Living is remarkable. From the welcome amenities to the daily housekeeping, everything was perfect. The in-room coffee machine and smart TV were great touches.",
    date: "January 28, 2024",
  },
  {
    id: "4",
    user: {
      name: "David Thompson",
      image: "/placeholder.svg?height=40&width=40",
    },
    rating: 3,
    comment:
      "Decent stay overall. The room was clean and comfortable, but I expected more from the breakfast selection. The fitness center was well-equipped though, which was a plus.",
    date: "January 25, 2024",
  },
  {
    id: "5",
    user: {
      name: "Lisa Wong",
      image: "/placeholder.svg?height=40&width=40",
    },
    rating: 5,
    comment:
      "The best hotel experience I've had in years! The bed was like sleeping on a cloud, and the bathroom was spa-like. The concierge gave excellent restaurant recommendations.",
    date: "January 20, 2024",
  },
  {
    id: "6",
    user: {
      name: "James Miller",
    },
    rating: 4,
    comment:
      "Really enjoyed the modern aesthetic and the friendly staff. The bar on the ground floor makes excellent cocktails. Room service was prompt and the food was delicious.",
    date: "January 15, 2024",
  },
]

export function PropertyReviews() {
  // Calculate average rating
  const averageRating = hotelReviews.reduce((acc, review) => acc + review.rating, 0) / hotelReviews.length

  // Calculate rating distribution
  const ratingDistribution = Array.from({ length: 5 }, (_, i) => {
    const count = hotelReviews.filter((review) => review.rating === i + 1).length
    return {
      rating: i + 1,
      count,
      percentage: (count / hotelReviews.length) * 100,
    }
  }).reverse()

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <h2 className="text-4xl font-semibold tracking-tight">{averageRating.toFixed(1)}</h2>
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-primary text-primary" />
              </div>
            </div>
            <p className="text-lg text-muted-foreground">{hotelReviews.length} reviews</p>
          </div>

          <div className="space-y-2">
            {ratingDistribution.map((dist) => (
              <div key={dist.rating} className="flex items-center gap-2">
                <div className="w-20 text-sm text-muted-foreground">{dist.rating} stars</div>
                <Progress value={dist.percentage} className="h-2" />
                <div className="w-12 text-sm text-muted-foreground text-right">{dist.count}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {hotelReviews.map((review) => (
            <Card key={review.id} className="border-0 shadow-none">
              <CardContent className="p-0 space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={review.user.image} />
                    <AvatarFallback className="bg-primary/10">
                      {review.user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium leading-none">{review.user.name}</p>
                    <p className="text-sm text-muted-foreground">{review.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating ? "fill-primary text-primary" : "fill-muted stroke-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm leading-relaxed">{review.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

