import { User, Users, Leaf, Sparkles, Heart, Trophy, Apple, BookOpen, Home } from "lucide-react"
import HeroHome from "@/components/hero-home"
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
    // Training Services
    {
      icon: User,
      title: "One-to-One Personal Training",
      description:
        "Completely personalised training sessions designed around your unique goals, fitness level, and preferences.",
      features: ["Complete Privacy", "Tailored Coaching", "Female-Led Space"],
      price: "From £350",
      duration: "60 min sessions",
      colorScheme: "primary" as const,
      href: "/training#personal-training",
    },
    {
      icon: Heart,
      title: "Ultimate Personalised Wellness Session",
      description:
        "A comprehensive 2.5-hour session that combines fitness assessment, nutrition consultation, and personalized training.",
      features: ["Fitness assessment", "Nutrition consultation", "Training intro"],
      price: "£175",
      duration: "2.5 hours",
      colorScheme: "secondary" as const,
      href: "/training#wellness-session",
    },
    {
      icon: Users,
      title: "Train Together, Grow Together",
      description:
        "Affordable training with built-in accountability. Train with like-minded women in a supportive environment.",
      features: ["Max 3 people", "Social motivation", "Cost-effective"],
      price: "£30",
      duration: "Per session",
      colorScheme: "accent" as const,
      href: "/training#group-training",
    },
    {
      icon: Trophy,
      title: "The 12-Week Transformation",
      description: "A comprehensive program designed to completely transform your body and lifestyle over 12 weeks.",
      features: ["12 PT sessions", "Nutrition coaching", "Body composition analysis"],
      price: "£999",
      duration: "12 weeks",
      colorScheme: "primary" as const,
      href: "/training#transformation",
      popular: true,
    },
    {
      icon: Apple,
      title: "Basic Nutrition Review",
      description: "Food diary review and basic nutrition guidance for everyday wellness and healthy living.",
      features: ["Food diary review", "Nutrition tips", "Lifestyle guidance"],
      price: "£65",
      duration: "75 mins",
      colorScheme: "secondary" as const,
      href: "/nutrition#basic-nutrition",
    },
    {
      icon: BookOpen,
      title: "Advanced Nutrition Coaching",
      description: "In-depth nutrition coaching with goal setting, comprehensive review, and personalized planning.",
      features: ["Goal setting", "Meal planning", "Lifestyle integration"],
      price: "£99",
      duration: "2 hours",
      colorScheme: "accent" as const,
      href: "/nutrition#advanced-nutrition",
    },
    {
      icon: Home,
      title: "Hire My Studio",
      description: "Private studio hire available for personal trainers or clients wanting professional fitness space.",
      features: ["Professional equipment", "Private access", "Early morning slot"],
      price: "£15",
      duration: "45 mins",
      colorScheme: "primary" as const,
      href: "/training#studio-hire",
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
      <HeroHome
        title="Transform Your"
        subtitle="Fitness Journey"
        description="Experience personalised training in a stunning garden studio designed exclusively for your privacy and comfort."
        primaryButtonText="Start Your Journey"
        primaryButtonHref="/services"
        secondaryButtonText="Meet Emma"
        secondaryButtonHref="/about"
        tertiaryButtonText="Get In Touch"
        tertiaryButtonHref="/contact"
        badge="NFA Shortlisted Ladies Gym of the Year 2024"
        stats={[
          { value: "8+", label: "Years Experience" },
          { value: "2018 & 2024", label: "Shortlisted NFA Ladies Gym of the Year" },
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
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_4rnlgHf0HQ9oW9pwyOoPeZ2geHI1/DJA6wcco1rqi2E3FSftmOO/public/images/studio-emma-doorway.jpg"
                  alt="Emma Fisher in Diva Fitness Studio"
                  fill
                  className="object-cover"
                  unoptimized
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
            className="text-secondary"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
