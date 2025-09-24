import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import ClientLayout from "./client-layout"
import GoogleAnalytics from "@/lib/google-analytics"
import { Suspense } from "react"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Diva Fitness - Personal Training & Nutrition Coaching",
  description:
    "Transform your fitness journey with expert personal training and nutrition coaching. Specializing in women's fitness, senior fitness, and sustainable lifestyle changes.",
  keywords: "personal trainer, nutrition coaching, women's fitness, senior fitness, weight loss, strength training",
  authors: [{ name: "Emma - Diva Fitness" }],
  creator: "Diva Fitness",
  publisher: "Diva Fitness",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_GB",
    title: "Diva Fitness - Personal Training & Nutrition Coaching",
    description: "Transform your fitness journey with expert personal training and nutrition coaching.",
    siteName: "Diva Fitness",
    images: [
      {
        url: "/logo-with-text.png",
        width: 1200,
        height: 630,
        alt: "Diva Fitness Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diva Fitness - Personal Training & Nutrition Coaching",
    description: "Transform your fitness journey with expert personal training and nutrition coaching.",
    images: ["/logo-with-text.png"],
  },
  icons: {
    icon: [
      { url: "/diva-logo-fitness.png", sizes: "32x32", type: "image/png" },
      { url: "/logo-icon.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/diva-logo-fitness.png", sizes: "180x180", type: "image/png" }],
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={`${inter.className} antialiased`}>
        <Suspense fallback={null}>
          <GoogleAnalytics />
          <ClientLayout>{children}</ClientLayout>
        </Suspense>
      </body>
    </html>
  )
}
