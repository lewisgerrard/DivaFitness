"use client"

import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { brandClasses, brandKit } from "@/lib/brand-kit"
import { usePathname } from "next/navigation"

interface HeroSectionProps {
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

function HeroSection({
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
}: HeroSectionProps) {
  const pathname = usePathname()

  // Don't render hero on non-public pages
  const isPublicPage =
    pathname === "/" ||
    pathname === "/about" ||
    pathname === "/services" ||
    pathname === "/contact" ||
    pathname === "/faqs"

  if (!isPublicPage) {
    return null
  }

  return (
    <section className={brandKit.components.hero.container}>
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-dark/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary-light/10 rounded-full blur-2xl" />
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-accent/20 rounded-full blur-xl" />
      </div>

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

// Export both named and default exports for compatibility
export { HeroSection }
export default HeroSection
