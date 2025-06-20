"use client"

import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { brandClasses, brandKit } from "@/lib/brand-kit"
import { usePathname } from "next/navigation"
import Image from "next/image"

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
    <section className={`${brandKit.components.hero.container} ${pathname === "/" ? "min-h-screen" : ""}`}>
      {/* Decorative Elements */}
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
