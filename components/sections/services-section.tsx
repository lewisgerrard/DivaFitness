import { User, Users, Leaf, Sparkles } from "lucide-react"
import { Section } from "./section"
import SectionHeader from "@/components/section-header"
import { InteractiveServiceCard } from "@/components/interactive-service-card"

const services = [
  {
    icon: User,
    title: "1-to-1 Training",
    description: "Completely personalised sessions designed around your unique goals and preferences.",
    features: ["Custom workout plans", "Form correction", "Progress tracking"],
    colorScheme: "primary" as const,
  },
  {
    icon: Users,
    title: "Group Sessions",
    description: "Train with like-minded women in a supportive small group environment.",
    features: ["Max 4 people", "Social motivation", "Cost-effective"],
    popular: true,
    colorScheme: "secondary" as const,
  },
  {
    icon: Leaf,
    title: "Nutrition Coaching",
    description: "Comprehensive guidance including meal planning and interactive cooking sessions.",
    features: ["Meal planning", "Cooking sessions", "Lifestyle integration"],
    colorScheme: "accent" as const,
  },
]

export function ServicesSection() {
  return (
    <Section background="white" containerSize="lg">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #7b329b 2px, transparent 2px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10">
        <SectionHeader
          badge="Tailored Services"
          badgeIcon={Sparkles}
          title="Choose Your Path to"
          subtitle="Transformation"
          description="Every journey is unique. Discover the perfect service that aligns with your goals and lifestyle."
        />

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {services.map((service, index) => (
            <InteractiveServiceCard key={index} {...service} delay={index * 200} />
          ))}
        </div>
      </div>
    </Section>
  )
}
