import { CleanDashboardLayout } from "@/components/clean-dashboard-layout"

export default function UserManagementPage() {
  return (
    <CleanDashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600 mt-2">Manage members, clients, and staff accounts</p>
          </div>
        </div>

        {/* Rest of the existing user management content */}
        {/* ... existing JSX content ... */}
      </div>
    </CleanDashboardLayout>
  )
}
