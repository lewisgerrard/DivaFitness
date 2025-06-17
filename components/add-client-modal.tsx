"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface AddClientModalProps {
  isOpen: boolean
  onClose: () => void
  onAddClient: (user: {
    first_name: string
    last_name: string
    email: string
    phone?: string
    password: string
    role: string
    address?: string
    date_of_birth?: string
  }) => void
}

export default function AddClientModal({ isOpen, onClose, onAddClient }: AddClientModalProps) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    role: "member",
    address: "",
    date_of_birth: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [addressSuggestions, setAddressSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [loadingSuggestions, setLoadingSuggestions] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    type: "error" | "success" | null
    message: string | null
  }>({ type: null, message: null })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear any error messages when user starts typing
    if (formStatus.type === "error") {
      setFormStatus({ type: null, message: null })
    }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("🔍 Form submitted with data:", formData)
    setIsSubmitting(true)
    setFormStatus({ type: null, message: null })

    // Validate form
    if (!formData.first_name || !formData.last_name || !formData.email || !formData.password) {
      console.error("❌ Form validation failed - missing required fields")
      setFormStatus({
        type: "error",
        message: "First name, last name, email, and password are required",
      })
      setIsSubmitting(false)
      return
    }

    try {
      console.log("🔍 Making API call to create user...")

      // Get auth token from localStorage
      const token = localStorage.getItem("auth-token")

      if (!token) {
        setFormStatus({
          type: "error",
          message: "Authentication required. Please log in again.",
        })
        setIsSubmitting(false)
        return
      }

      const response = await fetch("/api/admin/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      console.log("📡 API Response status:", response.status)

      const responseData = await response.json()
      console.log("📡 API Response data:", responseData)

      if (response.ok) {
        console.log("✅ User created successfully:", responseData)
        setFormStatus({
          type: "success",
          message: "User created successfully!",
        })

        // Call the parent's onAddClient if it exists (for any additional handling)
        if (onAddClient) {
          await onAddClient(formData)
        }

        // Close modal and reset form after a short delay to show success message
        setTimeout(() => {
          onClose()
          resetForm()
          // Refresh the page to show the new user
          window.location.reload()
        }, 1500)
      } else {
        console.error("❌ API Error response:", responseData)
        setFormStatus({
          type: "error",
          message: responseData.error || `Server error (${response.status})`,
        })
      }
    } catch (error) {
      console.error("❌ Failed to create user:", error)
      setFormStatus({
        type: "error",
        message: `Network error: ${error.message}. Please check your connection and try again.`,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
      role: "member",
      address: "",
      date_of_birth: "",
    })
    setIsSubmitting(false)
    setFormStatus({ type: null, message: null })
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose()
          resetForm()
        }
      }}
    >
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-primary">Add New User</DialogTitle>
          <DialogDescription>
            Create a new user account. They will be able to log in with these credentials.
          </DialogDescription>
        </DialogHeader>

        {formStatus.type && (
          <Alert
            variant={formStatus.type === "error" ? "destructive" : "default"}
            className={formStatus.type === "success" ? "bg-green-50 border-green-200 text-green-800" : ""}
          >
            {formStatus.type === "error" ? <AlertCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
            <AlertDescription>{formStatus.message}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name *</Label>
              <Input id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name *</Label>
              <Input id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password *</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={formData.role} onValueChange={(value) => handleSelectChange("role", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="member">Member</SelectItem>
                <SelectItem value="client">Client</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <div className="relative">
              <Input
                id="address"
                name="address"
                value={formData.address}
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

          <div className="space-y-2">
            <Label htmlFor="date_of_birth">Date of Birth</Label>
            <Input
              id="date_of_birth"
              name="date_of_birth"
              type="date"
              value={formData.date_of_birth}
              onChange={handleChange}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onClose()
                resetForm()
              }}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary-dark">
              {isSubmitting ? "Adding..." : "Add User"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
