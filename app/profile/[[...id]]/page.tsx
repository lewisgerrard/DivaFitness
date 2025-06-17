"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, Trash2, Mail, Phone, MapPin, Calendar, Shield } from "lucide-react"
import { UserIcon } from "lucide-react"
import HeroSection from "@/components/hero-section"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ConfirmDialog } from "@/components/confirm-dialog"

interface User {
  id: number
  first_name?: string
  last_name?: string
  email: string
  role: "admin" | "client" | "member"
  phone?: string
  address?: string
  date_of_birth?: string
  photo_url?: string
  created_at?: string
  updated_at?: string
}

export default function ProfilePage() {
  const { user: currentUser, loading, token } = useAuth()
  const router = useRouter()
  const params = useParams()
  const userId = params.id?.[0] // Get the first parameter from the catch-all route

  const [user, setUser] = useState<User | null>(null)
  const [loadingUser, setLoadingUser] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<Partial<User>>({})
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [addressSuggestions, setAddressSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [loadingSuggestions, setLoadingSuggestions] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  // Determine if this is the current user's profile or another user's profile
  const isOwnProfile = !userId || (currentUser && userId === currentUser.id.toString())
  const isAdminViewingOther = currentUser?.role === "admin" && !isOwnProfile
  const canEdit = isOwnProfile || isAdminViewingOther
  const canDelete = isAdminViewingOther && userId !== currentUser?.id.toString()

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push("/login")
    }
  }, [currentUser, loading, router])

  useEffect(() => {
    if (!loading && currentUser && token) {
      fetchUser()
    }
  }, [currentUser, userId, token, loading])

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email,
        phone: user.phone || "",
        address: user.address || "",
        date_of_birth: user.date_of_birth || "",
        photo_url: user.photo_url || "",
        role: user.role,
      })
    }
  }, [user])

  const fetchUser = async () => {
    try {
      setLoadingUser(true)

      // If no userId provided, show current user's profile
      const targetUserId = userId || currentUser?.id

      if (!targetUserId) {
        setError("User ID not found")
        return
      }

      let endpoint = `/api/profile/${targetUserId}`

      // If admin is viewing another user, use admin endpoint
      if (isAdminViewingOther) {
        endpoint = `/api/admin/users/${targetUserId}`
      }

      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        // Handle different response structures
        const userData = data.user || data.profile
        setUser(userData)
      } else {
        setError("Failed to load user details")
      }
    } catch (error) {
      console.error("Failed to fetch user:", error)
      setError("An error occurred while loading user details")
    } finally {
      setLoadingUser(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddressChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    handleChange(e)

    if (value.length > 2) {
      try {
        setLoadingSuggestions(true)
        const response = await fetch(`/api/places/autocomplete?input=${encodeURIComponent(value)}`)

        if (response.ok) {
          const data = await response.json()
          if (data.predictions && data.predictions.length > 0) {
            const suggestions = data.predictions.map((prediction: any) => prediction.description)
            setAddressSuggestions(suggestions)
            setShowSuggestions(true)
          } else {
            setAddressSuggestions([])
            setShowSuggestions(false)
          }
        } else {
          console.error("Places API error:", response.status)
          setAddressSuggestions([])
          setShowSuggestions(false)
        }
      } catch (error) {
        console.error("Error fetching address suggestions:", error)
        setAddressSuggestions([])
        setShowSuggestions(false)
      } finally {
        setLoadingSuggestions(false)
      }
    } else {
      setShowSuggestions(false)
    }
  }

  const selectAddress = (address: string) => {
    setFormData((prev) => ({ ...prev, address }))
    setShowSuggestions(false)
  }

  const handleSave = async () => {
    try {
      setIsSaving(true)
      setError(null)
      setSuccess(null)

      const targetUserId = userId || currentUser?.id
      let endpoint = `/api/profile/${targetUserId}`

      // If admin is updating another user, use admin endpoint
      if (isAdminViewingOther) {
        endpoint = `/api/admin/users/${targetUserId}`
      }

      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const data = await response.json()
        const userData = data.user || data.profile
        setUser(userData)
        setIsEditing(false)
        setSuccess("Profile updated successfully")
      } else {
        const errorData = await response.json()
        setError(errorData.error || "Failed to update profile")
      }
    } catch (error) {
      console.error("Failed to update profile:", error)
      setError("An error occurred while updating profile")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteConfirm = async () => {
    try {
      setIsSaving(true)
      setError(null)

      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        router.push("/admin")
      } else {
        const errorData = await response.json()
        setError(errorData.error || "Failed to delete user")
      }
    } catch (error) {
      console.error("Failed to delete user:", error)
      setError("An error occurred while deleting user")
    } finally {
      setIsSaving(false)
    }
  }

  const getBackUrl = () => {
    if (isAdminViewingOther) {
      return "/admin"
    }
    return "/dashboard"
  }

  const getBackText = () => {
    if (isAdminViewingOther) {
      return "Back to User Management"
    }
    return "Back to Dashboard"
  }

  const getPageTitle = () => {
    if (isOwnProfile) {
      return "My Profile"
    }
    return `${user?.first_name} ${user?.last_name}` || user?.email || "User Profile"
  }

  const getPageDescription = () => {
    if (isOwnProfile) {
      return "Manage your personal information and access your health data and appointments."
    }
    return "View and manage user details, role, and account information."
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading || loadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!currentUser) {
    return null
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5">
        <HeroSection
          title="User Not Found"
          description="The user you are looking for does not exist or has been deleted."
          badge="Error"
        />
        <section className="py-16">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-xl font-heading font-bold text-red-600 mb-4">User Not Found</h2>
                <p className="text-muted-foreground mb-6">
                  The user you are looking for does not exist or has been deleted.
                </p>
                <Button asChild className="bg-primary hover:bg-primary-dark">
                  <a href={getBackUrl()} className="flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    {getBackText()}
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5">
      <HeroSection
        title={getPageTitle()}
        description={getPageDescription()}
        badge={isOwnProfile ? "Profile" : "User Details"}
      />

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Back Button */}
          <div className="mb-8 flex justify-between items-center">
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              <a href={getBackUrl()} className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                {getBackText()}
              </a>
            </Button>

            <div className="flex gap-2">
              {canEdit && (
                <>
                  {isEditing ? (
                    <>
                      <Button
                        onClick={() => {
                          setIsEditing(false)
                          setFormData({
                            first_name: user.first_name || "",
                            last_name: user.last_name || "",
                            email: user.email,
                            phone: user.phone || "",
                            address: user.address || "",
                            date_of_birth: user.date_of_birth || "",
                            photo_url: user.photo_url || "",
                            role: user.role,
                          })
                        }}
                        variant="outline"
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleSave} disabled={isSaving} className="bg-primary hover:bg-primary-dark">
                        <Save className="w-4 h-4 mr-2" />
                        {isSaving ? "Saving..." : "Save Changes"}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button onClick={() => setIsEditing(true)} variant="outline">
                        {isOwnProfile ? "Edit Profile" : "Edit User"}
                      </Button>
                      {canDelete && (
                        <Button onClick={() => setShowDeleteConfirm(true)} variant="destructive" disabled={isSaving}>
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Status Messages */}
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-6 border-green-500 text-green-800">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          {/* User Info Card */}
          <Card className="shadow-lg border-primary/20">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
              <CardTitle className="flex items-center gap-2 text-primary font-heading">
                <UserIcon className="w-5 h-5" />
                {isOwnProfile ? "My Details" : "User Information"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {isEditing ? (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="first_name">First Name</Label>
                      <Input
                        id="first_name"
                        name="first_name"
                        value={formData.first_name || ""}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="last_name">Last Name</Label>
                      <Input id="last_name" name="last_name" value={formData.last_name || ""} onChange={handleChange} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email || ""}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" name="phone" value={formData.phone || ""} onChange={handleChange} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date_of_birth">Date of Birth</Label>
                      <Input
                        id="date_of_birth"
                        name="date_of_birth"
                        type="date"
                        value={formData.date_of_birth || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <div className="relative">
                        <Input
                          id="address"
                          name="address"
                          value={formData.address || ""}
                          onChange={handleAddressChange}
                          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                          placeholder="Start typing an address..."
                        />
                        {showSuggestions && (
                          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                            {loadingSuggestions ? (
                              <div className="px-4 py-2 text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                                  Loading suggestions...
                                </div>
                              </div>
                            ) : addressSuggestions.length > 0 ? (
                              addressSuggestions.map((suggestion, index) => (
                                <div
                                  key={index}
                                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                  onClick={() => selectAddress(suggestion)}
                                >
                                  <MapPin className="w-4 h-4 inline mr-2 text-gray-400" />
                                  {suggestion}
                                </div>
                              ))
                            ) : (
                              <div className="px-4 py-2 text-sm text-gray-500">No addresses found</div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label htmlFor="photo" className="text-base font-medium">
                        Profile Photo
                      </Label>

                      {/* Photo Preview Area */}
                      <div className="flex items-center gap-6">
                        <div className="relative">
                          <div className="w-24 h-24 rounded-full border-4 border-primary/20 overflow-hidden bg-muted/50 flex items-center justify-center">
                            {formData.photo_url ? (
                              <img
                                src={formData.photo_url || "/placeholder.svg"}
                                alt="Profile preview"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <UserIcon className="w-8 h-8 text-muted-foreground" />
                            )}
                          </div>
                          {formData.photo_url && (
                            <button
                              type="button"
                              onClick={() => setFormData((prev) => ({ ...prev, photo_url: "" }))}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                            >
                              ×
                            </button>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="border-2 border-dashed border-primary/30 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                            <Input
                              id="photo"
                              name="photo"
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                  const reader = new FileReader()
                                  reader.onload = (event) => {
                                    setFormData((prev) => ({ ...prev, photo_url: event.target?.result as string }))
                                  }
                                  reader.readAsDataURL(file)
                                }
                              }}
                              className="hidden"
                            />
                            <label htmlFor="photo" className="cursor-pointer flex flex-col items-center gap-2">
                              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                <UserIcon className="w-6 h-6 text-primary" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-primary">Click to upload photo</p>
                                <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {(currentUser.role === "admin" || isAdminViewingOther) && (
                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select
                          value={formData.role || "member"}
                          onValueChange={(value) => handleSelectChange("role", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Administrator</SelectItem>
                            <SelectItem value="client">Client</SelectItem>
                            <SelectItem value="member">Member</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
                        <UserIcon className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium text-secondary">
                            {user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : user.email}
                          </p>
                          <p className="text-sm text-muted-foreground">Full Name</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
                        <Mail className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium text-secondary">{user.email}</p>
                          <p className="text-sm text-muted-foreground">Email Address</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
                        <Phone className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium text-secondary">{user.phone || "Not provided"}</p>
                          <p className="text-sm text-muted-foreground">Phone Number</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
                        <UserIcon className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium text-secondary">
                            {user.date_of_birth ? new Date(user.date_of_birth).toLocaleDateString() : "Not provided"}
                          </p>
                          <p className="text-sm text-muted-foreground">Date of Birth</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
                        <MapPin className="w-5 h-5 text-primary" />
                        <div className="flex-1">
                          <p className="font-medium text-secondary">{user.address || "Not provided"}</p>
                          <p className="text-sm text-muted-foreground">Address</p>
                        </div>
                        {user.address && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              window.open(
                                `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(user.address)}`,
                                "_blank",
                              )
                            }
                          >
                            View on Map
                          </Button>
                        )}
                      </div>

                      <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
                        <Shield className="w-5 h-5 text-primary" />
                        <div>
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor("active")}`}
                          >
                            <div className="w-2 h-2 bg-current rounded-full mr-2"></div>
                            Active
                          </span>
                          <p className="text-sm text-muted-foreground mt-1">Account Status</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
                        <div className="w-5 h-5 flex items-center justify-center">
                          <span
                            className={`w-3 h-3 rounded-full ${
                              user.role === "admin"
                                ? "bg-purple-500"
                                : user.role === "client"
                                  ? "bg-pink-500"
                                  : "bg-violet-500"
                            }`}
                          ></span>
                        </div>
                        <div>
                          <p className="font-medium text-secondary">{user.role}</p>
                          <p className="text-sm text-muted-foreground">User Role</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
                        <Calendar className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium text-secondary">
                            {user.created_at ? new Date(user.created_at).toLocaleDateString() : "Not available"}
                          </p>
                          <p className="text-sm text-muted-foreground">Member Since</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Google Maps Embed */}
                  {user.address && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-3 text-primary">Location</h3>
                      <div className="w-full h-64 rounded-lg overflow-hidden border">
                        <iframe
                          width="100%"
                          height="100%"
                          frameBorder="0"
                          style={{ border: 0 }}
                          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAt0i9BNsrI7oW9fiXrDDiTJNkeEvokDXk&q=${encodeURIComponent(user.address)}`}
                          allowFullScreen
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Custom Delete Confirmation Dialog */}
      <ConfirmDialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteConfirm}
        variant="destructive"
      />
    </div>
  )
}
