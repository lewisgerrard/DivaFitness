"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { ModernDashboardHeader } from "@/components/modern-dashboard-header"
import { useAuth } from "@/hooks/use-auth"

interface ModernDashboardLayoutProps {
  children: React.ReactNode
}

export function ModernDashboardLayout({ children }: ModernDashboardLayoutProps) {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white font-bold text-xl">D</span>
          </div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <ModernDashboardHeader />
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  )
}
