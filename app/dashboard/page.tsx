"use client"

import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-accent/10 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-heading text-primary mb-2">
            Welcome, {user.first_name} {user.last_name}!
          </h1>
          <p className="text-muted-foreground">Role: {user.role}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle>My Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">View and update your personal information</p>
              <Button asChild className="w-full">
                <Link href="/profile">View Profile</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Appointments Card */}
          <Card>
            <CardHeader>
              <CardTitle>My Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">View your upcoming and past appointments</p>
              <Button asChild className="w-full">
                <Link href="/profile/appointments">View Appointments</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Health Data Card */}
          <Card>
            <CardHeader>
              <CardTitle>Health Data</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Track your measurements and progress</p>
              <Button asChild className="w-full">
                <Link href="/profile/data">View Data</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Admin Panel Card - Only for admins */}
          {user.role === "admin" && (
            <Card>
              <CardHeader>
                <CardTitle>Admin Panel</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Manage clients and appointments</p>
                <Button asChild className="w-full">
                  <Link href="/admin">Admin Panel</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
