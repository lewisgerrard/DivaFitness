"use client"

import { CleanPortalLayout } from "@/components/clean-portal-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"
import { CalendarPlus, Clock, MapPin, User, CheckCircle } from "lucide-react"
import { useState } from "react"

const sessionTypes = [
  {
    id: 1,
    name: "Personal Training",
    duration: "60 min",
    price: "$80",
    description: "One-on-one training session with Emma",
  },
  {
    id: 2,
    name: "Nutrition Consultation",
    duration: "45 min",
    price: "$60",
    description: "Personalized nutrition planning and advice",
  },
  {
    id: 3,
    name: "Progress Assessment",
    duration: "30 min",
    price: "$40",
    description: "Body composition and fitness level evaluation",
  },
  {
    id: 4,
    name: "Virtual Training",
    duration: "45 min",
    price: "$50",
    description: "Online training session via video call",
  },
]

const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"]

export default function BookPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedType, setSelectedType] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [notes, setNotes] = useState("")

  return (
    <CleanPortalLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Book a Session</h1>
            <p className="text-gray-600 mt-1">Schedule your next training session with Emma</p>
          </div>
        </div>

        {/* Booking Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">8</p>
                  <p className="text-xs text-gray-500">Sessions booked</p>
                </div>
                <CalendarPlus className="h-8 w-8 text-pink-600" />
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
                <Clock className="h-8 w-8 text-pink-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Available Slots</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                  <p className="text-xs text-gray-500">This week</p>
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
                  <p className="text-xs text-gray-500">Total sessions</p>
                </div>
                <CheckCircle className="h-8 w-8 text-pink-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Form */}
          <div className="space-y-6">
            {/* Session Type Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">Select Session Type</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {sessionTypes.map((type) => (
                  <div
                    key={type.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedType === type.name
                        ? "border-pink-600 bg-pink-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedType(type.name)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">{type.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-sm text-gray-500 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {type.duration}
                          </span>
                          <span className="text-sm text-gray-500 flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            Studio A
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{type.price}</p>
                        {selectedType === type.name && (
                          <Badge className="bg-pink-600 hover:bg-pink-700 mt-1">Selected</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Additional Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">Additional Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Any specific goals, concerns, or requests for this session?"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[100px]"
                />
              </CardContent>
            </Card>
          </div>

          {/* Calendar and Time Selection */}
          <div className="space-y-6">
            {/* Calendar */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">Select Date</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                  disabled={(date) => date < new Date()}
                />
              </CardContent>
            </Card>

            {/* Time Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">Available Times</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      className={`${selectedTime === time ? "bg-pink-600 hover:bg-pink-700" : "hover:bg-gray-50"}`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Booking Summary */}
            {selectedType && selectedDate && selectedTime && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900">Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Session Type:</span>
                    <span className="font-medium">{selectedType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{selectedDate.toDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Trainer:</span>
                    <span className="font-medium">Emma Wilson</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium">Studio A</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between">
                    <span className="font-semibold">Total:</span>
                    <span className="font-semibold">{sessionTypes.find((t) => t.name === selectedType)?.price}</span>
                  </div>
                  <Button className="w-full bg-pink-600 hover:bg-pink-700 mt-4">Confirm Booking</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { date: "Jan 10, 2024", time: "9:00 AM", type: "Personal Training", status: "completed" },
                { date: "Jan 8, 2024", time: "2:00 PM", type: "Nutrition Consultation", status: "completed" },
                { date: "Jan 15, 2024", time: "9:00 AM", type: "Personal Training", status: "upcoming" },
              ].map((booking, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                      <CalendarPlus className="h-6 w-6 text-pink-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{booking.type}</h3>
                      <p className="text-sm text-gray-600">
                        {booking.date} at {booking.time}
                      </p>
                    </div>
                  </div>
                  <Badge variant={booking.status === "completed" ? "outline" : "default"}>{booking.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </CleanPortalLayout>
  )
}
