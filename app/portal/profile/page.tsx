"use client"

import { useState, useEffect } from "react"
import { CleanPortalLayout } from "@/components/clean-portal-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/hooks/use-auth"
import { User, Edit, Save, X, Heart } from "lucide-react"
import { toast } from "sonner"

export default function ProfilePage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    date_of_birth: "",
    address: "",
    emergency_contact_name: "",
    emergency_contact_phone: "",
    account_type: "",
  })

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone: user.phone || "",
        date_of_birth: user.date_of_birth || "",
        address: user.address || "",
        emergency_contact_name: user.emergency_contact_name || "",
        emergency_contact_phone: user.emergency_contact_phone || "",
        account_type: user.role || "member",
      })
    }
  }, [user])

  const handleSave = async () => {
    try {
      toast.success("Profile updated successfully!")
      setIsEditing(false)
    } catch (error) {
      toast.error("Failed to update profile")
    }
  }

  const handleCancel = () => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone: user.phone || "",
        date_of_birth: user.date_of_birth || "",
        address: user.address || "",
        emergency_contact_name: user.emergency_contact_name || "",
        emergency_contact_phone: user.emergency_contact_phone || "",
        account_type: user.role || "member",
      })
    }
    setIsEditing(false)
  }

  const getAccountTypeBadge = (type: string) => {
    switch (type) {
      case "admin":
        return "Admin"
      case "client":
        return "Client"
      case "member":
        return "Member"
      default:
        return "Member"
    }
  }

  const getAccountTypeColor = (type: string) => {
    switch (type) {
      case "admin":
        return "bg-red-100 text-red-800 border-red-200"
      case "client":
        return "bg-[#7b329b]/10 text-[#7b329b] border-[#7b329b]/30"
      case "member":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-blue-100 text-blue-800 border-blue-200"
    }
  }

  return (
    <CleanPortalLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600">Manage your personal information and preferences</p>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="border-[#7b329b]/20 hover:bg-[#7b329b]/5 text-[#7b329b]"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleSave} className="bg-[#7b329b] hover:bg-[#6b2c87] text-white">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} className="bg-[#7b329b] hover:bg-[#6b2c87] text-white">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        {/* Profile Sections */}
        <div className="space-y-8">
          {/* Personal Information */}
          <Card className="border-[#7b329b]/20 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-[#7b329b]/5 to-[#7b329b]/10 border-b border-[#7b329b]/20">
              <CardTitle className="flex items-center gap-3 text-gray-900">
                <div className="p-2 bg-[#7b329b]/10 rounded-lg">
                  <User className="w-5 h-5 text-[#7b329b]" />
                </div>
                Personal Information
              </CardTitle>
              <CardDescription className="text-gray-600">
                Your basic personal details and account information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="first_name" className="text-gray-700 font-medium">
                    First Name
                  </Label>
                  <Input
                    id="first_name"
                    value={formData.first_name}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                    disabled={!isEditing}
                    className="border-[#7b329b]/20 focus:border-[#7b329b] focus:ring-[#7b329b]/20 disabled:bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name" className="text-gray-700 font-medium">
                    Last Name
                  </Label>
                  <Input
                    id="last_name"
                    value={formData.last_name}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                    disabled={!isEditing}
                    className="border-[#7b329b]/20 focus:border-[#7b329b] focus:ring-[#7b329b]/20 disabled:bg-gray-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    disabled={true}
                    className="bg-gray-50 border-gray-200 text-gray-500"
                  />
                  <p className="text-xs text-gray-500">Email cannot be changed</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-700 font-medium">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={!isEditing}
                    placeholder="Enter your phone number"
                    className="border-[#7b329b]/20 focus:border-[#7b329b] focus:ring-[#7b329b]/20 disabled:bg-gray-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date_of_birth" className="text-gray-700 font-medium">
                    Date of Birth
                  </Label>
                  <Input
                    id="date_of_birth"
                    type="date"
                    value={formData.date_of_birth}
                    onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                    disabled={!isEditing}
                    className="border-[#7b329b]/20 focus:border-[#7b329b] focus:ring-[#7b329b]/20 disabled:bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="account_type" className="text-gray-700 font-medium">
                    Account Type
                  </Label>
                  {isEditing ? (
                    <Select
                      value={formData.account_type}
                      onValueChange={(value) => setFormData({ ...formData, account_type: value })}
                    >
                      <SelectTrigger className="border-[#7b329b]/20 focus:border-[#7b329b] focus:ring-[#7b329b]/20">
                        <SelectValue placeholder="Select account type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="member">Member</SelectItem>
                        <SelectItem value="client">Client</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="relative">
                      <div
                        className={`px-3 py-2 rounded-md border font-medium text-sm ${getAccountTypeColor(
                          formData.account_type,
                        )}`}
                      >
                        {getAccountTypeBadge(formData.account_type)}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-gray-700 font-medium">
                  Address
                </Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  disabled={!isEditing}
                  rows={3}
                  placeholder="Enter your full address"
                  className="border-[#7b329b]/20 focus:border-[#7b329b] focus:ring-[#7b329b]/20 disabled:bg-gray-50 resize-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card className="border-[#7b329b]/20 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-[#7b329b]/5 to-[#7b329b]/10 border-b border-[#7b329b]/20">
              <CardTitle className="flex items-center gap-3 text-gray-900">
                <div className="p-2 bg-[#7b329b]/10 rounded-lg">
                  <Heart className="w-5 h-5 text-[#7b329b]" />
                </div>
                Emergency Contact
              </CardTitle>
              <CardDescription className="text-gray-600">
                Contact information for emergencies and important notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="emergency_contact_name" className="text-gray-700 font-medium">
                    Contact Name
                  </Label>
                  <Input
                    id="emergency_contact_name"
                    value={formData.emergency_contact_name}
                    onChange={(e) => setFormData({ ...formData, emergency_contact_name: e.target.value })}
                    disabled={!isEditing}
                    placeholder="Full name of emergency contact"
                    className="border-[#7b329b]/20 focus:border-[#7b329b] focus:ring-[#7b329b]/20 disabled:bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergency_contact_phone" className="text-gray-700 font-medium">
                    Contact Phone
                  </Label>
                  <Input
                    id="emergency_contact_phone"
                    value={formData.emergency_contact_phone}
                    onChange={(e) => setFormData({ ...formData, emergency_contact_phone: e.target.value })}
                    disabled={!isEditing}
                    placeholder="Phone number"
                    className="border-[#7b329b]/20 focus:border-[#7b329b] focus:ring-[#7b329b]/20 disabled:bg-gray-50"
                  />
                </div>
              </div>

              <div className="bg-[#7b329b]/5 border border-[#7b329b]/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-[#7b329b] mt-0.5 flex-shrink-0" />
                  <div className="space-y-1">
                    <h4 className="font-medium text-gray-900">Important Note</h4>
                    <p className="text-sm text-gray-600">
                      This contact will be notified in case of emergencies during your training sessions. Please ensure
                      the information is current and the person is easily reachable.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </CleanPortalLayout>
  )
}
