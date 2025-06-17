import type { LucideIcon } from "lucide-react"
import { brandKit, brandClasses } from "@/lib/brand-kit"

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
    <div className={`${brandKit.components.section.header} ${centered ? "text-center" : ""}`}>
      {badge && (
        <div className={brandKit.components.section.badge}>
          {BadgeIcon && <BadgeIcon className="w-4 h-4 text-primary" />}
          <span className="text-primary font-medium text-sm">{badge}</span>
        </div>
      )}

      <h2 className={brandClasses.sectionTitle}>
        {title}
        {subtitle && <span className={brandKit.components.section.subtitle}>{subtitle}</span>}
      </h2>

      {description && <p className={brandClasses.sectionDescription}>{description}</p>}
    </div>
  )
}
