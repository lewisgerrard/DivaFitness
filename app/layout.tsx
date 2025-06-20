import type React from "react"
import ClientLayout from "./client-layout"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/react"
import { GoogleAnalytics } from "@next/third-parties/google"
import "./globals.css"
import { Suspense } from "react"

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
  return (
    <ClientLayout>
      <Suspense>
        {children}
        <Analytics />
        <GoogleAnalytics gaId="GA_MEASUREMENT_ID" />
      </Suspense>
    </ClientLayout>
  )
}
