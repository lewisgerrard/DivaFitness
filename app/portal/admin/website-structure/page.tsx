import { CleanDashboardLayout } from "@/components/clean-dashboard-layout"

export default function WebsiteStructurePage() {
  return (
    <CleanDashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Website Structure</h1>
            <p className="text-gray-600 mt-2">Manage the structure and content of your website</p>
          </div>
        </div>

        {/* Rest of the existing website structure content */}
        {/* ... existing JSX content ... */}
      </div>
    </CleanDashboardLayout>
  )
}
