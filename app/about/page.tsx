import Image from "next/image"
import Link from "next/link"
import { Award, Heart, Users, Zap, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import HeroSection from "@/components/hero-section"
import { brandKit, brandClasses } from "@/lib/brand-kit"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title="Meet Emma"
        subtitle="Fisher"
        description="Empowering women since 2017 with personalised fitness journeys that transform bodies, minds, and lives."
        primaryButtonText="Work With Emma"
        primaryButtonHref="/contact"
        secondaryButtonText="View Services"
        secondaryButtonHref="/services"
        tertiaryButtonText="See Reviews"
        tertiaryButtonHref="/#reviews"
        badge="Your Personal Trainer"
        stats={[{ value: "7+", label: "Years Experience" }]}
      />

      {/* Story Section */}
      <section className={`${brandKit.spacing.section.lg} ${brandKit.gradients.background}`}>
        <div className={brandKit.components.section.container}>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className={brandKit.components.section.badge}>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-primary font-medium text-sm">My Journey</span>
              </div>

              <h2 className={brandClasses.sectionTitle}>
                From Vision to
                <span className={brandKit.components.section.subtitle}>Reality</span>
              </h2>

              <div className="space-y-6 text-lg leading-relaxed text-secondary">
                <p>
                  Since establishing Diva Fitness in 2017, I've been on a mission to create something truly special – a
                  sanctuary where women can pursue their fitness goals without judgment, intimidation, or compromise.
                </p>

                <p>
                  My journey began with a simple realization: traditional gyms weren't serving women's unique needs. Too
                  many brilliant women were holding back, feeling uncomfortable, or simply not getting the personalised
                  attention they deserved.
                </p>

                <p>
                  That's when I decided to create something different – a private, purpose-built garden studio where
                  every detail is designed with women's empowerment in mind.
                </p>
              </div>

              <Button asChild size="lg" className={brandClasses.buttonPrimary}>
                <Link href="/services" className="flex items-center gap-2">
                  Explore My Services
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div
                    className={`relative h-48 rounded-2xl overflow-hidden shadow-lg ${brandKit.animations.scaleHover}`}
                  >
                    <Image
                      src="/images/studio-exterior-cropped.jpg"
                      alt="Studio Exterior"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div
                    className={`relative h-32 rounded-2xl overflow-hidden shadow-lg ${brandKit.animations.scaleHover}`}
                  >
                    <Image
                      src="/images/equipment-wide-shot.jpg"
                      alt="Professional Equipment"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div
                    className={`relative h-32 rounded-2xl overflow-hidden shadow-lg ${brandKit.animations.scaleHover}`}
                  >
                    <Image src="/images/weights-close-up.jpg" alt="Training Equipment" fill className="object-cover" />
                  </div>
                  <div
                    className={`relative h-48 rounded-2xl overflow-hidden shadow-lg ${brandKit.animations.scaleHover}`}
                  >
                    <Image
                      src="/images/action-training-session.jpg"
                      alt="Training Session"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={`${brandKit.spacing.section.lg} bg-white`}>
        <div className={brandKit.components.section.container}>
          <div className={brandKit.components.section.header}>
            <div className={brandKit.components.section.badge}>
              <Heart className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium text-sm">My Philosophy</span>
            </div>
            <h2 className={brandClasses.sectionTitle}>
              What Drives
              <span className={brandKit.components.section.subtitle}>Everything I Do</span>
            </h2>
            <p className={brandClasses.sectionDescription}>
              Every aspect of my approach is designed with women's unique needs, challenges, and strengths in mind.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: "Supportive",
                description: "Creating a non-judgmental space where you feel comfortable and encouraged to grow.",
                color: brandKit.gradients.accent,
              },
              {
                icon: Users,
                title: "Personal",
                description: "Tailored programmes that adapt to your lifestyle, preferences, and individual goals.",
                color: brandKit.gradients.primary,
              },
              {
                icon: Zap,
                title: "Holistic",
                description: "Combining fitness, nutrition, and wellness for comprehensive, lasting transformation.",
                color: brandKit.gradients.secondary,
              },
              {
                icon: Award,
                title: "Professional",
                description: "Qualified, experienced, and committed to ongoing education and development.",
                color: brandKit.gradients.accent,
              },
            ].map((value, index) => (
              <Card key={index} className={brandClasses.cardBase}>
                <div
                  className={`absolute inset-0 ${value.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                <CardContent className={brandKit.components.card.content}>
                  <div
                    className={`w-16 h-16 ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <value.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className={brandKit.components.card.title}>{value.title}</h3>

                  <p className={brandKit.components.card.description}>{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Transformation Section */}
      <section className="py-24 bg-gradient-to-b from-purple-50 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              The Journey
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              My Studio
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Story</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From an empty garden to a dream studio - captured in moments
            </p>
          </div>

          {/* Purple Rope */}
          <div className="relative mb-8">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-400 rounded-full shadow-lg" />
            <div className="absolute top-0.5 left-0 right-0 h-1 bg-gradient-to-r from-purple-300 via-purple-400 to-purple-300 rounded-full" />
          </div>

          {/* Polaroid Photos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 relative">
            {[
              {
                image: "/images/journey-before.jpg",
                caption: "The empty garden - where it all began!",
                rotation: "-rotate-3",
                marginTop: "mt-8",
              },
              {
                image: "/images/journey-plan.jpg",
                caption: "Planning every detail on paper",
                rotation: "rotate-2",
                marginTop: "mt-4",
              },
              {
                image: "/images/journey-construction.jpg",
                caption: "Hard work with my furry helpers!",
                rotation: "-rotate-1",
                marginTop: "mt-12",
              },
              {
                image: "/images/journey-complete.jpg",
                caption: "The dream studio is complete! ✨",
                rotation: "rotate-3",
                marginTop: "mt-6",
              },
            ].map((photo, index) => (
              <div key={index} className={`relative ${photo.marginTop} group`}>
                {/* Clothespin */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="w-6 h-8 bg-gradient-to-b from-amber-200 to-amber-400 rounded-t-lg shadow-md border border-amber-300">
                    <div className="w-full h-2 bg-amber-300 rounded-t-lg" />
                    <div className="w-full h-0.5 bg-amber-500 mt-1" />
                  </div>
                </div>

                {/* Polaroid Frame */}
                <div
                  className={`bg-white p-4 pb-16 shadow-2xl ${photo.rotation} hover:rotate-0 transition-transform duration-500 group-hover:scale-105 relative z-10`}
                >
                  {/* Photo */}
                  <div className="relative h-64 w-full bg-gray-100 overflow-hidden">
                    <Image src={photo.image || "/placeholder.svg"} alt={photo.caption} fill className="object-cover" />
                  </div>

                  {/* Caption */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-gray-700 text-sm font-handwriting text-center leading-relaxed">
                      {photo.caption}
                    </p>
                  </div>

                  {/* Tape corners */}
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-yellow-100 opacity-80 rotate-45 border border-yellow-200" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-100 opacity-80 -rotate-45 border border-yellow-200" />
                </div>

                {/* Shadow */}
                <div
                  className={`absolute inset-0 bg-black/10 ${photo.rotation} transform translate-x-1 translate-y-1 -z-10`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
