import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Poppins, Roboto } from "next/font/google"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { AuthProvider } from "@/hooks/use-auth"

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

export const metadata: Metadata = {
  title: "Diva Fitness – Female Personal Trainer in Chester",
  description:
    "Emma Fisher offers private, ladies-only personal training in a calm garden studio. Get fitter, stronger and more confident in a supportive space.",
  keywords: "personal trainer, Chester, female trainer, ladies only, fitness, garden studio",
  authors: [{ name: "Emma Fisher" }],
  openGraph: {
    title: "Diva Fitness – Female Personal Trainer in Chester",
    description: "Emma Fisher offers private, ladies-only personal training in a calm garden studio.",
    url: "https://diva-fitness.co.uk",
    siteName: "Diva Fitness",
    locale: "en_GB",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={poppins.variable + " " + roboto.variable}>
      <body className="font-body bg-white text-secondary">
        <AuthProvider>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
