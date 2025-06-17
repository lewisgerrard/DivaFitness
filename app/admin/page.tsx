"use client"
import Link from "next/link"

const AdminPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/admin/clients" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Manage Users
        </Link>

        <Link href="/dashboard" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          View Dashboard
        </Link>

        <Link
          href="/admin/email-templates"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          Email Templates
        </Link>
      </div>
    </div>
  )
}

export default AdminPage
