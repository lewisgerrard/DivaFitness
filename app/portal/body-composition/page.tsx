"use client"

import { CleanPortalLayout } from "@/components/clean-portal-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts"
import { TrendingUp, TrendingDown, Scale, Ruler, Target, Plus } from "lucide-react"

// Mock data for body composition tracking
const weightData = [
  { date: "2024-01-01", weight: 75.2, bodyFat: 18.5 },
  { date: "2024-01-08", weight: 74.8, bodyFat: 18.2 },
  { date: "2024-01-15", weight: 74.5, bodyFat: 17.9 },
  { date: "2024-01-22", weight: 74.1, bodyFat: 17.6 },
  { date: "2024-01-29", weight: 73.8, bodyFat: 17.3 },
]

const measurementsData = [
  { date: "2024-01-01", chest: 98, waist: 82, hips: 95, arms: 32, thighs: 58 },
  { date: "2024-01-15", chest: 99, waist: 81, hips: 94, arms: 33, thighs: 59 },
  { date: "2024-01-29", chest: 100, waist: 80, hips: 93, arms: 34, thighs: 60 },
]

const currentMetrics = {
  weight: 73.8,
  height: 175,
  bodyFat: 17.3,
  muscleMass: 61.1,
  bmi: 24.1,
  visceralFat: 8,
}

const goals = {
  targetWeight: 72.0,
  targetBodyFat: 15.0,
  targetMuscleMass: 63.0,
}

