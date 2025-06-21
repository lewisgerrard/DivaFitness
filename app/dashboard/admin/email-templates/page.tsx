import { CleanDashboardLayout } from '@/components/clean-dashboard-layout'

export default function EmailTemplatesPage() {
  return (
    <CleanDashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Email Templates</h1>
            <p className="text-gray-600 mt-2">Manage and customize email templates</p>
          </div>
        </div>
        
        {/* Rest of the existing email templates content */}
        {/* ... existing JSX content ... */}
      </div>
    </CleanDashboardLayout>
  )
}
