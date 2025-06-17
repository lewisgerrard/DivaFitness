"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Users, Shield, UserCheck } from "lucide-react"
import HeroSection from "@/components/hero-section"
import AddClientModal from "@/components/add-client-modal"

interface User {
  id: number
  first_name?: string
  last_name?: string
  email: string
  role: "admin" | "client" | "member"
  phone?: string
  address?: string
}

export default function AdminPage() {
  const { user, loading, token } = useAuth()
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false)

  console.log("🔍 Admin page - Auth loading:", loading, "User:", user, "Token:", !!token)

  useEffect(() => {
    if (!loading) {
      console.log("✅ Auth loaded, user:", user)
      if (!user) {
        console.log("❌ No user found, redirecting to login")
        router.push("/login")
        return
      }

      if (user.role !== "admin") {
        console.log("❌ User is not admin:", user.role)
        setError("Access denied. Admin role required.")
        setIsLoading(false)
        return
      }

      console.log("✅ User is admin, fetching users")
      fetchUsers()
    }
  }, [loading, user, router])

  const fetchUsers = async () => {
    try {
      console.log("📡 Fetching users from API...")
      console.log("🎫 Using token:", !!token)

      if (!token) {
        throw new Error("No authentication token available")
      }

      const response = await fetch("/api/admin/users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      console.log("📡 Response status:", response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("❌ API Error response:", errorText)

        let errorData
        try {
          errorData = JSON.parse(errorText)
        } catch {
          errorData = { error: errorText }
        }

        throw new Error(`Failed to fetch users: ${response.status} - ${errorData.error || errorText}`)
      }

      const data = await response.json()
      console.log("✅ Users data received:", data)

      setUsers(data.users || [])
      setFilteredUsers(data.users || [])
      setError(null)
    } catch (error) {
      console.error("❌ Error fetching users:", error)
      setError(`Failed to load users: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (!query.trim()) {
      setFilteredUsers(users)
    } else {
      const filtered = users.filter(
        (user) =>
          user.first_name?.toLowerCase().includes(query.toLowerCase()) ||
          user.last_name?.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase()),
      )
      setFilteredUsers(filtered)
    }
  }

  const handleAddUser = async (newUser: any) => {
    try {
      const response = await fetch("/api/admin/clients", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      })
      if (response.ok) {
        const data = await response.json()
        setUsers((prev) => [...prev, data.user])
        setFilteredUsers((prev) => [...prev, data.user])
        setIsAddUserModalOpen(false)
      }
    } catch (error) {
      console.error("Failed to add user:", error)
    }
  }

  // Show loading while auth is loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading authentication...</p>
        </div>
      </div>
    )
  }

  // Show error if access denied
  if (error && !isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5">
        <HeroSection
          title="Access Denied"
          description="You need administrator privileges to access this page."
          badge="Error"
        />
        <section className="py-16">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-xl font-heading font-bold text-red-600 mb-4">Authentication Error</h2>
                <p className="text-muted-foreground mb-6">{error}</p>
                <div className="flex gap-4 justify-center">
                  <Button asChild className="bg-primary hover:bg-primary-dark">
                    <a href="/dashboard">Back to Dashboard</a>
                  </Button>
                  <Button variant="outline" onClick={() => window.location.reload()}>
                    Retry
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    )
  }

  const totalUsers = users.length
  const adminCount = users.filter((u) => u.role === "admin").length
  const clientCount = users.filter((u) => u.role === "client").length
  const memberCount = users.filter((u) => u.role === "member").length

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5">
      <HeroSection
        title="User Management"
        description="Manage all users, roles, and permissions in the Diva Fitness system."
        badge="Admin Panel"
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="hover:shadow-lg transition-all duration-300 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-heading font-bold text-secondary">{totalUsers}</p>
                    <p className="text-sm text-muted-foreground">Total Users</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border-red-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-heading font-bold text-secondary">{adminCount}</p>
                    <p className="text-sm text-muted-foreground">Administrators</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <UserCheck className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-heading font-bold text-secondary">{clientCount}</p>
                    <p className="text-sm text-muted-foreground">Clients</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-heading font-bold text-secondary">{memberCount}</p>
                    <p className="text-sm text-muted-foreground">Members</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Users Table */}
          <Card className="shadow-lg border-primary/20">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle className="text-xl font-heading text-primary flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  All Users
                </CardTitle>
                <Button
                  onClick={() => setIsAddUserModalOpen(true)}
                  className="bg-primary hover:bg-primary-dark flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add User
                </Button>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  <p className="mt-2 text-muted-foreground">Loading users...</p>
                </div>
              ) : filteredUsers.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>{searchQuery ? "No users match your search" : "No users found"}</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-4 font-medium text-secondary">ID</th>
                        <th className="text-left p-4 font-medium text-secondary">Name</th>
                        <th className="text-left p-4 font-medium text-secondary">Email</th>
                        <th className="text-left p-4 font-medium text-secondary">Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user, index) => (
                        <tr
                          key={user.id}
                          onClick={() => router.push(`/admin/users/${user.id}`)}
                          className={`border-b hover:bg-muted/30 transition-colors cursor-pointer ${index % 2 === 0 ? "bg-white" : "bg-muted/10"}`}
                        >
                          <td className="p-4 font-medium text-secondary">{user.id}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium text-primary">
                                  {user.first_name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <span className="font-medium text-secondary">
                                {user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : "N/A"}
                              </span>
                            </div>
                          </td>
                          <td className="p-4 text-muted-foreground">{user.email}</td>
                          <td className="p-4">
                            <Badge
                              variant={
                                user.role === "admin" ? "destructive" : user.role === "client" ? "default" : "secondary"
                              }
                              className="font-medium"
                            >
                              {user.role === "admin" && <Shield className="w-3 h-3 mr-1" />}
                              {user.role !== "admin" && <Users className="w-3 h-3 mr-1" />}
                              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Back Button */}
          <div className="mt-8">
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              <a href="/dashboard">← Back to Dashboard</a>
            </Button>
          </div>
        </div>
      </section>

      <AddClientModal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        onAddClient={handleAddUser}
      />
    </div>
  )
}
