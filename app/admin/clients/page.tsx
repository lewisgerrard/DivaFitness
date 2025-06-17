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

interface User {
  id: number
  name: string
  first_name?: string
  last_name?: string
  email: string
  phone?: string
  role: string
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
  const [users, setUsers] = useState<User[]>([])
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
      fetchUsers()
      fetchContactSubmissions()
    }
  }, [user])

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/clients")
      if (response.ok) {
        const data = await response.json()
        setUsers(data.users || data.clients || [])
      }
    } catch (error) {
      console.error("Failed to fetch users:", error)
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

  const handleAddUser = async (newUser: any) => {
    try {
      const response = await fetch("/api/admin/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      })

      if (response.ok) {
        const data = await response.json()
        setUsers((prevUsers) => [...prevUsers, data.user || data.client])
        setIsAddClientModalOpen(false)
      }
    } catch (error) {
      console.error("Failed to add user:", error)
    }
  }

  const getFilteredUsers = () => {
    let filtered = users.filter(
      (user) =>
        user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (user.phone && user.phone.includes(searchQuery)),
    )

    if (activeTab === "admins") {
      filtered = filtered.filter((u) => u.role === "admin")
    } else if (activeTab === "clients") {
      filtered = filtered.filter((u) => u.role === "user" || u.role === "client")
    } else if (activeTab === "members") {
      filtered = filtered.filter((u) => u.role === "user" || u.role === "member")
    }

    return filtered
  }

  const filteredUsers = getFilteredUsers()

  if (loading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading users...</p>
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
        title="User Management"
        description="View and manage all users who can log in to the website."
        badge="Admin Panel"
      />

      {/* Users Content */}
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
                    <p className="text-2xl font-bold text-secondary">{users.length}</p>
                    <p className="text-sm text-muted-foreground">Total Users</p>
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
                    <p className="text-2xl font-bold text-secondary">
                      {users.filter((u) => u.role === "admin").length}
                    </p>
                    <p className="text-sm text-muted-foreground">Admins</p>
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
                      {users.filter((u) => u.role === "user" || u.role === "client").length}
                    </p>
                    <p className="text-sm text-muted-foreground">Members</p>
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
                        users.filter((u) => {
                          const created = new Date(u.created_at)
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
              <Button
                onClick={() => setIsAddClientModalOpen(true)}
                className="bg-primary hover:bg-primary-dark flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                Add
              </Button>
            </div>
          </div>

          {/* Users Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Users className="w-5 h-5" />
                Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-secondary">First Name</th>
                      <th className="text-left py-3 px-4 font-medium text-secondary">Last Name</th>
                      <th className="text-left py-3 px-4 font-medium text-secondary">Type</th>
                      <th className="text-left py-3 px-4 font-medium text-secondary">Contact</th>
                      <th className="text-left py-3 px-4 font-medium text-secondary">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-secondary">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-primary">
                                {(user.first_name || user.name)?.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <span className="font-medium text-secondary">
                              {user.first_name || user.name?.split(" ")[0] || "N/A"}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-medium text-secondary">
                          {user.last_name || user.name?.split(" ").slice(1).join(" ") || "N/A"}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              user.role === "admin" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {user.role === "admin" ? "Admin" : "Member"}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="w-3 h-3 text-muted-foreground" />
                              <a href={`mailto:${user.email}`} className="text-primary hover:underline">
                                {user.email}
                              </a>
                            </div>
                            {user.phone && (
                              <div className="flex items-center gap-2 text-sm">
                                <Phone className="w-3 h-3 text-muted-foreground" />
                                <a href={`tel:${user.phone}`} className="text-primary hover:underline">
                                  {user.phone}
                                </a>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground text-sm">
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/clients/${user.id}`}>View</Link>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredUsers.length === 0 && (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No users found</p>
                  <div className="mt-4 p-4 bg-gray-100 rounded text-left text-sm">
                    <p>
                      <strong>Debug Info:</strong>
                    </p>
                    <p>Total users fetched: {users.length}</p>
                    <p>Filtered users: {filteredUsers.length}</p>
                    <p>Active tab: {activeTab}</p>
                    <p>Search query: "{searchQuery}"</p>
                    <p>Loading data: {loadingData.toString()}</p>
                    <p>Current user role: {user?.role}</p>
                    {users.length > 0 && (
                      <div className="mt-2">
                        <p>
                          <strong>Sample user data:</strong>
                        </p>
                        <pre className="text-xs">{JSON.stringify(users[0], null, 2)}</pre>
                      </div>
                    )}
                  </div>
                  {searchQuery ? (
                    <p className="text-sm text-muted-foreground mt-2">Try adjusting your search</p>
                  ) : (
                    <p className="text-sm text-muted-foreground mt-2">Add your first user to get started</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Add User Modal */}
      <AddClientModal
        isOpen={isAddClientModalOpen}
        onClose={() => setIsAddClientModalOpen(false)}
        onAddClient={handleAddUser}
      />
    </div>
  )
}
