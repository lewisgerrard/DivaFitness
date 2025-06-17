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
        description="Empowering women since 2017 with personalized fitness journeys that transform bodies, minds, and lives."
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
                  many brilliant women were holding back, feeling uncomfortable, or simply not getting the personalized
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
              {/* Journey Timeline */}
              <div className="space-y-8">
                {/* Timeline Line */}
                <div className="absolute left-8 top-16 bottom-16 w-0.5 bg-gradient-to-b from-primary via-primary-light to-primary-dark hidden md:block"></div>

                {/* Journey Step 1 - Beginning */}
                <div className="flex items-center gap-6">
                  <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">2017</span>
                  </div>
                  <div className="flex-1">
                    <div className="relative h-32 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
                      <Image
                        src="/images/studio-exterior-full.jpg"
                        alt="The beginning - Studio concept"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
                      <div className="absolute bottom-2 left-3 text-white">
                        <p className="text-xs font-semibold">The Vision Begins</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Journey Step 2 - Building */}
                <div className="flex items-center gap-6">
                  <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-primary-light to-primary rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">2018</span>
                  </div>
                  <div className="flex-1">
                    <div className="relative h-32 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
                      <Image
                        src="/images/studio-garden-pathway.jpg"
                        alt="Building the dream - Garden pathway"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-light/20 to-transparent"></div>
                      <div className="absolute bottom-2 left-3 text-white">
                        <p className="text-xs font-semibold">Creating the Space</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Journey Step 3 - Equipment & Setup */}
                <div className="flex items-center gap-6">
                  <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">2019</span>
                  </div>
                  <div className="flex-1">
                    <div className="relative h-32 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
                      <Image
                        src="/images/equipment-wide-shot.jpg"
                        alt="Professional equipment setup"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/20 to-transparent"></div>
                      <div className="absolute bottom-2 left-3 text-white">
                        <p className="text-xs font-semibold">Professional Setup</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Journey Step 4 - Today */}
                <div className="flex items-center gap-6">
                  <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-primary-light to-accent rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <span className="text-white font-bold text-sm">Now</span>
                  </div>
                  <div className="flex-1">
                    <div className="relative h-40 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 ring-2 ring-primary/30">
                      <Image
                        src="/images/action-training-session.jpg"
                        alt="Today - Empowering women through fitness"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent"></div>
                      <div className="absolute bottom-2 left-3 text-white">
                        <p className="text-xs font-semibold">Empowering Women Today</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Journey Stats */}
              <div className="mt-8 grid grid-cols-3 gap-4 p-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">7+</div>
                  <div className="text-xs text-muted-foreground">Years Journey</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">100+</div>
                  <div className="text-xs text-muted-foreground">Women Empowered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">∞</div>
                  <div className="text-xs text-muted-foreground">Dreams Realized</div>
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
                description: "Tailored programs that adapt to your lifestyle, preferences, and individual goals.",
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
    </div>
  )
}
