"use client"

import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import HeroSection from "@/components/hero-section"
import { User, Users, Shield, UserCheck } from "lucide-react"

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

  const canSeeClientSection = user.role === "admin" || user.role === "client"
  const canSeeAdminSection = user.role === "admin"

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5">
      <HeroSection
        title={`Welcome back, ${user.first_name || "User"}!`}
        description={`Access your personalized dashboard and manage your fitness journey with Diva Fitness.`}
        badge={`${user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard`}
      />

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        {/* Member Section - Everyone can see this */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg">
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
        </section>

        {/* Client Section - Clients and Admins can see this */}
        {canSeeClientSection && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-accent/10 rounded-lg">
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
          </section>
        )}

        {/* Admin Section - Only Admins can see this */}
        {canSeeAdminSection && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-red-100 rounded-lg">
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
              <Card className="hover:shadow-lg transition-shadow border-red-200">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    User Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Manage all users, roles, and permissions in the system.
                  </p>
                  <Button asChild className="w-full">
                    <Link href="/admin">Manage Users</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
