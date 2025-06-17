"use client"

import type React from "react"
import "./globals.css"
import { Poppins, Roboto } from "next/font/google"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { AuthProvider } from "@/hooks/use-auth"
import { usePathname } from "next/navigation"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-heading",
})

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
})

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/login"

  return (
    <html lang="en" className={poppins.variable + " " + roboto.variable}>
      <body className="font-body bg-white text-secondary">
        <AuthProvider>
          <Navigation />
          <main>{children}</main>
          {!isLoginPage && <Footer />}
        </AuthProvider>
      </body>
    </html>
  )
}
