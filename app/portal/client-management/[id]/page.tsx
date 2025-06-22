"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { CleanPortalLayout } from "@/components/clean-portal-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, Activity, Weight, Target, TrendingUp } from "lucide-react"
import { toast } from "sonner"
import { useAuth } from "@/hooks/use-auth"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2 } from "lucide-react"

interface UserType {
  id: number
  first_name: string
  last_name: string
  email: string
  phone?: string
  role: string
  status: string
  created_at: string
  address?: string
  date_of_birth?: string
}

interface BodyComposition {
  weight: number
  height: number
  body_fat_percentage?: number
  muscle_mass?: number
  bmi?: number
  recorded_date: string
}

export default function ClientProfilePage() {
  const params = useParams()
  const router = useRouter()
  const { user: currentUser } = useAuth()
  const [client, setClient] = useState<UserType | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("information")

  // Mock body composition data - replace with real API call
  const [bodyComposition] = useState<BodyComposition[]>([
    {
      weight: 70,
      height: 175,
      body_fat_percentage: 15,
      muscle_mass: 55,
      bmi: 22.9,
      recorded_date: "2024-01-15",
    },
    {
      weight: 68,
      height: 175,
      body_fat_percentage: 14,
      muscle_mass: 56,
      bmi: 22.2,
      recorded_date: "2024-02-15",
    },
  ])

  // Fetch client data
  const fetchClient = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem("auth-token")

      if (!token) {
        toast.error("Authentication required")
        return
      }

      const response = await fetch(`/api/admin/users/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        if (data.user && data.user.role === "client") {
          setClient(data.user)
        } else {
          toast.error("Client not found")
          router.push("/portal/client-management")
        }
      } else {
        toast.error("Failed to fetch client data")
        router.push("/portal/client-management")
      }
    } catch (error) {
      console.error("Error fetching client:", error)
      toast.error("Error loading client data")
      router.push("/portal/client-management")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (currentUser?.role === "admin" && params.id) {
      fetchClient()
    }
  }, [currentUser, params.id])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactive</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  if (currentUser?.role !== "admin") {
    return (
      <CleanPortalLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
            <p className="text-gray-600">You don't have permission to access this page.</p>
          </div>
        </div>
      </CleanPortalLayout>
    )
  }

  if (loading) {
    return (
      <CleanPortalLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7b329b]"></div>
        </div>
      </CleanPortalLayout>
    )
  }

  if (!client) {
    return (
      <CleanPortalLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Client Not Found</h2>
            <p className="text-gray-600">The requested client could not be found.</p>
            <Button
              onClick={() => router.push("/portal/client-management")}
              className="mt-4 bg-[#7b329b] hover:bg-[#6b2c87]"
            >
              Back to Client Management
            </Button>
          </div>
        </div>
      </CleanPortalLayout>
    )
  }

  const latestBodyComp = bodyComposition[bodyComposition.length - 1]

  return (
    <CleanPortalLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/portal/client-management")}
            className="border-[#7b329b]/20 hover:bg-[#7b329b]/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Clients
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#7b329b]/10 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-[#7b329b]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#7b329b]">
                  {client.first_name} {client.last_name}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  {getStatusBadge(client.status)}
                  <span className="text-sm text-gray-500">
                    Client since {new Date(client.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-[#7b329b]/10">
            <TabsTrigger
              value="information"
              className="data-[state=active]:bg-[#7b329b] data-[state=active]:text-white"
            >
              Information
            </TabsTrigger>
            <TabsTrigger
              value="body-composition"
              className="data-[state=active]:bg-[#7b329b] data-[state=active]:text-white"
            >
              Body Composition
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-[#7b329b] data-[state=active]:text-white">
              Dashboard
            </TabsTrigger>
          </TabsList>

          {/* Information Tab */}
          <TabsContent value="information" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Personal Information */}
              <Card className="border-[#7b329b]/20 shadow-sm">
                <CardHeader className="bg-gradient-to-r from-[#7b329b]/5 to-white border-b border-[#7b329b]/20">
                  <CardTitle className="text-[#7b329b] flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">First Name</Label>
                      <Input value={client.first_name} readOnly className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Last Name</Label>
                      <Input value={client.last_name} readOnly className="mt-1" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Email Address</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <Input value={client.email} readOnly />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Phone Number</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <Input value={client.phone || "Not provided"} readOnly />
                    </div>
                  </div>
                  {client.date_of_birth && (
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Age</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <Input value={`${calculateAge(client.date_of_birth)} years old`} readOnly />
                      </div>
                    </div>
                  )}
                  {client.address && (
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Address</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <Input value={client.address} readOnly />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Account Information */}
              <Card className="border-[#7b329b]/20 shadow-sm">
                <CardHeader className="bg-gradient-to-r from-[#7b329b]/5 to-white border-b border-[#7b329b]/20">
                  <CardTitle className="text-[#7b329b] flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Account Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Account Status</Label>
                    <div className="mt-2">{getStatusBadge(client.status)}</div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Role</Label>
                    <Input value="Client" readOnly className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Member Since</Label>
                    <Input value={new Date(client.created_at).toLocaleDateString()} readOnly className="mt-1" />
                  </div>
                  <Separator />
                  <div className="flex gap-2">
                    <Button className="bg-[#7b329b] hover:bg-[#6b2c87]">
                      <Mail className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                    <Button variant="outline" className="border-[#7b329b]/20 hover:bg-[#7b329b]/10">
                      Edit Information
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Body Composition Tab */}
          <TabsContent value="body-composition" className="space-y-6">
            <Card className="border-[#7b329b]/20 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-[#7b329b]/5 to-white border-b border-[#7b329b]/20">
                <CardTitle className="text-[#7b329b] flex items-center gap-2">
                  <Weight className="w-5 h-5" />
                  Body Composition Records
                </CardTitle>
                <CardDescription>Track and manage body composition measurements over time</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-gray-600">{bodyComposition.length} records total</p>
                  <Button className="bg-[#7b329b] hover:bg-[#6b2c87]">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Record
                  </Button>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead>Date</TableHead>
                        <TableHead>Weight (kg)</TableHead>
                        <TableHead>Height (cm)</TableHead>
                        <TableHead>BMI</TableHead>
                        <TableHead>Body Fat (%)</TableHead>
                        <TableHead>Muscle Mass (kg)</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bodyComposition.map((record, index) => (
                        <TableRow key={index} className="hover:bg-gray-50">
                          <TableCell className="font-medium">
                            {new Date(record.recorded_date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{record.weight}</TableCell>
                          <TableCell>{record.height}</TableCell>
                          <TableCell>{record.bmi}</TableCell>
                          <TableCell>{record.body_fat_percentage}%</TableCell>
                          <TableCell>{record.muscle_mass}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-[#7b329b]/10">
                                <Edit className="w-4 h-4 text-[#7b329b]" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-red-50">
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {bodyComposition.length === 0 && (
                  <div className="text-center py-8">
                    <Weight className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No records yet</h3>
                    <p className="text-gray-600 mb-4">Start tracking body composition by adding the first record.</p>
                    <Button className="bg-[#7b329b] hover:bg-[#6b2c87]">
                      <Plus className="w-4 h-4 mr-2" />
                      Add First Record
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Quick Stats */}
              <Card className="border-[#7b329b]/20 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#7b329b]/10 rounded-lg">
                      <Calendar className="w-5 h-5 text-[#7b329b]" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">12</p>
                      <p className="text-sm text-gray-600">Sessions This Month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#7b329b]/20 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Target className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">85%</p>
                      <p className="text-sm text-gray-600">Goal Progress</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#7b329b]/20 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">-2kg</p>
                      <p className="text-sm text-gray-600">Weight Change</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="border-[#7b329b]/20 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-[#7b329b]/5 to-white border-b border-[#7b329b]/20">
                <CardTitle className="text-[#7b329b]">Recent Activity</CardTitle>
                <CardDescription>Latest sessions and progress updates</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-[#7b329b] rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Strength Training Session</p>
                      <p className="text-sm text-gray-600">Completed 45 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Body Composition Updated</p>
                      <p className="text-sm text-gray-600">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Cardio Session</p>
                      <p className="text-sm text-gray-600">3 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </CleanPortalLayout>
  )
}
