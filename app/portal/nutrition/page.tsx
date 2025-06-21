"use client"

import { CleanPortalLayout } from "@/components/clean-portal-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { Apple, Download, BookOpen, Camera, Target, TrendingUp } from "lucide-react"

// Mock data for nutrition tracking
const macroData = [
  { name: "Protein", value: 30, color: "#7c3aed" },
  { name: "Carbs", value: 45, color: "#a855f7" },
  { name: "Fat", value: 25, color: "#c084fc" },
]

const weeklyNutrition = [
  { day: "Mon", calories: 2100, protein: 140, carbs: 230, fat: 70 },
  { day: "Tue", calories: 1950, protein: 135, carbs: 210, fat: 65 },
  { day: "Wed", calories: 2200, protein: 150, carbs: 250, fat: 75 },
  { day: "Thu", calories: 2050, protein: 145, carbs: 220, fat: 68 },
  { day: "Fri", calories: 2150, protein: 142, carbs: 235, fat: 72 },
  { day: "Sat", calories: 2300, protein: 155, carbs: 260, fat: 80 },
  { day: "Sun", calories: 2000, protein: 138, carbs: 215, fat: 66 },
]

const mealPlans = [
  {
    id: 1,
    name: "High Protein Muscle Building",
    description: "Designed for muscle growth and recovery",
    duration: "4 weeks",
    calories: "2200-2400",
    status: "active",
  },
  {
    id: 2,
    name: "Fat Loss & Toning",
    description: "Balanced nutrition for body composition",
    duration: "6 weeks",
    calories: "1800-2000",
    status: "available",
  },
  {
    id: 3,
    name: "Maintenance & Wellness",
    description: "Sustainable healthy eating habits",
    duration: "Ongoing",
    calories: "2000-2200",
    status: "available",
  },
]

const resources = [
  {
    id: 1,
    title: "Healthy Recipe Collection",
    type: "PDF Guide",
    description: "50+ nutritious recipes for every meal",
    size: "2.4 MB",
  },
  {
    id: 2,
    title: "Meal Prep Masterclass",
    type: "Video Series",
    description: "Learn to prep meals efficiently",
    duration: "45 min",
  },
  {
    id: 3,
    title: "Supplement Guide",
    type: "PDF Guide",
    description: "Evidence-based supplement recommendations",
    size: "1.8 MB",
  },
]

export default function NutritionPage() {
  const todayCalories = 1850
  const targetCalories = 2100
  const calorieProgress = (todayCalories / targetCalories) * 100

  return (
    <CleanPortalLayout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Nutrition Resources</h1>
          <p className="text-gray-600">Track your nutrition and access meal plans and resources</p>
        </div>

        {/* Today's Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-purple-100 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Target className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-2xl font-bold text-gray-900">{todayCalories}</p>
                  <p className="text-sm text-gray-600">Calories Today</p>
                  <Progress value={calorieProgress} className="h-1 mt-1 bg-purple-100" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-100 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Apple className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-2xl font-bold text-gray-900">142g</p>
                  <p className="text-sm text-gray-600">Protein</p>
                  <Progress value={85} className="h-1 mt-1 bg-purple-100" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-100 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-2xl font-bold text-gray-900">235g</p>
                  <p className="text-sm text-gray-600">Carbs</p>
                  <Progress value={78} className="h-1 mt-1 bg-purple-100" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-100 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Target className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-2xl font-bold text-gray-900">72g</p>
                  <p className="text-sm text-gray-600">Fat</p>
                  <Progress value={90} className="h-1 mt-1 bg-purple-100" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="tracking" className="space-y-6">
          <TabsList className="bg-purple-50 border-purple-200">
            <TabsTrigger value="tracking" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Nutrition Tracking
            </TabsTrigger>
            <TabsTrigger value="plans" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Meal Plans
            </TabsTrigger>
            <TabsTrigger value="resources" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Resources
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tracking" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Macro Distribution */}
              <Card className="border-purple-100 shadow-sm">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-white border-b border-purple-100">
                  <CardTitle className="text-gray-900">Today's Macro Distribution</CardTitle>
                  <CardDescription>Current vs target macronutrient breakdown</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <ChartContainer
                    config={{
                      protein: { label: "Protein", color: "#7c3aed" },
                      carbs: { label: "Carbs", color: "#a855f7" },
                      fat: { label: "Fat", color: "#c084fc" },
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
                  <div className="flex justify-center gap-4 mt-4">
                    {macroData.map((macro) => (
                      <div key={macro.name} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: macro.color }} />
                        <span className="text-sm text-gray-600">
                          {macro.name} ({macro.value}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Weekly Overview */}
              <Card className="border-purple-100 shadow-sm">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-white border-b border-purple-100">
                  <CardTitle className="text-gray-900">Weekly Nutrition Overview</CardTitle>
                  <CardDescription>Your nutrition intake over the past week</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <ChartContainer
                    config={{
                      calories: { label: "Calories", color: "#7c3aed" },
                      protein: { label: "Protein (g)", color: "#a855f7" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyNutrition}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="day" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="calories" fill="#7c3aed" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Food Diary */}
            <Card className="border-purple-100 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-white border-b border-purple-100">
                <CardTitle className="text-gray-900">Food Diary</CardTitle>
                <CardDescription>Log your meals and track your intake</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center py-12 border-2 border-dashed border-purple-300 rounded-lg bg-purple-50/30">
                  <div className="text-center">
                    <Camera className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Your Meals</h3>
                    <p className="text-gray-600 mb-4">Take photos of your meals to track your nutrition</p>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Camera className="w-4 h-4 mr-2" />
                      Upload Photo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plans" className="space-y-4">
            <Card className="border-purple-100 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-white border-b border-purple-100">
                <CardTitle className="text-gray-900">Available Meal Plans</CardTitle>
                <CardDescription>Choose a meal plan that fits your goals</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {mealPlans.map((plan) => (
                    <div
                      key={plan.id}
                      className="flex items-center justify-between p-4 border border-purple-100 rounded-lg bg-gradient-to-r from-white to-purple-50/30"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{plan.name}</h3>
                          <Badge
                            variant={plan.status === "active" ? "default" : "secondary"}
                            className={plan.status === "active" ? "bg-purple-600 hover:bg-purple-600" : ""}
                          >
                            {plan.status}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-2">{plan.description}</p>
                        <div className="flex gap-4 text-sm text-gray-500">
                          <span>Duration: {plan.duration}</span>
                          <span>Calories: {plan.calories}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="border-purple-200 hover:bg-purple-50">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                        {plan.status !== "active" && (
                          <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                            Activate Plan
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-4">
            <Card className="border-purple-100 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-white border-b border-purple-100">
                <CardTitle className="text-gray-900">Nutrition Resources</CardTitle>
                <CardDescription>Guides, recipes, and educational materials</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {resources.map((resource) => (
                    <div
                      key={resource.id}
                      className="flex items-center justify-between p-4 border border-purple-100 rounded-lg bg-gradient-to-r from-white to-purple-50/30"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-100 rounded-lg">
                          {resource.type === "PDF Guide" ? (
                            <BookOpen className="w-6 h-6 text-purple-600" />
                          ) : (
                            <Camera className="w-6 h-6 text-purple-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{resource.title}</h3>
                          <p className="text-gray-600">{resource.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="border-purple-200 text-purple-700">
                              {resource.type}
                            </Badge>
                            <span className="text-sm text-gray-500">{resource.size || resource.duration}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" className="border-purple-200 hover:bg-purple-50">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
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
