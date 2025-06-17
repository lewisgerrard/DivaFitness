"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { FileText, ArrowLeft, Home, Users, Shield, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PageStructurePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("auth-token")
      if (!token) {
        router.push("/login")
        return
      }

      const response = await fetch("/api/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      } else {
        localStorage.removeItem("auth-token")
        router.push("/login")
      }
    } catch (error) {
      console.error("Auth check error:", error)
      router.push("/login")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">You don't have permission to access this page.</p>
          <Button onClick={() => router.push("/dashboard")}>Go to Dashboard</Button>
        </div>
      </div>
    )
  }

  const pageHierarchy = [
    {
      name: "Public Pages",
      icon: Home,
      color: "blue",
      pages: [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Services", path: "/services" },
        { name: "Contact", path: "/contact" },
        { name: "FAQs", path: "/faqs" },
      ],
    },
    {
      name: "Member Pages",
      icon: Users,
      color: "primary",
      pages: [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Member Profile", path: "/profile/[id]" },
        { name: "Member Portal", path: "/dashboard#member-portal" },
      ],
    },
    {
      name: "Client Pages",
      icon: Shield,
      color: "primary-dark",
      pages: [
        { name: "Client Portal", path: "/dashboard#client-portal" },
        { name: "Client Profile", path: "/profile/[id]" },
        { name: "Client Dashboard", path: "/dashboard" },
      ],
    },
    {
      name: "Admin Pages",
      icon: Settings,
      color: "primary-light",
      pages: [
        { name: "Admin Dashboard", path: "/admin" },
        { name: "Client Management", path: "/admin/clients" },
        { name: "Client Details", path: "/admin/clients/[id]" },
        { name: "Email Templates", path: "/admin/email-templates" },
        { name: "Template Editor", path: "/admin/email-templates/[id]" },
        { name: "Website Settings", path: "/admin/settings" },
        { name: "Page Structure", path: "/admin/page-structure" },
      ],
    },
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: "bg-blue-500",
        bgLight: "bg-blue-50",
        border: "border-blue-200",
        text: "text-blue-600",
        line: "border-blue-300",
      },
      primary: {
        bg: "bg-primary",
        bgLight: "bg-primary/10",
        border: "border-primary/30",
        text: "text-primary",
        line: "border-primary/40",
      },
      "primary-dark": {
        bg: "bg-primary-dark",
        bgLight: "bg-primary-dark/10",
        border: "border-primary-dark/30",
        text: "text-primary-dark",
        line: "border-primary-dark/40",
      },
      "primary-light": {
        bg: "bg-primary-light",
        bgLight: "bg-primary-light/10",
        border: "border-primary-light/30",
        text: "text-primary-light",
        line: "border-primary-light/40",
      },
    }
    return colors[color as keyof typeof colors]
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center shadow-lg">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-primary mb-1">Website Page Hierarchy</h1>
              <p className="text-lg text-primary/70">Visual representation of website structure</p>
            </div>
          </div>
        </div>

        {/* Hierarchy Diagram */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {pageHierarchy.map((section, sectionIndex) => {
              const IconComponent = section.icon
              const colors = getColorClasses(section.color)

              return (
                <div key={sectionIndex} className="relative">
                  {/* Section Header */}
                  <div className={`${colors.bgLight} ${colors.border} border-2 rounded-2xl p-6 mb-6`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center shadow-lg`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h3 className={`text-xl font-bold ${colors.text}`}>{section.name}</h3>
                    </div>
                    <div className={`w-full h-1 ${colors.bg} rounded-full`}></div>
                  </div>

                  {/* Pages List */}
                  <div className="space-y-3">
                    {section.pages.map((page, pageIndex) => (
                      <div key={pageIndex} className="relative">
                        {/* Connection Line */}
                        <div className={`absolute left-6 -top-3 w-0.5 h-6 ${colors.line} border-l-2`}></div>

                        {/* Page Card */}
                        <div className="bg-white border border-gray-200 rounded-xl p-4 ml-12 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold text-gray-800 mb-1">{page.name}</h4>
                              <p className="text-xs text-gray-500 font-mono">{page.path}</p>
                            </div>
                            {!page.path.includes("[id]") && !page.path.includes("#") && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(page.path, "_blank")}
                                className={`${colors.border} ${colors.text} hover:${colors.bgLight} text-xs px-3 py-1`}
                              >
                                View
                              </Button>
                            )}
                          </div>
                        </div>

                        {/* Horizontal Connection Line */}
                        <div className={`absolute left-6 top-4 w-6 h-0.5 ${colors.line} border-t-2`}></div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Legend */}
        <Card className="border border-gray-200 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800">Access Levels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Public - No login required</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-primary rounded-full"></div>
                <span className="text-sm text-gray-600">Member - Basic user access</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-primary-dark rounded-full"></div>
                <span className="text-sm text-gray-600">Client - Enhanced user access</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-primary-light rounded-full"></div>
                <span className="text-sm text-gray-600">Admin - Full system access</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back Button */}
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => router.push("/admin/settings")}
            className="border-primary/30 text-primary hover:bg-primary/10 px-8 py-3 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Settings
          </Button>
        </div>
      </div>
    </div>
  )
}
