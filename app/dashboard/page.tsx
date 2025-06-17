"use client"

import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import HeroSection from "@/components/hero-section"
import { User, Users, Shield, UserCheck, Mail } from "lucide-react"

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const canSeeClientSection = user.role === "admin" || user.role === "client"
  const canSeeAdminSection = user.role === "admin"

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5">
      <HeroSection
        title={`Welcome back, ${user.first_name || "User"}!`}
        description={`Access your personalized dashboard and manage your fitness journey with Diva Fitness.`}
        badge={`${user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard`}
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 space-y-16">
          {/* Member Section - Everyone can see this */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-primary/10 rounded-lg">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-heading font-bold text-primary">Member Dashboard</h2>
                <p className="text-muted-foreground">Manage your basic profile and account settings</p>
              </div>
              <Badge variant="secondary" className="ml-auto">
                Member
              </Badge>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Profile Card */}
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-primary/20">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-primary">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    My Profile
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    View and update your personal information, contact details, and account preferences.
                  </p>
                  <Button asChild className="w-full bg-primary hover:bg-primary-dark">
                    <Link href="/profile" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      View Profile
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Contact Support Card */}
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-primary/20">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-primary">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    Contact Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Get in touch with our team for any questions or support you may need.
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    <Link href="/contact" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Contact Us
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Client Section - Clients and Admins can see this */}
          {canSeeClientSection && (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <UserCheck className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h2 className="text-2xl font-heading font-bold text-primary">Client Dashboard</h2>
                  <p className="text-muted-foreground">Advanced features for active clients</p>
                </div>
                <Badge variant="secondary" className="ml-auto bg-accent/10 text-accent">
                  Client
                </Badge>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Training Progress Card */}
                <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-accent/20">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-accent">
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <UserCheck className="w-6 h-6 text-accent" />
                      </div>
                      Training Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Track your fitness journey and see your progress over time.
                    </p>
                    <Button
                      variant="outline"
                      className="w-full border-accent text-accent hover:bg-accent hover:text-white"
                    >
                      Coming Soon
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Admin Section - Only Admins can see this */}
          {canSeeAdminSection && (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-red-100 rounded-lg">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-heading font-bold text-primary">Admin Dashboard</h2>
                  <p className="text-muted-foreground">System administration and user management</p>
                </div>
                <Badge variant="destructive" className="ml-auto">
                  Admin
                </Badge>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* User Management */}
                <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-red-200">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-red-600">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Users className="w-6 h-6 text-red-600" />
                      </div>
                      User Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Manage all users, roles, and permissions in the system.
                    </p>
                    <Button asChild className="w-full bg-red-600 hover:bg-red-700">
                      <Link href="/admin" className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Manage Users
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Email Templates */}
                <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-red-200">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-red-600">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Mail className="w-6 h-6 text-red-600" />
                      </div>
                      Email Templates
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      View and manage email templates used throughout the website.
                    </p>
                    <Button asChild className="w-full bg-red-600 hover:bg-red-700">
                      <Link href="/admin/email-templates" className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        View Templates
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
