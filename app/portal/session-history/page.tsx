"use client"

import { useState } from "react"
import { CleanPortalLayout } from "@/components/clean-portal-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, Star, MessageSquare, Download } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

// Mock data for session history
const sessionHistory = [
  {
    id: 1,
    type: "Personal Training",
    trainer: "Emma Wilson",
    date: "2024-01-15",
    time: "09:00 - 10:00",
    status: "completed",
    rating: 5,
    notes: "Great session focusing on upper body strength. Increased weights on bench press.",
    feedback: "Excellent form and dedication. Keep up the great work!",
  },
  {
    id: 2,
    type: "HIIT Class",
    trainer: "Mike Johnson",
    date: "2024-01-12",
    time: "18:00 - 19:00",
    status: "completed",
    rating: 4,
    notes: "High intensity interval training. Pushed through the challenging circuits.",
    feedback: "Good effort today. Focus on maintaining form during high intensity periods.",
  },
  {
    id: 3,
    type: "Strength Training",
    trainer: "Emma Wilson",
    date: "2024-01-10",
    time: "10:00 - 11:00",
    status: "completed",
    rating: 5,
    notes: "Lower body focus. New personal record on squats!",
    feedback: "Amazing progress! Your squat form has improved significantly.",
  },
  {
    id: 4,
    type: "Nutrition Consultation",
    trainer: "Sarah Davis",
    date: "2024-01-08",
    time: "14:00 - 15:00",
    status: "completed",
    rating: 5,
    notes: "Discussed meal planning and macro tracking strategies.",
    feedback: "Great questions about nutrition. Follow the meal plan we discussed.",
  },
  {
    id: 5,
    type: "Personal Training",
    trainer: "Emma Wilson",
    date: "2024-01-05",
    time: "09:00 - 10:00",
    status: "cancelled",
    rating: null,
    notes: "Session cancelled due to illness.",
    feedback: null,
  },
]

export default function SessionHistoryPage() {
  const { user } = useAuth()
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterType, setFilterType] = useState("all")

  const filteredSessions = sessionHistory.filter((session) => {
    const matchesStatus = filterStatus === "all" || session.status === filterStatus
    const matchesType = filterType === "all" || session.type === filterType
    return matchesStatus && matchesType
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelled</Badge>
      case "no-show":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">No Show</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const renderStars = (rating: number | null) => {
    if (!rating) return <span className="text-gray-400">Not rated</span>

    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} className={`w-4 h-4 ${star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
        ))}
      </div>
    )
  }

  const sessionStats = {
    total: sessionHistory.length,
    completed: sessionHistory.filter((s) => s.status === "completed").length,
    cancelled: sessionHistory.filter((s) => s.status === "cancelled").length,
    avgRating:
      sessionHistory.filter((s) => s.rating).reduce((acc, s) => acc + (s.rating || 0), 0) /
        sessionHistory.filter((s) => s.rating).length || 0,
  }

  return (
    <CleanPortalLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-[#7b329b]">Session History</h1>
            <p className="text-gray-600">Track your fitness journey and progress</p>
          </div>
          <Button variant="outline" className="border-[#7b329b]/20 hover:bg-[#7b329b]/10">
            <Download className="w-4 h-4 mr-2" />
            Export History
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-[#7b329b]/20 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#7b329b]/10 rounded-lg">
                  <Calendar className="w-5 h-5 text-[#7b329b]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{sessionStats.total}</p>
                  <p className="text-sm text-gray-600">Total Sessions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#7b329b]/20 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{sessionStats.completed}</p>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#7b329b]/20 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Star className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{sessionStats.avgRating.toFixed(1)}</p>
                  <p className="text-sm text-gray-600">Avg Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#7b329b]/20 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{sessionStats.cancelled}</p>
                  <p className="text-sm text-gray-600">Cancelled</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-[#7b329b]/20 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-[#7b329b]/5 to-white border-b border-[#7b329b]/20">
            <CardTitle className="text-[#7b329b]">Filter Sessions</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4">
              <div className="flex gap-2">
                <span className="text-sm font-medium text-gray-700">Status:</span>
                <Button
                  variant={filterStatus === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("all")}
                  className={
                    filterStatus === "all"
                      ? "bg-[#7b329b] hover:bg-[#6b2c87]"
                      : "border-[#7b329b]/20 hover:bg-[#7b329b]/10"
                  }
                >
                  All
                </Button>
                <Button
                  variant={filterStatus === "completed" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("completed")}
                  className={
                    filterStatus === "completed"
                      ? "bg-[#7b329b] hover:bg-[#6b2c87]"
                      : "border-[#7b329b]/20 hover:bg-[#7b329b]/10"
                  }
                >
                  Completed
                </Button>
                <Button
                  variant={filterStatus === "cancelled" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("cancelled")}
                  className={
                    filterStatus === "cancelled"
                      ? "bg-[#7b329b] hover:bg-[#6b2c87]"
                      : "border-[#7b329b]/20 hover:bg-[#7b329b]/10"
                  }
                >
                  Cancelled
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Session History List */}
        <div className="space-y-4">
          {filteredSessions.map((session) => (
            <Card key={session.id} className="border-[#7b329b]/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#7b329b]/10 rounded-lg">
                      <Calendar className="w-6 h-6 text-[#7b329b]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{session.type}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {session.trainer}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {session.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {session.time}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {renderStars(session.rating)}
                    {getStatusBadge(session.status)}
                  </div>
                </div>

                {session.notes && (
                  <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Session Notes</h4>
                    <p className="text-sm text-gray-700">{session.notes}</p>
                  </div>
                )}

                {session.feedback && (
                  <div className="p-4 bg-[#7b329b]/5 rounded-lg border border-[#7b329b]/20">
                    <h4 className="text-sm font-medium text-[#7b329b] mb-2 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Trainer Feedback
                    </h4>
                    <p className="text-sm text-gray-700">{session.feedback}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </CleanPortalLayout>
  )
}
