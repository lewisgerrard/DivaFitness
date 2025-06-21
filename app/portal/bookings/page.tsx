"use client"

import { CleanPortalLayout } from "@/components/clean-portal-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarPlus, Clock, MapPin, User, CheckCircle, Calendar } from "lucide-react"

const upcomingBookings = [
  {
    id: 1,
    date: "2024-01-15",
    time: "09:00 AM",
    type: "Personal Training",
    trainer: "Emma Wilson",
    location: "Studio A",
    status: "confirmed",
    duration: "60 min",
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
  },
  {
    id: 3,
    date: "2024-01-20",
    time: "10:00 AM",
    type: "Progress Assessment",
    trainer: "Emma Wilson",
    location: "Studio A",
    status: "pending",
    duration: "30 min",
  },
]

const pastBookings = [
  {
    id: 4,
    date: "2024-01-10",
    time: "09:00 AM",
    type: "Personal Training",
    trainer: "Emma Wilson",
    location: "Studio A",
    status: "completed",
    duration: "60 min",
    notes: "Great progress on squats and deadlifts",
  },
  {
    id: 5,
    date: "2024-01-08",
    time: "02:00 PM",
    type: "Nutrition Consultation",
    trainer: "Emma Wilson",
    location: "Office",
    status: "completed",
    duration: "45 min",
    notes: "Updated meal plan provided",
  },
  {
    id: 6,
    date: "2024-01-05",
    time: "11:00 AM",
    type: "Personal Training",
    trainer: "Emma Wilson",
    location: "Studio A",
    status: "completed",
    duration: "60 min",
    notes: "Focused on upper body strength",
  },
]

export default function BookingsPage() {
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

  return (
    <CleanPortalLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
            <p className="text-gray-600 mt-1">Manage your training sessions and appointments</p>
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
                  <p className="text-sm font-medium text-gray-600">Upcoming</p>
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
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">8</p>
                  <p className="text-xs text-gray-500">Sessions</p>
                </div>
                <CheckCircle className="h-8 w-8 text-pink-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Hours</p>
                  <p className="text-2xl font-bold text-gray-900">24</p>
                  <p className="text-xs text-gray-500">This month</p>
                </div>
                <Clock className="h-8 w-8 text-pink-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                  <p className="text-2xl font-bold text-gray-900">95%</p>
                  <p className="text-xs text-gray-500">Last 3 months</p>
                </div>
                <User className="h-8 w-8 text-pink-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Bookings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Upcoming Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Session Type</TableHead>
                  <TableHead>Trainer</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{new Date(booking.date).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-500">{booking.time}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <CalendarPlus className="h-4 w-4 text-pink-600" />
                        <span>{booking.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span>{booking.trainer}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>{booking.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span>{booking.duration}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          Cancel
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Past Bookings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Session History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Session Type</TableHead>
                  <TableHead>Trainer</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pastBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{new Date(booking.date).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-500">{booking.time}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <CalendarPlus className="h-4 w-4 text-pink-600" />
                        <span>{booking.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span>{booking.trainer}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span>{booking.duration}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                    <TableCell>
                      <p className="text-sm text-gray-600 max-w-xs truncate">{booking.notes}</p>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </CleanPortalLayout>
  )
}
