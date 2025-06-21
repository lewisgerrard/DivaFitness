"use client"

import { CleanPortalLayout } from "@/components/clean-portal-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { Apple, Utensils, Target, TrendingUp, Download, BookOpen, Calendar } from "lucide-react"

const macroData = [
  { name: "Protein", value: 30, color: "#ec4899", target: 35 },
  { name: "Carbs", value: 45, color: "#3b82f6", target: 40 },
  { name: "Fats", value: 25, color: "#f97316", target: 25 },
]

const weeklyNutrition = [
  { day: "Mon", calories: 1850, protein: 140, carbs: 180, fats: 65 },
  { day: "Tue", calories: 1920, protein: 145, carbs: 190, fats: 70 },
  { day: "Wed", calories: 1780, protein: 135, carbs: 170, fats: 60 },
  { day: "Thu", calories: 1900, protein: 150, carbs: 185, fats: 68 },
  { day: "Fri", calories: 1950, protein: 148, carbs: 195, fats: 72 },
  { day: "Sat", calories: 2100, protein: 155, carbs: 210, fats: 80 },
  { day: "Sun", calories: 1850, protein: 142, carbs: 175, fats: 65 },
]

const mealPlans = [
  {
    id: 1,
    name: "Weight Loss Plan",
    calories: "1800-2000",
    description: "Balanced macros for sustainable weight loss",
    duration: "4 weeks",
    status: "active",
  },
  {
    id: 2,
    name: "Muscle Building Plan",
    calories: "2200-2400",
    description: "High protein plan for muscle growth",
    duration: "6 weeks",
    status: "upcoming",
  },
]

const nutritionResources = [
  {
    id: 1,
    title: "Healthy Recipe Collection",
    type: "PDF Guide",
    description: "50+ healthy recipes for weight loss",
    downloadUrl: "#",
  },
  {
    id: 2,
    title: "Meal Prep Guide",
    type: "Video Series",
    description: "Learn to prep meals for the week",
    downloadUrl: "#",
  },
  {
    id: 3,
    title: "Macro Tracking Worksheet",
    type: "PDF Worksheet",
    description: "Track your daily macronutrients",
    downloadUrl: "#",
  },
]

export default function NutritionPage() {
  return (
    <CleanPortalLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Nutrition Resources</h1>
            <p className="text-gray-600 mt-1">Access meal plans, nutrition guides, and track your intake</p>
          </div>
          <Button className="bg-pink-600 hover:bg-pink-700">
            <Calendar className="h-4 w-4 mr-2" />
            Book Nutrition Consultation
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Daily Calories</p>
                  <p className="text-2xl font-bold text-gray-900">1,850</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <Target className="h-3 w-3 mr-1" />
                    Target: 1,800-2,000
                  </p>
                </div>
                <Apple className="h-8 w-8 text-pink-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Protein</p>
                  <p className="text-2xl font-bold text-gray-900">142g</p>
                  <p className="text-xs text-gray-500">30% of calories</p>
                </div>
                <Utensils className="h-8 w-8 text-pink-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Water Intake</p>
                  <p className="text-2xl font-bold text-gray-900">2.1L</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Goal achieved
                  </p>
                </div>
                <Target className="h-8 w-8 text-pink-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Meal Plans</p>
                  <p className="text-2xl font-bold text-gray-900">2</p>
                  <p className="text-xs text-gray-500">Active plans</p>
                </div>
                <BookOpen className="h-8 w-8 text-pink-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="meal-plans">Meal Plans</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="tracking">Tracking</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Macro Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900">Macro Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      protein: { label: "Protein", color: "#ec4899" },
                      carbs: { label: "Carbs", color: "#3b82f6" },
                      fats: { label: "Fats", color: "#f97316" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={macroData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {macroData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  <div className="flex justify-center space-x-6 mt-4">
                    {macroData.map((item) => (
                      <div key={item.name} className="text-center">
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-sm font-medium">{item.name}</span>
                        </div>
                        <p className="text-lg font-bold">{item.value}%</p>
                        <p className="text-xs text-gray-500">Target: {item.target}%</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Weekly Nutrition */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900">Weekly Nutrition</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      calories: { label: "Calories", color: "#ec4899" },
                      protein: { label: "Protein (g)", color: "#3b82f6" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyNutrition}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="calories" fill="var(--color-calories)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="meal-plans" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">Your Meal Plans</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mealPlans.map((plan) => (
                    <div key={plan.id} className="p-6 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900">{plan.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{plan.description}</p>
                        </div>
                        <Badge variant={plan.status === "active" ? "default" : "outline"}>{plan.status}</Badge>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Calories:</span>
                          <span className="font-medium">{plan.calories}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Duration:</span>
                          <span className="font-medium">{plan.duration}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-pink-600 hover:bg-pink-700">
                          View Plan
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">Nutrition Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {nutritionResources.map((resource) => (
                    <div
                      key={resource.id}
                      className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <BookOpen className="h-8 w-8 text-pink-600" />
                        <Badge variant="outline">{resource.type}</Badge>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{resource.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
                      <Button size="sm" className="w-full bg-pink-600 hover:bg-pink-700">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tracking" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">Nutrition Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Apple className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Nutrition Tracking Coming Soon</h3>
                  <p className="text-gray-600 mb-6">
                    We're working on an integrated nutrition tracking system to help you log your daily intake.
                  </p>
                  <Button className="bg-pink-600 hover:bg-pink-700">Get Notified When Available</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </CleanPortalLayout>
  )
}
