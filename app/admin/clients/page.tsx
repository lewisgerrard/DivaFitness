import Link from "next/link"

const AdminClientsPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Admin - Clients</h1>

      <div className="flex space-x-4 mb-4">
        <Link href="#add-user" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add New User
        </Link>
        <Link href="/admin" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          Back to Dashboard
        </Link>
        <Link
          href="/admin/email-templates"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          View Templates
        </Link>
      </div>

      {/* Placeholder for client list or other content */}
      <p>This is the admin clients page. You can manage clients here.</p>
    </div>
  )
}

export default AdminClientsPage
