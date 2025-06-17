"use client"

import { useAuth } from "@/hooks/use-auth"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Mail, Phone, MapPin, Calendar, Activity, BarChart3, Shield } from "lucide-react"
import Link from "next/link"
import HeroSection from "@/components/hero-section"

interface UserProfile {
  id: number
  user_id: number
  first_name?: string
  last_name?: string
  phone?: string
  address?: string
  status: string
  date_of_birth?: string
  emergency_contact_name?: string
  emergency_contact_phone?: string
}

export default function ProfilePage() {
  const { user, loading } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loadingProfile, setLoadingProfile] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      fetchProfile()
    }
  }, [user])

  const fetchProfile = async () => {
    try {
      const response = await fetch(`/api/profile/${user?.id}`)
      if (response.ok) {
        const data = await response.json()
        setProfile(data.profile)
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error)
    } finally {
      setLoadingProfile(false)
    }
  }

  if (loading || loadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title="My Profile"
        description="Manage your personal information and access your health data and appointments."
        badge="Profile"
      />

      {/* Profile Content */}
      <section className="py-16 bg-gradient-to-br from-white via-muted to-accent-light/20">
        <div className="max-w-4xl mx-auto px-4">
          {/* My Details Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <User className="w-5 h-5" />
                My Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <User className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-secondary">
                        {profile?.first_name && profile?.last_name
                          ? `${profile.first_name} ${profile.last_name}`
                          : user.name}
                      </p>
                      <p className="text-sm text-muted-foreground">Full Name</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-secondary">{user.email}</p>
                      <p className="text-sm text-muted-foreground">Email Address</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-secondary">{profile?.phone || "Not provided"}</p>
                      <p className="text-sm text-muted-foreground">Phone Number</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-secondary">{profile?.address || "Not provided"}</p>
                      <p className="text-sm text-muted-foreground">Address</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Shield className="w-5 h-5 text-primary" />
                    <div>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(profile?.status || "active")}`}
                      >
                        <div className="w-2 h-2 bg-current rounded-full mr-1"></div>
                        {profile?.status || "Active"}
                      </span>
                      <p className="text-sm text-muted-foreground mt-1">Account Status</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-secondary">{new Date(user.created_at).toLocaleDateString()}</p>
                      <p className="text-sm text-muted-foreground">Member Since</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-primary">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <BarChart3 className="w-6 h-6 text-primary" />
                  </div>
                  My Data
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  View your health metrics, track progress, and see insights from your fitness journey.
                </p>
                <Button asChild className="w-full bg-primary hover:bg-primary-dark">
                  <Link href="/profile/data" className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    View Health Data
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-primary">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Activity className="w-6 h-6 text-primary" />
                  </div>
                  My Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  View your upcoming training sessions, nutrition consultations, and appointment history.
                </p>
                <Button asChild className="w-full bg-primary hover:bg-primary-dark">
                  <Link href="/profile/appointments" className="flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    View Appointments
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Back Button */}
          <div className="mt-8">
            <Button asChild variant="outline">
              <Link href="/dashboard">← Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
