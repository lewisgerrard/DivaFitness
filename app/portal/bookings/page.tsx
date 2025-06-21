"use client"

import { useState } from "react"
import { CleanPortalLayout } from "@/components/clean-portal-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, User, Plus, X, CheckCircle, AlertCircle } from "lucide-react"
import { toast } from "sonner"

// Mock data for bookings
const upcomingBookings = [
  {
    id: 1,
    class: "HIIT Training",
    instructor: "Emma Johnson",
    date: "2024-01-15",
    time: "09:00",
    duration: "45 min",
    location: "Studio A",
    status: "confirmed",
    spots_left: 2,
  },
  {
    id: 2,
    class: "Strength & Conditioning",
    instructor: "Emma Johnson",
    date: "2024-01-17",
    time: "18:00",
    duration: "60 min",
    location: "Main Gym",
    status: "confirmed",
    spots_left: 1,
  },
  {
    id: 3,
    class: "Personal Training",
    instructor: "Emma Johnson",
    date: "2024-01-20",
    time: "10:00",
    duration: "60 min",
    location: "Studio B",
    status: "pending",
    spots_left: 0,
  },
]

const availableClasses = [
  {
    id: 4,
    class: "Morning Yoga",
    instructor: "Sarah Wilson",
    date: "2024-01-16",
    time: "07:00",
    duration: "60 min",
    location: "Studio A",
    spots_left: 5,
    max_capacity: 8,
  },
  {
    id: 5,
    class: "HIIT Training",
    instructor: "Emma Johnson",
    date: "2024-01-18",
    time: "19:00",
    duration: "45 min",
    location: "Studio A",
    spots_left: 3,
    max_capacity: 6,
  },
]

const bookingHistory = [
  {
    id: 6,
    class: "Strength Training",
    instructor: "Emma Johnson",
    date: "2024-01-10",
    time: "18:00",
    duration: "60 min",
    status: "completed",
    rating: 5,
  },
  {
    id: 7,
    class: "HIIT Training",
    instructor: "Emma Johnson",
    date: "2024-01-08",
    time: "09:00",
    duration: "45 min",
    status: "completed",
    rating: 4,
  },
  {
    id: 8,
    class: "Personal Training",
    instructor: "Emma Johnson",
    date: "2024-01-05",
    time: "10:00",
    duration: "60 min",
    status: "cancelled",
    rating: null,
  },
]

export default function BookingsPage() {
  const [bookings, setBookings] = useState(upcomingBookings)

  const handleCancelBooking = (bookingId: number) => {
    setBookings(bookings.filter((booking) => booking.id !== bookingId))
    toast.success("Booking cancelled successfully")
  }

  const handleBookClass = (classId: number) => {
    toast.success("Class booked successfully!")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Confirmed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelled</Badge>
      case "completed":
        return <Badge className="bg-[#7b329b]/10 text-[#7b329b] hover:bg-[#7b329b]/10">Completed</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <CleanPortalLayout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-[#7b329b]">My Bookings</h1>
          <p className="text-gray-600">Manage your class bookings and schedule</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-[#7b329b]/20 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#7b329b]/10 rounded-lg">
                  <Calendar className="w-5 h-5 text-[#7b329b]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                  <p className="text-sm text-gray-600">Upcoming</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#7b329b]/20 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                  <p className="text-sm text-gray-600">This Month</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#7b329b]/20 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#7b329b]/10 rounded-lg">
                  <Clock className="w-5 h-5 text-[#7b329b]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">18</p>
                  <p className="text-sm text-gray-600">Total Hours</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#7b329b]/20 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">2</p>
                  <p className="text-sm text-gray-600">Available</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="bg-[#7b329b]/5 border-[#7b329b]/20">
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-[#7b329b] data-[state=active]:text-white">
              Upcoming Bookings
            </TabsTrigger>
            <TabsTrigger value="available" className="data-[state=active]:bg-[#7b329b] data-[state=active]:text-white">
              Available Classes
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-[#7b329b] data-[state=active]:text-white">
              Booking History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            <Card className="border-[#7b329b]/20 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-[#7b329b]/5 to-white border-b border-[#7b329b]/20">
                <CardTitle className="text-[#7b329b]">Upcoming Sessions</CardTitle>
                <CardDescription>Your confirmed and pending bookings</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 border border-[#7b329b]/20 rounded-lg bg-gradient-to-r from-white to-[#7b329b]/5"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <h3 className="font-semibold text-gray-900">{booking.class}</h3>
                          {getStatusBadge(booking.status)}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-[#7b329b]" />
                            {booking.instructor}
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#7b329b]" />
                            {booking.date}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-[#7b329b]" />
                            {booking.time} ({booking.duration})
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-[#7b329b]" />
                            {booking.location}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="border-[#7b329b]/20 hover:bg-[#7b329b]/10">
                          Reschedule
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCancelBooking(booking.id)}
                          className="border-red-200 hover:bg-red-50 text-red-600"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="available" className="space-y-4">
            <Card className="border-[#7b329b]/20 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-[#7b329b]/5 to-white border-b border-[#7b329b]/20">
                <CardTitle className="text-[#7b329b]">Available Classes</CardTitle>
                <CardDescription>Book your next session (max 3 bookings per class)</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {availableClasses.map((classItem) => (
                    <div
                      key={classItem.id}
                      className="flex items-center justify-between p-4 border border-[#7b329b]/20 rounded-lg bg-gradient-to-r from-white to-[#7b329b]/5"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <h3 className="font-semibold text-gray-900">{classItem.class}</h3>
                          <Badge variant="outline" className="border-[#7b329b]/20 text-[#7b329b]">
                            {classItem.spots_left} spots left
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-[#7b329b]" />
                            {classItem.instructor}
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#7b329b]" />
                            {classItem.date}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-[#7b329b]" />
                            {classItem.time} ({classItem.duration})
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-[#7b329b]" />
                            {classItem.location}
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleBookClass(classItem.id)}
                        disabled={classItem.spots_left === 0}
                        className="bg-[#7b329b] hover:bg-[#6b2c87]"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Book Class
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card className="border-[#7b329b]/20 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-[#7b329b]/5 to-white border-b border-[#7b329b]/20">
                <CardTitle className="text-[#7b329b]">Booking History</CardTitle>
                <CardDescription>Your past sessions and attendance record</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {bookingHistory.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 border border-[#7b329b]/20 rounded-lg bg-gradient-to-r from-white to-[#7b329b]/5"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <h3 className="font-semibold text-gray-900">{booking.class}</h3>
                          {getStatusBadge(booking.status)}
                          {booking.rating && (
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <span
                                  key={i}
                                  className={`text-sm ${i < booking.rating ? "text-[#7b329b]" : "text-gray-300"}`}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-[#7b329b]" />
                            {booking.instructor}
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#7b329b]" />
                            {booking.date}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-[#7b329b]" />
                            {booking.time} ({booking.duration})
                          </div>
                        </div>
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
