"use client"
import { Sparkles } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

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
    <section className="relative min-h-[500px] bg-purple-600 flex items-center justify-center py-20">
      <div className="container mx-auto px-4 text-center text-white max-w-4xl">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">{badge || title}</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          {title}
          {subtitle && <span className="block text-white/90">{subtitle}</span>}
        </h1>

        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">{description}</p>

        {(primaryButtonText || secondaryButtonText || tertiaryButtonText) && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {primaryButtonText && (
              <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8">
                <Link href={primaryButtonHref || "#"}>{primaryButtonText}</Link>
              </Button>
            )}

            {secondaryButtonText && (
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-purple-600 font-semibold px-8"
              >
                <Link href={secondaryButtonHref || "#"}>{secondaryButtonText}</Link>
              </Button>
            )}

            {tertiaryButtonText && (
              <Button asChild variant="ghost" size="lg" className="text-white hover:bg-white/20 font-semibold px-8">
                <Link href={tertiaryButtonHref || "#"}>{tertiaryButtonText}</Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default HeroPage
