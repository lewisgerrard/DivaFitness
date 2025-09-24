"use client"

import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { brandClasses, brandKit } from "@/lib/brand-kit"
import Image from "next/image"

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
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/studio-exterior-full.jpg"
          alt="Diva Fitness Studio Exterior"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={85}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className={brandKit.components.hero.badge}>
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">{badge || title}</span>
        </div>

        <h1 className={`${brandClasses.heroTitle} text-white`}>
          {title}
          {subtitle && <span className={`${brandKit.components.hero.subtitle} text-white`}>{subtitle}</span>}
        </h1>

        <p className={`${brandClasses.heroDescription} text-white/90 max-w-2xl mx-auto`}>{description}</p>

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
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-black"
              >
                <Link href={secondaryButtonHref} className="flex items-center gap-2 justify-center">
                  {secondaryButtonText}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            )}

            {tertiaryButtonText && tertiaryButtonHref && (
              <Button asChild size="lg" variant="ghost" className="text-white hover:bg-white/10">
                <Link href={tertiaryButtonHref} className="flex items-center gap-2 justify-center">
                  {tertiaryButtonText}
                  <ArrowRight className="w-4 h-4" />
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
