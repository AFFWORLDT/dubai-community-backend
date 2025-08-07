import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import React from "react";
import api from "@/utils/ApiUrl";
import { toast } from "sonner";

const initialHotelReviews: any[] = [
  {
    id: "1",
    user: {
      name: "Sarah Johnson",
      image: "/placeholder.svg?height=40&width=40",
    },
    rating: 5,
    review:
      "Absolutely loved my stay at Mybookings Mybookings! The modern amenities and stunning city views exceeded my expectations. The staff was incredibly attentive, and the rooftop pool is a must-visit spot. Will definitely be returning for my next business trip.",
    date: "February 10, 2024",
  },
  {
    id: "2",
    user: {
      name: "Michael Chen",
      image: "/placeholder.svg?height=40&width=40",
    },
    rating: 4,
    review:
      "Great location with easy access to restaurants and shopping. The room was spacious and well-designed. Only minor issue was some noise from the street, but the comfortable bed made up for it.",
    date: "February 5, 2024",
  },
  {
    id: "3",
    user: {
      name: "Emma Rodriguez",
    },
    rating: 5,
    review:
      "The attention to detail at Mybookings Mybookings is remarkable. From the welcome amenities to the daily housekeeping, everything was perfect. The in-room coffee machine and smart TV were great touches.",
    date: "January 28, 2024",
  },
  {
    id: "4",
    user: {
      name: "David Thompson",
      image: "/placeholder.svg?height=40&width=40",
    },
    rating: 3,
    review:
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
    review:
      "The best hotel experience I've had in years! The bed was like sleeping on a cloud, and the bathroom was spa-like. The concierge gave excellent restaurant recommendations.",
    date: "January 20, 2024",
  },
  {
    id: "6",
    user: {
      name: "James Miller",
    },
    rating: 4,
    review:
      "Really enjoyed the modern aesthetic and the friendly staff. The bar on the ground floor makes excellent cocktails. Room service was prompt and the food was delicious.",
    date: "January 15, 2024",
  },
];

// Zod schema for review form validation
const reviewFormSchema = z.object({
  rating: z
    .number()
    .min(1, "Please select a rating (1-5 stars).")
    .max(5, "Rating must be between 1 and 5."),
  review: z
    .string()
    .min(10, "review must be at least 10 characters.")
    .max(750, "review cannot exceed approximately 150 words (750 characters)."),
});

type ReviewFormValues = z.infer<typeof reviewFormSchema>;

interface StarRatingInputProps {
  value: number;
  onChange: (value: number) => void;
}

function StarRatingInput({ value, onChange }: StarRatingInputProps) {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const starValue = i + 1;
        return (
          <Star
            key={i}
            className={`h-6 w-6 cursor-pointer transition-colors ${
              (hoverRating || value) >= starValue
                ? "fill-primary text-primary"
                : "fill-muted stroke-muted-foreground/30"
            }`}
            onClick={() => onChange(starValue)}
            onMouseEnter={() => setHoverRating(starValue)}
            onMouseLeave={() => setHoverRating(0)}
          />
        );
      })}
    </div>
  );
}

interface AddReviewFormProps {
  onReviewSubmit: (newReview: any) => void;
  onClose: () => void;
}

function AddReviewForm({ onReviewSubmit, onClose }: AddReviewFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      rating: 0,
      review: "",
    },
  });

  const review = watch("review");
  const currentRating = watch("rating");

  const onSubmit = async (data: ReviewFormValues) => {
    onReviewSubmit(data);
    reset();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="rating">Rating</Label>
        <StarRatingInput
          value={currentRating}
          onChange={(value) => {
            setValue("rating", value, { shouldValidate: true });
          }}
        />
        {errors.rating && (
          <p className="text-sm text-destructive">{errors.rating.message}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="review">Your Review</Label>
        <Textarea
          id="review"
          placeholder="Share your experience..."
          {...register("review")}
          maxLength={750} // Approximately 150 words
          className="min-h-[100px]"
        />
        <div className="text-right text-sm text-muted-foreground">
          {review.length} / 750 characters (approx. 150 words)
        </div>
        {errors.review && (
          <p className="text-sm text-destructive">{errors.review.message}</p>
        )}
      </div>
      <DialogFooter>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
      </DialogFooter>
    </form>
  );
}

export function PropertyReviews({propertyId}:any) {
  const [reviews, setReviews] = useState<any[]>(initialHotelReviews);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Calculate average rating
  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  // Calculate rating distribution
  const ratingDistribution = Array.from({ length: 5 }, (_, i) => {
    const count = reviews.filter((review) => review.rating === i + 1).length;
    return {
      rating: i + 1,
      count,
      percentage: (count / reviews.length) * 100,
    };
  }).reverse();

  const handleAddReview = async(
    newReviewData: any
  ) => {
   try {
    const newReview: any = {
      rating: newReviewData.rating,
      review: newReviewData.review,
      property:propertyId
    };
    const res = await api.post("/api/v1/review",newReview)
    console.log(res)
    setIsDialogOpen(false); 
   } catch (error:any) {
    toast.error(error?.message);
   }// Close dialog after submission
  };

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <h2 className="text-4xl font-semibold tracking-tight">
                {averageRating.toFixed(1)}
              </h2>
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-primary text-primary" />
              </div>
            </div>
            <p className="text-lg text-muted-foreground">
              {reviews.length} reviews
            </p>
          </div>
          <div className="space-y-2">
            {ratingDistribution.map((dist) => (
              <div key={dist.rating} className="flex items-center gap-2">
                <div className="w-20 text-sm text-muted-foreground">
                  {dist.rating} stars
                </div>
                <Progress value={dist.percentage} className="h-2" />
                <div className="w-12 text-sm text-muted-foreground text-right">
                  {dist.count}
                </div>
              </div>
            ))}
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full">Add a Review</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Your Review</DialogTitle>
                <DialogDescription>
                  Share your experience with others. Your feedback helps us
                  improve!
                </DialogDescription>
              </DialogHeader>
              <AddReviewForm
                onReviewSubmit={handleAddReview}
                onClose={() => setIsDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {reviews.map((review) => (
            <Card key={review.id} className="border-0 shadow-none">
              <CardContent className="p-0 space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={review.user.image || "/placeholder.svg"}
                    />
                    <AvatarFallback className="bg-primary/10">
                      {review.user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium leading-none">
                      {review.user.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {review.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? "fill-primary text-primary"
                          : "fill-muted stroke-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm leading-relaxed">{review.review}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
