import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  User,
  Users,
  Shield,
  Calendar,
  MessageSquare,
  Settings,
  BarChart3,
  Activity,
  BookOpen,
  LayoutDashboard,
} from "lucide-react"
import { brandKit } from "@/lib/brand-kit"
import { AdminPageHeader } from "@/components/admin-page-header"

export default function Dashboard() {
  return (
    <div className="min-h-screen">
      {/* Admin Page Header */}
      <AdminPageHeader
        icon={LayoutDashboard}
        title="Dashboard"
        description="Your central hub for managing your fitness journey, tracking progress, and accessing all platform features."
      />

      {/* Dashboard Content */}
      <section className={`${brandKit.spacing.section.lg} bg-gray-50`}>
        <div className={brandKit.components.section.container}>
          {/* Member Portal Section */}
          <div id="member-portal" className="bg-white rounded-3xl shadow-2xl p-8 mb-12 border border-purple-100">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-heading font-bold text-purple-700">Member Portal</h2>
                <p className="text-purple-500">Manage your personal fitness journey</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-purple-100 h-full">
                <CardContent className="p-6 text-center h-full flex flex-col">
                  <User className="w-8 h-8 text-purple-500 mx-auto mb-4" />
                  <h3 className="font-heading font-semibold text-purple-700 mb-2">Profile</h3>
                  <p className="text-purple-500 text-sm mb-4 flex-grow">
                    Manage your personal information and preferences
                  </p>
                  <Button asChild className="w-full bg-purple-400 hover:bg-purple-500 mt-auto">
                    <Link href="/profile">View Profile</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-purple-100 h-full relative">
                <CardContent className="p-6 text-center h-full flex flex-col">
                  <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    Coming Soon
                  </div>
                  <MessageSquare className="w-8 h-8 text-purple-400 mx-auto mb-4 opacity-60" />
                  <h3 className="font-heading font-semibold text-purple-600 mb-2 opacity-60">Community Board</h3>
                  <p className="text-purple-400 text-sm mb-4 flex-grow opacity-60">
                    Connect with other members and share your journey
                  </p>
                  <Button disabled className="w-full bg-gray-300 text-gray-500 cursor-not-allowed mt-auto">
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-purple-100 h-full relative">
                <CardContent className="p-6 text-center h-full flex flex-col">
                  <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    Coming Soon
                  </div>
                  <Calendar className="w-8 h-8 text-purple-400 mx-auto mb-4 opacity-60" />
                  <h3 className="font-heading font-semibold text-purple-600 mb-2 opacity-60">Classes</h3>
                  <p className="text-purple-400 text-sm mb-4 flex-grow opacity-60">
                    Browse and book available fitness classes
                  </p>
                  <Button disabled className="w-full bg-gray-300 text-gray-500 cursor-not-allowed mt-auto">
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Client Portal Section */}
          <div id="client-portal" className="bg-white rounded-3xl shadow-2xl p-8 mb-12 border border-purple-200">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-heading font-bold text-purple-800">Client Portal</h2>
                <p className="text-purple-600">Track your fitness progress and bookings</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-purple-300 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-100 to-purple-200 h-full relative">
                <CardContent className="p-6 text-center h-full flex flex-col">
                  <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    Coming Soon
                  </div>
                  <Activity className="w-8 h-8 text-purple-500 mx-auto mb-4 opacity-60" />
                  <h3 className="font-heading font-semibold text-purple-700 mb-2 opacity-60">
                    Body Composition Tracker
                  </h3>
                  <p className="text-purple-500 text-sm mb-4 flex-grow opacity-60">
                    Monitor your body composition changes over time
                  </p>
                  <Button disabled className="w-full bg-gray-300 text-gray-500 cursor-not-allowed mt-auto">
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-purple-300 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-100 to-purple-200 h-full relative">
                <CardContent className="p-6 text-center h-full flex flex-col">
                  <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    Coming Soon
                  </div>
                  <BookOpen className="w-8 h-8 text-purple-500 mx-auto mb-4 opacity-60" />
                  <h3 className="font-heading font-semibold text-purple-700 mb-2 opacity-60">My Bookings</h3>
                  <p className="text-purple-500 text-sm mb-4 flex-grow opacity-60">
                    View and manage your upcoming sessions
                  </p>
                  <Button disabled className="w-full bg-gray-300 text-gray-500 cursor-not-allowed mt-auto">
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-purple-300 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-100 to-purple-200 h-full relative">
                <CardContent className="p-6 text-center h-full flex flex-col">
                  <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    Coming Soon
                  </div>
                  <BarChart3 className="w-8 h-8 text-purple-500 mx-auto mb-4 opacity-60" />
                  <h3 className="font-heading font-semibold text-purple-700 mb-2 opacity-60">Metrics Dashboard</h3>
                  <p className="text-purple-500 text-sm mb-4 flex-grow opacity-60">
                    Track your fitness progress and achievements
                  </p>
                  <Button disabled className="w-full bg-gray-300 text-gray-500 cursor-not-allowed mt-auto">
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Admin Panel Section */}
          <div id="admin-panel" className="bg-white rounded-3xl shadow-2xl p-8 mb-12 border border-pink-200">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-heading font-bold text-pink-800">Admin Panel</h2>
                <p className="text-pink-600">System administration and management</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-pink-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-pink-50 to-pink-100 h-full">
                <CardContent className="p-6 text-center h-full flex flex-col">
                  <Users className="w-8 h-8 text-pink-600 mx-auto mb-4" />
                  <h3 className="font-heading font-semibold text-pink-800 mb-2">User Management</h3>
                  <p className="text-pink-600 text-sm mb-4 flex-grow">Add, edit, and manage user accounts</p>
                  <Button asChild className="w-full bg-pink-500 hover:bg-pink-600 mt-auto">
                    <Link href="/admin/users">Manage Users</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-pink-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-pink-50 to-pink-100 h-full relative">
                <CardContent className="p-6 text-center h-full flex flex-col">
                  <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    Coming Soon
                  </div>
                  <Calendar className="w-8 h-8 text-pink-500 mx-auto mb-4 opacity-60" />
                  <h3 className="font-heading font-semibold text-pink-700 mb-2 opacity-60">Class Management</h3>
                  <p className="text-pink-500 text-sm mb-4 flex-grow opacity-60">Schedule and manage fitness classes</p>
                  <Button disabled className="w-full bg-gray-300 text-gray-500 cursor-not-allowed mt-auto">
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-pink-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-pink-50 to-pink-100 h-full">
                <CardContent className="p-6 text-center h-full flex flex-col">
                  <Settings className="w-8 h-8 text-pink-600 mx-auto mb-4" />
                  <h3 className="font-heading font-semibold text-pink-800 mb-2">Website Settings</h3>
                  <p className="text-pink-600 text-sm mb-4 flex-grow">Configure website content and settings</p>
                  <Button asChild className="w-full bg-pink-500 hover:bg-pink-600 mt-auto">
                    <Link href="/admin/settings">Website Settings</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
