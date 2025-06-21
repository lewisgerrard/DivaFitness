import { CleanDashboardLayout } from "@/components/clean-dashboard-layout"

export default function SettingsPage() {
  return (
    <CleanDashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-2">Configure system settings and preferences</p>
          </div>
        </div>

        {/* Rest of the existing settings content */}
        {/* ... existing JSX content ... */}
      </div>
    </CleanDashboardLayout>
  )
}
