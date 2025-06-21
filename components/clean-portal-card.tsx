"use client"

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
  badge?: string
  notification?: boolean
  className?: string
}

export function CleanPortalCard({
  title,
  description,
  icon: Icon,
  href,
  badge,
  notification,
  className,
}: CleanPortalCardProps) {
  return (
    <Link href={href} className="group">
      <Card
        className={cn(
          "relative overflow-hidden border-[#7b329b]/20 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-white to-[#7b329b]/5",
          className,
        )}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#7b329b] to-[#6b2c87] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center gap-2">
              {notification && (
                <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full animate-pulse"></div>
              )}
              {badge && (
                <Badge
                  variant="secondary"
                  className="bg-gradient-to-r from-[#7b329b]/10 to-[#7b329b]/5 text-[#7b329b] border-[#7b329b]/20 text-xs font-semibold"
                >
                  {badge}
                </Badge>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900 group-hover:text-[#7b329b] transition-colors duration-300">
              {title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
          </div>

          {/* Decorative gradient line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7b329b] to-[#6b2c87] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </CardContent>
      </Card>
    </Link>
  )
}
