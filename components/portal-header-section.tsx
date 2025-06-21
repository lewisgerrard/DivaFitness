"use client"

import { useAuth } from "@/hooks/use-auth"
import Image from "next/image"

export function PortalHeaderSection() {
  const { user } = useAuth()

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 rounded-3xl shadow-2xl">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>
      {/* Main Content */}
      <div className="relative px-8 py-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Left Section - Welcome Message */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl p-3 shadow-lg border border-white/30">
                  <Image
                    src="/diva-logo-fitness.png"
                    alt="Diva Fitness"
                    width={40}
                    height={40}
                    className="w-full h-full object-contain filter brightness-0 invert"
                  />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white shadow-sm"></div>
              </div>

              <div className="space-y-1">
                <h1 className="text-4xl font-bold text-white leading-tight">
                  Welcome back, <span className="text-purple-200">{user?.first_name || user?.name || "User"}</span>!
                </h1>
                <p className="text-purple-200 text-lg font-medium">Ready to crush your fitness goals today?</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center gap-6 pt-2">
              <div className="flex items-center gap-2 text-purple-200">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Active Session</span>
              </div>
              <div className="flex items-center gap-2 text-purple-200">
                <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
                <span className="text-sm font-medium">Member since 2024</span>
              </div>
            </div>
          </div>

          {/* Right Section - Status Card */}
          <div className="lg:flex-shrink-0">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl min-w-[200px]">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl mx-auto flex items-center justify-center">
                  <div className="w-6 h-6 bg-purple-300 rounded-full"></div>
                </div>
                <div>
                  <p className="text-xs text-purple-200 uppercase tracking-wider font-semibold mb-1">
                    Membership Status
                  </p>
                  <p className="text-2xl font-bold text-white">{user?.role?.toUpperCase() || "PREMIUM"}</p>
                </div>
                <div className="pt-2 border-t border-white/20">
                  <p className="text-xs text-purple-200">Next session in 2 days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-20 translate-x-20"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16"></div>
      <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-white/3 rounded-full"></div>
    </div>
  )
}
