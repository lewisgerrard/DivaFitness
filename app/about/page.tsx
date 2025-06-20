"use client"
import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Award, Heart, Users, Zap, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HeroSection } from "@/components/sections/hero-section"
import { Section } from "@/components/sections/section"
import { brandKit, brandClasses } from "@/lib/brand-kit"

export default function AboutPage() {
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.pageYOffset
        const rate = scrolled * -0.5
        parallaxRef.current.style.transform = `translateY(${rate}px)`
      }
    }

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-up")
          entry.target.classList.remove("opacity-0", "translate-y-8")
        }
      })
    }, observerOptions)

    const animatedElements = document.querySelectorAll(".animate-on-scroll")
    animatedElements.forEach((el) => observer.observe(el))

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full animate-float" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-accent/10 rounded-full animate-float-delayed" />
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-primary/3 rounded-full animate-float-slow" />
      </div>

      {/* Hero Section */}
      <HeroSection
        title="Meet Emma"
        subtitle="Fisher"
        description="Empowering women since 2017 with personalised fitness journeys that transform bodies, minds, and lives."
        primaryButton={{
          text: "Work With Emma",
          href: "/contact",
        }}
        secondaryButton={{
          text: "View Services",
          href: "/services",
        }}
        tertiaryButton={{
          text: "See Reviews",
          href: "/#reviews",
        }}
        badge="Your Personal Trainer"
      />

      {/* Story Section */}
      <Section background="gradient" containerSize="lg">
        <div ref={parallaxRef} className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000 delay-200">
            <div className={`${brandKit.components.section.badge} hover:scale-105 transition-transform duration-300`}>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-primary font-medium text-sm">My Journey</span>
            </div>

            <h2 className={`${brandClasses.sectionTitle} hover:text-primary transition-colors duration-500`}>
              From Vision to
              <span className={brandKit.components.section.subtitle}>Reality</span>
            </h2>

            <div className="space-y-6 text-lg leading-relaxed text-secondary">
              <p className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-800 delay-300">
                Since establishing Diva Fitness in 2017, I've been on a mission to create something truly special – a
                sanctuary where women can pursue their fitness goals without judgment, intimidation, or compromise.
              </p>

              <p className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-800 delay-500">
                My journey began with a simple realization: traditional gyms weren't serving women's unique needs. Too
                many brilliant women were holding back, feeling uncomfortable, or simply not getting the personalised
                attention they deserved.
              </p>

              <p className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-800 delay-700">
                That's when I decided to create something different – a private, purpose-built garden studio where every
                detail is designed with women's empowerment in mind.
              </p>
            </div>

            <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-800 delay-900">
              <Button
                asChild
                size="lg"
                className={`${brandClasses.buttonPrimary} hover:scale-105 transition-all duration-300 hover:shadow-lg`}
              >
                <Link href="/services" className="flex items-center gap-2">
                  Explore My Services
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative animate-on-scroll opacity-0 translate-x-8 transition-all duration-1000 delay-400">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div
                  className={`relative h-48 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105`}
                >
                  <Image
                    src="/images/studio-exterior-cropped.jpg"
                    alt="Studio Exterior"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div
                  className={`relative h-32 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105`}
                >
                  <Image
                    src="/images/equipment-wide-shot.jpg"
                    alt="Professional Equipment"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div
                  className={`relative h-32 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105`}
                >
                  <Image
                    src="/images/weights-close-up.jpg"
                    alt="Training Equipment"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div
                  className={`relative h-48 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105`}
                >
                  <Image
                    src="/images/action-training-session.jpg"
                    alt="Training Session"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Values Section */}
      <Section background="white" containerSize="lg">
        <div className={`text-center mb-16 animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000`}>
          <div className={`${brandKit.components.section.badge} hover:scale-105 transition-transform duration-300`}>
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
            <Card
              key={index}
              className={`${brandClasses.cardBase} animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000 hover:scale-105 hover:-translate-y-2`}
              style={{ transitionDelay: `${index * 200 + 600}ms` }}
            >
              <div
                className={`absolute inset-0 ${value.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />

              <CardContent className={brandKit.components.card.content}>
                <div
                  className={`w-16 h-16 ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                >
                  <value.icon className="w-8 h-8 text-white" />
                </div>

                <h3
                  className={`${brandKit.components.card.title} group-hover:text-primary transition-colors duration-300`}
                >
                  {value.title}
                </h3>

                <p className={brandKit.components.card.description}>{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Journey Section */}
      <Section background="gradient" containerSize="xl">
        <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300">
            <Heart className="w-4 h-4" />
            The Journey
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 hover:text-primary transition-colors duration-500">
            My Studio
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Story</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From an empty garden to a dream studio - captured in moments
          </p>
        </div>

        {/* Purple Rope */}
        <div className="relative mb-8 animate-on-scroll opacity-0 scale-x-0 transition-all duration-1500 delay-300">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-400 rounded-full shadow-lg animate-pulse" />
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
            <div
              key={index}
              className={`relative ${photo.marginTop} group animate-on-scroll opacity-0 translate-y-12 transition-all duration-1000`}
              style={{ transitionDelay: `${index * 300 + 800}ms` }}
            >
              {/* Clothespin */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20 group-hover:scale-110 transition-transform duration-300">
                <div className="w-6 h-8 bg-gradient-to-b from-amber-200 to-amber-400 rounded-t-lg shadow-md border border-amber-300">
                  <div className="w-full h-2 bg-amber-300 rounded-t-lg" />
                  <div className="w-full h-0.5 bg-amber-500 mt-1" />
                </div>
              </div>

              {/* Polaroid Frame */}
              <div
                className={`bg-white p-4 pb-16 shadow-2xl ${photo.rotation} hover:rotate-0 transition-all duration-700 group-hover:scale-110 group-hover:shadow-3xl relative z-10 cursor-pointer`}
              >
                {/* Photo */}
                <div className="relative h-64 w-full bg-gray-100 overflow-hidden rounded-sm">
                  <Image
                    src={photo.image || "/placeholder.svg"}
                    alt={photo.caption}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Caption */}
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-gray-700 text-sm font-handwriting text-center leading-relaxed group-hover:text-primary transition-colors duration-300">
                    {photo.caption}
                  </p>
                </div>

                {/* Tape corners */}
                <div className="absolute -top-2 -left-2 w-8 h-8 bg-yellow-100 opacity-80 rotate-45 border border-yellow-200 group-hover:bg-yellow-200 transition-colors duration-300" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-100 opacity-80 -rotate-45 border border-yellow-200 group-hover:bg-yellow-200 transition-colors duration-300" />
              </div>

              {/* Shadow */}
              <div
                className={`absolute inset-0 bg-black/20 ${photo.rotation} transform translate-x-2 translate-y-2 -z-10 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-700`}
              />
            </div>
          ))}
        </div>
      </Section>

      {/* Custom styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  )
}
