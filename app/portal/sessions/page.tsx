"use client"

import { CleanPortalLayout } from "@/components/clean-portal-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarPlus, Clock, MapPin, User, CheckCircle, Calendar, FileText, Star } from "lucide-react"

const upcomingSessions = [
  {
    id: 1,
    date: "2024-01-15",
    time: "09:00 AM",
    type: "Personal Training",
    trainer: "Emma Wilson",
    location: "Studio A",
    status: "confirmed",
    duration: "60 min",
    focus: "Upper Body Strength",
    notes: "Focus on proper form for bench press and rows",
  },
  {
    id: 2,
    date: "2024-01-17",
    time: "02:00 PM",
    type: "Nutrition Consultation",
    trainer: "Emma Wilson",
    location: "Office",
    status: "confirmed",
    duration: "45 min",
    focus: "Meal Planning",
    notes: "Review current diet and adjust macros",
  },
]

const pastSessions = [
  {
    id: 3,
    date: "2024-01-10",
    time: "09:00 AM",
    type: "Personal Training",
    trainer: "Emma Wilson",
    location: "Studio A",
    status: "completed",
    duration: "60 min",
    focus: "Lower Body Strength",
    notes: "Great progress on squats - increased weight by 5kg",
    rating: 5,
    feedback: "Excellent session, felt challenged but supported throughout",
  },
  {
    id: 4,
    date: "2024-01-08",
    time: "02:00 PM",
    type: "Body Composition Analysis",
    trainer: "Emma Wilson",
    location: "Assessment Room",
    status: "completed",
    duration: "30 min",
    focus: "Progress Tracking",
    notes: "Body fat decreased by 2%, muscle mass increased by 1%",
    rating: 5,
    feedback: "Very thorough analysis and helpful recommendations",
  },
  {
    id: 5,
    date: "2024-01-05",
    time: "11:00 AM",
    type: "Personal Training",
    trainer: "Emma Wilson",
    location: "Studio A",
    status: "completed",
    duration: "60 min",
    focus: "Full Body Circuit",
    notes: "Introduced new exercises for core stability",
    rating: 4,
    feedback: "Challenging workout, loved the variety of exercises",
  },
]

export default function SessionsPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  return (
    <CleanPortalLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Session History</h1>
            <p className="text-gray-600 mt-1">View your past and upcoming training sessions</p>
          </div>
          <Button className="bg-pink-600 hover:bg-pink-700">
            <CalendarPlus className="h-4 w-4 mr-2" />
            Book New Session
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                  <p className="text-2xl font-bold text-gray-900">47</p>
                  <p className="text-xs text-gray-500">All time</p>
                </div>
                <CheckCircle className="h-8 w-8 text-pink-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">8</p>
                  <p className="text-xs text-gray-500">Sessions</p>
                </div>
                <Calendar className="h-8 w-8 text-pink-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Rating</p>
                  <p className="text-2xl font-bold text-gray-900">4.8</p>
                  <div className="flex mt-1">{renderStars(5)}</div>
                </div>
                <Star className="h-8 w-8 text-pink-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Hours</p>
                  <p className="text-2xl font-bold text-gray-900">42</p>
                  <p className="text-xs text-gray-500">Training time</p>
                </div>
                <Clock className="h-8 w-8 text-pink-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sessions Tabs */}
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
            <TabsTrigger value="past">Past Sessions</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">Upcoming Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div key={session.id} className="p-6 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                            <CalendarPlus className="h-6 w-6 text-pink-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{session.type}</h3>
                            <p className="text-sm text-gray-600">{session.focus}</p>
                          </div>
                        </div>
                        {getStatusBadge(session.status)}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium">{new Date(session.date).toLocaleDateString()}</p>
                            <p className="text-xs text-gray-500">{session.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium">{session.trainer}</p>
                            <p className="text-xs text-gray-500">Trainer</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium">{session.location}</p>
                            <p className="text-xs text-gray-500">Location</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium">{session.duration}</p>
                            <p className="text-xs text-gray-500">Duration</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-lg mb-4">
                        <div className="flex items-start space-x-2">
                          <FileText className="h-4 w-4 text-gray-400 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Session Notes</p>
                            <p className="text-sm text-gray-600">{session.notes}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          Cancel
                        </Button>
                        <Button variant="outline" size="sm">
                          Contact Trainer
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="past" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">Past Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pastSessions.map((session) => (
                    <div key={session.id} className="p-6 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <CheckCircle className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{session.type}</h3>
                            <p className="text-sm text-gray-600">{session.focus}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex">{renderStars(session.rating || 0)}</div>
                          {getStatusBadge(session.status)}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium">{new Date(session.date).toLocaleDateString()}</p>
                            <p className="text-xs text-gray-500">{session.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium">{session.trainer}</p>
                            <p className="text-xs text-gray-500">Trainer</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium">{session.location}</p>
                            <p className="text-xs text-gray-500">Location</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium">{session.duration}</p>
                            <p className="text-xs text-gray-500">Duration</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-start space-x-2">
                            <FileText className="h-4 w-4 text-gray-400 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">Trainer Notes</p>
                              <p className="text-sm text-gray-600">{session.notes}</p>
                            </div>
                          </div>
                        </div>

                        {session.feedback && (
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <div className="flex items-start space-x-2">
                              <Star className="h-4 w-4 text-blue-400 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">Your Feedback</p>
                                <p className="text-sm text-gray-600">{session.feedback}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
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
