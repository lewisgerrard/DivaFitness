"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Trash2, Edit, Plus, Search } from "lucide-react"

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
  const { user, loading } = useAuth()
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  console.log("🔍 Admin page - Auth loading:", loading, "User:", user)

  // Don't redirect immediately, wait for auth to load
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

      // User is admin, fetch users
      console.log("✅ User is admin, fetching users")
      fetchUsers()
    }
  }, [loading, user, router])

  const fetchUsers = async () => {
    try {
      console.log("📡 Fetching users from API...")

      // Debug: Check if we have cookies before making request
      console.log("🍪 Document cookies:", document.cookie)

      const response = await fetch("/api/admin/users", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })

      console.log("📡 Users API response status:", response.status)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error("❌ API Error:", errorData)
        throw new Error(`Failed to fetch users: ${response.status}`)
      }

      const data = await response.json()
      console.log("✅ Users data received:", data)

      setUsers(data.users || [])
      setFilteredUsers(data.users || [])
      setError(null)
    } catch (error) {
      console.error("❌ Error fetching users:", error)
      setError("Failed to load users")
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

  const handleDeleteUser = async (userId: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
        credentials: "include",
      })

      if (response.ok) {
        setUsers(users.filter((user) => user.id !== userId))
        setFilteredUsers(filteredUsers.filter((user) => user.id !== userId))
      } else {
        alert("Failed to delete user")
      }
    } catch (error) {
      console.error("Error deleting user:", error)
      alert("Failed to delete user")
    }
  }

  // Show loading while auth is loading
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  // Show error if access denied
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-6 text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={() => router.push("/dashboard")}>Back to Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const totalUsers = users.length
  const adminCount = users.filter((u) => u.role === "admin").length
  const clientCount = users.filter((u) => u.role === "client").length
  const memberCount = users.filter((u) => u.role === "member").length

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">User Management</h1>
        <p className="text-gray-600">Manage all users in the system</p>
      </div>

      {/* Debug Info */}
      <Card className="mb-6 bg-blue-50">
        <CardContent className="p-4">
          <h3 className="font-bold mb-2">Debug Info:</h3>
          <p>
            Current User: {user?.email} ({user?.role})
          </p>
          <p>Cookies: {typeof document !== "undefined" ? document.cookie : "N/A"}</p>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-gray-600">Total Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-red-600">{adminCount}</div>
            <p className="text-gray-600">Admins</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">{clientCount}</div>
            <p className="text-gray-600">Clients</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">{memberCount}</div>
            <p className="text-gray-600">Members</p>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Users</CardTitle>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading users...</div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {searchQuery ? "No users match your search" : "No users found"}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">ID</th>
                    <th className="text-left p-2">Name</th>
                    <th className="text-left p-2">Email</th>
                    <th className="text-left p-2">Role</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="p-2">{user.id}</td>
                      <td className="p-2">
                        {user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : "N/A"}
                      </td>
                      <td className="p-2">{user.email}</td>
                      <td className="p-2">
                        <Badge
                          variant={
                            user.role === "admin" ? "destructive" : user.role === "client" ? "default" : "secondary"
                          }
                        >
                          {user.role}
                        </Badge>
                      </td>
                      <td className="p-2">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => router.push(`/admin/users/${user.id}`)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDeleteUser(user.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
