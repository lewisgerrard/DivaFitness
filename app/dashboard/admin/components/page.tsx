import type React from "react"

interface AdminPageProps {
  children: React.ReactNode
}

const AdminPage = ({ children }: AdminPageProps) => {
  return (
    <div className="flex flex-col h-full">
      <AdminPageHeader />
      <main className="flex-grow p-4">{children}</main>
    </div>
  )
}

const AdminPageHeader = () => {
  return (
    <div className="bg-gray-100 p-4 flex items-center justify-between">
      <h1 className="text-2xl font-semibold">Meet Emma</h1>
      {/* Add any other header elements here, like user info or navigation */}
    </div>
  )
}

export default AdminPage
