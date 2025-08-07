import { Star } from 'lucide-react';
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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import React from "react";
import api from "@/utils/ApiUrl";
import { useToast } from "@/components/ui/use-toast";

const reviewFormSchema = z.object({
  rating: z.number().min(1, "Please select a rating (1-5 stars).").max(5, "Rating must be between 1 and 5."),
  review: z.string().min(10, "Review must be at least 10 characters.").max(750, "Review cannot exceed approximately 150 words (750 characters)."),
});

type ReviewFormValues = z.infer<typeof reviewFormSchema>;

interface StarRatingInputProps {
  value: number;
  onChange: (value: number) => void;
}

function StarRatingInput({ value, onChange }: StarRatingInputProps) {
  const [hoverRating, setHoverRating] = useState<number>(0);

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
            onClick={() => onChange?.(starValue)}
            onMouseEnter={() => setHoverRating(starValue)}
            onMouseLeave={() => setHoverRating(0)}
          />
        );
      })}
    </div>
  );
}

interface AddReviewFormProps {
  onReviewSubmit?: (newReview: ReviewFormValues) => void;
  onClose?: () => void;
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

  const review = watch("review") || "";
  const currentRating = watch("rating") || 0;

  const onSubmit = async (data: ReviewFormValues) => {
    onReviewSubmit?.(data);
    reset?.();
    onClose?.();
  };

  return (
    <form onSubmit={handleSubmit?.(onSubmit)} className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="rating">Rating</Label>
        <StarRatingInput
          value={currentRating}
          onChange={(value) => {
            setValue?.("rating", value, { shouldValidate: true });
          }}
        />
        {errors?.rating && <p className="text-sm text-destructive">{errors?.rating?.message}</p>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="review">Your Review</Label>
        <Textarea
          id="review"
          placeholder="Share your experience..."
          {...register("review")}
          maxLength={750}
          className="min-h-[100px]"
        />
        <div className="text-right text-sm text-muted-foreground">
          {review?.length ?? 0} / 750 characters (approx. 150 words)
        </div>
        {errors?.review && <p className="text-sm text-destructive">{errors?.review?.message}</p>}
      </div>
      <DialogFooter>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
      </DialogFooter>
    </form>
  );
}

export function PropertyReviews({ propertyId }: { propertyId?: string }) {
  const { toast } = useToast();
  const isAuthenticated = true;

  const [reviews, setReviews] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchReviews = async () => {
    try {
      const res = await api.get(`/api/v1/review/property/${propertyId}`);
      if (res?.status === 200 && res?.data?.data?.reviews) {
        setReviews(res?.data?.data?.reviews || []);
      }
    } catch (error: any) {
      console.error("Failed to fetch reviews:", error);
      toast?.({
        variant: "destructive",
        title: "Error",
        description: error?.response?.data?.message || "Failed to load reviews.",
      });
    }
  };

  useEffect(() => {
    if (propertyId) {
      fetchReviews?.();
    }
  }, [propertyId]);

  const totalReviewsCount = reviews?.length || 0;
  const averageRating =
    totalReviewsCount > 0
      ? reviews?.reduce?.((acc, review) => acc + (review?.rating || 0), 0) / totalReviewsCount
      : 0;

  const ratingDistribution = Array.from({ length: 5 }, (_, i) => {
    const count = reviews?.filter?.((review) => review?.rating === i + 1)?.length || 0;
    return {
      rating: i + 1,
      count,
      percentage: totalReviewsCount > 0 ? (count / totalReviewsCount) * 100 : 0,
    };
  }).reverse();

  const handleAddReview = async (newReviewData: ReviewFormValues) => {
    try {
      const newReviewPayload = {
        rating: newReviewData?.rating,
        review: newReviewData?.review,
        property: propertyId,
      };
      const res = await api.post("/api/v1/review", newReviewPayload);
      if (res?.status === 201) {
        toast?.({
          title: "Success",
          description: "Your review has been added!",
        });
        fetchReviews?.();
      }
      setIsDialogOpen(false);
    } catch (error: any) {
      console.error("Failed to add review:", error);
      toast?.({
        variant: "destructive",
        title: "Error",
        description: error?.response?.data?.message || "Failed to add review.",
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <h2 className="text-4xl font-semibold tracking-tight">
                {averageRating?.toFixed?.(1) || "0.0"}
              </h2>
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-primary text-primary" />
              </div>
            </div>
            <p className="text-lg text-muted-foreground">{totalReviewsCount} reviews</p>
          </div>
          <div className="space-y-2">
            {ratingDistribution?.map?.((dist) => (
              <div key={dist?.rating} className="flex items-center gap-2">
                <div className="w-20 text-sm text-muted-foreground">{dist?.rating} stars</div>
                <Progress value={dist?.percentage} className="h-2" />
                <div className="w-12 text-sm text-muted-foreground text-right">{dist?.count}</div>
              </div>
            ))}
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              {isAuthenticated && (
                <Button className="w-full">Add a Review</Button>
              )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Your Review</DialogTitle>
                <DialogDescription>
                  Share your experience with others. Your feedback helps us improve!
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
          {reviews?.map?.((review) => (
            <Card key={review?._id} className="border-0 shadow-none">
              <CardContent className="p-0 space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={review?.bookingUser?.avatar} alt={review?.bookingUser?.fullName} />
                    <AvatarFallback className="bg-primary/10">
                      {review?.bookingUser?.fullName?.charAt?.(0)?.toUpperCase?.() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium leading-none">
                      {review?.bookingUser?.fullName || "Anonymous User"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {review?.createdAt
                        ? new Date(review?.createdAt)?.toLocaleDateString?.("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "Unknown Date"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < (review?.rating || 0)
                          ? "fill-primary text-primary"
                          : "fill-muted stroke-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm leading-relaxed">{review?.review || "No review message."}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
