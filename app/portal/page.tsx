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
            href="/portal/member/schedule"
            iconColor="text-blue-500"
          />

          <CleanDashboardCard
            title="My Profile"
            description="Update your information"
            icon={UserPlus}
            href="/portal/member/profile"
            iconColor="text-primary"
          />

          <CleanDashboardCard
            title="Training Materials"
            description="Access workout guides"
            icon={BookOpen}
            href="/portal/member/materials"
            iconColor="text-purple-500"
            badge="Soon"
          />

          <CleanDashboardCard
            title="Progress"
            description="Track your achievements"
            icon={Trophy}
            href="/portal/member/progress"
            iconColor="text-yellow-500"
            badge="Soon"
          />

          <CleanDashboardCard
            title="Messages"
            description="Chat with your trainer"
            icon={MessageSquare}
            href="/portal/member/messages"
            iconColor="text-indigo-500"
            notification
            badge="Soon"
          />

          <CleanDashboardCard
            title="Payments"
            description="Manage your billing"
            icon={CreditCard}
            href="/portal/member/payments"
            iconColor="text-emerald-500"
            notification
            badge="Soon"
          />

          <CleanDashboardCard
            title="Documents"
            description="Forms and agreements"
            icon={FileText}
            href="/portal/member/documents"
            iconColor="text-orange-500"
            badge="Soon"
          />

          <CleanDashboardCard
            title="News & Updates"
            description="Latest gym announcements"
            icon={Newspaper}
            href="/portal/member/news"
            iconColor="text-pink-500"
            badge="Soon"
          />

          <CleanDashboardCard
            title="Book Session"
            description="Schedule a training session"
            icon={CalendarPlus}
            href="/portal/member/book"
            iconColor="text-cyan-500"
            badge="Soon"
          />

          {/* Admin Cards */}
          <CleanDashboardCard
            title="User Management"
            description="Manage members and staff"
            icon={Users}
            href="/portal/admin/user-management"
            iconColor="text-primary-dark"
          />

          <CleanDashboardCard
            title="Content Management"
            description="Website, branding & templates"
            icon={Edit3}
            href="/portal/admin/content-management"
            iconColor="text-primary"
          />

          <CleanDashboardCard
            title="Settings"
            description="System configuration"
            icon={Settings}
            href="/portal/admin/settings"
            iconColor="text-gray-500"
          />
        </div>
      </div>
    </CleanDashboardLayout>
  )
}
