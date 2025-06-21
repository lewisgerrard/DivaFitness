"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Home,
  User,
  Users,
  Calendar,
  MessageSquare,
  BarChart3,
  Activity,
  BookOpen,
  Mail,
  Globe,
  Layers,
  Palette,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function DashboardSidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  const memberNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
      exact: true,
    },
    {
      title: "My Profile",
      href: "/dashboard/member/profile",
      icon: User,
    },
    {
      title: "Community",
      href: "/dashboard/member/community",
      icon: MessageSquare,
      badge: "Soon",
    },
    {
      title: "Classes",
      href: "/dashboard/member/classes",
      icon: Calendar,
      badge: "Soon",
    },
  ]

  const clientNavItems = [
    {
      title: "Body Composition",
      href: "/dashboard/client/body-composition",
      icon: Activity,
      badge: "Soon",
    },
    {
      title: "My Bookings",
      href: "/dashboard/client/bookings",
      icon: BookOpen,
      badge: "Soon",
    },
    {
      title: "Progress Metrics",
      href: "/dashboard/client/metrics",
      icon: BarChart3,
      badge: "Soon",
    },
  ]

  const adminNavItems = [
    {
      title: "User Management",
      href: "/dashboard/admin/user-management",
      icon: Users,
    },
    {
      title: "Email Templates",
      href: "/dashboard/admin/email-templates",
      icon: Mail,
    },
    {
      title: "Website Structure",
      href: "/dashboard/admin/website-structure",
      icon: Globe,
    },
    {
      title: "Components",
      href: "/dashboard/admin/components",
      icon: Layers,
    },
    {
      title: "Branding",
      href: "/dashboard/admin/branding",
      icon: Palette,
    },
    {
      title: "Settings",
      href: "/dashboard/admin/settings",
      icon: Settings,
    },
  ]

  const isActive = (href: string, exact = false) => {
    if (exact) {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-white border-r border-gray-200 transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Diva Fitness</h2>
              <p className="text-xs text-gray-500">Portal</p>
            </div>
          </div>
        )}
        <Button variant="ghost" size="sm" onClick={onToggle} className="h-8 w-8 p-0">
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">{user?.first_name || user?.name || "User"}</p>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {user?.role}
                </Badge>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {/* Member Section */}
          <div className="space-y-1">
            {!collapsed && (
              <div className="px-3 py-2">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Member</h3>
              </div>
            )}
            {memberNavItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive(item.href, item.exact) ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100",
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1">{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {!collapsed && <Separator className="my-4" />}

          {/* Client Section */}
          <div className="space-y-1">
            {!collapsed && (
              <div className="px-3 py-2">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Client</h3>
              </div>
            )}
            {clientNavItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive(item.href) ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100",
                    item.badge && "opacity-60 cursor-not-allowed",
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1">{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* Admin Section - Only show if user is admin */}
          {user?.role === "admin" && (
            <>
              {!collapsed && <Separator className="my-4" />}
              <div className="space-y-1">
                {!collapsed && (
                  <div className="px-3 py-2">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Admin</h3>
                  </div>
                )}
                {adminNavItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <div
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        isActive(item.href) ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100",
                      )}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span className="flex-1">{item.title}</span>}
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-200">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={cn("w-full justify-start text-gray-700 hover:bg-gray-100", collapsed && "justify-center")}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span className="ml-3">Sign Out</span>}
        </Button>
      </div>
    </div>
  )
}
