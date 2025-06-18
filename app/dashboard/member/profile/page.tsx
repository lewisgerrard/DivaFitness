"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Phone, MapPin, Calendar, Edit3, Save, X } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { DashboardLayout } from "@/components/dashboard-layout"

interface UserProfile {
  id: string
  email: string
  first_name: string
  last_name: string
  phone?: string
  address?: string
  date_of_birth?: string
  emergency_contact_name?: string
  emergency_contact_phone?: string
  fitness_goals?: string
  medical_conditions?: string
  role: string
  created_at: string
  updated_at: string
}

export default function MemberProfilePage() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [editForm, setEditForm] = useState<Partial<UserProfile>>({})

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
        setProfile(data)
        setEditForm(data)
      }
    } catch (error) {
      console.error("Error fetching profile:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    if (!profile) return

    setIsSaving(true)
    try {
      const response = await fetch(`/api/profile/${profile.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editForm),
      })

      if (response.ok) {
        const updatedProfile = await response.json()
        setProfile(updatedProfile)
        setIsEditing(false)
      }
    } catch (error) {
      console.error("Error updating profile:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setEditForm(profile || {})
    setIsEditing(false)
  }

  if (isLoading) {
    return (
      <DashboardLayout title="My Profile" description="Loading your profile information..." icon={User}>
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </DashboardLayout>
    )
  }

  if (!profile) {
    return (
      <DashboardLayout title="Profile Not Found" description="Unable to load your profile information." icon={User}>
        <div className="text-center py-20">
          <p className="text-gray-600">Profile information could not be loaded.</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout
      title="My Profile"
      description="Manage your personal information and preferences"
      icon={User}
      breadcrumbs={[{ label: "Member" }, { label: "Profile" }]}
    >
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Summary Card */}
        <div className="lg:col-span-1">
          <Card className="border-purple-200 shadow-lg">
            <CardHeader className="text-center bg-gradient-to-br from-purple-50 to-purple-100">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-gray-900">
                {profile.first_name} {profile.last_name}
              </CardTitle>
              <div className="flex justify-center gap-2 mt-2">
                <span className="px-3 py-1 bg-purple-100 text-primary rounded-full text-sm font-medium">
                  {profile.role}
                </span>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-primary" />
                  <span className="text-gray-600">{profile.email}</span>
                </div>
                {profile.phone && (
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-primary" />
                    <span className="text-gray-600">{profile.phone}</span>
                  </div>
                )}
                {profile.address && (
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-gray-600">{profile.address}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-gray-600">
                    Member since {new Date(profile.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2">
          <Card className="border-purple-200 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-gray-900">Profile Information</CardTitle>
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} className="bg-primary hover:bg-primary-dark">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button onClick={handleSave} disabled={isSaving} className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    {isSaving ? "Saving..." : "Save"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isSaving}
                    className="border-purple-200 text-primary hover:bg-purple-50"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4">Personal Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="first_name" className="text-gray-700">
                      First Name
                    </Label>
                    {isEditing ? (
                      <Input
                        id="first_name"
                        value={editForm.first_name || ""}
                        onChange={(e) => setEditForm({ ...editForm, first_name: e.target.value })}
                        className="mt-1 border-purple-200 focus:border-primary focus:ring-primary"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{profile.first_name}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="last_name" className="text-gray-700">
                      Last Name
                    </Label>
                    {isEditing ? (
                      <Input
                        id="last_name"
                        value={editForm.last_name || ""}
                        onChange={(e) => setEditForm({ ...editForm, last_name: e.target.value })}
                        className="mt-1 border-purple-200 focus:border-primary focus:ring-primary"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{profile.last_name}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-gray-700">
                      Email
                    </Label>
                    <p className="mt-1 text-gray-900">{profile.email}</p>
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-gray-700">
                      Phone
                    </Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={editForm.phone || ""}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        className="mt-1 border-purple-200 focus:border-primary focus:ring-primary"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{profile.phone || "Not provided"}</p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address" className="text-gray-700">
                      Address
                    </Label>
                    {isEditing ? (
                      <Input
                        id="address"
                        value={editForm.address || ""}
                        onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                        className="mt-1 border-purple-200 focus:border-primary focus:ring-primary"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{profile.address || "Not provided"}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="date_of_birth" className="text-gray-700">
                      Date of Birth
                    </Label>
                    {isEditing ? (
                      <Input
                        id="date_of_birth"
                        type="date"
                        value={editForm.date_of_birth || ""}
                        onChange={(e) => setEditForm({ ...editForm, date_of_birth: e.target.value })}
                        className="mt-1 border-purple-200 focus:border-primary focus:ring-primary"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">
                        {profile.date_of_birth ? new Date(profile.date_of_birth).toLocaleDateString() : "Not provided"}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <Separator className="bg-purple-200" />

              {/* Emergency Contact */}
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4">Emergency Contact</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="emergency_contact_name" className="text-gray-700">
                      Contact Name
                    </Label>
                    {isEditing ? (
                      <Input
                        id="emergency_contact_name"
                        value={editForm.emergency_contact_name || ""}
                        onChange={(e) => setEditForm({ ...editForm, emergency_contact_name: e.target.value })}
                        className="mt-1 border-purple-200 focus:border-primary focus:ring-primary"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{profile.emergency_contact_name || "Not provided"}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="emergency_contact_phone" className="text-gray-700">
                      Contact Phone
                    </Label>
                    {isEditing ? (
                      <Input
                        id="emergency_contact_phone"
                        value={editForm.emergency_contact_phone || ""}
                        onChange={(e) => setEditForm({ ...editForm, emergency_contact_phone: e.target.value })}
                        className="mt-1 border-purple-200 focus:border-primary focus:ring-primary"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{profile.emergency_contact_phone || "Not provided"}</p>
                    )}
                  </div>
                </div>
              </div>

              <Separator className="bg-purple-200" />

              {/* Fitness Information */}
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4">Fitness Information</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fitness_goals" className="text-gray-700">
                      Fitness Goals
                    </Label>
                    {isEditing ? (
                      <Textarea
                        id="fitness_goals"
                        value={editForm.fitness_goals || ""}
                        onChange={(e) => setEditForm({ ...editForm, fitness_goals: e.target.value })}
                        className="mt-1 border-purple-200 focus:border-primary focus:ring-primary"
                        rows={3}
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{profile.fitness_goals || "Not provided"}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="medical_conditions" className="text-gray-700">
                      Medical Conditions
                    </Label>
                    {isEditing ? (
                      <Textarea
                        id="medical_conditions"
                        value={editForm.medical_conditions || ""}
                        onChange={(e) => setEditForm({ ...editForm, medical_conditions: e.target.value })}
                        className="mt-1 border-purple-200 focus:border-primary focus:ring-primary"
                        rows={3}
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{profile.medical_conditions || "Not provided"}</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
