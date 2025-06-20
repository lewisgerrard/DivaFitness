import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { brandClasses, brandKit } from "@/lib/brand-kit"
import Image from "next/image"

interface HeroSectionProps {
  title: string
  subtitle?: string
  description: string
  primaryButton?: {
    text: string
    href: string
  }
  secondaryButton?: {
    text: string
    href: string
  }
  tertiaryButton?: {
    text: string
    href: string
  }
  badge?: string
  stats?: Array<{
    value: string
    label: string
  }>
  backgroundImage?: string
  variant?: "home" | "page"
}

export function HeroSection({
  title,
  subtitle,
  description,
  primaryButton,
  secondaryButton,
  tertiaryButton,
  badge,
  stats,
  backgroundImage,
  variant = "page",
}: HeroSectionProps) {
  return (
    <section className={`${brandKit.components.hero.container} min-h-screen`}>
      {/* Background */}
      <div className="absolute inset-0">
        {backgroundImage ? (
          <>
            <Image
              src={backgroundImage || "/placeholder.svg"}
              alt="Hero Background"
              fill
              priority
              className="object-cover"
              sizes="100vw"
              quality={85}
            />
            <div className="absolute inset-0 bg-black/40" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#7b329b] to-[#5a1a75]" />
        )}
      </div>

      <div className={brandKit.components.hero.content}>
        {badge && (
          <div className={brandKit.components.hero.badge}>
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">{badge}</span>
          </div>
        )}

        <h1 className={brandClasses.heroTitle}>
          {title}
          {subtitle && <span className={brandKit.components.hero.subtitle}>{subtitle}</span>}
        </h1>

        <p className={brandClasses.heroDescription}>{description}</p>

        {(primaryButton || secondaryButton || tertiaryButton) && (
          <div className={brandKit.components.hero.buttonContainer}>
            {primaryButton && (
              <Button asChild size="lg" className={brandKit.components.hero.button}>
                <Link href={primaryButton.href} className="flex items-center gap-2 justify-center">
                  {primaryButton.text}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            )}

            {secondaryButton && (
              <Button asChild size="lg" className={brandKit.components.hero.button}>
                <Link href={secondaryButton.href} className="flex items-center gap-2 justify-center">
                  {secondaryButton.text}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            )}

            {tertiaryButton && (
              <Button asChild size="lg" className={brandKit.components.hero.button}>
                <Link href={tertiaryButton.href} className="flex items-center gap-2 justify-center">
                  {tertiaryButton.text}
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
