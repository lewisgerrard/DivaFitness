"use client"
import { Sparkles } from "lucide-react"
import { brandClasses, brandKit } from "@/lib/brand-kit"

interface HeroPageProps {
  title: string
  subtitle?: string
  description: string
  badge?: string
}

export function HeroPage({ title, subtitle, description, badge }: HeroPageProps) {
  return (
    <section
      className="relative min-h-[300px] bg-gradient-to-br from-[#7b329b] via-[#7b329b]/95 to-[#7b329b]/90 flex items-center justify-center overflow-hidden w-screen mb-0"
      style={{
        marginLeft: "calc(-50vw + 50%)",
        marginRight: "calc(-50vw + 50%)",
      }}
    >
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-8">
        <div className={brandKit.components.hero.badge}>
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">{badge || title}</span>
        </div>

        <h1 className={brandClasses.heroTitle}>
          {title}
          {subtitle && <span className={brandKit.components.hero.subtitle}>{subtitle}</span>}
        </h1>

        <p className={brandClasses.heroDescription}>{description}</p>
      </div>
    </section>
  )
}

export default HeroPage
