"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  User,
  Users,
  Shield,
  Calendar,
  MessageSquare,
  BarChart3,
  Activity,
  BookOpen,
  Mail,
  Globe,
  Layers,
  Palette,
  Bell,
  Settings,
  LogOut,
  Sparkles,
} from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

export default function Dashboard() {
  const router = useRouter()
  const { user, loading, logout } = useAuth()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

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
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return "Good morning"
    if (hour < 17) return "Good afternoon"
    return "Good evening"
  }

  const memberFeatures = [
    {
      title: "My Profile",
      description: "Manage your personal information and preferences",
      icon: User,
      href: "/dashboard/member/profile",
      available: true,
    },
    {
      title: "Community",
      description: "Connect with other members and share your journey",
      icon: MessageSquare,
      href: "/dashboard/member/community",
      available: false,
    },
    {
      title: "Classes",
      description: "Browse and book available fitness classes",
      icon: Calendar,
      href: "/dashboard/member/classes",
      available: false,
    },
  ]

  const clientFeatures = [
    {
      title: "Body Composition",
      description: "Track your body composition changes over time",
      icon: Activity,
      href: "/dashboard/client/body-composition",
      available: false,
    },
    {
      title: "My Bookings",
      description: "View and manage your upcoming sessions",
      icon: BookOpen,
      href: "/dashboard/client/bookings",
      available: false,
    },
    {
      title: "Progress Metrics",
      description: "Track your fitness progress and achievements",
      icon: BarChart3,
      href: "/dashboard/client/metrics",
      available: false,
    },
  ]

  const adminFeatures = [
    {
      title: "User Management",
      description: "Manage user accounts and permissions",
      icon: Users,
      href: "/dashboard/admin/user-management",
      available: true,
    },
    {
      title: "Email Templates",
      description: "Create and manage email templates",
      icon: Mail,
      href: "/dashboard/admin/email-templates",
      available: true,
    },
    {
      title: "Website Structure",
      description: "Configure website content and navigation",
      icon: Globe,
      href: "/dashboard/admin/website-structure",
      available: true,
    },
    {
      title: "Components",
      description: "Manage reusable UI components",
      icon: Layers,
      href: "/dashboard/admin/components",
      available: true,
    },
    {
      title: "Branding",
      description: "Configure brand colors and visual identity",
      icon: Palette,
      href: "/dashboard/admin/branding",
      available: true,
    },
    {
      title: "Class Management",
      description: "Schedule and manage fitness classes",
      icon: Calendar,
      href: "/dashboard/admin/classes",
      available: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Purple Hero Section */}
      <section className="relative bg-primary h-[300px] flex items-center justify-center overflow-hidden">
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
            <span className="text-sm font-medium">Welcome Back</span>
          </div>

          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3 leading-tight">
            {getGreeting()},{" "}
            <span className="bg-gradient-to-r from-white to-accent-light bg-clip-text text-transparent">
              {user.first_name || user.name}!
            </span>
          </h1>

          <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto leading-relaxed opacity-90">
            Your personal fitness portal - manage your profile, track progress, and access all platform features
          </p>

          <div className="flex items-center justify-center gap-4 text-sm">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              {user.role}
            </Badge>
            <span className="text-white/80">
              {currentTime.toLocaleDateString("en-GB", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="text-white/80">
              {currentTime.toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>

        {/* Header Controls */}
        <div className="absolute top-4 right-4 flex items-center gap-3">
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
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Member Features */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-bold text-gray-900">Member Portal</h2>
              <p className="text-gray-600 text-sm">Manage your personal fitness journey</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {memberFeatures.map((feature, index) =>
              feature.available ? (
                <Link key={index} href={feature.href}>
                  <Card className="border-purple-200 hover:shadow-lg hover:border-primary transition-all duration-300 group cursor-pointer h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <feature.icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <h3 className="font-heading font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ) : (
                <Card key={index} className="border-purple-200 opacity-60 cursor-not-allowed h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gray-300 rounded-xl flex items-center justify-center">
                        <feature.icon className="w-6 h-6 text-gray-500" />
                      </div>
                      <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                        Coming Soon
                      </Badge>
                    </div>
                    <h3 className="font-heading font-semibold text-gray-600 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-500 mb-4 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ),
            )}
          </div>
        </div>

        {/* Client Features */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-bold text-gray-900">Client Portal</h2>
              <p className="text-gray-600 text-sm">Track your fitness progress and bookings</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {clientFeatures.map((feature, index) =>
              feature.available ? (
                <Link key={index} href={feature.href}>
                  <Card className="border-purple-200 hover:shadow-lg hover:border-primary transition-all duration-300 group cursor-pointer h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <feature.icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <h3 className="font-heading font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ) : (
                <Card key={index} className="border-purple-200 opacity-60 cursor-not-allowed h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gray-300 rounded-xl flex items-center justify-center">
                        <feature.icon className="w-6 h-6 text-gray-500" />
                      </div>
                      <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                        Coming Soon
                      </Badge>
                    </div>
                    <h3 className="font-heading font-semibold text-gray-600 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-500 mb-4 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ),
            )}
          </div>
        </div>

        {/* Admin Features - Only show if user is admin */}
        {user.role === "admin" && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-heading font-bold text-gray-900">Admin Panel</h2>
                <p className="text-gray-600 text-sm">System administration and management</p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {adminFeatures.map((feature, index) =>
                feature.available ? (
                  <Link key={index} href={feature.href}>
                    <Card className="border-purple-200 hover:shadow-lg hover:border-primary transition-all duration-300 group cursor-pointer h-full">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <feature.icon className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <h3 className="font-heading font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ) : (
                  <Card key={index} className="border-purple-200 opacity-60 cursor-not-allowed h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-gray-300 rounded-xl flex items-center justify-center">
                          <feature.icon className="w-6 h-6 text-gray-500" />
                        </div>
                        <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                          Coming Soon
                        </Badge>
                      </div>
                      <h3 className="font-heading font-semibold text-gray-600 mb-2">{feature.title}</h3>
                      <p className="text-sm text-gray-500 mb-4 leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                ),
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
