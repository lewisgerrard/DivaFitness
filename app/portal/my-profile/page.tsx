"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { User, Mail, Phone, MapPin, Calendar, Shield, Edit2, Save, X } from "lucide-react"

interface UserProfile {
  id: number
  email: string
  first_name?: string
  last_name?: string
  phone?: string
  address?: string
  date_of_birth?: string
  emergency_contact_name?: string
  emergency_contact_phone?: string
  status: string
  role: string
  created_at: string
}

export default function MyProfilePage() {
  const { user, token } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
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
    if (user?.id && token) {
      fetchProfile()
    }
  }, [user, token])

  const fetchProfile = async () => {
    try {
      const response = await fetch(`/api/profile/${user?.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const data = await response.json()
        const profileData = { ...data.user, ...data.profile }
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
        toast.error("Failed to load profile")
      }
    } catch (error) {
      console.error("Profile fetch error:", error)
      toast.error("Failed to load profile")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    if (!user?.id || !token) return

    setIsSaving(true)
    try {
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
        setProfile({ ...profile, ...data.user })
        setIsEditing(false)
        toast.success("Profile updated successfully")
      } else {
        toast.error("Failed to update profile")
      }
    } catch (error) {
      console.error("Profile update error:", error)
      toast.error("Failed to update profile")
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        phone: profile.phone || "",
        address: profile.address || "",
        date_of_birth: profile.date_of_birth || "",
        emergency_contact_name: profile.emergency_contact_name || "",
        emergency_contact_phone: profile.emergency_contact_phone || "",
      })
    }
    setIsEditing(false)
  }

  const getInitials = (firstName?: string, lastName?: string) => {
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase() || "U"
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not provided"
    return new Date(dateString).toLocaleDateString()
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">Profile not found</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-muted-foreground">Manage your personal information and preferences</p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="gap-2">
            <Edit2 className="h-4 w-4" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={isSaving} className="gap-2">
              <Save className="h-4 w-4" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
            <Button variant="outline" onClick={handleCancel} className="gap-2">
              <X className="h-4 w-4" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Overview */}
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <Avatar className="h-24 w-24 mx-auto">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback className="text-lg">{getInitials(profile.first_name, profile.last_name)}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-xl">
              {profile.first_name && profile.last_name
                ? `${profile.first_name} ${profile.last_name}`
                : "Complete your profile"}
            </CardTitle>
            <CardDescription>{profile.email}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <Badge variant={profile.status === "active" ? "default" : "secondary"}>{profile.status}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Role</span>
              <Badge variant="outline" className="gap-1">
                <Shield className="h-3 w-3" />
                {profile.role}
              </Badge>
            </div>
            <Separator />
            <div className="text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Member since {formatDate(profile.created_at)}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
            <CardDescription>Your personal details and contact information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="first_name">First Name</Label>
                {isEditing ? (
                  <Input
                    id="first_name"
                    value={formData.first_name}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                    placeholder="Enter your first name"
                  />
                ) : (
                  <p className="text-sm py-2 px-3 bg-muted rounded-md">{profile.first_name || "Not provided"}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Last Name</Label>
                {isEditing ? (
                  <Input
                    id="last_name"
                    value={formData.last_name}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                    placeholder="Enter your last name"
                  />
                ) : (
                  <p className="text-sm py-2 px-3 bg-muted rounded-md">{profile.last_name || "Not provided"}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Address
              </Label>
              <p className="text-sm py-2 px-3 bg-muted rounded-md">{profile.email}</p>
              <p className="text-xs text-muted-foreground">Email cannot be changed. Contact support if needed.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone Number
              </Label>
              {isEditing ? (
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter your phone number"
                />
              ) : (
                <p className="text-sm py-2 px-3 bg-muted rounded-md">{profile.phone || "Not provided"}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Address
              </Label>
              {isEditing ? (
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Enter your address"
                  rows={3}
                />
              ) : (
                <p className="text-sm py-2 px-3 bg-muted rounded-md min-h-[80px]">
                  {profile.address || "Not provided"}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="date_of_birth">Date of Birth</Label>
              {isEditing ? (
                <Input
                  id="date_of_birth"
                  type="date"
                  value={formData.date_of_birth}
                  onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                />
              ) : (
                <p className="text-sm py-2 px-3 bg-muted rounded-md">{formatDate(profile.date_of_birth)}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Emergency Contact</CardTitle>
            <CardDescription>Contact information for emergencies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="emergency_contact_name">Emergency Contact Name</Label>
                {isEditing ? (
                  <Input
                    id="emergency_contact_name"
                    value={formData.emergency_contact_name}
                    onChange={(e) => setFormData({ ...formData, emergency_contact_name: e.target.value })}
                    placeholder="Enter emergency contact name"
                  />
                ) : (
                  <p className="text-sm py-2 px-3 bg-muted rounded-md">
                    {profile.emergency_contact_name || "Not provided"}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergency_contact_phone">Emergency Contact Phone</Label>
                {isEditing ? (
                  <Input
                    id="emergency_contact_phone"
                    type="tel"
                    value={formData.emergency_contact_phone}
                    onChange={(e) => setFormData({ ...formData, emergency_contact_phone: e.target.value })}
                    placeholder="Enter emergency contact phone"
                  />
                ) : (
                  <p className="text-sm py-2 px-3 bg-muted rounded-md">
                    {profile.emergency_contact_phone || "Not provided"}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
