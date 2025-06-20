"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Bell, Settings, LogOut, Sparkles } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import type { LucideIcon } from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
  title: string
  description?: string
  icon?: LucideIcon
  breadcrumbs?: Array<{ label: string; href?: string }>
}

export function DashboardLayout({ children, title, description, icon: Icon, breadcrumbs = [] }: DashboardLayoutProps) {
  const router = useRouter()
  const { user, loading, logout } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Purple Hero Section */}
      <section className="relative bg-primary h-[250px] flex items-center justify-center overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{
              backgroundImage: "url('/images/studio-exterior-full.jpg')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary-dark/90" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">{title}</span>
          </div>

          <div className="flex items-center justify-center gap-4 mb-4">
            {Icon && (
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Icon className="w-6 h-6 text-white" />
              </div>
            )}
            <h1 className="font-heading text-2xl md:text-3xl font-bold leading-tight">{title}</h1>
          </div>

          {description && <p className="text-lg mb-6 max-w-2xl mx-auto leading-relaxed opacity-90">{description}</p>}

          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <div className="flex items-center justify-center gap-2 text-sm text-white/80">
              <Link href="/dashboard" className="hover:text-white transition-colors">
                Dashboard
              </Link>
              {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span>/</span>
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-white transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white font-medium">{crumb.label}</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Header Controls */}
        <div className="absolute top-4 left-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/dashboard")}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
        </div>

        <div className="absolute top-4 right-4 flex items-center gap-3">
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-xs">
            {user.role}
          </Badge>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
            <Bell className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
            <Settings className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-white hover:bg-white/20">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">{children}</div>
    </div>
  )
}
