"use client"

import { useAuth } from "@/hooks/use-auth"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Mail, Phone, Calendar, ArrowLeft, PlusCircle, Search } from "lucide-react"
import Link from "next/link"
import HeroSection from "@/components/hero-section"
import AddClientModal from "@/components/add-client-modal"
import { Input } from "@/components/ui/input"

interface Client {
  id: number
  name: string
  email: string
  phone?: string
  service_interest?: string
  status: string
  notes?: string
  created_at: string
}

interface ContactSubmission {
  id: number
  name: string
  email: string
  phone?: string
  service?: string
  message: string
  status: string
  created_at: string
}

export default function ClientsPage() {
  const { user, loading } = useAuth()
  const [clients, setClients] = useState<Client[]>([])
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<"all" | "admins" | "clients" | "members">("all")
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user && user.role === "admin") {
      fetchClients()
      fetchContactSubmissions()
    }
  }, [user])

  const fetchClients = async () => {
    try {
      const response = await fetch("/api/admin/clients")
      if (response.ok) {
        const data = await response.json()
        setClients(data.clients)
      }
    } catch (error) {
      console.error("Failed to fetch clients:", error)
    } finally {
      setLoadingData(false)
    }
  }

  const fetchContactSubmissions = async () => {
    try {
      const response = await fetch("/api/admin/contact-submissions")
      if (response.ok) {
        const data = await response.json()
        setSubmissions(data.submissions)
      }
    } catch (error) {
      console.error("Failed to fetch contact submissions:", error)
    }
  }

  const handleAddClient = async (newClient: Omit<Client, "id" | "created_at">) => {
    try {
      const response = await fetch("/api/admin/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newClient),
      })

      if (response.ok) {
        const data = await response.json()
        setClients((prevClients) => [...prevClients, data.client])
        setIsAddClientModalOpen(false)
      }
    } catch (error) {
      console.error("Failed to add client:", error)
    }
  }

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (client.phone && client.phone.includes(searchQuery)),
  )

  const filteredSubmissions = submissions.filter(
    (submission) =>
      submission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (submission.phone && submission.phone.includes(searchQuery)),
  )

  if (loading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading clients...</p>
        </div>
      </div>
    )
  }

  if (!user || user.role !== "admin") {
    return null
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title="Client Management"
        description="View and manage all clients and contact form submissions."
        badge="Admin Panel"
      />

      {/* Clients Content */}
      <section className="py-16 bg-gradient-to-br from-white via-muted to-accent-light/20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Back Button */}
          <div className="mb-8">
            <Button asChild variant="outline">
              <Link href="/dashboard" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-secondary">{clients.length}</p>
                    <p className="text-sm text-muted-foreground">Total Clients</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-secondary">{submissions.length}</p>
                    <p className="text-sm text-muted-foreground">Contact Inquiries</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-secondary">
                      {clients.filter((c) => c.status === "active").length}
                    </p>
                    <p className="text-sm text-muted-foreground">Active Clients</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-secondary">
                      {
                        clients.filter((c) => {
                          const created = new Date(c.created_at)
                          const today = new Date()
                          const diffTime = Math.abs(today.getTime() - created.getTime())
                          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
                          return diffDays <= 30
                        }).length
                      }
                    </p>
                    <p className="text-sm text-muted-foreground">New This Month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex gap-2">
              <Button
                variant={activeTab === "all" ? "default" : "outline"}
                onClick={() => setActiveTab("all")}
                className="flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                All
              </Button>
              <Button
                variant={activeTab === "admins" ? "default" : "outline"}
                onClick={() => setActiveTab("admins")}
                className="flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                Admins
              </Button>
              <Button
                variant={activeTab === "clients" ? "default" : "outline"}
                onClick={() => setActiveTab("clients")}
                className="flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                Clients
              </Button>
              <Button
                variant={activeTab === "members" ? "default" : "outline"}
                onClick={() => setActiveTab("members")}
                className="flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                Members
              </Button>
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-grow sm:flex-grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-8 w-full sm:w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {(activeTab === "clients" || activeTab === "all") && (
                <Button
                  onClick={() => setIsAddClientModalOpen(true)}
                  className="bg-primary hover:bg-primary-dark flex items-center gap-2"
                >
                  <PlusCircle className="w-4 h-4" />
                  Add Client
                </Button>
              )}
            </div>
          </div>

          {/* Clients Table */}
          {activeTab === "clients" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Users className="w-5 h-5" />
                  Registered Clients
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-secondary">Name</th>
                        <th className="text-left py-3 px-4 font-medium text-secondary">Contact</th>
                        <th className="text-left py-3 px-4 font-medium text-secondary">Service Interest</th>
                        <th className="text-left py-3 px-4 font-medium text-secondary">Notes</th>
                        <th className="text-left py-3 px-4 font-medium text-secondary">Date</th>
                        <th className="text-left py-3 px-4 font-medium text-secondary">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-secondary">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredClients.map((client) => (
                        <tr key={client.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium text-primary">
                                  {client.name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <span className="font-medium text-secondary">{client.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-sm">
                                <Mail className="w-3 h-3 text-muted-foreground" />
                                <a href={`mailto:${client.email}`} className="text-primary hover:underline">
                                  {client.email}
                                </a>
                              </div>
                              {client.phone && (
                                <div className="flex items-center gap-2 text-sm">
                                  <Phone className="w-3 h-3 text-muted-foreground" />
                                  <a href={`tel:${client.phone}`} className="text-primary hover:underline">
                                    {client.phone}
                                  </a>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">
                            {client.service_interest || "Not specified"}
                          </td>
                          <td className="py-3 px-4">
                            <div className="max-w-xs">
                              <p className="text-sm text-muted-foreground line-clamp-2">{client.notes || "No notes"}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground text-sm">
                            {new Date(client.created_at).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                client.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : client.status === "inactive"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              <div
                                className={`w-2 h-2 rounded-full mr-1 ${
                                  client.status === "active"
                                    ? "bg-green-500"
                                    : client.status === "inactive"
                                      ? "bg-red-500"
                                      : "bg-blue-500"
                                }`}
                              ></div>
                              {client.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/admin/clients/${client.id}`}>View</Link>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredClients.length === 0 && (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No clients found</p>
                    {searchQuery ? (
                      <p className="text-sm text-muted-foreground mt-2">Try adjusting your search</p>
                    ) : (
                      <p className="text-sm text-muted-foreground mt-2">Add your first client to get started</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Contact Submissions Table */}
          {activeTab === "inquiries" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Mail className="w-5 h-5" />
                  Contact Inquiries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-secondary">Name</th>
                        <th className="text-left py-3 px-4 font-medium text-secondary">Contact</th>
                        <th className="text-left py-3 px-4 font-medium text-secondary">Service Interest</th>
                        <th className="text-left py-3 px-4 font-medium text-secondary">Message</th>
                        <th className="text-left py-3 px-4 font-medium text-secondary">Date</th>
                        <th className="text-left py-3 px-4 font-medium text-secondary">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-secondary">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSubmissions.map((submission) => (
                        <tr key={submission.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium text-primary">
                                  {submission.name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <span className="font-medium text-secondary">{submission.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-sm">
                                <Mail className="w-3 h-3 text-muted-foreground" />
                                <a href={`mailto:${submission.email}`} className="text-primary hover:underline">
                                  {submission.email}
                                </a>
                              </div>
                              {submission.phone && (
                                <div className="flex items-center gap-2 text-sm">
                                  <Phone className="w-3 h-3 text-muted-foreground" />
                                  <a href={`tel:${submission.phone}`} className="text-primary hover:underline">
                                    {submission.phone}
                                  </a>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">{submission.service || "Not specified"}</td>
                          <td className="py-3 px-4">
                            <div className="max-w-xs">
                              <p className="text-sm text-muted-foreground line-clamp-2">{submission.message}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground text-sm">
                            {new Date(submission.created_at).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                submission.status === "new"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              <div
                                className={`w-2 h-2 rounded-full mr-1 ${
                                  submission.status === "new" ? "bg-green-500" : "bg-blue-500"
                                }`}
                              ></div>
                              {submission.status === "new" ? "New" : "Contacted"}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                // Convert inquiry to client
                                setIsAddClientModalOpen(true)
                              }}
                            >
                              Convert to Client
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredSubmissions.length === 0 && (
                  <div className="text-center py-8">
                    <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No inquiries found</p>
                    {searchQuery ? (
                      <p className="text-sm text-muted-foreground mt-2">Try adjusting your search</p>
                    ) : (
                      <p className="text-sm text-muted-foreground mt-2">Contact form submissions will appear here</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Add Client Modal */}
      <AddClientModal
        isOpen={isAddClientModalOpen}
        onClose={() => setIsAddClientModalOpen(false)}
        onAddClient={handleAddClient}
      />
    </div>
  )
}
