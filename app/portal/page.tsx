import { CleanDashboardLayout } from "@/components/clean-dashboard-layout"
import { DashboardHeaderSection } from "@/components/dashboard-header-section"
import { CleanDashboardCard } from "@/components/clean-dashboard-card"
import {
  Calendar,
  BookOpen,
  Trophy,
  MessageSquare,
  CreditCard,
  FileText,
  Newspaper,
  CalendarPlus,
  Users,
  Settings,
  UserPlus,
  Edit3,
} from "lucide-react"

export default function PortalPage() {
  return (
    <CleanDashboardLayout>
      <div className="space-y-8">
        <DashboardHeaderSection />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {/* Member Cards */}
          <CleanDashboardCard
            title="My Schedule"
            description="View your training sessions"
            icon={Calendar}
            href="/portal/schedule"
            iconColor="text-blue-500"
          />

          <CleanDashboardCard
            title="My Profile"
            description="Update your information"
            icon={UserPlus}
            href="/portal/profile"
            iconColor="text-primary"
          />

          <CleanDashboardCard
            title="Training Materials"
            description="Access workout guides"
            icon={BookOpen}
            href="/portal/materials"
            iconColor="text-purple-500"
            badge="Soon"
          />

          <CleanDashboardCard
            title="Progress"
            description="Track your achievements"
            icon={Trophy}
            href="/portal/progress"
            iconColor="text-yellow-500"
            badge="Soon"
          />

          <CleanDashboardCard
            title="Messages"
            description="Chat with your trainer"
            icon={MessageSquare}
            href="/portal/messages"
            iconColor="text-indigo-500"
            notification
            badge="Soon"
          />

          <CleanDashboardCard
            title="Payments"
            description="Manage your billing"
            icon={CreditCard}
            href="/portal/payments"
            iconColor="text-emerald-500"
            notification
            badge="Soon"
          />

          <CleanDashboardCard
            title="Documents"
            description="Forms and agreements"
            icon={FileText}
            href="/portal/documents"
            iconColor="text-orange-500"
            badge="Soon"
          />

          <CleanDashboardCard
            title="News & Updates"
            description="Latest gym announcements"
            icon={Newspaper}
            href="/portal/news"
            iconColor="text-pink-500"
            badge="Soon"
          />

          <CleanDashboardCard
            title="Book Session"
            description="Schedule a training session"
            icon={CalendarPlus}
            href="/portal/book"
            iconColor="text-cyan-500"
            badge="Soon"
          />

          {/* Admin Cards */}
          <CleanDashboardCard
            title="User Management"
            description="Manage members and staff"
            icon={Users}
            href="/portal/user-management"
            iconColor="text-primary-dark"
          />

          <CleanDashboardCard
            title="Content Management"
            description="Website, branding & templates"
            icon={Edit3}
            href="/portal/content-management"
            iconColor="text-primary"
          />

          <CleanDashboardCard
            title="Settings"
            description="System configuration"
            icon={Settings}
            href="/portal/settings"
            iconColor="text-gray-500"
          />
        </div>
      </div>
    </CleanDashboardLayout>
  )
}
