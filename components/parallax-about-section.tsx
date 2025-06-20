"use client"

import { useParallax } from "@/hooks/use-scroll-animation"
import { AnimatedSection } from "./animated-section"
import { AnimatedStats } from "./animated-stats"
import { Button } from "@/components/ui/button"
import { brandKit, brandClasses } from "@/lib/brand-kit"
import { User, Leaf, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function ParallaxAboutSection() {
  const offset = useParallax()

  return (
    <section
      className={`${brandKit.components.section.base} ${brandKit.gradients.background} relative overflow-hidden`}
    >
      {/* Parallax background elements */}
      <div className="absolute inset-0 opacity-30" style={{ transform: `translateY(${offset * 0.1}px)` }}>
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className={`${brandKit.components.section.container} relative z-10`}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <AnimatedSection animation="slideLeft">
              <div className={brandKit.components.section.badge}>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-primary font-medium text-sm">Since 2017</span>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeUp" delay={200}>
              <h2 className={brandClasses.sectionTitle}>
                Your Personal
                <span className={brandKit.components.section.subtitle}>Fitness Sanctuary</span>
              </h2>
            </AnimatedSection>

            <AnimatedSection animation="fadeUp" delay={400}>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Step into a world where fitness meets tranquility. The purpose-built garden studio isn't just a gym –
                it's your personal retreat where transformation happens naturally.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-2 gap-6">
              <AnimatedSection animation="scale" delay={600}>
                <div className="group cursor-pointer">
                  <div
                    className={`${brandKit.components.card.icon} ${brandKit.gradients.primary} mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
                  >
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-secondary mb-2 group-hover:text-primary transition-colors">
                    1-to-1 Focus
                  </h3>
                  <p className="text-sm text-muted-foreground">Completely personalised attention</p>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="scale" delay={800}>
                <div className="group cursor-pointer">
                  <div
                    className={`${brandKit.components.card.icon} ${brandKit.gradients.secondary} mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
                  >
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-secondary mb-2 group-hover:text-primary transition-colors">
                    Holistic Approach
                  </h3>
                  <p className="text-sm text-muted-foreground">Fitness, nutrition & wellness</p>
                </div>
              </AnimatedSection>
            </div>

            <AnimatedSection animation="fadeUp" delay={1000}>
              <Button
                asChild
                size="lg"
                className={`${brandClasses.buttonPrimary} transition-all duration-300 hover:scale-105`}
              >
                <Link href="/about" className="flex items-center gap-2">
                  Meet Emma
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </AnimatedSection>
          </div>

          <AnimatedSection animation="slideRight" delay={600}>
            <div className="relative">
              <div
                className="relative h-96 rounded-3xl overflow-hidden shadow-2xl transition-transform duration-700 hover:scale-105"
                style={{ transform: `translateY(${offset * -0.05}px)` }}
              >
                <Image
                  src="/images/studio-emma-doorway.jpg"
                  alt="Emma Fisher in Diva Fitness Studio"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>

              {/* Floating stats card */}
              <div
                className="absolute -bottom-8 -left-8 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-primary/10"
                style={{ transform: `translateY(${offset * -0.08}px)` }}
              >
                <AnimatedStats />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
