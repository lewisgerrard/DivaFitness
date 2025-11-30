"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Calendar, Settings, LogOut, Heart, Trophy, Target } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  // Sample user data
  const user = {
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+44 7123 456789",
    address: "Wickford, Essex",
    memberSince: "January 2023",
    role: "Client",
    status: "Active",
    avatar: "/placeholder-user.jpg",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-muted-foreground">Manage your account and fitness journey</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-pink-500 to-purple-500 text-white">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
                <div className="flex justify-center gap-2 mt-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {user.status}
                  </Badge>
                  <Badge variant="outline">{user.role}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Member since {user.memberSince}</span>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                    <Link href="/settings">
                      <Settings className="w-4 h-4 mr-2" />
                      Account Settings
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>Your account details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                    <p className="text-sm">{user.name}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p className="text-sm">{user.email}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Phone</label>
                    <p className="text-sm">{user.phone}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Location</label>
                    <p className="text-sm">{user.address}</p>
                  </div>
                </div>
                <div className="pt-4">
                  <Button variant="outline">Edit Information</Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Navigate to different sections of the site</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Button asChild variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                    <Link href="/training">
                      <Trophy className="w-6 h-6" />
                      <span>Training</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                    <Link href="/nutrition">
                      <Heart className="w-6 h-6" />
                      <span>Nutrition</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                    <Link href="/contact">
                      <Target className="w-6 h-6" />
                      <span>Book Session</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Account Status */}
            <Card>
              <CardHeader>
                <CardTitle>Account Status</CardTitle>
                <CardDescription>Your current membership and activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Membership Status</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Account Type</span>
                    <Badge variant="outline">Personal Training Client</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Next Session</span>
                    <span className="text-sm text-muted-foreground">Contact Emma to book</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
