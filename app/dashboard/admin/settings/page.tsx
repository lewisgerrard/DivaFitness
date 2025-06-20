"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { HeroDashboard } from "@/components/dashboard-hero"
import { SettingsCardsGrid } from "@/components/settings-cards-grid"

export default function AdminSettingsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const checkAuth = async () => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem("auth-token")

      if (!token) {
        console.log("No token found, redirecting to login")
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

      console.log("Admin settings auth check response:", response.status)

      if (response.ok) {
        const data = await response.json()
        console.log("Admin settings auth check successful:", data.user)
        setUser(data.user)
      } else {
        console.log("Admin settings auth check failed, redirecting to login")
        localStorage.removeItem("auth-token")
        router.push("/login")
      }
    } catch (error) {
      console.error("Admin settings auth check error:", error)
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
      <div className="min-h-screen bg-gray-50">
        <HeroDashboard title="Website Settings" description="Loading settings..." showUserGreeting={false} />
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </div>
    )
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-gray-50">
        <HeroDashboard
          title="Access Denied"
          description="You don't have permission to access this page"
          showUserGreeting={false}
        />
        <div className="text-center py-20">
          <Button onClick={() => router.push("/dashboard")}>Go to Dashboard</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroDashboard
        title="Website Settings"
        description="Configure website content and email templates"
        showUserGreeting={false}
      />

      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Settings Cards Grid Section */}
          <SettingsCardsGrid />

          {/* Back to Dashboard */}
          <div className="mt-12 text-center">
            <Button
              variant="outline"
              onClick={() => router.push("/dashboard")}
              className="border-pink-200 text-pink-600 hover:bg-pink-50 px-8 py-3 rounded-xl"
            >
              ← Back to Dashboard
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
