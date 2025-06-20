import { Star } from "lucide-react"
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
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
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
