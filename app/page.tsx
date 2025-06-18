import { User, Users, Leaf, Sparkles } from "lucide-react"
import HeroSection from "@/components/hero-section"
import SectionHeader from "@/components/section-header"
import ServiceCard from "@/components/service-card"
import ReviewCard from "@/components/review-card"
import MapSection from "@/components/map-section"
import CTASection from "@/components/cta-section"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { brandKit, brandClasses } from "@/lib/brand-kit"

export default function HomePage() {
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title="Transform Your"
        subtitle="Fitness Journey"
        description="Experience personalized training in a stunning garden studio designed exclusively for women's wellness and empowerment."
        primaryButtonText="Start Your Journey"
        primaryButtonHref="/services"
        secondaryButtonText="Meet Emma"
        secondaryButtonHref="/about"
        tertiaryButtonText="Get In Touch"
        tertiaryButtonHref="/contact"
        badge="Award-Winning Personal Training"
        stats={[
          { value: "7+", label: "Years Experience" },
          { value: "100%", label: "Female-Led" },
        ]}
      />

      {/* About Section */}
      <section className={`${brandKit.components.section.base} ${brandKit.gradients.background}`}>
        <div className={brandKit.components.section.container}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className={brandKit.components.section.badge}>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-primary font-medium text-sm">Since 2017</span>
              </div>

              <h2 className={brandClasses.sectionTitle}>
                Your Personal
                <span className={brandKit.components.section.subtitle}>Fitness Sanctuary</span>
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Step into a world where fitness meets tranquility. The purpose-built garden studio isn't just a gym –
                it's your personal retreat where transformation happens naturally.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="group">
                  <div className={`${brandKit.components.card.icon} ${brandKit.gradients.primary} mb-3`}>
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-secondary mb-2">1-to-1 Focus</h3>
                  <p className="text-sm text-muted-foreground">Completely personalised attention</p>
                </div>
                <div className="group">
                  <div className={`${brandKit.components.card.icon} ${brandKit.gradients.secondary} mb-3`}>
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-secondary mb-2">Holistic Approach</h3>
                  <p className="text-sm text-muted-foreground">Fitness, nutrition & wellness</p>
                </div>
              </div>

              <Button asChild size="lg" className={brandClasses.buttonPrimary}>
                <Link href="/about" className="flex items-center gap-2">
                  Meet Emma
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>

            <div className="relative">
              <div className={`relative h-80 rounded-3xl overflow-hidden shadow-2xl ${brandKit.animations.scaleHover}`}>
                <Image
                  src="/images/studio-emma-doorway.jpg"
                  alt="Emma Fisher in Diva Fitness Studio"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={`${brandKit.components.section.base} bg-white`}>
        <div className={brandKit.components.section.container}>
          <SectionHeader
            badge="Tailored Services"
            badgeIcon={Sparkles}
            title="Choose Your Path to"
            subtitle="Transformation"
            description="Every journey is unique. Discover the perfect service that aligns with your goals and lifestyle."
          />

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className={`${brandKit.components.section.base} ${brandKit.gradients.background}`}>
        <div className={brandKit.components.section.container}>
          <SectionHeader
            title="Stories of"
            subtitle="Transformation"
            description="Real women, real results, real empowerment. See what clients say about their journey with Diva Fitness."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {reviews.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </div>

          {/* Map Section */}
          <MapSection />
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        badge="Ready to Begin?"
        title="Your Transformation"
        subtitle="Starts Today"
        description="Join hundreds of women who have discovered their strength, confidence, and best selves at Diva Fitness."
        primaryButtonText="Book Free Consultation"
        primaryButtonHref="/contact"
        secondaryButtonText="Explore Services"
        secondaryButtonHref="/services"
      />
    </div>
  )
}
