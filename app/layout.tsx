import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { DynamicStyles } from "@/components/dynamic-styles"
import { GoogleAnalytics } from "@/lib/google-analytics"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Diva Fitness - Transform Your Fitness Journey",
  description:
    "Experience personalised training in a stunning garden studio designed exclusively for your privacy and comfort. Specialist in female fitness with 8+ years experience.",
  keywords: "fitness, personal training, nutrition, women's fitness, garden studio, Emma Fisher",
  authors: [{ name: "Diva Fitness" }],
  openGraph: {
    title: "Diva Fitness - Transform Your Fitness Journey",
    description:
      "Experience personalised training in a stunning garden studio designed exclusively for your privacy and content.",
    type: "website",
    locale: "en_GB",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <Suspense fallback={null}>
            <DynamicStyles />
            <div className="min-h-screen flex flex-col">
              <Navigation />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
            <GoogleAnalytics />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
