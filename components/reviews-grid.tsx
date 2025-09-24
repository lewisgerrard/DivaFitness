import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export default function ReviewsGrid() {
  const reviews = [
    {
      name: "Sarah M.",
      rating: 5,
      text: "Emma has completely transformed my relationship with fitness. Her approach is so encouraging and she really listens to what you need. I've never felt stronger or more confident!",
      achievement: "Lost 2 stone and gained confidence",
    },
    {
      name: "Jennifer L.",
      rating: 5,
      text: "The nutrition coaching has been life-changing. Emma helped me understand how to fuel my body properly without restrictive dieting. I have so much more energy now!",
      achievement: "Improved energy and health markers",
    },
    {
      name: "Michelle R.",
      rating: 5,
      text: "As someone who was intimidated by gyms, Emma made me feel so comfortable. Her studio is welcoming and she's incredibly knowledgeable. Best decision I've made for my health!",
      achievement: "Overcame gym anxiety and built strength",
    },
    {
      name: "Lisa K.",
      rating: 5,
      text: "Emma's holistic approach to fitness and wellness is exactly what I needed. She doesn't just focus on exercise but helps with mindset and lifestyle changes too.",
      achievement: "Achieved work-life balance and fitness goals",
    },
  ]

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Real Results from Real Women</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Don't just take our word for it. Here's what our clients have to say about their transformation journeys.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review, index) => (
          <Card key={index} className="h-full hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-1">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <blockquote className="text-gray-700 italic">"{review.text}"</blockquote>

              <div className="border-t pt-4">
                <div className="font-semibold text-gray-900">{review.name}</div>
                <div className="text-sm text-primary font-medium">{review.achievement}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
