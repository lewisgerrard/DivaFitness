import type React from "react"
import type { Metadata } from "next"
import ClientLayout from "./ClientLayout"
import "./globals.css"

export const metadata: Metadata = {
  title: "Diva Fitness",
  description: "Personal Training & Fitness Studio - Transform your body and mind with expert guidance",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}
