import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface CleanPortalCardProps {
  title: string
  description: string
  icon: LucideIcon
  href: string
  iconColor?: string
  notification?: boolean
  badge?: string
}

export function CleanPortalCard({
  title,
  description,
  icon: Icon,
  href,
  iconColor = "text-primary",
  notification = false,
  badge,
}: CleanPortalCardProps) {
  return (
    <Link href={href} className="group">
      <Card className="h-full transition-all duration-200 hover:shadow-md hover:scale-[1.02] border-gray-200 hover:border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className={cn("p-3 rounded-xl bg-gray-50 group-hover:bg-primary/5 transition-colors", iconColor)}>
              <Icon className="h-6 w-6" />
            </div>
            <div className="flex items-center gap-2">
              {notification && <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />}
              {badge && (
                <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                  {badge}
                </Badge>
              )}
            </div>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
