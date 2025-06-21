"use client"

import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { brandClasses, brandKit } from "@/lib/brand-kit"

interface HeroPageProps {
  title: string
  subtitle?: string
  description: string
  primaryButtonText?: string
  primaryButtonHref?: string
  secondaryButtonText?: string
  secondaryButtonHref?: string
  tertiaryButtonText?: string
  tertiaryButtonHref?: string
  badge?: string
}

export function HeroPage({
  title,
  subtitle,
  description,
  primaryButtonText,
  primaryButtonHref,
  secondaryButtonText,
  secondaryButtonHref,
  tertiaryButtonText,
  tertiaryButtonHref,
  badge,
}: HeroPageProps) {
  return (
    <section
      className="relative min-h-[400px] bg-gradient-to-br from-primary via-primary/95 to-primary/90 flex items-center justify-center overflow-hidden w-screen mb-0"
      style={{
        marginLeft: "calc(-50vw + 50%)",
        marginRight: "calc(-50vw + 50%)",
      }}
    >
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-16">
        <div className={brandKit.components.hero.badge}>
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">{badge || title}</span>
        </div>

        <h1 className={brandClasses.heroTitle}>
          {title}
          {subtitle && <span className={brandKit.components.hero.subtitle}>{subtitle}</span>}
        </h1>

        <p className={brandClasses.heroDescription}>{description}</p>

        {(primaryButtonText || secondaryButtonText || tertiaryButtonText) && (
          <div className={brandKit.components.hero.buttonContainer}>
            {primaryButtonText && primaryButtonHref && (
              <Button asChild size="lg" className={brandKit.components.hero.button}>
                <Link href={primaryButtonHref} className="flex items-center gap-2 justify-center">
                  {primaryButtonText}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            )}

            {secondaryButtonText && secondaryButtonHref && (
              <Button asChild size="lg" className={brandKit.components.hero.button}>
                <Link href={secondaryButtonHref} className="flex items-center gap-2 justify-center">
                  {secondaryButtonText}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            )}

            {tertiaryButtonText && tertiaryButtonHref && (
              <Button asChild size="lg" className={brandKit.components.hero.button}>
                <Link href={tertiaryButtonHref} className="flex items-center gap-2 justify-center">
                  {tertiaryButtonText}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default HeroPage
