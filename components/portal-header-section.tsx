"use client"

import { useAuth } from "@/hooks/use-auth"

export function PortalHeaderSection() {
  const { user } = useAuth()

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 17) return "Good afternoon"
    return "Good evening"
  }

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {getGreeting()}, {user?.first_name || user?.name || "there"}!
      </h1>
      <p className="text-gray-600">Welcome to your fitness portal. What would you like to do today?</p>
    </div>
  )
}
