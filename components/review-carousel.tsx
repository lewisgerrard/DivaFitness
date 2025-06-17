"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Review {
  id: number
  name: string
  rating: number
  text: string
  date: string
  platform: "google" | "trustpilot"
}

const sampleReviews: Review[] = [
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
]

export default function ReviewCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sampleReviews.length)
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sampleReviews.length)
    setIsAutoPlaying(false)
  }

  const prevReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + sampleReviews.length) % sampleReviews.length)
    setIsAutoPlaying(false)
  }

  const goToReview = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const currentReview = sampleReviews[currentIndex]

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Main Review Display */}
      <Card className="relative overflow-hidden border-0 shadow-lg bg-white/95 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {currentReview.platform === "google" ? (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#00B67A">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                )}
                <span className="font-semibold text-secondary capitalize">{currentReview.platform}</span>
              </div>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            <span className="text-sm text-muted-foreground">{currentReview.date}</span>
          </div>

          <blockquote className="text-lg text-secondary leading-relaxed mb-6 italic">"{currentReview.text}"</blockquote>

          <div className="flex items-center justify-between">
            <div className="font-semibold text-primary">— {currentReview.name}</div>
            <div className="text-sm text-muted-foreground">
              Review {currentIndex + 1} of {sampleReviews.length}
            </div>
          </div>
        </CardContent>

        {/* Navigation Arrows */}
        <Button
          onClick={prevReview}
          variant="ghost"
          size="sm"
          className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-lg"
        >
          <ChevronLeft className="w-5 h-5 text-primary" />
        </Button>

        <Button
          onClick={nextReview}
          variant="ghost"
          size="sm"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-lg"
        >
          <ChevronRight className="w-5 h-5 text-primary" />
        </Button>
      </Card>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {sampleReviews.map((_, index) => (
          <button
            key={index}
            onClick={() => goToReview(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-primary scale-125" : "bg-primary/30 hover:bg-primary/50"
            }`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className="text-center mt-4">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          {isAutoPlaying ? "⏸️ Pause auto-advance" : "▶️ Resume auto-advance"}
        </button>
      </div>
    </div>
  )
}
