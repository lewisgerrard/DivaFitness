"use client"

import { CleanPortalLayout } from "@/components/clean-portal-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, User, Plus, Filter } from "lucide-react"

const upcomingSessions = [
  {
    id: 1,
    title: "Personal Training Session",
    trainer: "Emma Wilson",
    date: "2024-01-15",
    time: "09:00 AM",
    duration: "60 min",
    location: "Studio A",
    type: "Personal Training",
    status: "confirmed",
  },
  {
    id: 2,
    title: "Nutrition Consultation",
    trainer: "Emma Wilson",
    date: "2024-01-17",
    time: "02:00 PM",
    duration: "45 min",
    location: "Consultation Room",
    type: "Nutrition",
    status: "confirmed",
  },
  {
    id: 3,
    title: "Progress Assessment",
    trainer: "Emma Wilson",
    date: "2024-01-20",
    time: "10:30 AM",
    duration: "30 min",
    location: "Studio A",
    type: "Assessment",
    status: "pending",
  },
]

const recentSessions = [
  {
    id: 1,
    title: "Personal Training Session",
    date: "2024-01-10",
    time: "09:00 AM",
    duration: "60 min",
    status: "completed",
    notes: "Great progress on strength training",
  },
  {
    id: 2,
    title: "Cardio Session",
    date: "2024-01-08",
    time: "07:00 AM",
    duration: "45 min",
    status: "completed",
    notes: "Improved endurance",
  },
]

export default function SchedulePage() {
  return (
    <CleanPortalLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Schedule</h1>
            <p className="text-gray-600 mt-1">Manage your training sessions and appointments</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button size="sm" className="bg-pink-600 hover:bg-pink-700">
              <Plus className="h-4 w-4 mr-2" />
              Book Session
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Week</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
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
                  <p className="text-sm font-medium text-gray-600">Total Hours</p>
                  <p className="text-2xl font-bold text-gray-900">2.5</p>
                  <p className="text-xs text-gray-500">This Week</p>
                </div>
                <Clock className="h-8 w-8 text-pink-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Next Session</p>
                  <p className="text-2xl font-bold text-gray-900">Jan 15</p>
                  <p className="text-xs text-gray-500">9:00 AM</p>
                </div>
                <User className="h-8 w-8 text-pink-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">24</p>
                  <p className="text-xs text-gray-500">This Month</p>
                </div>
                <MapPin className="h-8 w-8 text-pink-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Sessions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Upcoming Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-pink-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{session.title}</h3>
                      <p className="text-sm text-gray-600">with {session.trainer}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-500 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {session.date}
                        </span>
                        <span className="text-sm text-gray-500 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {session.time} ({session.duration})
                        </span>
                        <span className="text-sm text-gray-500 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {session.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant={session.status === "confirmed" ? "default" : "secondary"}>{session.status}</Badge>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Sessions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Recent Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Clock className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{session.title}</h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-500">
                          {session.date} at {session.time}
                        </span>
                        <span className="text-sm text-gray-500">({session.duration})</span>
                      </div>
                      {session.notes && <p className="text-sm text-gray-600 mt-1 italic">"{session.notes}"</p>}
                    </div>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    {session.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </CleanPortalLayout>
  )
}
