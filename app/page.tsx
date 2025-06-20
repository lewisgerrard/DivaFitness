"use client"

import { User, Users, Leaf, Sparkles, Heart, Trophy, Apple, BookOpen, Home } from "lucide-react"
import HeroHome from "@/components/hero-home"
import SectionHeader from "@/components/section-header"
import ReviewCard from "@/components/review-card"
import MapSection from "@/components/map-section"
import CTASection from "@/components/cta-section"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { brandKit, brandClasses } from "@/lib/brand-kit"
import { useState, useEffect } from "react"

export default function HomePage() {
  const services = [
    // Training Services
    {
      icon: User,
      title: "1:1 Personal Training",
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

  // Static reviews as fallback (these will be used until real APIs are set up)
  const staticReviews = [
    {
      name: "Hanna",
      text: "After just a couple of sessions, we've noticed major improvements that were easy to incorporate into our daily routines.If you'd like to eat better but don't know where to start, get in touch with Diva Fitness! You will be in the best possible hands",
      rating: 5,
      platform: "google" as const,
      date: "2 weeks ago",
    },
    {
      name: "Mandy",
      text: "My understanding of what it takes to eat healthily and lose weight for the long-term has increased massively. I can highly recommend Emma - her energy and passion for everything she does is inspirational!",
      rating: 5,
      platform: "trustpilot" as const,
      date: "1 month ago",
    },
    {
      name: "Bernie",
      text: "Since embarking on my journey with Emma last July it has genuinely turned my life around. I feel great, my body has changed so much and my relationship with food is so much better. ",
      rating: 5,
      platform: "google" as const,
      date: "3 weeks ago",
    },
    {
      name: "Jennifer W.",
      text: "Emma's holistic approach is exactly what I needed. Not just fitness, but nutrition and emotional support too.",
      rating: 5,
      platform: "google" as const,
      date: "1 week ago",
    },
    {
      name: "Michelle P.",
      text: "I've tried many personal trainers but Emma is in a league of her own. Her understanding of women's fitness needs is exceptional.",
      rating: 5,
      platform: "trustpilot" as const,
      date: "2 months ago",
    },
    {
      name: "Amanda H.",
      text: "The cooking sessions are amazing! Emma teaches you how to prepare healthy meals that actually taste great.",
      rating: 5,
      platform: "google" as const,
      date: "3 days ago",
    },
  ]

  const [reviews, setReviews] = useState(staticReviews)
  const [isLoadingReviews, setIsLoadingReviews] = useState(false)

  // Function to fetch reviews (currently disabled until APIs are created)
  useEffect(() => {
    // For now, just use static reviews
    // When you're ready to implement real API calls, uncomment and modify this:
    /*
    const fetchReviews = async () => {
      setIsLoadingReviews(true)
      try {
        // Check if API endpoints exist before calling them
        const googleResponse = await fetch("/api/reviews/google")
        if (googleResponse.ok) {
          const googleReviews = await googleResponse.json()
          // Process Google reviews
        }

        const trustpilotResponse = await fetch("/api/reviews/trustpilot")
        if (trustpilotResponse.ok) {
          const trustpilotReviews = await trustpilotResponse.json()
          // Process Trustpilot reviews
        }

        // Combine and set reviews
      } catch (error) {
        console.error("Error fetching reviews:", error)
        // Fallback to static reviews
        setReviews(staticReviews)
      } finally {
        setIsLoadingReviews(false)
      }
    }

    fetchReviews()
    */
  }, [])

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
        badge="Specialist in Female Fitness"
        stats={[
          { value: "8+", label: "Years Experience" },
          { value: "2024", label: "Ladies Gym of the Year Finalist" },
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
                  src="/images/emma-studio.jpg"
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
            badge="Our Services"
            badgeIcon={Sparkles}
            title="Transform Your"
            subtitle="Health & Fitness"
            description="Choose your path to wellness with our comprehensive training and nutrition services."
            className="text-secondary"
          />

          <div className="grid md:grid-cols-2 gap-8">
            {/* Training Tile */}
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
              <Image
                src="/images/weights-close-up.jpg"
                alt="Close-up of training weights"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/50" />

              <div className="absolute inset-0 flex flex-col justify-between p-8 text-white">
                <div>
                  <h3 className="text-4xl font-bold mb-4 tracking-wide">TRAINING</h3>
                  <p className="text-lg leading-relaxed opacity-90">
                    Transform your body with personalised training sessions designed around your unique goals, fitness
                    level, and preferences in our private garden studio.
                  </p>
                </div>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="self-start bg-transparent border-white text-white hover:bg-white hover:text-black transition-all duration-300"
                >
                  <Link href="/training" className="flex items-center gap-2">
                    LEARN MORE
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Nutrition Tile */}
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
              <Image
                src="/images/nutrition-pantry.jpg"
                alt="Organized healthy nutrition pantry with glass jars"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/50" />

              <div className="absolute inset-0 flex flex-col justify-between p-8 text-white">
                <div>
                  <h3 className="text-4xl font-bold mb-4 tracking-wide">NUTRITION</h3>
                  <p className="text-lg leading-relaxed opacity-90">
                    Fuel your transformation with expert nutrition coaching, personalised meal planning, and lifestyle
                    integration strategies that work for your busy life.
                  </p>
                </div>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="self-start bg-transparent border-white text-white hover:bg-white hover:text-black transition-all duration-300"
                >
                  <Link href="/nutrition" className="flex items-center gap-2">
                    LEARN MORE
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className={`${brandKit.components.section.base} ${brandKit.gradients.background}`}>
        <div className={brandKit.components.section.container}>
          <SectionHeader
            title="Strong Women."
            subtitle="Honest Words."
            description="See what ladies have to say about their journey with Diva Fitness."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {isLoadingReviews
              ? // Loading skeleton
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-gray-200 h-64 rounded-lg"></div>
                  </div>
                ))
              : reviews.slice(0, 3).map((review, index) => <ReviewCard key={index} {...review} />)}
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
