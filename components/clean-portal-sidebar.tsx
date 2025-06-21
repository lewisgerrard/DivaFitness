"use client"

import Link from "next/link"
import { useState } from "react"
import { ChevronDown, User, Settings, LogOut, Home } from "lucide-react"

export function CleanPortalSidebar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/login"
  }

  return (
    <div className="bg-white border-r border-gray-200 h-screen w-64 flex flex-col shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Portal</h2>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link
              href="/portal/dashboard"
              className="flex items-center py-2 px-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/portal/profile"
              className="flex items-center py-2 px-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              My Profile
            </Link>
          </li>
          <li>
            <Link
              href="/portal/settings"
              className="flex items-center py-2 px-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Settings
            </Link>
          </li>
          <li>
            <Link
              href="/portal/help"
              className="flex items-center py-2 px-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Help
            </Link>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between py-2 px-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span className="text-sm">User Menu</span>
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg">
              <Link
                href="/portal"
                className="flex items-center space-x-2 py-2 px-3 text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg"
              >
                <Home className="w-4 h-4" />
                <span>Portal</span>
              </Link>
              <Link
                href="/portal/settings"
                className="flex items-center space-x-2 py-2 px-3 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-2 py-2 px-3 text-sm text-red-600 hover:bg-red-50 rounded-b-lg"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
