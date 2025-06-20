import { Section } from "./section"
import SectionHeader from "@/components/section-header"
import ReviewCard from "@/components/review-card"
import MapSection from "@/components/map-section"

const reviews = [
  {
    name: "Sarah M.",
    text: "Emma is absolutely fantastic! Her garden studio is beautiful and the personal attention is incredible.",
    rating: 5,
    platform: "google" as const,
  },
  {
    name: "Lisa K.",
    text: "Best decision I ever made. Emma's approach to fitness and nutrition has completely changed my life.",
    rating: 5,
    platform: "trustpilot" as const,
  },
  {
    name: "Rachel T.",
    text: "The private studio setting is perfect. I feel so comfortable and supported in my fitness journey.",
    rating: 5,
    platform: "google" as const,
  },
  {
    name: "Jennifer W.",
    text: "Emma's holistic approach is exactly what I needed. Not just fitness, but nutrition and emotional support too.",
    rating: 5,
    platform: "google" as const,
  },
  {
    name: "Michelle P.",
    text: "I've tried many personal trainers but Emma is in a league of her own. Her understanding of women's fitness needs is exceptional.",
    rating: 5,
    platform: "trustpilot" as const,
  },
  {
    name: "Amanda H.",
    text: "The cooking sessions are amazing! Emma teaches you how to prepare healthy meals that actually taste great.",
    rating: 5,
    platform: "google" as const,
  },
]

export function ReviewsSection() {
  return (
    <Section id="reviews" background="gradient" containerSize="lg">
      <SectionHeader
        title="Stories of"
        subtitle="Transformation"
        description="Real women, real results, real empowerment. See what clients say about their journey with Diva Fitness."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {reviews.map((review, index) => (
          <div key={index} className="transition-transform duration-300 hover:scale-105">
            <ReviewCard {...review} />
          </div>
        ))}
      </div>

      <div className="transition-transform duration-500 hover:scale-[1.02]">
        <MapSection />
      </div>
    </Section>
  )
}
