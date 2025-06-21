"use client"

import { CleanPortalLayout } from "@/components/clean-portal-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import { TrendingUp, Award, Calendar, Weight, Zap, Heart, Timer } from "lucide-react"

const weightData = [
  { month: "Jan", weight: 75 },
  { month: "Feb", weight: 74 },
  { month: "Mar", weight: 72 },
  { month: "Apr", weight: 71 },
  { month: "May", weight: 69 },
  { month: "Jun", weight: 68 },
]

const workoutData = [
  { week: "Week 1", sessions: 3, duration: 180 },
  { week: "Week 2", sessions: 4, duration: 240 },
  { week: "Week 3", sessions: 3, duration: 195 },
  { week: "Week 4", sessions: 5, duration: 300 },
]

const bodyCompositionData = [
  { name: "Muscle", value: 45, color: "#ec4899" },
  { name: "Fat", value: 20, color: "#f97316" },
  { name: "Water", value: 35, color: "#3b82f6" },
]

const achievements = [
  { id: 1, title: "First Month Complete", date: "2024-01-15", type: "milestone" },
  { id: 2, title: "5kg Weight Loss", date: "2024-01-20", type: "goal" },
  { id: 3, title: "Perfect Week", date: "2024-01-25", type: "streak" },
  { id: 4, title: "Strength Improvement", date: "2024-01-30", type: "performance" },
]

export default function ProgressPage() {
  return (
    <CleanPortalLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Progress Tracking</h1>
            <p className="text-gray-600 mt-1">Monitor your fitness journey and achievements</p>
          </div>
          <Button className="bg-pink-600 hover:bg-pink-700">
            <Calendar className="h-4 w-4 mr-2" />
            View Report
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Current Weight</p>
                  <p className="text-2xl font-bold text-gray-900">68kg</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    -7kg from start
                  </p>
                </div>
                <Weight className="h-8 w-8 text-pink-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Sessions This Month</p>
                  <p className="text-2xl font-bold text-gray-900">15</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +3 from last month
                  </p>
                </div>
                <Zap className="h-8 w-8 text-pink-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Heart Rate</p>
                  <p className="text-2xl font-bold text-gray-900">142</p>
                  <p className="text-xs text-gray-500">BPM during workouts</p>
                </div>
                <Heart className="h-8 w-8 text-pink-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Workout Time</p>
                  <p className="text-2xl font-bold text-gray-900">24h</p>
                  <p className="text-xs text-gray-500">This month</p>
                </div>
                <Timer className="h-8 w-8 text-pink-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weight Progress Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Weight Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  weight: {
                    label: "Weight (kg)",
                    color: "#ec4899",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weightData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="weight"
                      stroke="var(--color-weight)"
                      strokeWidth={3}
                      dot={{ fill: "var(--color-weight)", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Body Composition */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Body Composition</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  muscle: { label: "Muscle", color: "#ec4899" },
                  fat: { label: "Fat", color: "#f97316" },
                  water: { label: "Water", color: "#3b82f6" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={bodyCompositionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {bodyCompositionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="flex justify-center space-x-6 mt-4">
                {bodyCompositionData.map((item) => (
                  <div key={item.name} className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-gray-600">
                      {item.name}: {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Workout Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Weekly Workout Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                sessions: {
                  label: "Sessions",
                  color: "#ec4899",
                },
                duration: {
                  label: "Duration (min)",
                  color: "#8b5cf6",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={workoutData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="sessions" fill="var(--color-sessions)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="duration" fill="var(--color-duration)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Recent Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                    <Award className="h-6 w-6 text-pink-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                    <p className="text-sm text-gray-500">{achievement.date}</p>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {achievement.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Goals Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Current Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900">Weight Loss Goal</span>
                  <span className="text-sm text-gray-600">7/10 kg</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-pink-600 h-2 rounded-full" style={{ width: "70%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900">Monthly Sessions</span>
                  <span className="text-sm text-gray-600">15/20 sessions</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-pink-600 h-2 rounded-full" style={{ width: "75%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900">Strength Improvement</span>
                  <span className="text-sm text-gray-600">85% complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-pink-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </CleanPortalLayout>
  )
}
