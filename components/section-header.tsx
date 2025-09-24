import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  badge?: string
  badgeIcon?: LucideIcon
  title: string
  subtitle?: string
  description?: string
  className?: string
}

export default function SectionHeader({
  badge,
  badgeIcon: BadgeIcon,
  title,
  subtitle,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("text-center mb-16", className)}>
      {badge && (
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          {BadgeIcon && <BadgeIcon className="w-4 h-4" />}
          {badge}
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
        {title}
        {subtitle && <span className="block text-primary mt-2">{subtitle}</span>}
      </h2>

      {description && <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">{description}</p>}
    </div>
  )
}
