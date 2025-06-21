"use client"

import type React from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

interface DashboardTileProps {
  title: string
  description: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  gradient: string
  stats?: {
    label: string
    value: string | number
  }[]
  badge?: string
  size?: "small" | "medium" | "large"
  available?: boolean
}

export function DashboardTile({
  title,
  description,
  href,
  icon: Icon,
  gradient,
  stats,
  badge,
  size = "medium",
  available = true,
}: DashboardTileProps) {
  const sizeClasses = {
    small: "col-span-1",
    medium: "col-span-1 md:col-span-2",
    large: "col-span-1 md:col-span-2 lg:col-span-3",
  }

  const TileContent = (
    <Card
      className={cn(
        "group relative overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1",
        sizeClasses[size],
        !available && "opacity-60 cursor-not-allowed",
      )}
    >
      <div className={cn("absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity", gradient)} />

      <CardContent className="p-6 relative">
        <div className="flex items-start justify-between mb-4">
          <div className={cn("p-3 rounded-2xl shadow-lg", gradient)}>
            <Icon className="h-6 w-6 text-white" />
          </div>

          <div className="flex items-center gap-2">
            {badge && (
              <Badge variant="secondary" className="text-xs">
                {badge}
              </Badge>
            )}
            {available ? (
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
            ) : (
              <ExternalLink className="h-5 w-5 text-gray-400" />
            )}
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <h3 className="font-semibold text-lg text-gray-900 group-hover:text-purple-600 transition-colors">{title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>

        {stats && (
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-bold text-lg text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )

  if (!available) {
    return TileContent
  }

  return (
    <Link href={href} className={sizeClasses[size]}>
      {TileContent}
    </Link>
  )
}
