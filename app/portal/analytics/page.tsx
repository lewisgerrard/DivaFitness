"use client"

import { CleanPortalLayout } from "@/components/clean-portal-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"
import { Users, Calendar, TrendingUp, Globe, Activity } from "lucide-react"

// Mock analytics data
const websiteTraffic = [
  { month: "Jan", visitors: 1200, pageViews: 3400, bookings: 45 },
  { month: "Feb", visitors: 1350, pageViews: 3800, bookings: 52 },
  { month: "Mar", visitors: 1100, pageViews: 3100, bookings: 38 },
  { month: "Apr", visitors: 1450, pageViews: 4200, bookings: 61 },
  { month: "May", visitors: 1600, pageViews: 4800, bookings: 68 },
  { month: "Jun", visitors: 1750, pageViews: 5200, bookings: 75 },
]

const userActivity = [
  { day: "Mon", activeUsers: 45, sessions: 120, bookings: 8 },
  { day: "Tue", activeUsers: 52, sessions: 135, bookings: 12 },
  { day: "Wed", activeUsers: 48, sessions: 128, bookings: 9 },
  { day: "Thu", activeUsers: 61, sessions: 145, bookings: 15 },
  { day: "Fri", activeUsers: 58, sessions: 142, bookings: 11 },
  { day: "Sat", activeUsers: 35, sessions: 95, bookings: 6 },
  { day: "Sun", activeUsers: 28, sessions: 78, bookings: 4 },
]

const trafficSources = [
  { name: "Direct", value: 35, color: "#7c3aed" },
  { name: "Google", value: 28, color: "#a855f7" },
  { name: "Social Media", value: 20, color: "#c084fc" },
  { name: "Referrals", value: 12, color: "#ddd6fe" },
  { name: "Email", value: 5, color: "#ede9fe" },
]

const popularPages = [
  { page: "/", views: 2450, bounceRate: 32 },
  { page: "/services", views: 1890, bounceRate: 28 },
  { page: "/about", views: 1234, bounceRate: 35 },
  { page: "/contact", views: 987, bounceRate: 25 },
  { page: "/training", views: 756, bounceRate: 30 },
]

const membershipStats = {
  totalMembers: 156,
  activeMembers: 142,
  newThisMonth: 18,
  churnRate: 3.2,
  averageSessionsPerMember: 8.5,
  memberRetention: 94.2,
}

export default function AnalyticsPage() {
  return (
    <CleanPortalLayout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Web Analytics</h1>
          <p className="text-gray-600">Comprehensive insights into your business performance</p>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-purple-100 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Globe className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-2xl font-bold text-gray-900">1,750</p>
                  <div className="flex items-center gap-1">
                    <p className="text-sm text-gray-600">Monthly Visitors</p>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs">+12.5%</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-100 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-2xl font-bold text-gray-900">75</p>
                  <div className="flex items-center gap-1">
                    <p className="text-sm text-gray-600">Bookings</p>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs">+23%</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-100 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-2xl font-bold text-gray-900">{membershipStats.totalMembers}</p>
                  <div className="flex items-center gap-1">
                    <p className="text-sm text-gray-600">Total Members</p>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs">
                      +{membershipStats.newThisMonth}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-100 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-2xl font-bold text-gray-900">94.2%</p>
                  <p className="text-sm text-gray-600">Retention Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="website" className="space-y-6">
          <TabsList className="bg-purple-50 border-purple-200">
            <TabsTrigger value="website" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Website Analytics
            </TabsTrigger>
            <TabsTrigger value="members" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Member Analytics
            </TabsTrigger>
            <TabsTrigger value="bookings" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Booking Trends
            </TabsTrigger>
          </TabsList>

          <TabsContent value="website" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Website Traffic */}
              <Card className="border-purple-100 shadow-sm">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-white border-b border-purple-100">
                  <CardTitle className="text-gray-900">Website Traffic Trends</CardTitle>
                  <CardDescription>Monthly visitors and page views</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <ChartContainer
                    config={{
                      visitors: { label: "Visitors", color: "#7c3aed" },
                      pageViews: { label: "Page Views", color: "#a855f7" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={websiteTraffic}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="month" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="visitors"
                          stroke="#7c3aed"
                          strokeWidth={3}
                          dot={{ fill: "#7c3aed", strokeWidth: 2, r: 4 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="pageViews"
                          stroke="#a855f7"
                          strokeWidth={3}
                          dot={{ fill: "#a855f7", strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Traffic Sources */}
              <Card className="border-purple-100 shadow-sm">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-white border-b border-purple-100">
                  <CardTitle className="text-gray-900">Traffic Sources</CardTitle>
                  <CardDescription>Where your visitors come from</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <ChartContainer
                    config={{
                      direct: { label: "Direct", color: "#7c3aed" },
                      google: { label: "Google", color: "#a855f7" },
                      social: { label: "Social Media", color: "#c084fc" },
                      referrals: { label: "Referrals", color: "#ddd6fe" },
                      email: { label: "Email", color: "#ede9fe" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={trafficSources}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {trafficSources.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {trafficSources.map((source) => (
                      <div key={source.name} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }} />
                        <span className="text-sm text-gray-600">
                          {source.name} ({source.value}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Popular Pages */}
            <Card className="border-purple-100 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-white border-b border-purple-100">
                <CardTitle className="text-gray-900">Popular Pages</CardTitle>
                <CardDescription>Most visited pages on your website</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {popularPages.map((page, index) => (
                    <div
                      key={page.page}
                      className="flex items-center justify-between p-3 border border-purple-100 rounded-lg bg-gradient-to-r from-white to-purple-50/30"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-purple-600">{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{page.page}</p>
                          <p className="text-sm text-gray-600">{page.views} views</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="border-purple-200 text-purple-700">
                        {page.bounceRate}% bounce rate
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="members" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-purple-100 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Users className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{membershipStats.activeMembers}</p>
                      <p className="text-sm text-gray-600">Active Members</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-100 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Activity className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{membershipStats.averageSessionsPerMember}</p>
                      <p className="text-sm text-gray-600">Avg Sessions/Member</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-100 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{membershipStats.churnRate}%</p>
                      <p className="text-sm text-gray-600">Churn Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-purple-100 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-white border-b border-purple-100">
                <CardTitle className="text-gray-900">Daily User Activity</CardTitle>
                <CardDescription>Active users and sessions throughout the week</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ChartContainer
                  config={{
                    activeUsers: { label: "Active Users", color: "#7c3aed" },
                    sessions: { label: "Sessions", color: "#a855f7" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={userActivity}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="day" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="activeUsers" fill="#7c3aed" />
                      <Bar dataKey="sessions" fill="#a855f7" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <Card className="border-purple-100 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-white border-b border-purple-100">
                <CardTitle className="text-gray-900">Booking Trends</CardTitle>
                <CardDescription>Monthly booking patterns and growth</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ChartContainer
                  config={{
                    bookings: { label: "Bookings", color: "#7c3aed" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={websiteTraffic}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="bookings" fill="#7c3aed" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="border-purple-100 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-white border-b border-purple-100">
                <CardTitle className="text-gray-900">Weekly Booking Distribution</CardTitle>
                <CardDescription>Bookings by day of the week</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ChartContainer
                  config={{
                    bookings: { label: "Bookings", color: "#a855f7" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={userActivity}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="day" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="bookings" fill="#a855f7" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </CleanPortalLayout>
  )
}
