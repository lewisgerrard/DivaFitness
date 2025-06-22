"use client"

import { useAuth } from "@/hooks/use-auth"
import { CleanPortalLayout } from "@/components/clean-portal-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts"
import {
  Users,
  UserPlus,
  TrendingUp,
  MessageSquare,
  Settings,
  ArrowRight,
  UserCheck,
  UserX,
  Crown,
  Calendar,
  Activity,
  Shield,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

// Mock data for admin dashboard
const clientGrowthData = [
  { month: "Jan", clients: 45 },
  { month: "Feb", clients: 52 },
  { month: "Mar", clients: 48 },
  { month: "Apr", clients: 61 },
  { month: "May", clients: 67 },
  { month: "Jun", clients: 73 },
]

const activityData = [
  { day: "Mon", logins: 12 },
  { day: "Tue", logins: 8 },
  { day: "Wed", logins: 15 },
  { day: "Thu", logins: 11 },
  { day: "Fri", logins: 9 },
  { day: "Sat", logins: 6 },
  { day: "Sun", logins: 4 },
]

const recentClients = [
  { id: 1, name: "Sarah Johnson", email: "sarah@email.com", status: "active", joined: "2024-01-15" },
  { id: 2, name: "Mike Chen", email: "mike@email.com", status: "active", joined: "2024-01-14" },
  { id: 3, name: "Emma Wilson", email: "emma@email.com", status: "pending", joined: "2024-01-13" },
  { id: 4, name: "David Brown", email: "david@email.com", status: "active", joined: "2024-01-12" },
]

const adminStats = {
  totalClients: 73,
  activeClients: 68,
  pendingClients: 5,
  newThisMonth: 12,
  totalAdmins: 3,
}

// Mock data for client dashboard
const clientProgress = [
  { month: "Jan", weight: 75.2, sessions: 8 },
  { month: "Feb", weight: 74.8, sessions: 10 },
  { month: "Mar", weight: 74.5, sessions: 12 },
  { month: "Apr", weight: 74.1, sessions: 9 },
  { month: "May", weight: 73.8, sessions: 11 },
]

const upcomingSessions = [
  { id: 1, type: "Personal Training", date: "2024-01-20", time: "10:00 AM" },
  { id: 2, type: "Nutrition Consultation", date: "2024-01-22", time: "2:00 PM" },
  { id: 3, type: "Progress Check", date: "2024-01-25", time: "11:00 AM" },
]

export default function PortalPage() {
  const { user } = useAuth()
  const router = useRouter()

  // Redirect unauthorized users
  useEffect(() => {
    if (user && user.role !== "admin" && user.role !== "client") {
      router.push("/")
    }
  }, [user, router])

  if (!user || (user.role !== "admin" && user.role !== "client")) {
    return (
      <CleanPortalLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Crown className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Required</h2>
            <p className="text-gray-600">Please log in to access the portal.</p>
          </div>
        </div>
      </CleanPortalLayout>
    )
  }

  const isAdmin = user.role === "admin"

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactive</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  // Admin Dashboard
  if (isAdmin) {
    return (
      <CleanPortalLayout>
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-[#7b329b]">Admin Dashboard</h1>
            <p className="text-gray-600">
              Welcome back, {user?.first_name}! Manage your clients and business operations.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card className="border-[#7b329b]/20 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#7b329b]/10 rounded-lg">
                    <Users className="w-5 h-5 text-[#7b329b]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{adminStats.totalClients}</p>
                    <p className="text-sm text-gray-600">Total Clients</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#7b329b]/20 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <UserCheck className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{adminStats.activeClients}</p>
                    <p className="text-sm text-gray-600">Active Clients</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#7b329b]/20 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <UserX className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{adminStats.pendingClients}</p>
                    <p className="text-sm text-gray-600">Pending Approval</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#7b329b]/20 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{adminStats.newThisMonth}</p>
                    <p className="text-sm text-gray-600">New This Month</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#7b329b]/20 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Shield className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{adminStats.totalAdmins}</p>
                    <p className="text-sm text-gray-600">Administrators</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Clients */}
            <Card className="border-[#7b329b]/20 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-[#7b329b]/5 to-white border-b border-[#7b329b]/20">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-[#7b329b]">Recent Clients</CardTitle>
                    <CardDescription>Latest client registrations</CardDescription>
                  </div>
                  <Link href="/portal/client-management">
                    <Button variant="outline" size="sm" className="border-[#7b329b]/20 hover:bg-[#7b329b]/10">
                      View All <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  {recentClients.map((client) => (
                    <div
                      key={client.id}
                      className="flex items-center justify-between p-3 border border-[#7b329b]/10 rounded-lg bg-gradient-to-r from-white to-[#7b329b]/5"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{client.name}</p>
                        <p className="text-sm text-gray-600">{client.email}</p>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(client.status)}
                        <p className="text-xs text-gray-500 mt-1">{client.joined}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Client Growth Chart */}
            <Card className="border-[#7b329b]/20 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-[#7b329b]/5 to-white border-b border-[#7b329b]/20">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-[#7b329b]">Client Growth</CardTitle>
                    <CardDescription>Monthly client acquisition</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <ChartContainer
                  config={{
                    clients: { label: "Clients", color: "#7b329b" },
                  }}
                  className="h-[200px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={clientGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="clients"
                        stroke="#7b329b"
                        strokeWidth={3}
                        dot={{ fill: "#7b329b", strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Weekly Activity */}
            <Card className="border-[#7b329b]/20 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-[#7b329b]/5 to-white border-b border-[#7b329b]/20">
                <CardTitle className="text-[#7b329b]">Client Activity</CardTitle>
                <CardDescription>Daily client portal logins</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <ChartContainer
                  config={{
                    logins: { label: "Logins", color: "#7b329b" },
                  }}
                  className="h-[200px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={activityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="day" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="logins" fill="#7b329b" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-[#7b329b]/20 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-[#7b329b]/5 to-white border-b border-[#7b329b]/20">
                <CardTitle className="text-[#7b329b]">Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/portal/client-management">
                    <Button
                      variant="outline"
                      className="w-full h-16 flex flex-col gap-1 border-[#7b329b]/20 hover:bg-[#7b329b]/10"
                    >
                      <UserPlus className="w-5 h-5 text-[#7b329b]" />
                      <span className="text-sm">Add Client</span>
                    </Button>
                  </Link>
                  <Link href="/portal/admin-management">
                    <Button
                      variant="outline"
                      className="w-full h-16 flex flex-col gap-1 border-[#7b329b]/20 hover:bg-[#7b329b]/10"
                    >
                      <Shield className="w-5 h-5 text-red-600" />
                      <span className="text-sm">Manage Admins</span>
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full h-16 flex flex-col gap-1 border-[#7b329b]/20 hover:bg-[#7b329b]/10"
                  >
                    <MessageSquare className="w-5 h-5 text-[#7b329b]" />
                    <span className="text-sm">Messages</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full h-16 flex flex-col gap-1 border-[#7b329b]/20 hover:bg-[#7b329b]/10"
                  >
                    <Settings className="w-5 h-5 text-[#7b329b]" />
                    <span className="text-sm">Settings</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CleanPortalLayout>
    )
  }

  // Client Dashboard
  return (
    <CleanPortalLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-[#7b329b]">Welcome back, {user?.first_name}!</h1>
          <p className="text-gray-600">Track your fitness journey and stay connected with your trainer.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-[#7b329b]/20 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#7b329b]/10 rounded-lg">
                  <Calendar className="w-5 h-5 text-[#7b329b]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                  <p className="text-sm text-gray-600">Upcoming Sessions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#7b329b]/20 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Activity className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">11</p>
                  <p className="text-sm text-gray-600">Sessions This Month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#7b329b]/20 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#7b329b]/10 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-[#7b329b]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">73.8kg</p>
                  <p className="text-sm text-gray-600">Current Weight</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Sessions */}
          <Card className="border-[#7b329b]/20 shadow-sm">
            <CardHeader className="bg-gradient-to-r from-[#7b329b]/5 to-white border-b border-[#7b329b]/20">
              <CardTitle className="text-[#7b329b]">Upcoming Sessions</CardTitle>
              <CardDescription>Your scheduled appointments</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                {upcomingSessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-3 border border-[#7b329b]/10 rounded-lg bg-gradient-to-r from-white to-[#7b329b]/5"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{session.type}</p>
                      <p className="text-sm text-gray-600">
                        {session.date} at {session.time}
                      </p>
                    </div>
                    <Badge className="bg-[#7b329b]/10 text-[#7b329b] hover:bg-[#7b329b]/10">Confirmed</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Progress Chart */}
          <Card className="border-[#7b329b]/20 shadow-sm">
            <CardHeader className="bg-gradient-to-r from-[#7b329b]/5 to-white border-b border-[#7b329b]/20">
              <CardTitle className="text-[#7b329b]">Progress Tracking</CardTitle>
              <CardDescription>Your fitness journey over time</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <ChartContainer
                config={{
                  weight: { label: "Weight (kg)", color: "#7b329b" },
                }}
                className="h-[200px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={clientProgress}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="weight"
                      stroke="#7b329b"
                      strokeWidth={3}
                      dot={{ fill: "#7b329b", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Quick Access */}
        <Card className="border-[#7b329b]/20 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-[#7b329b]/5 to-white border-b border-[#7b329b]/20">
            <CardTitle className="text-[#7b329b]">Quick Access</CardTitle>
            <CardDescription>Manage your account and preferences</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <Button
                variant="outline"
                className="w-full h-16 flex flex-col gap-1 border-[#7b329b]/20 hover:bg-[#7b329b]/10"
              >
                <MessageSquare className="w-5 h-5 text-[#7b329b]" />
                <span className="text-sm">Messages</span>
              </Button>
              <Button
                variant="outline"
                className="w-full h-16 flex flex-col gap-1 border-[#7b329b]/20 hover:bg-[#7b329b]/10"
              >
                <Calendar className="w-5 h-5 text-[#7b329b]" />
                <span className="text-sm">Schedule</span>
              </Button>
              <Button
                variant="outline"
                className="w-full h-16 flex flex-col gap-1 border-[#7b329b]/20 hover:bg-[#7b329b]/10"
              >
                <Settings className="w-5 h-5 text-[#7b329b]" />
                <span className="text-sm">Settings</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </CleanPortalLayout>
  )
}
