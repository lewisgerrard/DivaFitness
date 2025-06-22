"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, Settings, LogOut, Home, ChevronLeft, ChevronRight, Users, Shield } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function CleanPortalSidebar() {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  // Define navigation items based on role
  const getNavItems = () => {
    const baseItems = [{ label: "Dashboard", href: "/portal", icon: Home }]

    if (user?.role === "admin") {
      return [
        ...baseItems,
        { label: "Client Management", href: "/portal/client-management", icon: Users },
        { label: "Admin Management", href: "/portal/admin-management", icon: Shield },
      ]
    }

    return baseItems
  }

  // Only allow client or admin access
  if (!user || (user.role !== "admin" && user.role !== "client")) {
    return null
  }

  const navItems = getNavItems()
  const isAdmin = user.role === "admin"

  return (
    <div
      className={cn(
        "bg-gradient-to-b from-white to-purple-50/30 border-r border-[#7b329b]/20 h-screen flex flex-col transition-all duration-300 flex-shrink-0 shadow-sm",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Branded Header */}
      <div className="p-4 border-b border-[#7b329b]/20 bg-gradient-to-r from-[#7b329b] to-[#6b2c87]">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 bg-white rounded-lg p-1 shadow-sm">
                <Image
                  src="/diva-logo-fitness.png"
                  alt="Diva Fitness"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="font-bold text-white text-lg">Diva Fitness</h1>
                <p className="text-xs text-[#c77dff]">{isAdmin ? "Admin Portal" : "Client Portal"}</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className={cn("h-8 w-8 p-0 text-white hover:bg-white/20", collapsed && "mx-auto")}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-10 text-gray-700 hover:text-[#7b329b] hover:bg-[#7b329b]/10",
                  pathname === item.href && "bg-[#7b329b]/10 text-[#7b329b] font-medium shadow-sm",
                  collapsed && "justify-center px-2",
                )}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {!collapsed && <span className="flex-1 text-left">{item.label}</span>}
              </Button>
            </Link>
          ))}
        </div>
      </nav>

      {/* Branded User Menu */}
      <div className="p-4 border-t border-[#7b329b]/20 bg-gradient-to-r from-[#7b329b]/5 to-white">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 h-12 hover:bg-[#7b329b]/10 rounded-xl",
                collapsed && "justify-center px-2",
              )}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-[#7b329b] to-[#6b2c87] rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                <User className="w-4 h-4 text-white" />
              </div>
              {!collapsed && (
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-gray-900">{user?.first_name || user?.name}</p>
                  <p className="text-xs text-[#7b329b] font-medium">{user?.role?.toUpperCase()}</p>
                </div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 border-[#7b329b]/20">
            <DropdownMenuLabel className="bg-gradient-to-r from-[#7b329b]/5 to-white">
              <div>
                <p className="font-semibold text-gray-900">{user?.first_name || user?.name}</p>
                <p className="text-sm text-purple-600">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#7b329b]/20" />
            <DropdownMenuItem className="hover:bg-[#7b329b]/10">
              <Settings className="mr-2 h-4 w-4 text-purple-600" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[#7b329b]/20" />
            <DropdownMenuItem onClick={handleLogout} className="hover:bg-red-50 text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
