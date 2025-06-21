"use client"

import type React from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface CleanDashboardCardProps {
  title: string
  description?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  iconColor?: string
  badge?: string
  notification?: boolean
  available?: boolean
  size?: "small" | "medium" | "large"
}

export function CleanDashboardCard({
  title,
  description,
  href,
  icon: Icon,
  iconColor = "text-purple-600",
  badge,
  notification = false,
  available = true,
  size = "medium",
}: CleanDashboardCardProps) {
  const cardContent = (
    <div className="group relative bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 cursor-pointer focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 h-full">
      <div className="p-6 h-full flex flex-col justify-center items-center text-center relative">
        {/* Notification dot */}
        {notification && <div className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full"></div>}

        {/* Badge */}
        {badge && (
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
              {badge}
            </Badge>
          </div>
        )}

        {/* Icon */}
        <div className="mb-4">
          <Icon className={cn("h-8 w-8", iconColor)} />
        </div>

        {/* Title */}
        <h3 className="font-medium text-gray-900 mb-2 group-hover:text-primary transition-colors">{title}</h3>

        {/* Description */}
        {description && <p className="text-sm text-gray-500 leading-relaxed">{description}</p>}
      </div>
    </div>
  )

  if (!available) {
    return cardContent
  }

  return (
    <Link href={href} className="block">
      {cardContent}
    </Link>
  )
}
