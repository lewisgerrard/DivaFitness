"use client"

import { useState, useEffect } from "react"
import { CleanPortalLayout } from "@/components/clean-portal-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import AddUserModal from "@/components/add-user-modal"
import { ConfirmDialog } from "@/components/confirm-dialog"
import {
  Users,
  UserPlus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Mail,
  ToggleLeft,
  ToggleRight,
  Shield,
} from "lucide-react"
import { toast } from "sonner"
import { useAuth } from "@/hooks/use-auth"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface User {
  id: number
  first_name: string
  last_name: string
  email: string
  phone?: string
  role: string
  status: string
  created_at: string
  address?: string
  date_of_birth?: string
}

export default function AdminManagementPage() {
  const { user: currentUser } = useAuth()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem("auth-token")

      if (!token) {
        toast.error("Authentication required")
        return
      }

      const response = await fetch("/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        // Filter only admin users
        const adminUsers = (data.users || []).filter((user: User) => user.role === "admin")
        setUsers(adminUsers)
      } else {
        toast.error("Failed to fetch administrators")
      }
    } catch (error) {
      console.error("Error fetching users:", error)
      toast.error("Error loading administrators")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (currentUser?.role === "admin") {
      fetchUsers()
    }
  }, [currentUser])

  // Filter users based on search and status
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Handle user deletion
  const handleDeleteUser = async () => {
    if (!selectedUser) return

    try {
      const token = localStorage.getItem("auth-token")

      const response = await fetch(`/api/admin/users/${selectedUser.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        toast.success("Administrator deleted successfully")
        fetchUsers() // Refresh the list
      } else {
        toast.error("Failed to delete administrator")
      }
    } catch (error) {
      console.error("Error deleting user:", error)
      toast.error("Error deleting administrator")
    } finally {
      setIsDeleteDialogOpen(false)
      setSelectedUser(null)
    }
  }

  // Handle user status toggle
  const handleToggleStatus = async (user: User) => {
    try {
      const token = localStorage.getItem("auth-token")
      const newStatus = user.status === "active" ? "inactive" : "active"

      const response = await fetch(`/api/admin/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        toast.success(`Administrator ${newStatus === "active" ? "activated" : "deactivated"} successfully`)
        fetchUsers() // Refresh the list
      } else {
        toast.error("Failed to update administrator status")
      }
    } catch (error) {
      console.error("Error updating user status:", error)
      toast.error("Error updating administrator status")
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactive</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const userStats = {
    total: users.length,
    active: users.filter((u) => u.status === "active").length,
    inactive: users.filter((u) => u.status === "inactive").length,
  }

  if (currentUser?.role !== "admin") {
    return (
      <CleanPortalLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
            <p className="text-gray-600">You don't have permission to access this page.</p>
          </div>
        </div>
      </CleanPortalLayout>
    )
  }

  return (
    <CleanPortalLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-[#7b329b]">Administrator Management</h1>
            <p className="text-gray-600">Manage administrator accounts and permissions</p>
          </div>
          <Button onClick={() => setIsAddModalOpen(true)} className="bg-[#7b329b] hover:bg-[#6b2c87]">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Administrator
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-[#7b329b]/20 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#7b329b]/10 rounded-lg">
                  <Shield className="w-5 h-5 text-[#7b329b]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{userStats.total}</p>
                  <p className="text-sm text-gray-600">Total Administrators</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#7b329b]/20 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{userStats.active}</p>
                  <p className="text-sm text-gray-600">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#7b329b]/20 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Users className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{userStats.inactive}</p>
                  <p className="text-sm text-gray-600">Inactive</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="border-[#7b329b]/20 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-[#7b329b]/5 to-white border-b border-[#7b329b]/20">
            <CardTitle className="text-[#7b329b]">Administrator Directory</CardTitle>
            <CardDescription>Search and manage administrator accounts</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search administrators by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-[#7b329b]/20 focus:border-[#7b329b] focus:ring-[#7b329b]"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={statusFilter === "all" ? "default" : "outline"}
                  onClick={() => setStatusFilter("all")}
                  className={
                    statusFilter === "all"
                      ? "bg-[#7b329b] hover:bg-[#6b2c87]"
                      : "border-[#7b329b]/20 hover:bg-[#7b329b]/10"
                  }
                >
                  All Status
                </Button>
                <Button
                  variant={statusFilter === "active" ? "default" : "outline"}
                  onClick={() => setStatusFilter("active")}
                  className={
                    statusFilter === "active"
                      ? "bg-green-600 hover:bg-green-700"
                      : "border-green-200 hover:bg-green-50 text-green-600"
                  }
                >
                  Active
                </Button>
                <Button
                  variant={statusFilter === "inactive" ? "default" : "outline"}
                  onClick={() => setStatusFilter("inactive")}
                  className={
                    statusFilter === "inactive"
                      ? "bg-gray-600 hover:bg-gray-700"
                      : "border-gray-200 hover:bg-gray-50 text-gray-600"
                  }
                >
                  Inactive
                </Button>
                {statusFilter !== "all" && (
                  <Button
                    variant="outline"
                    onClick={() => setStatusFilter("all")}
                    className="border-[#7b329b]/20 hover:bg-[#7b329b]/10"
                  >
                    Clear Filter
                  </Button>
                )}
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7b329b]"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Full Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Email</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Phone</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center py-8 text-gray-500">
                          {searchTerm || statusFilter !== "all"
                            ? "No administrators found matching your criteria."
                            : "No administrators found."}
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                <Shield className="w-4 h-4 text-red-600" />
                              </div>
                              <span className="font-medium text-gray-900">{`${user.first_name} ${user.last_name}`}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{user.email}</td>
                          <td className="py-3 px-4 text-gray-600">{user.phone || "Not provided"}</td>
                          <td className="py-3 px-4">{getStatusBadge(user.status)}</td>
                          <td className="py-3 px-4">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit Administrator
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleToggleStatus(user)}>
                                  {user.status === "active" ? (
                                    <>
                                      <ToggleLeft className="w-4 h-4 mr-2" />
                                      Deactivate
                                    </>
                                  ) : (
                                    <>
                                      <ToggleRight className="w-4 h-4 mr-2" />
                                      Activate
                                    </>
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Mail className="w-4 h-4 mr-2" />
                                  Send Email
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() => {
                                    setSelectedUser(user)
                                    setIsDeleteDialogOpen(true)
                                  }}
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete Administrator
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add User Modal */}
        <AddUserModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddUser={async () => {
            await fetchUsers() // Refresh the list
          }}
          defaultRole="admin"
        />

        {/* Delete Confirmation Dialog */}
        <ConfirmDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => {
            setIsDeleteDialogOpen(false)
            setSelectedUser(null)
          }}
          onConfirm={handleDeleteUser}
          title="Delete Administrator"
          description={`Are you sure you want to delete ${selectedUser?.first_name} ${selectedUser?.last_name}? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          variant="destructive"
        />
      </div>
    </CleanPortalLayout>
  )
}
