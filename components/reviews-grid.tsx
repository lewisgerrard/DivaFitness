"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    comment:
      "Emma has completely transformed my approach to fitness. Her personalized training sessions are challenging yet achievable, and I've seen incredible results in just 3 months!",
    image: "/placeholder-user.jpg",
  },
  {
    id: 2,
    name: "Michelle Davis",
    rating: 5,
    comment:
      "The nutrition guidance combined with the training has been life-changing. Emma really understands how to work with women's bodies and hormones.",
    image: "/placeholder-user.jpg",
  },
  {
    id: 3,
    name: "Lisa Thompson",
    rating: 5,
    comment:
      "I love the supportive environment at Diva Fitness. Emma makes every session enjoyable while pushing me to reach my goals. Highly recommend!",
    image: "/placeholder-user.jpg",
  },
  {
    id: 4,
    name: "Rachel Green",
    rating: 5,
    comment:
      "After struggling with fitness for years, Emma helped me find a sustainable routine. The results speak for themselves - I feel stronger and more confident than ever.",
    image: "/placeholder-user.jpg",
  },
  {
    id: 5,
    name: "Amanda Wilson",
    rating: 5,
    comment:
      "The group training sessions are fantastic! Great energy, supportive community, and Emma's expertise shines through in every workout.",
    image: "/placeholder-user.jpg",
  },
  {
    id: 6,
    name: "Jennifer Brown",
    rating: 5,
    comment:
      "Emma's holistic approach to fitness and nutrition has helped me achieve goals I never thought possible. Professional, knowledgeable, and truly caring.",
    image: "/placeholder-user.jpg",
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
      ))}
    </div>
  )
}

export function ReviewsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews.map((review) => (
        <Card key={review.id} className="h-full">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={review.image || "/placeholder.svg"}
                alt={review.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-secondary">{review.name}</h4>
                <StarRating rating={review.rating} />
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">{review.comment}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default ReviewsGrid
