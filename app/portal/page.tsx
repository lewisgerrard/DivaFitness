import { CleanPortalLayout } from "@/components/clean-portal-layout"
import { PortalHeaderSection } from "@/components/portal-header-section"

export default function PortalPage() {
  return (
    <CleanPortalLayout>
      <div className="space-y-8">
        <PortalHeaderSection />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          <div className="col-span-full text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Portal Features Coming Soon</h2>
            <p className="text-gray-600">We're building amazing features for your fitness journey.</p>
          </div>
        </div>
      </div>
    </CleanPortalLayout>
  )
}
