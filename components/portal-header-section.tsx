"use client"

import { useAuth } from "@/hooks/use-auth"

export function PortalHeaderSection() {
  const { user } = useAuth()

  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.first_name || user?.name || "User"}!</h1>
      <p className="text-gray-600">Here's what's happening with your fitness journey today.</p>
    </div>
  )
}
