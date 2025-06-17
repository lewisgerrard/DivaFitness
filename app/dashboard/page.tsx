import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="mb-4">Welcome to your dashboard! Here you can manage your account and access various features.</p>

      <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <Link href="/profile" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          View Profile
        </Link>
        <Link href="/contact" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Contact Support
        </Link>
        <Link href="/services" className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
          Explore Services
        </Link>
      </div>
    </div>
  )
}
