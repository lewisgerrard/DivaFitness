import type { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

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

export default function ServiceCard({
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
    primary: "from-primary to-primary-light",
    secondary: "from-primary-light to-primary",
    accent: "from-primary to-primary-dark",
  }

  return (
    <Card
      className={`group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${popular ? "ring-2 ring-primary" : ""}`}
    >
      {popular && (
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10">
          <span className="bg-gradient-to-r from-primary to-primary-light text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
            Most Popular
          </span>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <CardContent className="p-6 relative z-10">
        <div
          className={`w-12 h-12 bg-gradient-to-br ${colorSchemes[colorScheme]} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>

        <h3 className="font-heading text-xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>

        <p className="text-muted-foreground mb-4 leading-relaxed text-sm">{description}</p>

        <ul className="space-y-1 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-xs text-secondary">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
              {feature}
            </li>
          ))}
        </ul>

        <Button
          className={`w-full bg-gradient-to-r ${colorSchemes[colorScheme]} hover:opacity-90 rounded-full text-sm`}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  )
}
