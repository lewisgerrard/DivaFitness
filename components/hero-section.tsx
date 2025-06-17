import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  title: string
  subtitle?: string
  description: string
  primaryButtonText?: string
  primaryButtonHref?: string
  secondaryButtonText?: string
  secondaryButtonHref?: string
  badge?: string
  stats?: Array<{
    value: string
    label: string
  }>
}

export default function HeroSection({
  title,
  subtitle,
  description,
  primaryButtonText,
  primaryButtonHref,
  secondaryButtonText,
  secondaryButtonHref,
  badge,
  stats,
}: HeroSectionProps) {
  return (
    <section className="relative bg-primary h-[400px] flex items-center justify-center overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-dark/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary-light/10 rounded-full blur-2xl" />
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-accent/20 rounded-full blur-xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
        {badge && (
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">{badge}</span>
          </div>
        )}

        <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight animate-fade-in">
          {title}
          {subtitle && (
            <span className="block bg-gradient-to-r from-white to-accent-light bg-clip-text text-transparent">
              {subtitle}
            </span>
          )}
        </h1>

        <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto leading-relaxed opacity-90 animate-fade-in">
          {description}
        </p>

        {(primaryButtonText || secondaryButtonText) && (
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-4 animate-fade-in">
            {primaryButtonText && primaryButtonHref && (
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90 px-6 py-3 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Link href={primaryButtonHref} className="flex items-center gap-2">
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
                className="border-white/30 text-white hover:bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm"
              >
                <Link href={secondaryButtonHref}>{secondaryButtonText}</Link>
              </Button>
            )}
          </div>
        )}

        {stats && (
          <div className="grid grid-cols-2 gap-6 max-w-md mx-auto animate-fade-in">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
