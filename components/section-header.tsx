import type { LucideIcon } from "lucide-react"

interface SectionHeaderProps {
  badge?: string
  badgeIcon?: LucideIcon
  title: string
  subtitle?: string
  description?: string
  centered?: boolean
}

export default function SectionHeader({
  badge,
  badgeIcon: BadgeIcon,
  title,
  subtitle,
  description,
  centered = true,
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      {badge && (
        <div
          className={`inline-flex items-center gap-2 bg-accent/20 rounded-full px-4 py-2 mb-4 ${centered ? "" : "mb-6"}`}
        >
          {BadgeIcon && <BadgeIcon className="w-4 h-4 text-primary" />}
          <span className="text-primary font-medium text-sm">{badge}</span>
        </div>
      )}

      <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary mb-4">
        {title}
        {subtitle && <span className="block text-primary">{subtitle}</span>}
      </h2>

      {description && (
        <p className={`text-lg text-muted-foreground leading-relaxed ${centered ? "max-w-2xl mx-auto" : "max-w-3xl"}`}>
          {description}
        </p>
      )}
    </div>
  )
}
