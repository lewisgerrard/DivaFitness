"use client"

import { useAuth } from "@/hooks/use-auth"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, TrendingUp, TrendingDown, Target, ArrowLeft, Activity, Heart, Scale } from "lucide-react"
import Link from "next/link"
import HeroSection from "@/components/hero-section"

interface HealthData {
  id: number
  measurement_date: string
  weight_kg?: number
  height_cm?: number
  body_fat_percentage?: number
  muscle_mass_kg?: number
  bmi?: number
  resting_heart_rate?: number
  blood_pressure_systolic?: number
  blood_pressure_diastolic?: number
  notes?: string
}

interface HealthGoal {
  id: number
  goal_type: string
  target_value: number
  current_value: number
  target_date?: string
  status: string
  description?: string
}

export default function MyDataPage() {
  const { user, loading } = useAuth()
  const [healthData, setHealthData] = useState<HealthData[]>([])
  const [healthGoals, setHealthGoals] = useState<HealthGoal[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      fetchHealthData()
      fetchHealthGoals()
    }
  }, [user])

  const fetchHealthData = async () => {
    try {
      const response = await fetch(`/api/profile/${user?.id}/health-data`)
      if (response.ok) {
        const data = await response.json()
        setHealthData(data.healthData)
      }
    } catch (error) {
      console.error("Failed to fetch health data:", error)
    }
  }

  const fetchHealthGoals = async () => {
    try {
      const response = await fetch(`/api/profile/${user?.id}/health-goals`)
      if (response.ok) {
        const data = await response.json()
        setHealthGoals(data.healthGoals)
      }
    } catch (error) {
      console.error("Failed to fetch health goals:", error)
    } finally {
      setLoadingData(false)
    }
  }

  if (loading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading health data...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const latestData = healthData[0]
  const previousData = healthData[1]

  const getProgressIcon = (current: number, previous: number, isLowerBetter = false) => {
    const isImproving = isLowerBetter ? current < previous : current > previous
    return isImproving ? (
      <TrendingUp className="w-4 h-4 text-green-600" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-600" />
    )
  }

  const getProgressColor = (current: number, previous: number, isLowerBetter = false) => {
    const isImproving = isLowerBetter ? current < previous : current > previous
    return isImproving ? "text-green-600" : "text-red-600"
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title="My Health Data"
        description="Track your progress and view insights from your fitness journey."
        badge="Health Dashboard"
      />

      {/* Health Data Content */}
      <section className="py-16 bg-gradient-to-br from-white via-muted to-accent-light/20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Back Button */}
          <div className="mb-8">
            <Button asChild variant="outline">
              <Link href="/profile" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Profile
              </Link>
            </Button>
          </div>

          {/* Key Metrics */}
          {latestData && (
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-secondary">{latestData.weight_kg}kg</p>
                      <p className="text-sm text-muted-foreground">Weight</p>
                      {previousData?.weight_kg && (
                        <div
                          className={`flex items-center gap-1 text-xs ${getProgressColor(latestData.weight_kg!, previousData.weight_kg, true)}`}
                        >
                          {getProgressIcon(latestData.weight_kg!, previousData.weight_kg, true)}
                          {Math.abs(latestData.weight_kg! - previousData.weight_kg).toFixed(1)}kg
                        </div>
                      )}
                    </div>
                    <Scale className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-secondary">{latestData.bmi}</p>
                      <p className="text-sm text-muted-foreground">BMI</p>
                      {previousData?.bmi && (
                        <div
                          className={`flex items-center gap-1 text-xs ${getProgressColor(latestData.bmi!, previousData.bmi, true)}`}
                        >
                          {getProgressIcon(latestData.bmi!, previousData.bmi, true)}
                          {Math.abs(latestData.bmi! - previousData.bmi).toFixed(1)}
                        </div>
                      )}
                    </div>
                    <BarChart3 className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-secondary">{latestData.body_fat_percentage}%</p>
                      <p className="text-sm text-muted-foreground">Body Fat</p>
                      {previousData?.body_fat_percentage && (
                        <div
                          className={`flex items-center gap-1 text-xs ${getProgressColor(latestData.body_fat_percentage!, previousData.body_fat_percentage, true)}`}
                        >
                          {getProgressIcon(latestData.body_fat_percentage!, previousData.body_fat_percentage, true)}
                          {Math.abs(latestData.body_fat_percentage! - previousData.body_fat_percentage).toFixed(1)}%
                        </div>
                      )}
                    </div>
                    <Activity className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-secondary">{latestData.resting_heart_rate}</p>
                      <p className="text-sm text-muted-foreground">Resting HR</p>
                      {previousData?.resting_heart_rate && (
                        <div
                          className={`flex items-center gap-1 text-xs ${getProgressColor(latestData.resting_heart_rate!, previousData.resting_heart_rate, true)}`}
                        >
                          {getProgressIcon(latestData.resting_heart_rate!, previousData.resting_heart_rate, true)}
                          {Math.abs(latestData.resting_heart_rate! - previousData.resting_heart_rate)} bpm
                        </div>
                      )}
                    </div>
                    <Heart className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Health Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Target className="w-5 h-5" />
                  Health Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                {healthGoals.length > 0 ? (
                  <div className="space-y-4">
                    {healthGoals.map((goal) => {
                      const progress = (goal.current_value / goal.target_value) * 100
                      return (
                        <div key={goal.id} className="p-4 bg-muted rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-secondary">{goal.goal_type}</h4>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                goal.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : goal.status === "achieved"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {goal.status}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{goal.description}</p>
                          <div className="flex justify-between text-sm mb-2">
                            <span>
                              Progress: {goal.current_value} / {goal.target_value}
                            </span>
                            <span>{progress.toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${Math.min(progress, 100)}%` }}
                            ></div>
                          </div>
                          {goal.target_date && (
                            <p className="text-xs text-muted-foreground mt-2">
                              Target: {new Date(goal.target_date).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No health goals set yet</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Measurements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <BarChart3 className="w-5 h-5" />
                  Recent Measurements
                </CardTitle>
              </CardHeader>
              <CardContent>
                {healthData.length > 0 ? (
                  <div className="space-y-4">
                    {healthData.slice(0, 5).map((data) => (
                      <div key={data.id} className="p-4 bg-muted rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-secondary">
                            {new Date(data.measurement_date).toLocaleDateString()}
                          </h4>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          {data.weight_kg && (
                            <div>
                              <span className="text-muted-foreground">Weight:</span>
                              <span className="ml-2 font-medium">{data.weight_kg}kg</span>
                            </div>
                          )}
                          {data.body_fat_percentage && (
                            <div>
                              <span className="text-muted-foreground">Body Fat:</span>
                              <span className="ml-2 font-medium">{data.body_fat_percentage}%</span>
                            </div>
                          )}
                          {data.muscle_mass_kg && (
                            <div>
                              <span className="text-muted-foreground">Muscle:</span>
                              <span className="ml-2 font-medium">{data.muscle_mass_kg}kg</span>
                            </div>
                          )}
                          {data.resting_heart_rate && (
                            <div>
                              <span className="text-muted-foreground">HR:</span>
                              <span className="ml-2 font-medium">{data.resting_heart_rate} bpm</span>
                            </div>
                          )}
                        </div>
                        {data.notes && <p className="text-sm text-muted-foreground mt-2 italic">"{data.notes}"</p>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No health data recorded yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
