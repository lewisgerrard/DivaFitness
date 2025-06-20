"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Settings, LogOut, Sparkles } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface HeroDashboardProps {
  title?: string
  description?: string
  showUserGreeting?: boolean
}

export function HeroDashboard({
  title = "Dashboard",
  description = "Your personal fitness portal",
  showUserGreeting = true,
}: HeroDashboardProps) {
  const router = useRouter()
  const { user, logout } = useAuth()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return "Good morning"
    if (hour < 17) return "Good afternoon"
    return "Good evening"
  }

  return (
    <section className="relative bg-primary h-[300px] flex items-center justify-center overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <Image
          src="/images/studio-exterior-full.jpg"
          alt="Diva Fitness Studio"
          fill
          className="object-cover opacity-20"
          sizes="100vw"
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary-dark/90" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">{showUserGreeting ? "Welcome Back" : title}</span>
        </div>

        {showUserGreeting && user ? (
          <>
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3 leading-tight">
              {getGreeting()},{" "}
              <span className="bg-gradient-to-r from-white to-accent-light bg-clip-text text-transparent">
                {user.first_name || user.name}!
              </span>
            </h1>

            <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto leading-relaxed opacity-90">
              {description} - manage your profile, track progress, and access all platform features
            </p>

            <div className="flex items-center justify-center gap-4 text-sm">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {user.role}
              </Badge>
              <span className="text-white/80">
                {currentTime.toLocaleDateString("en-GB", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="text-white/80">
                {currentTime.toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </>
        ) : (
          <>
            <h1 className="font-heading text-2xl md:text-3xl font-bold mb-4 leading-tight">{title}</h1>
            <p className="text-lg mb-6 max-w-2xl mx-auto leading-relaxed opacity-90">{description}</p>
          </>
        )}
      </div>

      {/* Header Controls */}
      <div className="absolute top-4 right-4 flex items-center gap-3">
        <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
          <Bell className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
          <Settings className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-white hover:bg-white/20">
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    </section>
  )
}

export default HeroDashboard
