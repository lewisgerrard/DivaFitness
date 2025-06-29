import { Star, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface ReviewCardProps {
  name: string
  text: string
  rating: number
  platform: "google" | "trustpilot"
  date?: string
}

export default function ReviewCard({ name, text, rating, platform, date }: ReviewCardProps) {
  return (
    <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {platform === "google" ? (
              <ExternalLink className="w-4 h-4 text-primary" />
            ) : (
              <Star className="w-4 h-4 text-green-600" />
            )}
            <span className="text-xs font-medium text-muted-foreground capitalize">{platform}</span>
          </div>
          <div className="flex space-x-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-3 h-3 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
            ))}
          </div>
        </div>

        <blockquote className="text-sm text-secondary leading-relaxed mb-4">"{text}"</blockquote>

        <div className="flex items-center justify-between text-xs">
          <div className="font-semibold text-primary">— {name}</div>
          {date && <div className="text-muted-foreground">{date}</div>}
        </div>
      </CardContent>
    </Card>
  )
}
