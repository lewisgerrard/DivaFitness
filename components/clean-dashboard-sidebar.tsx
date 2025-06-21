"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
  Users,
  Calendar,
  Activity,
  MessageSquare,
  Settings,
  LogOut,
  Home,
  BookOpen,
  Award,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Edit3,
} from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { cn } from "@/lib/utils"

export function CleanDashboardSidebar() {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  const memberNavItems = [
    { label: "Start", href: "/portal", icon: Home },
    { label: "My Profile", href: "/portal/member/profile", icon: User },
    { label: "Sessions", href: "/portal/member/sessions", icon: Calendar, badge: "Soon" },
    { label: "Progress Info", href: "/portal/client/metrics", icon: BarChart3, badge: "Soon" },
    { label: "Body Composition", href: "/portal/client/body-composition", icon: Activity, badge: "Soon" },
    { label: "Scheduling", href: "/portal/member/scheduling", icon: Calendar, badge: "Soon" },
    { label: "Community", href: "/portal/member/community", icon: MessageSquare, badge: "Soon" },
    { label: "Achievements", href: "/portal/member/achievements", icon: Award, badge: "Soon" },
    { label: "My Bookings", href: "/portal/client/bookings", icon: BookOpen, badge: "Soon" },
  ]

  const adminNavItems = [
    { label: "Start", href: "/portal", icon: Home },
    { label: "User Management", href: "/portal/admin/user-management", icon: Users },
    { label: "Content Management", href: "/portal/admin/content-management", icon: Edit3 },
    { label: "Settings", href: "/portal/admin/settings", icon: Settings },
  ]

  const navItems = user?.role === "admin" ? adminNavItems : memberNavItems

  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 h-screen flex flex-col transition-all duration-300 flex-shrink-0",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <div>
                <h1 className="font-semibold text-gray-900">Diva Fitness</h1>
                <p className="text-xs text-gray-500">Portal</p>
              </div>
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)} className="h-8 w-8 p-0">
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant={pathname === item.href ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 h-10 text-gray-700 hover:text-primary hover:bg-primary/5",
                pathname === item.href && "bg-primary/10 text-primary font-medium",
                collapsed && "justify-center px-2",
              )}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="text-xs bg-gray-200 text-gray-600">
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Button>
          </Link>
        ))}
      </nav>

      {/* User Menu */}
      <div className="p-4 border-t border-gray-100">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn("w-full justify-start gap-3 h-12 hover:bg-gray-50", collapsed && "justify-center px-2")}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-white" />
              </div>
              {!collapsed && (
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-gray-900">{user?.first_name || user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div>
                <p className="font-medium">{user?.first_name || user?.name}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/portal/member/profile")}>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
