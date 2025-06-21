"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Bell } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

export function DashboardHeaderSection() {
  const { user } = useAuth()

  return (
    <div className="bg-white border-b border-gray-200 p-6 mb-8 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        {/* Welcome Message */}
        <div>
          <h1 className="text-2xl font-semibold text-primary mb-1">
            Welcome back, {user?.first_name || user?.name || "User"}!
          </h1>
          <p className="text-gray-600">Here's what's happening with your fitness journey today.</p>
        </div>

        {/* Search and Notifications */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search..."
              className="pl-10 w-64 bg-gray-50 border-gray-200 focus:bg-white focus:border-primary focus:ring-primary/20"
            />
          </div>
          <Button variant="ghost" size="sm" className="relative hover:bg-primary/5 hover:text-primary">
            <Bell className="h-5 w-5" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></div>
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-4 rounded-lg border-l-4 border-primary">
          <h3 className="text-sm font-medium text-gray-600">Profile Completion</h3>
          <p className="text-2xl font-bold text-primary">85%</p>
        </div>
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-4 rounded-lg border-l-4 border-primary">
          <h3 className="text-sm font-medium text-gray-600">This Month's Sessions</h3>
          <p className="text-2xl font-bold text-primary">12</p>
        </div>
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-4 rounded-lg border-l-4 border-primary">
          <h3 className="text-sm font-medium text-gray-600">Upcoming Sessions</h3>
          <p className="text-2xl font-bold text-primary">3</p>
        </div>
      </div>
    </div>
  )
}