export default function BodyCompositionPage() {
  const weightChange = weightData[weightData.length - 1].weight - weightData[0].weight
  const bodyFatChange = weightData[weightData.length - 1].bodyFat - weightData[0].bodyFat

  return (
    <CleanPortalLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-[#7b329b]">Body Composition</h1>
            <p className="text-gray-600">Track your body metrics and progress over time</p>
          </div>
          <Button className="bg-[#7b329b] hover:bg-[#6b2c87]">
            <Plus className="w-4 h-4 mr-2" />
            Add Measurement
          </Button>
        </div>

        {/* Current Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-[#7b329b]/20 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#7b329b]/10 rounded-lg">
                  <Scale className="w-5 h-5 text-[#7b329b]" />
                </div>
                <div className="flex-1">
                  <p className="text-2xl font-bold text-gray-900">{currentMetrics.weight} kg</p>
                  <div className="flex items-center gap-1">
                    <p className="text-sm text-gray-600">Weight</p>
                    {weightChange < 0 ? (
                      <div className="flex items-center text-green-600">
                        <TrendingDown className="w-3 h-3" />
                        <span className="text-xs">{Math.abs(weightChange).toFixed(1)}kg</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-600">
                        <TrendingUp className="w-3 h-3" />
                        <span className="text-xs">{weightChange.toFixed(1)}kg</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#7b329b]/20 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#7b329b]/10 rounded-lg">
                  <Target className="w-5 h-5 text-[#7b329b]" />
                </div>
                <div className="flex-1">
                  <p className="text-2xl font-bold text-gray-900">{currentMetrics.bodyFat}%</p>
                  <div className="flex items-center gap-1">
                    <p className="text-sm text-gray-600">Body Fat</p>
                    {bodyFatChange < 0 ? (
                      <div className="flex items-center text-green-600">
                        <TrendingDown className="w-3 h-3" />
                        <span className="text-xs">{Math.abs(bodyFatChange).toFixed(1)}%</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-600">
                        <TrendingUp className="w-3 h-3" />
                        <span className="text-xs">{bodyFatChange.toFixed(1)}%</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#7b329b]/20 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Ruler className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-2xl font-bold text-gray-900">{currentMetrics.muscleMass} kg</p>
                  <p className="text-sm text-gray-600">Muscle Mass</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#7b329b]/20 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Scale className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-2xl font-bold text-gray-900">{currentMetrics.bmi}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-600">BMI</p>
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                      Normal
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Goals Progress */}
        <Card className="border-[#7b329b]/20 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-[#7b329b]/5 to-white border-b border-[#7b329b]/20">
            <CardTitle className="text-[#7b329b]">Goal Progress</CardTitle>
            <CardDescription>Track your progress towards your fitness goals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Weight Goal</span>
                  <span className="text-[#7b329b] font-medium">
                    {currentMetrics.weight}kg / {goals.targetWeight}kg
                  </span>
                </div>
                <Progress
                  value={
                    ((goals.targetWeight - currentMetrics.weight) / (goals.targetWeight - weightData[0].weight)) * 100
                  }
                  className="h-2"
                  style={{ backgroundColor: "#7b329b20" }}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Body Fat Goal</span>
                  <span className="text-[#7b329b] font-medium">
                    {currentMetrics.bodyFat}% / {goals.targetBodyFat}%
                  </span>
                </div>
                <Progress
                  value={
                    ((weightData[0].bodyFat - currentMetrics.bodyFat) / (weightData[0].bodyFat - goals.targetBodyFat)) *
                    100
                  }
                  className="h-2"
                  style={{ backgroundColor: "#7b329b20" }}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Muscle Mass Goal</span>
                  <span className="text-[#7b329b] font-medium">
                    {currentMetrics.muscleMass}kg / {goals.targetMuscleMass}kg
                  </span>
                </div>
                <Progress
                  value={((currentMetrics.muscleMass - 60) / (goals.targetMuscleMass - 60)) * 100}
                  className="h-2"
                  style={{ backgroundColor: "#7b329b20" }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="trends" className="space-y-6">
          <TabsList className="bg-[#7b329b]/5 border-[#7b329b]/20">
            <TabsTrigger value="trends" className="data-[state=active]:bg-[#7b329b] data-[state=active]:text-white">
              Weight & Body Fat Trends
            </TabsTrigger>
            <TabsTrigger
              value="measurements"
              className="data-[state=active]:bg-[#7b329b] data-[state=active]:text-white"
            >
              Body Measurements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trends">
            <Card className="border-[#7b329b]/20 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-[#7b329b]/5 to-white border-b border-[#7b329b]/20">
                <CardTitle className="text-[#7b329b]">Weight & Body Fat Progress</CardTitle>
                <CardDescription>Track your weight and body fat percentage over time</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ChartContainer
                  config={{
                    weight: {
                      label: "Weight (kg)",
                      color: "#7b329b",
                    },
                    bodyFat: {
                      label: "Body Fat (%)",
                      color: "#9d4edd",
                    },
                  }}
                  className="h-[400px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weightData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="date" stroke="#6b7280" />
                      <YAxis yAxisId="left" stroke="#6b7280" />
                      <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="weight"
                        stroke="#7b329b"
                        strokeWidth={3}
                        dot={{ fill: "#7b329b", strokeWidth: 2, r: 4 }}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="bodyFat"
                        stroke="#9d4edd"
                        strokeWidth={3}
                        dot={{ fill: "#9d4edd", strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="measurements">
            <Card className="border-[#7b329b]/20 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-[#7b329b]/5 to-white border-b border-[#7b329b]/20">
                <CardTitle className="text-[#7b329b]">Body Measurements</CardTitle>
                <CardDescription>Track changes in your body measurements</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ChartContainer
                  config={{
                    chest: { label: "Chest (cm)", color: "#7b329b" },
                    waist: { label: "Waist (cm)", color: "#9d4edd" },
                    hips: { label: "Hips (cm)", color: "#c77dff" },
                    arms: { label: "Arms (cm)", color: "#e0c3fc" },
                    thighs: { label: "Thighs (cm)", color: "#f0e6ff" },
                  }}
                  className="h-[400px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={measurementsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="date" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="chest" fill="#7b329b" />
                      <Bar dataKey="waist" fill="#9d4edd" />
                      <Bar dataKey="hips" fill="#c77dff" />
                      <Bar dataKey="arms" fill="#e0c3fc" />
                      <Bar dataKey="thighs" fill="#f0e6ff" />
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
