"use client"

import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/hooks/use-auth"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { usePathname } from "next/navigation"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/login"

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
      <AuthProvider>
        {!isLoginPage && <Navigation />}
        <main className={!isLoginPage ? "" : "min-h-screen"}>{children}</main>
        {!isLoginPage && <Footer />}
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  )
}
