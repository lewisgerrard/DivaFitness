"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { CleanPortalLayout } from "@/components/clean-portal-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"
import { User, Mail, Phone, MapPin, Calendar, Shield, Edit3, Save, X } from "lucide-react"
import { useRouter } from "next/navigation"

interface UserProfile {
  id: number
  first_name?: string
  last_name?: string
  email: string
  phone?: string
  address?: string
  date_of_birth?: string
  role: "admin" | "client" | "member"
  created_at?: string
  emergency_contact_name?: string
  emergency_contact_phone?: string
}

export default function ProfilePage() {
  const { user, token, loading } = useAuth()
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    date_of_birth: "",
    emergency_contact_name: "",
    emergency_contact_phone: "",
  })

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
      return
    }

    if (user && token) {
      fetchProfile()
    }
  }, [user, token, loading, router])

  const fetchProfile = async () => {
    if (!user || !token) return

    try {
      setIsLoading(true)
      console.log("🔍 Fetching profile for user:", user.id)

      const response = await fetch(`/api/profile/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      console.log("📥 Profile response status:", response.status)

      if (response.ok) {
        const data = await response.json()
        console.log("✅ Profile data received:", data)

        const profileData = data.user || data.profile || data
        setProfile(profileData)
        setFormData({
          first_name: profileData.first_name || "",
          last_name: profileData.last_name || "",
          phone: profileData.phone || "",
          address: profileData.address || "",
          date_of_birth: profileData.date_of_birth || "",
          emergency_contact_name: profileData.emergency_contact_name || "",
          emergency_contact_phone: profileData.emergency_contact_phone || "",
        })
      } else {
        const errorData = await response.json().catch(() => ({}))
        console.error("❌ Failed to fetch profile:", errorData)
        toast.error("Failed to load profile")

        if (response.status === 401) {
          router.push("/login")
        }
      }
    } catch (error) {
      console.error("❌ Profile fetch error:", error)
      toast.error("Failed to load profile")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    if (!user || !token) return

    try {
      setSaving(true)
      console.log("💾 Saving profile data:", formData)

      const response = await fetch(`/api/profile/${user.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const data = await response.json()
        setProfile(data.user)
        setIsEditing(false)
        toast.success("Profile updated successfully")
      } else {
        const errorData = await response.json().catch(() => ({}))
        console.error("❌ Failed to update profile:", errorData)
        toast.error("Failed to update profile")
      }
    } catch (error) {
      console.error("❌ Profile update error:", error)
      toast.error("Failed to update profile")
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCancel = () => {
    setFormData({
      first_name: profile?.first_name || "",
      last_name: profile?.last_name || "",
      phone: profile?.phone || "",
      address: profile?.address || "",
      date_of_birth: profile?.date_of_birth || "",
      emergency_contact_name: profile?.emergency_contact_name || "",
      emergency_contact_phone: profile?.emergency_contact_phone || "",
    })
    setIsEditing(false)
  }

  if (loading || isLoading) {
    return (
      <CleanPortalLayout>
        <div className="space-y-6">
          <div className="h-8 bg-gray-200 rounded animate-pulse" />
          <div className="h-64 bg-gray-200 rounded animate-pulse" />
          <div className="h-48 bg-gray-200 rounded animate-pulse" />
        </div>
      </CleanPortalLayout>
    )
  }

  if (!user) {
    return null
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800"
      case "client":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-green-100 text-green-800"
    }
  }

  const getInitials = (firstName?: string, lastName?: string) => {
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase() || user.email[0].toUpperCase()
  }

  return (
    <CleanPortalLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600">Manage your personal information and preferences</p>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={isSaving}>
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        {/* Profile Overview Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${profile?.first_name} ${profile?.last_name}`}
                />
                <AvatarFallback className="text-lg">
                  {getInitials(profile?.first_name, profile?.last_name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-semibold">
                    {profile?.first_name && profile?.last_name
                      ? `${profile.first_name} ${profile.last_name}`
                      : "Complete your profile"}
                  </h2>
                  <Badge className={getRoleBadgeColor(profile?.role || "member")}>
                    <Shield className="w-3 h-3 mr-1" />
                    {profile?.role || "member"}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{profile?.email}</span>
                </div>
                {profile?.created_at && (
                  <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                    <Calendar className="w-4 h-4" />
                    <span>Member since {new Date(profile.created_at).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </CardTitle>
            <CardDescription>Your basic personal details and contact information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="first_name">First Name</Label>
                {isEditing ? (
                  <Input
                    id="first_name"
                    value={formData.first_name}
                    onChange={(e) => handleInputChange("first_name", e.target.value)}
                    placeholder="Enter your first name"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{profile?.first_name || "Not provided"}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="last_name">Last Name</Label>
                {isEditing ? (
                  <Input
                    id="last_name"
                    value={formData.last_name}
                    onChange={(e) => handleInputChange("last_name", e.target.value)}
                    placeholder="Enter your last name"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{profile?.last_name || "Not provided"}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <p className="text-gray-600 py-2">{profile?.email}</p>
                  <Badge variant="outline" className="text-xs">
                    Read-only
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Enter your phone number"
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900 py-2">{profile?.phone || "Not provided"}</p>
                  </div>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Address</Label>
                {isEditing ? (
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="Enter your address"
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900 py-2">{profile?.address || "Not provided"}</p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="date_of_birth">Date of Birth</Label>
                {isEditing ? (
                  <Input
                    id="date_of_birth"
                    type="date"
                    value={formData.date_of_birth}
                    onChange={(e) => handleInputChange("date_of_birth", e.target.value)}
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900 py-2">
                      {profile?.date_of_birth ? new Date(profile.date_of_birth).toLocaleDateString() : "Not provided"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Emergency Contact
            </CardTitle>
            <CardDescription>Contact information for emergencies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="emergency_contact_name">Emergency Contact Name</Label>
                {isEditing ? (
                  <Input
                    id="emergency_contact_name"
                    value={formData.emergency_contact_name}
                    onChange={(e) => handleInputChange("emergency_contact_name", e.target.value)}
                    placeholder="Enter emergency contact name"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{profile?.emergency_contact_name || "Not provided"}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergency_contact_phone">Emergency Contact Phone</Label>
                {isEditing ? (
                  <Input
                    id="emergency_contact_phone"
                    type="tel"
                    value={formData.emergency_contact_phone}
                    onChange={(e) => handleInputChange("emergency_contact_phone", e.target.value)}
                    placeholder="Enter emergency contact phone"
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900 py-2">{profile?.emergency_contact_phone || "Not provided"}</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </CleanPortalLayout>
  )
}
