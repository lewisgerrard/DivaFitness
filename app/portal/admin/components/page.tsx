import { CleanDashboardLayout } from "@/components/clean-dashboard-layout"

export default function ComponentsPage() {
  return (
    <CleanDashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">UI Components</h1>
            <p className="text-gray-600 mt-2">Component library and design system</p>
          </div>
        </div>

        {/* Rest of the existing components content */}
        {/* ... existing JSX content ... */}
      </div>
    </CleanDashboardLayout>
  )
}
