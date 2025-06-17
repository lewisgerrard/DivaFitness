import Image from "next/image"
import Link from "next/link"
import { Award, Heart, Users, Zap, ArrowRight, Target, Trophy, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import HeroSection from "@/components/hero-section"

export default function AboutPage() {
  const achievements = [
    { icon: Trophy, title: "National Fitness Awards 2024", subtitle: "Runner-Up", year: "2024" },
    { icon: Star, title: "500+ Women Transformed", subtitle: "Lives Changed", year: "2017-2024" },
    { icon: Target, title: "100% Success Rate", subtitle: "Goal Achievement", year: "Ongoing" },
    { icon: Clock, title: "7+ Years Experience", subtitle: "Dedicated Service", year: "Since 2017" },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title="Meet Emma"
        subtitle="Fisher"
        description="Empowering women since 2017 with personalized fitness journeys that transform bodies, minds, and lives."
        primaryButtonText="Work With Emma"
        primaryButtonHref="/contact"
        badge="Your Personal Trainer"
        stats={[{ value: "7+", label: "Years Experience" }]}
      />

      {/* Story Section with Interactive Elements */}
      <section className="py-20 bg-gradient-to-br from-white via-muted to-accent/5 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-xl" />
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-accent/10 rounded-full blur-2xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-primary font-medium text-sm">My Journey</span>
              </div>

              <h2 className="font-heading text-4xl md:text-5xl font-bold text-secondary leading-tight">
                From Vision to
                <span className="block text-primary">Reality</span>
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

              <Button asChild size="lg" className="bg-primary hover:bg-primary-dark rounded-full px-8">
                <Link href="/services" className="flex items-center gap-2">
                  Explore My Services
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-500">
                    <Image
                      src="/images/studio-exterior-cropped.jpg"
                      alt="Studio Exterior"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-32 rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-500">
                    <Image
                      src="/images/equipment-wide-shot.jpg"
                      alt="Professional Equipment"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="relative h-32 rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-500">
                    <Image src="/images/weights-close-up.jpg" alt="Training Equipment" fill className="object-cover" />
                  </div>
                  <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-500">
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

      {/* Interactive Values Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
              <Heart className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium text-sm">My Philosophy</span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-secondary mb-6">
              What Drives
              <span className="block text-primary">Everything I Do</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every aspect of my approach is designed with women's unique needs, challenges, and strengths in mind.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: "Supportive",
                description: "Creating a non-judgmental space where you feel comfortable and encouraged to grow.",
                color: "from-accent to-primary",
              },
              {
                icon: Users,
                title: "Personal",
                description: "Tailored programs that adapt to your lifestyle, preferences, and individual goals.",
                color: "from-primary to-accent",
              },
              {
                icon: Zap,
                title: "Holistic",
                description: "Combining fitness, nutrition, and wellness for comprehensive, lasting transformation.",
                color: "from-primary to-primary-dark",
              },
              {
                icon: Award,
                title: "Professional",
                description: "Qualified, experienced, and committed to ongoing education and development.",
                color: "from-accent to-accent-dark",
              },
            ].map((value, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                <CardContent className="p-8 text-center relative z-10">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <value.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="font-heading text-xl font-bold text-secondary mb-4 group-hover:text-primary transition-colors duration-300">
                    {value.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Timeline */}
      <section className="py-20 bg-gradient-to-br from-muted via-accent/5 to-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-secondary mb-6">
              Milestones &<span className="block text-primary">Achievements</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A journey of dedication, growth, and countless success stories.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <achievement.icon className="w-8 h-8 text-white" />
                  </div>

                  <div className="text-sm text-primary font-semibold mb-2">{achievement.year}</div>
                  <h3 className="font-heading text-lg font-bold text-secondary mb-2">{achievement.title}</h3>
                  <p className="text-muted-foreground text-sm">{achievement.subtitle}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
