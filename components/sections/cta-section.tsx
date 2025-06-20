import Link from "next/link"
import { ArrowRight, Sparkles, Phone, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Section } from "./section"

interface CTASectionProps {
  badge?: string
  title: string
  subtitle?: string
  description: string
  primaryButton: {
    text: string
    href: string
  }
  secondaryButton?: {
    text: string
    href: string
  }
  showContactInfo?: boolean
}

export function CTASection({
  badge,
  title,
  subtitle,
  description,
  primaryButton,
  secondaryButton,
  showContactInfo = true,
}: CTASectionProps) {
  return (
    <Section background="primary" padding="lg" containerSize="md">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-dark/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary-light/10 rounded-full blur-2xl" />
      </div>

      <div className="relative text-center text-white">
        {badge && (
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">{badge}</span>
          </div>
        )}

        <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4 leading-tight">
          {title}
          {subtitle && <span className="block">{subtitle}</span>}
        </h2>

        <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">{description}</p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-white text-primary hover:bg-white/90 px-6 py-3 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <Link href={primaryButton.href} className="flex items-center gap-2">
              {primaryButton.text}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>

          {secondaryButton && (
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm"
            >
              <Link href={secondaryButton.href}>{secondaryButton.text}</Link>
            </Button>
          )}
        </div>

        {showContactInfo && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl p-3 hover:bg-white/20 transition-colors duration-300">
              <Phone className="w-4 h-4" />
              <a href="tel:07966874821" className="hover:text-white/80 transition-colors text-sm">
                07966 874 821
              </a>
            </div>
            <div className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl p-3 hover:bg-white/20 transition-colors duration-300">
              <Mail className="w-4 h-4" />
              <a href="mailto:info@diva-fitness.co.uk" className="hover:text-white/80 transition-colors text-sm">
                Get in Touch
              </a>
            </div>
            <div className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl p-3 hover:bg-white/20 transition-colors duration-300">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Chester, UK</span>
            </div>
          </div>
        )}
      </div>
    </Section>
  )
}
