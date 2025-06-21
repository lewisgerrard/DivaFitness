"use client"

import { CleanPortalLayout } from "@/components/clean-portal-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Activity, TrendingUp, TrendingDown, Scale, Zap, Heart, Target } from "lucide-react"

const bodyCompositionHistory = [
  { month: "Oct", weight: 75, muscle: 42, fat: 25, water: 33 },
  { month: "Nov", weight: 73, muscle: 43, fat: 23, water: 34 },
  { month: "Dec", weight: 71, muscle: 44, fat: 21, water: 35 },
  { month: "Jan", weight: 69, muscle: 45, fat: 20, water: 35 },
]

const currentComposition = [
  { name: "Muscle Mass", value: 45, color: "#ec4899", target: 48 },
  { name: "Body Fat", value: 20, color: "#f97316", target: 18 },
  { name: "Water", value: 35, color: "#3b82f6", target: 35 },
]

const measurements = [
  { area: "Chest", current: 92, previous: 95, change: -3, unit: "cm" },
  { area: "Waist", current: 78, previous: 82, change: -4, unit: "cm" },
  { area: "Hips", current: 98, previous: 101, change: -3, unit: "cm" },
  { area: "Thigh", current: 58, previous: 60, change: -2, unit: "cm" },
  { area: "Arm", current: 32, previous: 31, change: +1, unit: "cm" },
]

export default function BodyCompositionPage() {
  return (
    <CleanPortalLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Body Composition Dashboard</h1>
            <p className="text-gray-600 mt-1">Track your body composition metrics and progress</p>
          </div>
          <Button className="bg-pink-600 hover:bg-pink-700">
            <Activity className="h-4 w-4 mr-2" />
            Record Measurement
          </Button>
        </div>

        {/* Current Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Current Weight</p>
                  <p className="text-2xl font-bold text-gray-900">69kg</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    -6kg from start
                  </p>
                </div>
                <Scale className="h-8 w-8 text-pink-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Muscle Mass</p>
                  <p className="text-2xl font-bold text-gray-900">45%</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +3% from start
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
                  <p className="text-sm font-medium text-gray-600">Body Fat</p>
                  <p className="text-2xl font-bold text-gray-900">20%</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    -5% from start
                  </p>
                </div>
                <Activity className="h-8 w-8 text-pink-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">BMI</p>
                  <p className="text-2xl font-bold text-gray-900">22.1</p>
                  <p className="text-xs text-gray-500">Normal range</p>
                </div>
                <Heart className="h-8 w-8 text-pink-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Body Composition Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Composition Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  muscle: { label: "Muscle %", color: "#ec4899" },
                  fat: { label: "Fat %", color: "#f97316" },
                  water: { label: "Water %", color: "#3b82f6" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={bodyCompositionHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="muscle" stroke="var(--color-muscle)" strokeWidth={2} />
                    <Line type="monotone" dataKey="fat" stroke="var(--color-fat)" strokeWidth={2} />
                    <Line type="monotone" dataKey="water" stroke="var(--color-water)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Current Composition */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Current Composition</CardTitle>
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
                      data={currentComposition}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {currentComposition.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="flex justify-center space-x-6 mt-4">
                {currentComposition.map((item) => (
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
        </div>

        {/* Body Measurements */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Body Measurements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {measurements.map((measurement) => (
                <div key={measurement.area} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{measurement.area}</h3>
                    <Badge
                      variant={measurement.change > 0 ? "default" : "outline"}
                      className={measurement.change > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                    >
                      {measurement.change > 0 ? "+" : ""}
                      {measurement.change}
                      {measurement.unit}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Current:</span>
                      <span className="font-medium">
                        {measurement.current}
                        {measurement.unit}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Previous:</span>
                      <span className="text-sm text-gray-500">
                        {measurement.previous}
                        {measurement.unit}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Goals Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Composition Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {currentComposition.map((item) => {
                const progress = (item.value / item.target) * 100
                const isOnTrack = item.name === "Body Fat" ? item.value <= item.target : item.value >= item.target

                return (
                  <div key={item.name}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center space-x-2">
                        <Target className="h-4 w-4 text-gray-400" />
                        <span className="font-medium text-gray-900">{item.name} Goal</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">
                          {item.value}% / {item.target}%
                        </span>
                        {isOnTrack ? (
                          <Badge className="bg-green-100 text-green-800">On Track</Badge>
                        ) : (
                          <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>
                        )}
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${Math.min(progress, 100)}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </CleanPortalLayout>
  )
}
