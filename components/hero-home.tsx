"use client"

import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { brandClasses, brandKit } from "@/lib/brand-kit"
import { Button } from "@/components/ui/button"

interface HeroHomeProps {
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
  stats?: Array<{
    value: string
    label: string
  }>
}

export function HeroHome({
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
  stats,
}: HeroHomeProps) {
  return (
    <section
      className={`${brandKit.components.hero.container} min-h-screen bg-[url('/images/studio-exterior-full.jpg')] bg-cover bg-center bg-no-repeat`}
    >
      <div className={brandKit.components.hero.content}>
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
              <Button
                asChild
                className="bg-accent text-white font-semibold hover:bg-accent-dark shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Link href={primaryButtonHref} className="inline-flex items-center gap-2">
                  {primaryButtonText}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            )}

            {secondaryButtonText && secondaryButtonHref && (
              <Button
                asChild
                variant="outline"
                className="bg-white text-accent font-semibold hover:bg-gray-50 shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-accent"
              >
                <Link href={secondaryButtonHref} className="inline-flex items-center gap-2">
                  {secondaryButtonText}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            )}

            {tertiaryButtonText && tertiaryButtonHref && (
              <Button
                asChild
                variant="ghost"
                className="bg-transparent text-white font-semibold hover:bg-white/10 border-2 border-white"
              >
                <Link href={tertiaryButtonHref} className="inline-flex items-center gap-2">
                  {tertiaryButtonText}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            )}
          </div>
        )}

        {/* Stats for home page */}
        {stats && stats.length > 0 && (
          <div className="flex items-center justify-center gap-8 mt-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default HeroHome
