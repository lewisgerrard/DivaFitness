"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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

  const navItems = [
    {
      title: "Portal",
      href: "/portal",
      icon: Home,
      exact: true,
    },
    {
      title: "My Profile",
      href: "/portal/profile",
      icon: User,
    },
    {
      title: "Community",
      href: "/portal/community",
      icon: MessageSquare,
      badge: "Soon",
    },
    {
      title: "Classes",
      href: "/portal/classes",
      icon: Calendar,
      badge: "Soon",
    },
    {
      title: "Body Composition",
      href: "/portal/body-composition",
      icon: Activity,
      badge: "Soon",
    },
    {
      title: "My Bookings",
      href: "/portal/bookings",
      icon: BookOpen,
      badge: "Soon",
    },
    {
      title: "Progress Metrics",
      href: "/portal/metrics",
      icon: BarChart3,
      badge: "Soon",
    },
    ...(user?.role === "admin"
      ? [
          {
            title: "User Management",
            href: "/portal/user-management",
            icon: Users,
          },
          {
            title: "Email Templates",
            href: "/portal/email-templates",
            icon: Mail,
          },
          {
            title: "Website Structure",
            href: "/portal/website-structure",
            icon: Globe,
          },
          {
            title: "Components",
            href: "/portal/components",
            icon: Layers,
          },
          {
            title: "Branding",
            href: "/portal/branding",
            icon: Palette,
          },
          {
            title: "Settings",
            href: "/portal/settings",
            icon: Settings,
          },
        ]
      : []),
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
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive(item.href, item.exact) ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100",
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
