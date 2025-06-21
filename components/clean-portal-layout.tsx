"use client"

import type React from "react"

import { CleanPortalSidebar } from "./clean-portal-sidebar"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { PortalHeaderSection } from "./portal-header-section"

interface CleanPortalLayoutProps {
  children: React.ReactNode
}

export function CleanPortalLayout({ children }: CleanPortalLayoutProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50/30 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-[#7b329b] to-[#6b2c87] rounded-2xl flex items-center justify-center mx-auto shadow-lg">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Loading Portal</h2>
            <p className="text-[#7b329b]">Please wait...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7b329b]/5 via-white to-[#7b329b]/5 flex">
      <CleanPortalSidebar />
      <main className="flex-1 overflow-auto">
        {/* Main Content */}
        <div className="p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            <PortalHeaderSection />
            {children}
          </div>
        </div>

        {/* Branded Footer */}
        <footer className="bg-gradient-to-r from-[#7b329b] to-[#6b2c87] text-white mt-12">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative w-10 h-10 bg-white rounded-lg p-2">
                  <img src="/diva-logo-fitness.png" alt="Diva Fitness" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Diva Fitness</h3>
                  <p className="text-[#c77dff] text-sm">Transform Your Body & Mind</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[#c77dff] text-sm">Need help?</p>
                <p className="font-semibold">support@divafitness.com</p>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
