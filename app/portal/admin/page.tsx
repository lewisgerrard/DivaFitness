"use client"

import { useState } from "react"
import { CleanPortalLayout } from "@/components/clean-portal-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Users, Calendar, MessageSquare, TrendingUp, Activity, Shield, Database, Server } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

// Mock data for admin dashboard
const systemStats = {
  totalUsers: 156,
  activeUsers: 89,
  totalSessions: 1247,
  systemUptime: "99.9%",
}

const userGrowthData = [
  { month: "Jan", users: 45 },
  { month: "Feb", users: 52 },
  { month: "Mar", users: 61 },
  { month: "Apr", users: 73 },
  { month: "May", users: 89 },
  { month: "Jun", users: 156 },
]

const sessionData = [
  { day: "Mon", sessions: 23 },
  { day: "Tue", sessions: 19 },
  { day: "Wed", sessions: 31 },
  { day: "Thu", sessions: 28 },
  { day: "Fri", sessions: 25 },
  { day: "Sat", sessions: 15 },
  { day: "Sun", sessions: 12 },
]

const userRoleData = [
  { name: "Members", value: 120, color: "#3b82f6" },
  { name: "Clients", value: 32, color: "#7b329b" },
  { name: "Admins", value: 4, color: "#ef4444" },
]

const recentActivity = [
  { id: 1, action: "New user registration", user: "Sarah Johnson", time: "2 minutes ago", type: "user" },
  { id: 2, action: "Session completed", user: "Mike Wilson", time: "15 minutes ago", type: "session" },
  { id: 3, action: "System backup completed", user: "System", time: "1 hour ago", type: "system" },
  { id: 4, action: "New message sent", user: "Emma Davis", time: "2 hours ago", type: "message" },
  { id: 5, action: "User role updated", user: "Admin", time: "3 hours ago", type: "admin" },
]

