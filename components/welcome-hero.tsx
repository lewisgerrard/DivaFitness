"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, TrendingUp, Calendar, Target } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

export function WelcomeHero() {
  const { user } = useAuth()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return "Good morning"
    if (hour < 17) return "Good afternoon"
    return "Good evening"
  }

  const quickStats = [
    { label: "Profile", value: "85%", icon: Target },
    { label: "This Week", value: "3 workouts", icon: TrendingUp },
    { label: "Next Session", value: "Tomorrow", icon: Calendar },
  ]

  return (
    <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 text-white mb-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <CardContent className="p-8 relative">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Welcome Message */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Welcome back
              </Badge>
            </div>

            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                {getGreeting()}, {user?.first_name || user?.name}!
              </h1>
              <p className="text-purple-100 text-lg">Ready to crush your fitness goals today?</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button variant="secondary" className="bg-white text-purple-700 hover:bg-gray-100">
                Start Workout
              </Button>
              <Button variant="ghost" className="text-white border-white/30 hover:bg-white/10">
                View Progress
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 lg:gap-6">
            {quickStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-2">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="font-bold text-lg">{stat.value}</div>
                <div className="text-purple-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
