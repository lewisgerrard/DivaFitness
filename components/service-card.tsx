import type { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { brandKit, brandClasses } from "@/lib/brand-kit"

interface ServiceCardProps {
  icon: LucideIcon
  title: string
  description: string
  features: string[]
  popular?: boolean
  buttonText?: string
  buttonHref?: string
  colorScheme?: "primary" | "secondary" | "accent"
}

export function ServiceCard({
  icon: Icon,
  title,
  description,
  features,
  popular = false,
  buttonText = "Learn More",
  buttonHref = "/services",
  colorScheme = "primary",
}: ServiceCardProps) {
  const colorSchemes = {
    primary: brandKit.gradients.primary,
    secondary: brandKit.gradients.secondary,
    accent: brandKit.gradients.accent,
  }

  return (
    <Card className={`${brandClasses.cardBase} ${popular ? "ring-2 ring-primary" : ""}`}>
      {popular && (
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10">
          <span
            className={`${brandKit.gradients.primary} text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg`}
          >
            Most Popular
          </span>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <CardContent className={brandKit.components.card.content}>
        <div className={`${brandKit.components.card.icon} ${colorSchemes[colorScheme]}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>

        <h3 className={brandKit.components.card.title}>{title}</h3>

        <p className={`${brandKit.components.card.description} mb-4`}>{description}</p>

        <ul className="space-y-1 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-xs text-secondary">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
              {feature}
            </li>
          ))}
        </ul>

        <Button className={`w-full ${colorSchemes[colorScheme]} hover:opacity-90 rounded-full text-sm`}>
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  )
}

export default ServiceCard