export default function AdminPage() {
  const { user } = useAuth()
  const [systemHealth, setSystemHealth] = useState({
    database: "healthy",
    api: "healthy",
    storage: "warning",
    email: "healthy",
  })

  const getHealthBadge = (status: string) => {
    switch (status) {
      case "healthy":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Healthy</Badge>
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Warning</Badge>
      case "error":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Error</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user":
        return <Users className="w-4 h-4 text-blue-600" />
      case "session":
        return <Calendar className="w-4 h-4 text-[#7b329b]" />
      case "message":
        return <MessageSquare className="w-4 h-4 text-green-600" />
      case "system":
        return <Server className="w-4 h-4 text-gray-600" />
      case "admin":
        return <Shield className="w-4 h-4 text-red-600" />
      default:
        return <Activity className="w-4 h-4 text-gray-600" />
    }
  }

  if (user?.role !== "admin") {
    return (
      <CleanPortalLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
            <p className="text-gray-600">You don't have permission to access this page.</p>
          </div>
        </div>
      </CleanPortalLayout>
    )
  }

  return (
    <CleanPortalLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-[#7b329b]">Admin Panel</h1>
          <p className="text-gray-600">System overview and administration tools</p>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-[#7b329b]/20 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#7b329b]/10 rounded-lg">
                  <Users className="w-5 h-5 text-[#7b329b]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{systemStats.totalUsers}</p>
                  <p className="text-sm text-gray-600">Total Users</p>
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
                  <p className="text-2xl font-bold text-gray-900">{systemStats.activeUsers}</p>
                  <p className="text-sm text-gray-600">Active Users</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#7b329b]/20 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{systemStats.totalSessions}</p>
                  <p className="text-sm text-gray-600">Total Sessions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#7b329b]/20 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{systemStats.systemUptime}</p>
                  <p className="text-sm text-gray-600">System Uptime</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-[#7b329b]/5 border-[#7b329b]/20">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#7b329b] data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-[#7b329b] data-[state=active]:text-white">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="system" className="data-[state=active]:bg-[#7b329b] data-[state=active]:text-white">
              System Health
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-[#7b329b] data-[state=active]:text-white">
              Recent Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* User Growth Chart */}
              <Card className="border-[#7b329b]/20 shadow-sm">
                <CardHeader className="bg-gradient-to-r from-[#7b329b]/5 to-white border-b border-[#7b329b]/20">
                  <CardTitle className="text-[#7b329b]">User Growth</CardTitle>
                  <CardDescription>Monthly user registration trends</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <ChartContainer
                    config={{
                      users: { label: "Users", color: "#7b329b" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={userGrowthData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="month" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="users"
                          stroke="#7b329b"
                          strokeWidth={3}
                          dot={{ fill: "#7b329b", strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* User Role Distribution */}
              <Card className="border-[#7b329b]/20 shadow-sm">
                <CardHeader className="bg-gradient-to-r from-[#7b329b]/5 to-white border-b border-[#7b329b]/20">
                  <CardTitle className="text-[#7b329b]">User Distribution</CardTitle>
                  <CardDescription>Users by role type</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <ChartContainer
                    config={{
                      members: { label: "Members", color: "#3b82f6" },
                      clients: { label: "Clients", color: "#7b329b" },
                      admins: { label: "Admins", color: "#ef4444" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={userRoleData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}`}
                        >
                          {userRoleData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="border-[#7b329b]/20 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-[#7b329b]/5 to-white border-b border-[#7b329b]/20">
                <CardTitle className="text-[#7b329b]">Weekly Session Activity</CardTitle>
                <CardDescription>Session bookings by day of week</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <ChartContainer
                  config={{
                    sessions: { label: "Sessions", color: "#7b329b" },
                  }}
                  className="h-[400px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sessionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="day" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="sessions" fill="#7b329b" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <Card className="border-[#7b329b]/20 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-[#7b329b]/5 to-white border-b border-[#7b329b]/20">
                <CardTitle className="text-[#7b329b]">System Health Status</CardTitle>
                <CardDescription>Monitor system components and services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-4 border border-[#7b329b]/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Database className="w-5 h-5 text-[#7b329b]" />
                      <div>
                        <p className="font-medium text-gray-900">Database</p>
                        <p className="text-sm text-gray-600">PostgreSQL Connection</p>
                      </div>
                    </div>
                    {getHealthBadge(systemHealth.database)}
                  </div>

                  <div className="flex items-center justify-between p-4 border border-[#7b329b]/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Server className="w-5 h-5 text-[#7b329b]" />
                      <div>
                        <p className="font-medium text-gray-900">API Services</p>
                        <p className="text-sm text-gray-600">REST API Endpoints</p>
                      </div>
                    </div>
                    {getHealthBadge(systemHealth.api)}
                  </div>

                  <div className="flex items-center justify-between p-4 border border-[#7b329b]/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Database className="w-5 h-5 text-[#7b329b]" />
                      <div>
                        <p className="font-medium text-gray-900">File Storage</p>
                        <p className="text-sm text-gray-600">Media & Document Storage</p>
                      </div>
                    </div>
                    {getHealthBadge(systemHealth.storage)}
                  </div>

                  <div className="flex items-center justify-between p-4 border border-[#7b329b]/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-5 h-5 text-[#7b329b]" />
                      <div>
                        <p className="font-medium text-gray-900">Email Service</p>
                        <p className="text-sm text-gray-600">SMTP & Notifications</p>
                      </div>
                    </div>
                    {getHealthBadge(systemHealth.email)}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card className="border-[#7b329b]/20 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-[#7b329b]/5 to-white border-b border-[#7b329b]/20">
                <CardTitle className="text-[#7b329b]">Recent System Activity</CardTitle>
                <CardDescription>Latest actions and events in the system</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center gap-4 p-4 border border-[#7b329b]/10 rounded-lg bg-gradient-to-r from-white to-[#7b329b]/5"
                    >
                      <div className="p-2 bg-white rounded-lg shadow-sm">{getActivityIcon(activity.type)}</div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600">by {activity.user}</p>
                      </div>
                      <div className="text-sm text-gray-500">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </CleanPortalLayout>
  )
}
