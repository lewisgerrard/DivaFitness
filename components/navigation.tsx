"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/faqs", label: "FAQs" },
    { href: "/contact", label: "Contact" },
  ]

  const handleLogout = async () => {
    await logout()
    window.location.href = "/"
  }

  return (
    <nav className="bg-gray-50 sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Left Side */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/diva-logo-fitness.png"
              alt="Diva Fitness"
              width={50}
              height={50}
              className="h-12 w-12"
              priority
            />
            <span className="font-heading font-bold text-xl text-black">Diva Fitness</span>
          </Link>

          {/* Desktop Navigation - Right Side */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {/* Render Home and About */}
              <Link
                href="/"
                className="text-black/80 hover:text-black transition-colors duration-200 font-medium text-sm"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-black/80 hover:text-black transition-colors duration-200 font-medium text-sm"
              >
                About
              </Link>

              {/* Services Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-black/80 hover:text-black transition-colors duration-200 font-medium text-sm flex items-center h-auto p-0 hover:bg-transparent"
                  >
                    Services
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-40 z-50">
                  <DropdownMenuItem asChild>
                    <Link href="/training" className="flex items-center cursor-pointer">
                      Training
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/nutrition" className="flex items-center cursor-pointer">
                      Nutrition
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Render FAQs and Contact */}
              <Link
                href="/faqs"
                className="text-black/80 hover:text-black transition-colors duration-200 font-medium text-sm"
              >
                FAQs
              </Link>
              <Link
                href="/contact"
                className="text-black/80 hover:text-black transition-colors duration-200 font-medium text-sm"
              >
                Contact
              </Link>
            </div>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="bg-primary text-white hover:bg-primary/90 font-medium">
                    <User className="w-4 h-4 mr-2" />
                    {user.first_name || (user.name ? user.name.split(" ")[0] : user.email?.split("@")[0] || "User")}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild size="sm" className="bg-primary text-white hover:bg-primary/90 font-semibold">
                <Link href="/login">Login</Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-black hover:text-black/80 transition-colors">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 border-t border-gray-200">
              {/* Mobile Navigation Items */}
              <Link
                href="/"
                className="block px-3 py-2 text-black/80 hover:text-black hover:bg-gray-100 rounded-md transition-colors duration-200 text-sm"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-black/80 hover:text-black hover:bg-gray-100 rounded-md transition-colors duration-200 text-sm"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>

              {/* Mobile Services Links */}
              <div className="px-3 py-1">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Services</div>
                <Link
                  href="/training"
                  className="block px-3 py-2 text-black/80 hover:text-black hover:bg-gray-100 rounded-md transition-colors duration-200 text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  Training
                </Link>
                <Link
                  href="/nutrition"
                  className="block px-3 py-2 text-black/80 hover:text-black hover:bg-gray-100 rounded-md transition-colors duration-200 text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  Nutrition
                </Link>
              </div>

              <Link
                href="/faqs"
                className="block px-3 py-2 text-black/80 hover:text-black hover:bg-gray-100 rounded-md transition-colors duration-200 text-sm"
                onClick={() => setIsOpen(false)}
              >
                FAQs
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 text-black/80 hover:text-black hover:bg-gray-100 rounded-md transition-colors duration-200 text-sm"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <div className="px-3 py-2">
                {user ? (
                  <div className="space-y-2">
                    <Link
                      href="/profile"
                      className="block w-full text-left px-3 py-2 text-black/80 hover:text-black hover:bg-gray-100 rounded-md transition-colors text-sm"
                    >
                      My Profile
                    </Link>
                    {user.role === "admin" && (
                      <Link
                        href="/admin"
                        className="block w-full text-left px-3 py-2 text-black/80 hover:text-black hover:bg-gray-100 rounded-md transition-colors text-sm"
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 text-black/80 hover:text-black hover:bg-gray-100 rounded-md transition-colors text-sm"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Button asChild size="sm" className="w-full bg-primary text-white hover:bg-primary/90 font-semibold">
                    <Link href="/login">Login</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
