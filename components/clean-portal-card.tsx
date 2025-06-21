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
  badge?: string
  notification?: boolean
}

export function CleanPortalCard({
  title,
  description,
  icon: Icon,
  href,
  iconColor = "text-gray-500",
  badge,
  notification = false,
}: CleanPortalCardProps) {
  return (
    <Link href={href}>
      <Card className="group hover:shadow-md transition-all duration-200 cursor-pointer border-gray-200 hover:border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-primary/5 transition-colors">
                <Icon className={cn("h-6 w-6", iconColor)} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">{title}</h3>
                <p className="text-sm text-gray-600 mt-1">{description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {notification && <div className="w-2 h-2 bg-red-500 rounded-full"></div>}
              {badge && (
                <Badge variant="secondary" className="text-xs">
                  {badge}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
