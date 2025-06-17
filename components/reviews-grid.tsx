"use client"

import { useState, useEffect } from "react"
import { Star, RefreshCw, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Review {
  id: number
  name: string
  rating: number
  text: string
  date: string
  platform: "google" | "trustpilot"
  profilePhotoUrl?: string
}

// Extended sample reviews pool (you can add more as needed)
const allReviews: Review[] = [
  {
    id: 1,
    name: "Sarah M.",
    rating: 5,
    text: "Emma is absolutely fantastic! Her garden studio is beautiful and the personal attention is incredible. I've never felt more confident about my fitness journey. The nutrition coaching has been life-changing too!",
    date: "2 weeks ago",
    platform: "google",
  },
  {
    id: 2,
    name: "Lisa K.",
    rating: 5,
    text: "Best decision I ever made. Emma's approach to fitness and nutrition has completely changed my life. The private studio setting is perfect - no intimidation, just pure focus on my goals.",
    date: "1 month ago",
    platform: "trustpilot",
  },
  {
    id: 3,
    name: "Rachel T.",
    rating: 5,
    text: "The private studio setting is perfect. I feel so comfortable and supported in my fitness journey. Emma tailors every session to exactly what I need. Couldn't recommend more highly!",
    date: "3 weeks ago",
    platform: "google",
  },
  {
    id: 4,
    name: "Jennifer W.",
    rating: 5,
    text: "Emma's holistic approach is exactly what I needed. Not just fitness, but nutrition and emotional support too. The garden studio is like a peaceful retreat where I can focus on myself.",
    date: "1 week ago",
    platform: "google",
  },
  {
    id: 5,
    name: "Michelle P.",
    rating: 5,
    text: "I've tried many personal trainers but Emma is in a league of her own. Her understanding of women's fitness needs is exceptional. The results speak for themselves - I'm stronger than ever!",
    date: "2 months ago",
    platform: "trustpilot",
  },
  {
    id: 6,
    name: "Amanda H.",
    rating: 5,
    text: "The cooking sessions are amazing! Emma doesn't just tell you what to eat, she teaches you how to prepare healthy meals that actually taste great. The whole experience is transformative.",
    date: "3 days ago",
    platform: "google",
  },
  {
    id: 7,
    name: "Claire B.",
    rating: 5,
    text: "Emma has completely transformed my relationship with fitness. The 1-to-1 sessions are perfectly tailored to my needs and the garden studio creates such a calming atmosphere for working out.",
    date: "5 days ago",
    platform: "google",
  },
  {
    id: 8,
    name: "Sophie L.",
    rating: 5,
    text: "Outstanding personal trainer! Emma's expertise in nutrition combined with her fitness knowledge has helped me achieve goals I never thought possible. The private setting is perfect for building confidence.",
    date: "1 week ago",
    platform: "trustpilot",
  },
  {
    id: 9,
    name: "Emma C.",
    rating: 5,
    text: "The group sessions are fantastic - small enough to get personal attention but motivating to train with other like-minded women. Emma creates such a supportive environment.",
    date: "4 days ago",
    platform: "google",
  },
  {
    id: 10,
    name: "Kate R.",
    rating: 5,
    text: "Emma's approach to women's fitness is refreshing and effective. The garden studio is beautiful and the personalized programs have helped me achieve results I'm truly proud of.",
    date: "2 weeks ago",
    platform: "google",
  },
  {
    id: 11,
    name: "Lucy M.",
    rating: 5,
    text: "Incredible experience from start to finish. Emma's knowledge, the beautiful studio setting, and the personalized approach make this the best fitness investment I've ever made.",
    date: "6 days ago",
    platform: "trustpilot",
  },
  {
    id: 12,
    name: "Hannah S.",
    rating: 5,
    text: "The nutrition coaching alongside the fitness training has been game-changing. Emma understands women's needs and creates programs that actually work with your lifestyle.",
    date: "1 month ago",
    platform: "google",
  },
]

// Function to randomly select 6 reviews
const getRandomReviews = (reviews: Review[], count = 6): Review[] => {
  const shuffled = [...reviews].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

// Function to fetch reviews from Google Places API
const fetchGoogleReviews = async (placeId: string): Promise<Review[]> => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=AIzaSyAt0i9BNsrI7oW9fiXrDDiTJNkeEvokDXk`,
    )
    const data = await response.json()

    if (data.result && data.result.reviews) {
      return data.result.reviews
        .map((review: any, index: number) => ({
          id: `google_${index}`,
          name: review.author_name,
          rating: review.rating,
          text: review.text,
          date: new Date(review.time * 1000).toLocaleDateString(),
          platform: "google" as const,
          profilePhotoUrl: review.profile_photo_url,
        }))
        .filter((review: Review) => review.rating === 5) // Only 5-star reviews
    }
    return []
  } catch (error) {
    console.error("Error fetching Google reviews:", error)
    return []
  }
}

export default function ReviewsGrid() {
  const [displayedReviews, setDisplayedReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  // Initialize with random reviews on component mount
  useEffect(() => {
    const initialReviews = getRandomReviews(allReviews)
    setDisplayedReviews(initialReviews)
  }, [])

  // Function to refresh reviews (mix of sample and potentially real Google reviews)
  const refreshReviews = async () => {
    setIsLoading(true)

    try {
      // For now, we'll use sample reviews. To use real Google reviews, you'd need:
      // 1. A backend API to handle the Google Places API call (due to CORS)
      // 2. Your Google Place ID
      // const googleReviews = await fetchGoogleReviews("YOUR_PLACE_ID")
      // const combinedReviews = [...allReviews, ...googleReviews]

      const newSelection = getRandomReviews(allReviews)
      setDisplayedReviews(newSelection)
      setLastUpdated(new Date())
    } catch (error) {
      console.error("Error refreshing reviews:", error)
      // Fallback to sample reviews
      const newSelection = getRandomReviews(allReviews)
      setDisplayedReviews(newSelection)
    } finally {
      setIsLoading(false)
    }
  }

  // Auto-refresh every 30 seconds (you can adjust this)
  useEffect(() => {
    const interval = setInterval(() => {
      refreshReviews()
    }, 30000) // 30 seconds

    return () => clearInterval(interval)
  }, [])

  const refreshButtonClass = `w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`

  return (
    <div className="space-y-6">
      {/* Header with refresh button */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-heading text-2xl font-bold text-secondary mb-2">Client Reviews</h3>
          <p className="text-muted-foreground text-sm">
            Showing 6 of our amazing 5-star reviews • Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
        <Button onClick={refreshReviews} disabled={isLoading} variant="outline" size="sm" className="rounded-full">
          <RefreshCw className={refreshButtonClass} />
          {isLoading ? "Loading..." : "Refresh"}
        </Button>
      </div>

      {/* Reviews Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedReviews.map((review, index) => {
          const reviewKey = `${review.id}_${index}`

          return (
            <Card
              key={reviewKey}
              className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/95 backdrop-blur-sm"
            >
              <CardContent className="p-6">
                {/* Platform and Rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {review.platform === "google" ? (
                      <ExternalLink className="w-4 h-4 text-blue-600" />
                    ) : (
                      <Star className="w-4 h-4 text-green-600" />
                    )}
                    <span className="text-xs font-medium text-muted-foreground capitalize">{review.platform}</span>
                  </div>
                  <div className="flex space-x-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <blockquote className="text-sm text-secondary leading-relaxed mb-4 line-clamp-4 group-hover:line-clamp-none transition-all duration-300">
                  "{review.text}"
                </blockquote>

                {/* Author and Date */}
                <div className="flex items-center justify-between text-xs">
                  <div className="font-semibold text-primary">— {review.name}</div>
                  <div className="text-muted-foreground">{review.date}</div>
                </div>

                {/* Hover Effect Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="inline-flex items-center gap-2 text-muted-foreground">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span className="text-sm">Loading fresh reviews...</span>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="text-center pt-6 border-t border-accent/20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-lg font-bold text-primary">4.9★</div>
            <div className="text-xs text-muted-foreground">Google Rating</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-primary">4.5★</div>
            <div className="text-xs text-muted-foreground">Trustpilot</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-primary">50+</div>
            <div className="text-xs text-muted-foreground">Total Reviews</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-primary">100%</div>
            <div className="text-xs text-muted-foreground">5-Star Focus</div>
          </div>
        </div>
      </div>
    </div>
  )
}
