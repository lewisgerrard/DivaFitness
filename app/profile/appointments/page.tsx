"use client"

import { useAuth } from "@/hooks/use-auth"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, MapPin, ArrowLeft, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import HeroSection from "@/components/hero-section"

interface Appointment {
  id: number
  appointment_date: string
  appointment_time: string
  duration_minutes: number
  service_type: string
  status: string
  notes?: string
  location: string
  trainer_name?: string
}

export default function MyAppointmentsPage() {
  const { user, loading } = useAuth()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      fetchAppointments()
    }
  }, [user])

  const fetchAppointments = async () => {
    try {
      const response = await fetch(`/api/profile/${user?.id}/appointments`)
      if (response.ok) {
        const data = await response.json()
        setAppointments(data.appointments)
      }
    } catch (error) {
      console.error("Failed to fetch appointments:", error)
    } finally {
      setLoadingData(false)
    }
  }

  if (loading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading appointments...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const upcomingAppointments = appointments.filter((apt) => {
    const appointmentDate = new Date(`${apt.appointment_date}T${apt.appointment_time}`)
    return appointmentDate > new Date() && apt.status === "scheduled"
  })

  const pastAppointments = appointments.filter((apt) => {
    const appointmentDate = new Date(`${apt.appointment_date}T${apt.appointment_time}`)
    return appointmentDate <= new Date() || apt.status !== "scheduled"
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "cancelled":
        return <XCircle className="w-4 h-4 text-red-600" />
      case "no_show":
        return <AlertCircle className="w-4 h-4 text-orange-600" />
      default:
        return <Clock className="w-4 h-4 text-blue-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "no_show":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title="My Appointments"
        description="View your upcoming training sessions and appointment history."
        badge="Appointments"
      />

      {/* Appointments Content */}
      <section className="py-16 bg-gradient-to-br from-white via-muted to-accent-light/20">
        <div className="max-w-6xl mx-auto px-4">
          {/* Back Button */}
          <div className="mb-8">
            <Button asChild variant="outline">
              <Link href="/profile" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Profile
              </Link>
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-secondary">{upcomingAppointments.length}</p>
                    <p className="text-sm text-muted-foreground">Upcoming</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-secondary">
                      {appointments.filter((apt) => apt.status === "completed").length}
                    </p>
                    <p className="text-sm text-muted-foreground">Completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-secondary">{appointments.length}</p>
                    <p className="text-sm text-muted-foreground">Total Sessions</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <User className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-secondary">
                      {Math.round(
                        appointments
                          .filter((apt) => apt.status === "completed")
                          .reduce((sum, apt) => sum + apt.duration_minutes, 0) / 60,
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">Hours Trained</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upcoming Appointments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Calendar className="w-5 h-5" />
                  Upcoming Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                {upcomingAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div key={appointment.id} className="p-4 bg-muted rounded-lg border-l-4 border-primary">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-secondary">{appointment.service_type}</h4>
                          <span
                            className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${getStatusColor(appointment.status)}`}
                          >
                            {getStatusIcon(appointment.status)}
                            {appointment.status}
                          </span>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            {new Date(appointment.appointment_date).toLocaleDateString("en-GB", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            {appointment.appointment_time} ({appointment.duration_minutes} minutes)
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <User className="w-4 h-4" />
                            {appointment.trainer_name || "Emma Fisher"}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            {appointment.location}
                          </div>
                        </div>
                        {appointment.notes && (
                          <p className="text-sm text-muted-foreground mt-3 italic">"{appointment.notes}"</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No upcoming appointments</p>
                    <p className="text-sm text-muted-foreground mt-2">Contact Emma to schedule your next session</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Past Appointments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <CheckCircle className="w-5 h-5" />
                  Appointment History
                </CardTitle>
              </CardHeader>
              <CardContent>
                {pastAppointments.length > 0 ? (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {pastAppointments.map((appointment) => (
                      <div key={appointment.id} className="p-4 bg-muted rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-secondary">{appointment.service_type}</h4>
                          <span
                            className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${getStatusColor(appointment.status)}`}
                          >
                            {getStatusIcon(appointment.status)}
                            {appointment.status}
                          </span>
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            {new Date(appointment.appointment_date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            {appointment.appointment_time} ({appointment.duration_minutes} min)
                          </div>
                        </div>
                        {appointment.notes && (
                          <p className="text-sm text-muted-foreground mt-2 italic">"{appointment.notes}"</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No appointment history</p>
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
