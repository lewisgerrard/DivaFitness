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

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/faqs", label: "FAQs" },
    { href: "/contact", label: "Contact" },
  ]

  const handleLogout = async () => {
    await logout()
    window.location.href = "/"
  }

  return (
    <nav className="bg-primary sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Left Side */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/logo-icon.png"
              alt="Diva Fitness"
              width={40}
              height={40}
              className="h-10 w-10 brightness-0 invert"
              priority
            />
            <span className="font-heading font-bold text-xl text-white">Diva Fitness</span>
          </Link>

          {/* Desktop Navigation - Right Side */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-white/90 hover:text-white transition-colors duration-200 font-medium text-sm"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                    <User className="w-4 h-4 mr-2" />
                    {user.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      My Profile
                    </Link>
                  </DropdownMenuItem>
                  {user.role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        Admin Panel
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild size="sm" className="bg-white text-primary hover:bg-white/90 font-semibold">
                <Link href="/login">Login</Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-white/80 transition-colors">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-primary border-t border-white/20">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-md transition-colors duration-200 text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-3 py-2">
                {user ? (
                  <div className="space-y-2">
                    <Link
                      href="/profile"
                      className="block w-full text-left px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-md transition-colors text-sm"
                    >
                      My Profile
                    </Link>
                    {user.role === "admin" && (
                      <Link
                        href="/admin"
                        className="block w-full text-left px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-md transition-colors text-sm"
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-md transition-colors text-sm"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Button asChild size="sm" className="w-full bg-white text-primary hover:bg-white/90 font-semibold">
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
