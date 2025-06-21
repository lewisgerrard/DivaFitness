"use client"

import { useAuth } from "@/hooks/use-auth"
import { CleanPortalLayout } from "@/components/clean-portal-layout"
import { CleanPortalCard } from "@/components/clean-portal-card"
import {
  Calendar,
  BookOpen,
  MessageSquare,
  CalendarPlus,
  Users,
  Settings,
  BarChart3,
  Bell,
  User,
  Activity,
  Apple,
  TrendingUp,
  Globe,
  Dumbbell,
} from "lucide-react"

export default function PortalPage() {
  const { user } = useAuth()
  const userRole = user?.role || "member"

  const getMemberFeatures = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900">Member Features</h2>
        <p className="text-gray-600">Manage your fitness journey</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <CleanPortalCard
          title="My Profile"
          description="View and update personal information"
          icon={User}
          href="/portal/profile"
        />

        <CleanPortalCard
          title="My Bookings"
          description="View and manage session bookings"
          icon={Calendar}
          href="/portal/bookings"
        />
      </div>
    </div>
  )

  const getClientFeatures = () => (
    <>
      {getMemberFeatures()}

      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-gray-900">Client Features</h2>
          <p className="text-gray-600">Advanced training and nutrition tools</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <CleanPortalCard
            title="Body Composition"
            description="Track your body composition metrics"
            icon={Activity}
            href="/portal/body-composition"
          />

          <CleanPortalCard
            title="Session History"
            description="View past and upcoming sessions"
            icon={CalendarPlus}
            href="/portal/sessions"
          />

          <CleanPortalCard
            title="Nutrition Resources"
            description="Access meal plans and nutrition guides"
            icon={Apple}
            href="/portal/nutrition"
          />

          <CleanPortalCard
            title="Progress Analytics"
            description="Detailed progress tracking and insights"
            icon={TrendingUp}
            href="/portal/progress"
          />

          <CleanPortalCard
            title="Training Materials"
            description="Access workout guides and videos"
            icon={BookOpen}
            href="/portal/materials"
          />

          <CleanPortalCard
            title="Messages"
            description="Chat with your trainer"
            icon={MessageSquare}
            href="/portal/messages"
            notification
          />
        </div>
      </div>
    </>
  )

  const getAdminFeatures = () => (
    <>
      {getClientFeatures()}

      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-gray-900">Admin Features</h2>
          <p className="text-gray-600">Business management and system administration</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <CleanPortalCard
            title="User Management"
            description="Create, edit users and assign roles"
            icon={Users}
            href="/portal/admin/users"
            badge="Admin"
          />

          <CleanPortalCard
            title="Class Management"
            description="Add, edit and delete classes"
            icon={Dumbbell}
            href="/portal/admin/classes"
            badge="Admin"
          />

          <CleanPortalCard
            title="Website Content"
            description="Manage website content and branding"
            icon={Globe}
            href="/portal/admin/content"
            badge="Admin"
          />

          <CleanPortalCard
            title="Analytics Dashboard"
            description="User activity, bookings and trends"
            icon={BarChart3}
            href="/portal/admin/analytics"
            badge="Admin"
          />

          <CleanPortalCard
            title="System Settings"
            description="Configure system preferences"
            icon={Settings}
            href="/portal/admin/settings"
            badge="Admin"
          />

          <CleanPortalCard
            title="Notifications"
            description="System alerts and updates"
            icon={Bell}
            href="/portal/admin/notifications"
            notification
            badge="Admin"
          />
        </div>
      </div>
    </>
  )

  return (
    <CleanPortalLayout>
      <div className="space-y-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to Your Portal</h1>
          <p className="text-gray-600">
            {userRole === "admin"
              ? "Manage your business and help your clients succeed."
              : userRole === "client"
                ? "Your comprehensive fitness journey dashboard."
                : "Your fitness journey starts here."}
          </p>
        </div>

        {userRole === "admin" && getAdminFeatures()}
        {userRole === "client" && getClientFeatures()}
        {userRole === "member" && getMemberFeatures()}
      </div>
    </CleanPortalLayout>
  )
}
