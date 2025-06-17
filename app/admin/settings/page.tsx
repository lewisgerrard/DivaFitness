"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Mail, Globe, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SettingsPage() {
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

      console.log("Settings auth check response:", response.status)

      if (response.ok) {
        const data = await response.json()
        console.log("Settings auth check successful:", data.user)
        setUser(data.user)
      } else {
        console.log("Settings auth check failed, redirecting to login")
        localStorage.removeItem("auth-token")
        router.push("/login")
      }
    } catch (error) {
      console.error("Settings auth check error:", error)
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
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
              <Settings className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-pink-600 mb-1">Website Settings</h1>
              <p className="text-lg text-pink-400">Configure website content and email templates</p>
            </div>
          </div>
        </div>

        {/* Settings Cards Grid - exactly like admin portal */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
          {/* Email Templates Card */}
          <div className="bg-white rounded-3xl shadow-lg p-8 border border-pink-100">
            <div className="text-center">
              <div className="w-20 h-20 bg-pink-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Mail className="w-10 h-10 text-pink-500" />
              </div>
              <h3 className="text-2xl font-bold text-pink-600 mb-4">Email Templates</h3>
              <p className="text-gray-600 mb-8 text-base leading-relaxed">
                Create and manage email templates for client communications
              </p>
              <Button
                onClick={() => router.push("/admin/email-templates")}
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-2xl text-base transition-all duration-200"
              >
                Manage Templates
              </Button>
            </div>
          </div>

          {/* Website Structure Card */}
          <div className="bg-white rounded-3xl shadow-lg p-8 border border-pink-100">
            <div className="text-center">
              <div className="w-20 h-20 bg-pink-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Globe className="w-10 h-10 text-pink-500" />
              </div>
              <h3 className="text-2xl font-bold text-pink-600 mb-4">Website Structure</h3>
              <p className="text-gray-600 mb-8 text-base leading-relaxed">
                Configure website content, navigation, and settings
              </p>
              <Button
                onClick={() => router.push("/admin/website-structure")}
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-2xl text-base transition-all duration-200"
              >
                Website Settings
              </Button>
            </div>
          </div>
        </div>

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
