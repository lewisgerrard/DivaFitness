import { User, Leaf, Sparkles, ArrowRight } from "lucide-react"
import HeroHome from "@/components/hero-home"
import SectionHeader from "@/components/section-header"
import ReviewCard from "@/components/review-card"
import MapSection from "@/components/map-section"
import CTASection from "@/components/cta-section"
import { StructuredData } from "@/components/structured-data"
import { generateBusinessSchema, generatePersonSchema } from "@/lib/structured-data"
import { generatePageMetadata } from "@/lib/seo"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { brandKit, brandClasses } from "@/lib/brand-kit"

export const metadata = generatePageMetadata({
  title: "Personal Training & Fitness Studio for Women",
  description:
    "Transform your body and mind with expert personal training in our private women-only fitness studio. Specializing in female fitness since 2017.",
  keywords: ["personal trainer", "women's fitness", "female personal trainer", "fitness studio", "private gym"],
  path: "/",
})

export default function HomePage() {
  const reviews = [
    {
      name: "Hanna",
      text: "After just a couple of sessions, we noticed major improvements that were easy to incorporate into our daily routines. If you would like to eat better but do not know where to start, get in touch with Diva Fitness! You will be in the best possible hands",
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
      text: "Since embarking on my journey with Emma last July it has genuinely turned my life around. I feel great, my body has changed so much and my relationship with food is so much better.",
      rating: 5,
      platform: "google" as const,
      date: "3 weeks ago",
    },
  ]

  return (
    <div className="min-h-screen">
      <StructuredData data={[generateBusinessSchema(), generatePersonSchema()]} />

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
                Step into a world where fitness meets tranquility. The purpose-built garden studio is not just a gym -
                it is your personal retreat where transformation happens naturally.
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
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

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
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
              <Image
                src="/images/weights-close-up.jpg"
                alt="Close-up of training weights"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
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

            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
              <Image
                src="/images/nutrition-pantry.jpg"
                alt="Organized healthy nutrition pantry with glass jars"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
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

      <section id="reviews" className={`${brandKit.components.section.base} ${brandKit.gradients.background}`}>
        <div className={brandKit.components.section.container}>
          <SectionHeader
            title="Strong Women."
            subtitle="Honest Words."
            description="See what ladies have to say about their journey with Diva Fitness."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {reviews.slice(0, 3).map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </div>

          <MapSection />
        </div>
      </section>

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
