"use client"

import type React from "react"

import { useAuth } from "@/hooks/use-auth"
import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, Trash2, User, Mail, Phone, Calendar, AlertCircle } from "lucide-react"
import Link from "next/link"
import HeroSection from "@/components/hero-section"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Client {
  id: number
  name: string
  email: string
  phone?: string
  service_interest?: string
  status: string
  notes?: string
  created_at: string
  updated_at: string
}

export default function ClientDetailPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const clientId = params.id as string

  const [client, setClient] = useState<Client | null>(null)
  const [loadingClient, setLoadingClient] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<Partial<Client>>({})
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user && user.role === "admin") {
      fetchClient()
    }
  }, [user, clientId])

  useEffect(() => {
    if (client) {
      setFormData({
        name: client.name,
        email: client.email,
        phone: client.phone || "",
        service_interest: client.service_interest || "",
        status: client.status,
        notes: client.notes || "",
      })
    }
  }, [client])

  const fetchClient = async () => {
    try {
      setLoadingClient(true)
      const response = await fetch(`/api/admin/clients/${clientId}`)

      if (response.ok) {
        const data = await response.json()
        setClient(data.client)
      } else {
        setError("Failed to load client details")
      }
    } catch (error) {
      console.error("Failed to fetch client:", error)
      setError("An error occurred while loading client details")
    } finally {
      setLoadingClient(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    try {
      setIsSaving(true)
      setError(null)
      setSuccess(null)

      const response = await fetch(`/api/admin/clients/${clientId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const data = await response.json()
        setClient(data.client)
        setIsEditing(false)
        setSuccess("Client updated successfully")
      } else {
        const errorData = await response.json()
        setError(errorData.error || "Failed to update client")
      }
    } catch (error) {
      console.error("Failed to update client:", error)
      setError("An error occurred while updating client")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this client? This action cannot be undone.")) {
      return
    }

    try {
      setIsSaving(true)
      setError(null)

      const response = await fetch(`/api/admin/clients/${clientId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        router.push("/admin/clients")
      } else {
        const errorData = await response.json()
        setError(errorData.error || "Failed to delete client")
      }
    } catch (error) {
      console.error("Failed to delete client:", error)
      setError("An error occurred while deleting client")
    } finally {
      setIsSaving(false)
    }
  }

  if (loading || loadingClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading client details...</p>
        </div>
      </div>
    )
  }

  if (!user || user.role !== "admin") {
    return null
  }

  if (!client) {
    return (
      <div className="min-h-screen">
        <HeroSection
          title="Client Not Found"
          description="The client you are looking for does not exist or has been deleted."
          badge="Error"
        />
        <div className="py-16 bg-gradient-to-br from-white via-muted to-accent-light/20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-secondary mb-4">Client Not Found</h2>
            <p className="text-muted-foreground mb-8">
              The client you are looking for does not exist or has been deleted.
            </p>
            <Button asChild>
              <Link href="/admin/clients" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Clients
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title={client.name}
        description="View and manage client details, notes, and status."
        badge="Client Details"
      />

      {/* Client Details Content */}
      <section className="py-16 bg-gradient-to-br from-white via-muted to-accent-light/20">
        <div className="max-w-4xl mx-auto px-4">
          {/* Back Button */}
          <div className="mb-8 flex justify-between items-center">
            <Button asChild variant="outline">
              <Link href="/admin/clients" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Clients
              </Link>
            </Button>

            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button
                    onClick={() => {
                      setIsEditing(false)
                      setFormData({
                        name: client.name,
                        email: client.email,
                        phone: client.phone || "",
                        service_interest: client.service_interest || "",
                        status: client.status,
                        notes: client.notes || "",
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
                    Edit Client
                  </Button>
                  <Button onClick={handleDelete} variant="destructive" disabled={isSaving}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
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

          {/* Client Info Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <User className="w-5 h-5" />
                Client Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input id="name" name="name" value={formData.name || ""} onChange={handleChange} required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
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
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="service_interest">Service Interest</Label>
                      <Select
                        value={formData.service_interest || ""}
                        onValueChange={(value) => handleSelectChange("service_interest", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-to-1 Personal Training">1-to-1 Personal Training</SelectItem>
                          <SelectItem value="Group Training">Group Training</SelectItem>
                          <SelectItem value="Nutrition Coaching">Nutrition Coaching</SelectItem>
                          <SelectItem value="Free Consultation">Free Consultation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={formData.status || "active"}
                        onValueChange={(value) => handleSelectChange("status", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="consultation">Consultation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="created_at">Client Since</Label>
                      <Input id="created_at" value={new Date(client.created_at).toLocaleDateString()} disabled />
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes || ""}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Add notes about this client..."
                    />
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <User className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium text-secondary">{client.name}</p>
                        <p className="text-sm text-muted-foreground">Full Name</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Mail className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium text-secondary">{client.email}</p>
                        <p className="text-sm text-muted-foreground">Email Address</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Phone className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium text-secondary">{client.phone || "Not provided"}</p>
                        <p className="text-sm text-muted-foreground">Phone Number</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <span className="w-3 h-3 rounded-full bg-primary"></span>
                      </div>
                      <div>
                        <p className="font-medium text-secondary">{client.service_interest || "Not specified"}</p>
                        <p className="text-sm text-muted-foreground">Service Interest</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <span
                          className={`w-3 h-3 rounded-full ${
                            client.status === "active"
                              ? "bg-green-500"
                              : client.status === "inactive"
                                ? "bg-red-500"
                                : "bg-purple-500"
                          }`}
                        ></span>
                      </div>
                      <div>
                        <p className="font-medium text-secondary">{client.status}</p>
                        <p className="text-sm text-muted-foreground">Status</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Calendar className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium text-secondary">{new Date(client.created_at).toLocaleDateString()}</p>
                        <p className="text-sm text-muted-foreground">Client Since</p>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2 p-3 bg-muted rounded-lg">
                    <p className="font-medium text-secondary mb-1">Notes</p>
                    <p className="text-muted-foreground whitespace-pre-wrap">{client.notes || "No notes available"}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Additional sections could be added here, such as:
              - Client Sessions History
              - Payment History
              - Health Data
              - Goals and Progress
          */}
        </div>
      </section>
    </div>
  )
}
