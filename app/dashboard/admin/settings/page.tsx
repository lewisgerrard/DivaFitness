"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AdminPageHeader } from "@/components/admin-page-header"
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

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section - matching admin portal exactly */}
        <AdminPageHeader
          icon={Settings}
          title="Website Settings"
          description="Configure website content and email templates"
        />

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
    </div>
  )
}
