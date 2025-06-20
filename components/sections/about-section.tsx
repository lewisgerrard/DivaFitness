import Image from "next/image"
import Link from "next/link"
import { User, Leaf, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Section } from "./section"
import { brandKit, brandClasses } from "@/lib/brand-kit"

export function AboutSection() {
  return (
    <Section background="gradient" containerSize="lg">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className={brandKit.components.section.badge}>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-primary font-medium text-sm">Since 2017</span>
          </div>

          <h2 className={brandClasses.sectionTitle}>
            Your Personal
            <span className={brandKit.components.section.subtitle}>Fitness Sanctuary</span>
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed">
            Step into a world where fitness meets tranquility. The purpose-built garden studio isn't just a gym – it's
            your personal retreat where transformation happens naturally.
          </p>

          <div className="grid grid-cols-2 gap-6">
            <div className="group">
              <div className={`${brandKit.components.card.icon} ${brandKit.gradients.primary} mb-3`}>
                <User className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-secondary mb-2">1-to-1 Focus</h3>
              <p className="text-sm text-muted-foreground">Completely personalised attention</p>
            </div>
            <div className="group">
              <div className={`${brandKit.components.card.icon} ${brandKit.gradients.secondary} mb-3`}>
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-secondary mb-2">Holistic Approach</h3>
              <p className="text-sm text-muted-foreground">Fitness, nutrition & wellness</p>
            </div>
          </div>

          <Button asChild size="lg" className={brandClasses.buttonPrimary}>
            <Link href="/about" className="flex items-center gap-2">
              Meet Emma
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>

        <div className="relative">
          <div className={`relative h-80 rounded-3xl overflow-hidden shadow-2xl ${brandKit.animations.scaleHover}`}>
            <Image
              src="/images/studio-emma-doorway.jpg"
              alt="Emma Fisher in Diva Fitness Studio"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
          </div>
        </div>
      </div>
    </Section>
  )
}
