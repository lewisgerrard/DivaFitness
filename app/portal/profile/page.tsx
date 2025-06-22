"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { CleanPortalLayout } from "@/components/clean-portal-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/use-auth"
import { User, Edit, Save, X, Heart, Plus, Trash2, MapPin } from "lucide-react"
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
    membership_type: "",
  })

  const [emergencyContacts, setEmergencyContacts] = useState([
    // Mock data - replace with real data from API
    { name: "John Doe", phone: "(555) 123-4567", relationship: "Spouse" },
    { name: "Jane Smith", phone: "(555) 987-6543", relationship: "Sister" },
  ])
  const [isAddingContact, setIsAddingContact] = useState(false)
  const [editingContactIndex, setEditingContactIndex] = useState(null)
  const [contactForm, setContactForm] = useState({ name: "", phone: "", relationship: "" })

  const [addressSuggestions, setAddressSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [loadingSuggestions, setLoadingSuggestions] = useState(false)

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
        membership_type: user.role || "Member",
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
        membership_type: user.membership_type || "Basic",
      })
    }
    setIsEditing(false)
  }

  const handleEditContact = (index) => {
    setEditingContactIndex(index)
    setContactForm(emergencyContacts[index])
    setIsAddingContact(false)
  }

  const handleDeleteContact = (index) => {
    const updatedContacts = emergencyContacts.filter((_, i) => i !== index)
    setEmergencyContacts(updatedContacts)
    toast.success("Emergency contact deleted")
  }

  const handleSaveContact = () => {
    if (!contactForm.name || !contactForm.phone) {
      toast.error("Please fill in all required fields")
      return
    }

    if (isAddingContact) {
      setEmergencyContacts([...emergencyContacts, contactForm])
      toast.success("Emergency contact added")
    } else {
      const updatedContacts = [...emergencyContacts]
      updatedContacts[editingContactIndex] = contactForm
      setEmergencyContacts(updatedContacts)
      toast.success("Emergency contact updated")
    }

    handleCancelContact()
  }

  const handleCancelContact = () => {
    setIsAddingContact(false)
    setEditingContactIndex(null)
    setContactForm({ name: "", phone: "", relationship: "" })
  }

  const handleAddressChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFormData({ ...formData, address: value })

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
    setFormData({ ...formData, address })
    setShowSuggestions(false)
  }

  return (
    <CleanPortalLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600">Manage your personal information and preferences</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Profile Details */}
          <div className="space-y-6">
            {/* Personal Information */}
            <Card className="border-primary-100 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-primary-50 to-white border-b border-primary-100">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-gray-900">
                      <User className="w-5 h-5 text-primary" />
                      Personal Information
                    </CardTitle>
                    <CardDescription>Your basic personal details</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {isEditing ? (
                      <>
                        <Button
                          variant="outline"
                          onClick={handleCancel}
                          className="border-primary-200 hover:bg-primary-50"
                          size="sm"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                        <Button onClick={handleSave} className="bg-primary hover:bg-primary-dark" size="sm">
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                      </>
                    ) : (
                      <Button onClick={() => setIsEditing(true)} className="bg-primary hover:bg-primary-dark" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first_name" className="text-gray-700">
                      First Name
                    </Label>
                    <Input
                      id="first_name"
                      value={formData.first_name}
                      onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                      disabled={!isEditing}
                      className="border-primary-200 focus:border-primary focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last_name" className="text-gray-700">
                      Last Name
                    </Label>
                    <Input
                      id="last_name"
                      value={formData.last_name}
                      onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                      disabled={!isEditing}
                      className="border-primary-200 focus:border-primary focus:ring-primary"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={true}
                      className="bg-gray-50 border-gray-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-700">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      disabled={!isEditing}
                      className="border-primary-200 focus:border-primary focus:ring-primary"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date_of_birth" className="text-gray-700">
                      Date of Birth
                    </Label>
                    <Input
                      id="date_of_birth"
                      type="date"
                      value={formData.date_of_birth}
                      onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                      disabled={!isEditing}
                      className="border-primary-200 focus:border-primary focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="membership_type" className="text-gray-700">
                      Membership Type
                    </Label>
                    <Input
                      id="membership_type"
                      value={formData.membership_type}
                      disabled={true}
                      className="bg-primary-50 border-primary-200 text-primary-700 font-medium"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-gray-700">
                    Address
                  </Label>
                  <div className="relative">
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={handleAddressChange}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                      disabled={!isEditing}
                      placeholder="Start typing an address..."
                      className="border-primary-200 focus:border-primary focus:ring-primary"
                    />
                    {showSuggestions && isEditing && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
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
              </CardContent>
            </Card>

            {/* Emergency Contact Table */}
            <Card className="border-primary-100 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-primary-50 to-white border-b border-primary-100">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-gray-900">
                      <Heart className="w-5 h-5 text-primary" />
                      Emergency Contacts
                    </CardTitle>
                    <CardDescription>Manage your emergency contact information</CardDescription>
                  </div>
                  <Button
                    onClick={() => setIsAddingContact(true)}
                    className="bg-primary hover:bg-primary-dark"
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Contact
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {emergencyContacts.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Heart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No emergency contacts added yet</p>
                    <p className="text-sm">Add your first emergency contact to get started</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-primary-100">
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Phone</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Relationship</th>
                          <th className="text-right py-3 px-4 font-medium text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {emergencyContacts.map((contact, index) => (
                          <tr key={index} className="border-b border-gray-100 hover:bg-primary-50/50">
                            <td className="py-3 px-4 text-gray-900">{contact.name}</td>
                            <td className="py-3 px-4 text-gray-600">{contact.phone}</td>
                            <td className="py-3 px-4 text-gray-600">{contact.relationship}</td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex gap-2 justify-end">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditContact(index)}
                                  className="border-primary-200 hover:bg-primary-50"
                                >
                                  <Edit className="w-3 h-3" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDeleteContact(index)}
                                  className="border-red-200 hover:bg-red-50 text-red-600"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Add/Edit Contact Modal */}
                {(isAddingContact || editingContactIndex !== null) && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                      <h3 className="text-lg font-semibold mb-4 text-gray-900">
                        {isAddingContact ? "Add Emergency Contact" : "Edit Emergency Contact"}
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="contact_name" className="text-gray-700">
                            Name
                          </Label>
                          <Input
                            id="contact_name"
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            placeholder="Full name"
                            className="border-primary-200 focus:border-primary focus:ring-primary"
                          />
                        </div>
                        <div>
                          <Label htmlFor="contact_phone" className="text-gray-700">
                            Phone
                          </Label>
                          <Input
                            id="contact_phone"
                            value={contactForm.phone}
                            onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                            placeholder="Phone number"
                            className="border-primary-200 focus:border-primary focus:ring-primary"
                          />
                        </div>
                        <div>
                          <Label htmlFor="contact_relationship" className="text-gray-700">
                            Relationship
                          </Label>
                          <Input
                            id="contact_relationship"
                            value={contactForm.relationship}
                            onChange={(e) => setContactForm({ ...contactForm, relationship: e.target.value })}
                            placeholder="e.g., Spouse, Parent, Friend"
                            className="border-primary-200 focus:border-primary focus:ring-primary"
                          />
                        </div>
                      </div>
                      <div className="flex gap-3 mt-6">
                        <Button
                          variant="outline"
                          onClick={handleCancelContact}
                          className="flex-1 border-primary-200 hover:bg-primary-50"
                        >
                          Cancel
                        </Button>
                        <Button onClick={handleSaveContact} className="flex-1 bg-primary hover:bg-primary-dark">
                          {isAddingContact ? "Add Contact" : "Save Changes"}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </CleanPortalLayout>
  )
}
