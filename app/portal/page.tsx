"use client"

import { useAuth } from "@/hooks/use-auth"
import { CleanPortalLayout } from "@/components/clean-portal-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts"
import {
  User,
  Calendar,
  Activity,
  Apple,
  MessageSquare,
  BookOpen,
  Clock,
  CheckCircle,
  Scale,
  Target,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

// Mock data for dashboard highlights
const recentBookings = [
  { id: 1, class: "HIIT Training", date: "2024-01-15", time: "09:00", status: "confirmed" },
  { id: 2, class: "Strength Training", date: "2024-01-17", time: "18:00", status: "confirmed" },
  { id: 3, class: "Personal Training", date: "2024-01-20", time: "10:00", status: "pending" },
]

const weightData = [
  { date: "Jan", weight: 75.2 },
  { date: "Feb", weight: 74.8 },
  { date: "Mar", weight: 74.5 },
  { date: "Apr", weight: 74.1 },
  { date: "May", weight: 73.8 },
]

const weeklyActivity = [
  { day: "Mon", sessions: 2 },
  { day: "Tue", sessions: 1 },
  { day: "Wed", sessions: 3 },
  { day: "Thu", sessions: 2 },
  { day: "Fri", sessions: 1 },
  { day: "Sat", sessions: 0 },
  { day: "Sun", sessions: 1 },
]

const currentMetrics = {
  weight: 73.8,
  bodyFat: 17.3,
  targetWeight: 72.0,
  targetBodyFat: 15.0,
}

export default function PortalPage() {
  const { user } = useAuth()
  const userRole = user?.role || "member"

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Confirmed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <CleanPortalLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-[#7b329b]">Welcome back, {user?.first_name || user?.name}!</h1>
          <p className="text-gray-600">Here's your fitness journey overview</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                  <p className="text-sm text-gray-600">Sessions This Month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#7b329b]/20 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#7b329b]/10 rounded-lg">
                  <Scale className="w-5 h-5 text-[#7b329b]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{currentMetrics.weight}kg</p>
                  <p className="text-sm text-gray-600">Current Weight</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#7b329b]/20 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Target className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{currentMetrics.bodyFat}%</p>
                  <p className="text-sm text-gray-600">Body Fat</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Bookings Preview */}
          <Card className="border-[#7b329b]/20 shadow-sm">
            <CardHeader className="bg-gradient-to-r from-[#7b329b]/5 to-white border-b border-[#7b329b]/20">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-[#7b329b]">Upcoming Sessions</CardTitle>
                  <CardDescription>Your next scheduled workouts</CardDescription>
                </div>
                <Link href="/portal/bookings">
                  <Button variant="outline" size="sm" className="border-[#7b329b]/20 hover:bg-[#7b329b]/10">
                    View All <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                {recentBookings.slice(0, 3).map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-3 border border-[#7b329b]/10 rounded-lg bg-gradient-to-r from-white to-[#7b329b]/5"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{booking.class}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-3 h-3" />
                        {booking.date}
                        <Clock className="w-3 h-3 ml-2" />
                        {booking.time}
                      </div>
                    </div>
                    {getStatusBadge(booking.status)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weight Progress Preview */}
          {(userRole === "client" || userRole === "admin") && (
            <Card className="border-[#7b329b]/20 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-[#7b329b]/5 to-white border-b border-[#7b329b]/20">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-[#7b329b]">Weight Progress</CardTitle>
                    <CardDescription>Your fitness journey tracking</CardDescription>
                  </div>
                  <Link href="/portal/body-composition">
                    <Button variant="outline" size="sm" className="border-[#7b329b]/20 hover:bg-[#7b329b]/10">
                      View Details <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <ChartContainer
                  config={{
                    weight: { label: "Weight (kg)", color: "#7b329b" },
                  }}
                  className="h-[200px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weightData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="date" stroke="#6b7280" />
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
          )}

          {/* Weekly Activity Preview */}
          <Card className="border-[#7b329b]/20 shadow-sm">
            <CardHeader className="bg-gradient-to-r from-[#7b329b]/5 to-white border-b border-[#7b329b]/20">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-[#7b329b]">Weekly Activity</CardTitle>
                  <CardDescription>Your workout frequency this week</CardDescription>
                </div>
                <Link href="/portal/bookings">
                  <Button variant="outline" size="sm" className="border-[#7b329b]/20 hover:bg-[#7b329b]/10">
                    View Schedule <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <ChartContainer
                config={{
                  sessions: { label: "Sessions", color: "#7b329b" },
                }}
                className="h-[200px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyActivity}>
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

          {/* Goal Progress Preview */}
          {(userRole === "client" || userRole === "admin") && (
            <Card className="border-[#7b329b]/20 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-[#7b329b]/5 to-white border-b border-[#7b329b]/20">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-[#7b329b]">Goal Progress</CardTitle>
                    <CardDescription>Track your fitness targets</CardDescription>
                  </div>
                  <Link href="/portal/body-composition">
                    <Button variant="outline" size="sm" className="border-[#7b329b]/20 hover:bg-[#7b329b]/10">
                      Update Goals <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Weight Goal</span>
                    <span className="text-[#7b329b] font-medium">
                      {currentMetrics.weight}kg / {currentMetrics.targetWeight}kg
                    </span>
                  </div>
                  <Progress value={75} className="h-2" style={{ backgroundColor: "#7b329b20" }} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Body Fat Goal</span>
                    <span className="text-[#7b329b] font-medium">
                      {currentMetrics.bodyFat}% / {currentMetrics.targetBodyFat}%
                    </span>
                  </div>
                  <Progress value={60} className="h-2" style={{ backgroundColor: "#7b329b20" }} />
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Quick Access Navigation */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-[#7b329b]">Quick Access</h2>
            <p className="text-gray-600">Jump to your most used portal features</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <Link href="/portal/profile">
              <Card className="border-[#7b329b]/20 shadow-sm hover:shadow-md transition-shadow cursor-pointer hover:border-[#7b329b]/40">
                <CardContent className="p-4 text-center">
                  <div className="p-3 bg-[#7b329b]/10 rounded-lg w-fit mx-auto mb-2">
                    <User className="w-6 h-6 text-[#7b329b]" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">Profile</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/portal/bookings">
              <Card className="border-[#7b329b]/20 shadow-sm hover:shadow-md transition-shadow cursor-pointer hover:border-[#7b329b]/40">
                <CardContent className="p-4 text-center">
                  <div className="p-3 bg-[#7b329b]/10 rounded-lg w-fit mx-auto mb-2">
                    <Calendar className="w-6 h-6 text-[#7b329b]" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">Bookings</p>
                </CardContent>
              </Card>
            </Link>

            {(userRole === "client" || userRole === "admin") && (
              <>
                <Link href="/portal/body-composition">
                  <Card className="border-[#7b329b]/20 shadow-sm hover:shadow-md transition-shadow cursor-pointer hover:border-[#7b329b]/40">
                    <CardContent className="p-4 text-center">
                      <div className="p-3 bg-[#7b329b]/10 rounded-lg w-fit mx-auto mb-2">
                        <Activity className="w-6 h-6 text-[#7b329b]" />
                      </div>
                      <p className="text-sm font-medium text-gray-900">Body Comp</p>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/portal/nutrition">
                  <Card className="border-[#7b329b]/20 shadow-sm hover:shadow-md transition-shadow cursor-pointer hover:border-[#7b329b]/40">
                    <CardContent className="p-4 text-center">
                      <div className="p-3 bg-[#7b329b]/10 rounded-lg w-fit mx-auto mb-2">
                        <Apple className="w-6 h-6 text-[#7b329b]" />
                      </div>
                      <p className="text-sm font-medium text-gray-900">Nutrition</p>
                    </CardContent>
                  </Card>
                </Link>
              </>
            )}

            <Link href="/portal/messages">
              <Card className="border-[#7b329b]/20 shadow-sm hover:shadow-md transition-shadow cursor-pointer hover:border-[#7b329b]/40">
                <CardContent className="p-4 text-center">
                  <div className="p-3 bg-[#7b329b]/10 rounded-lg w-fit mx-auto mb-2">
                    <MessageSquare className="w-6 h-6 text-[#7b329b]" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">Messages</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/portal/resources">
              <Card className="border-[#7b329b]/20 shadow-sm hover:shadow-md transition-shadow cursor-pointer hover:border-[#7b329b]/40">
                <CardContent className="p-4 text-center">
                  <div className="p-3 bg-[#7b329b]/10 rounded-lg w-fit mx-auto mb-2">
                    <BookOpen className="w-6 h-6 text-[#7b329b]" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">Resources</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </CleanPortalLayout>
  )
}
