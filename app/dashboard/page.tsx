"use client"

import { useAuth } from "@/hooks/use-auth"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import HeroSection from "@/components/hero-section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Users } from "lucide-react"
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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title={`Welcome back,`}
        subtitle={user.name}
        description="Access your account dashboard and manage your Diva Fitness experience."
        badge="Dashboard"
      />

      {/* Dashboard Content */}
      <section className="py-16 bg-gradient-to-br from-white via-muted to-accent-light/20">
        <div className="max-w-4xl mx-auto px-4">
          {/* Members Section */}
          <div className="mb-12">
            <h2 className="font-heading text-2xl font-bold text-secondary mb-6">Members</h2>
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-primary">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  My Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  View and manage your personal account information, preferences, and settings.
                </p>
                <Button asChild className="bg-primary hover:bg-primary-dark">
                  <Link href="/profile" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    View Profile
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Admin Section - Only show for admin users */}
          {user.role === "admin" && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-secondary mb-6">Admin</h2>
              <Card className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-primary">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    Clients
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Manage client information, view contact submissions, and track client progress.
                  </p>
                  <Button asChild className="bg-primary hover:bg-primary-dark">
                    <Link href="/admin/clients" className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Manage Clients
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
