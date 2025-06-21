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
import {
  User,
  Settings,
  LogOut,
  Home,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Apple,
  MessageSquare,
  BookOpen,
  HelpCircle,
  Edit3,
  TrendingUp,
  Scale,
  Users,
  FileText,
  Shield,
} from "lucide-react"
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

  const navItems = [
    { label: "Portal Home", href: "/portal", icon: Home, roles: ["member", "client", "admin"] },
    { label: "My Profile", href: "/portal/profile", icon: User, roles: ["member", "client", "admin"] },
    { label: "Bookings", href: "/portal/bookings", icon: Calendar, roles: ["member", "client", "admin"] },
    { label: "Messages", href: "/portal/messages", icon: MessageSquare, roles: ["member", "client", "admin"] },
    { label: "Resources", href: "/portal/resources", icon: BookOpen, roles: ["member", "client", "admin"] },
    { label: "Support", href: "/portal/support", icon: HelpCircle, roles: ["member", "client", "admin"] },
    { label: "Body Composition", href: "/portal/body-composition", icon: Scale, roles: ["client", "admin"] },
    { label: "Nutrition", href: "/portal/nutrition", icon: Apple, roles: ["client", "admin"] },
    { label: "Session History", href: "/portal/session-history", icon: FileText, roles: ["client", "admin"] },
    { label: "User Management", href: "/portal/user-management", icon: Users, roles: ["admin"] },
    { label: "Content Manager", href: "/portal/content-manager", icon: Edit3, roles: ["admin"] },
    { label: "Web Analytics", href: "/portal/analytics", icon: TrendingUp, roles: ["admin"] },
    { label: "System Settings", href: "/portal/settings", icon: Settings, roles: ["admin"] },
    { label: "Admin Panel", href: "/portal/admin", icon: Shield, roles: ["admin"] },
  ]

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
                <p className="text-xs text-[#c77dff]">Member Portal</p>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="relative w-8 h-8 bg-white rounded-lg p-1 shadow-sm mx-auto">
              <Image
                src="/diva-logo-fitness.png"
                alt="Diva Fitness"
                width={24}
                height={24}
                className="w-full h-full object-contain"
              />
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8 p-0 text-white hover:bg-white/20"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {/* Core Navigation */}
        <div className="space-y-1">
          {navItems
            .filter(
              (item) =>
                (item.roles.includes(user?.role || "member") &&
                  !["client", "admin"].every((role) => item.roles.includes(role) && item.roles.length === 1) &&
                  !item.roles.includes("admin")) ||
                item.roles.includes("member") ||
                item.roles.includes("client"),
            )
            .slice(0, 6)
            .map((item) => (
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

        {/* Client Features Section */}
        {(user?.role === "client" || user?.role === "admin") && (
          <>
            {!collapsed && (
              <div className="pt-6 pb-2">
                <div className="flex items-center gap-2 px-3">
                  <div className="h-px bg-gradient-to-r from-[#7b329b]/20 to-transparent flex-1"></div>
                  <p className="text-xs font-semibold text-[#7b329b] uppercase tracking-wider">Client Features</p>
                  <div className="h-px bg-gradient-to-l from-[#7b329b]/20 to-transparent flex-1"></div>
                </div>
              </div>
            )}
            <div className="space-y-1">
              {navItems
                .filter(
                  (item) =>
                    (item.roles.includes("client") || item.roles.includes("admin")) &&
                    !item.roles.includes("member") &&
                    !["admin"].every((role) => item.roles.includes(role) && item.roles.length === 1),
                )
                .map((item) => (
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
          </>
        )}

        {/* Admin Tools Section */}
        {user?.role === "admin" && (
          <>
            {!collapsed && (
              <div className="pt-6 pb-2">
                <div className="flex items-center gap-2 px-3">
                  <div className="h-px bg-gradient-to-r from-[#7b329b]/20 to-transparent flex-1"></div>
                  <p className="text-xs font-semibold text-[#7b329b] uppercase tracking-wider">Admin Tools</p>
                  <div className="h-px bg-gradient-to-l from-[#7b329b]/20 to-transparent flex-1"></div>
                </div>
              </div>
            )}
            <div className="space-y-1">
              {navItems
                .filter((item) => item.roles.includes("admin") && item.roles.length === 1)
                .map((item) => (
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
          </>
        )}
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
