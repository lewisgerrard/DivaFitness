"use client"

import { useAuth } from "@/hooks/use-auth"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Shield, Calendar, Mail, Search, PlusCircle, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import AddClientModal from "@/components/add-client-modal"

interface User {
  id: number
  first_name: string | null
  last_name: string | null
  email: string
  phone: string | null
  role: "admin" | "client" | "member"
  created_at: string
}

export default function AdminPage() {
  const { user, loading } = useAuth()
  const [users, setUsers] = useState<User[]>([])
  const [loadingUsers, setLoadingUsers] = useState(true)
  const router = useRouter()

  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user && user.role === "admin") {
      fetchUsers()
    }
  }, [user])

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users")
      if (response.ok) {
        const data = await response.json()
        setUsers(data.users)
      }
    } catch (error) {
      console.error("Failed to fetch users:", error)
    } finally {
      setLoadingUsers(false)
    }
  }

  const handleAddUser = async (newUser: any) => {
    try {
      const response = await fetch("/api/admin/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      })
      if (response.ok) {
        const data = await response.json()
        setUsers((prev) => [...prev, data.user])
        setIsAddUserModalOpen(false)
      }
    } catch (error) {
      console.error("Failed to add user:", error)
    }
  }

  const handleDeleteUser = async (userId: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return
    try {
      const response = await fetch(`/api/admin/clients/${userId}`, {
        method: "DELETE",
      })
      if (response.ok) {
        setUsers((prev) => prev.filter((u) => u.id !== userId))
      }
    } catch (error) {
      console.error("Failed to delete user:", error)
    }
  }

  if (loading || loadingUsers) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  if (!user || user.role !== "admin") {
    return null
  }

  const adminUsers = users.filter((u) => u.role === "admin")
  const clientUsers = users.filter((u) => u.role === "client")
  const memberUsers = users.filter((u) => u.role === "member")

  const filteredUsers = users.filter(
    (user) =>
      user.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-secondary mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">Manage users and system settings</p>
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
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-secondary">{adminUsers.length}</p>
                  <p className="text-sm text-muted-foreground">Administrators</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-secondary">{clientUsers.length}</p>
                  <p className="text-sm text-muted-foreground">Clients</p>
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
                  <p className="text-2xl font-bold text-secondary">{memberUsers.length}</p>
                  <p className="text-sm text-muted-foreground">Members</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users..."
              className="pl-8 w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            onClick={() => setIsAddUserModalOpen(true)}
            className="bg-primary hover:bg-primary-dark flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            Add User
          </Button>
        </div>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Users className="w-5 h-5" />
              All Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Debug info - remove after fixing */}
            {process.env.NODE_ENV === "development" && (
              <div className="mb-4 p-2 bg-yellow-100 rounded text-sm">
                <p>Debug: Found {users.length} users</p>
                <p>Filtered: {filteredUsers.length} users</p>
                {users.length > 0 && <p>Sample user: {JSON.stringify(users[0], null, 2)}</p>}
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-secondary">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-secondary">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-secondary">Role</th>
                    <th className="text-left py-3 px-4 font-medium text-secondary">Created</th>
                    <th className="text-left py-3 px-4 font-medium text-secondary">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-secondary">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((userData) => (
                    <tr key={userData.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-primary">
                              {userData.first_name?.charAt(0).toUpperCase() || userData.email.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span className="font-medium text-secondary">
                            {userData.first_name && userData.last_name
                              ? `${userData.first_name} ${userData.last_name}`
                              : userData.email}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{userData.email}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            userData.role === "admin"
                              ? "bg-red-100 text-red-800"
                              : userData.role === "client"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                          }`}
                        >
                          {userData.role === "admin" ? (
                            <>
                              <Shield className="w-3 h-3 mr-1" />
                              Admin
                            </>
                          ) : (
                            <>
                              <Users className="w-3 h-3 mr-1" />
                              {userData.role.charAt(0).toUpperCase() + userData.role.slice(1)}
                            </>
                          )}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {userData.created_at ? new Date(userData.created_at).toLocaleDateString() : "N/A"}
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                          Active
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/clients/${userData.id}`}>
                              <Edit className="w-3 h-3 mr-1" />
                              Edit
                            </Link>
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteUser(userData.id)}>
                            <Trash2 className="w-3 h-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && users.length > 0 && (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No users found matching your search</p>
              </div>
            )}

            {users.length === 0 && (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No users found</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {loadingUsers ? "Loading..." : "Try refreshing the page or check your database connection"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 flex gap-4">
          <Button asChild variant="outline">
            <Link href="/profile">← Back to Profile</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">
              <Mail className="w-4 h-4 mr-2" />
              View Contact Submissions
            </Link>
          </Button>
        </div>
        <AddClientModal
          isOpen={isAddUserModalOpen}
          onClose={() => setIsAddUserModalOpen(false)}
          onAddClient={handleAddUser}
        />
      </div>
    </div>
  )
}
