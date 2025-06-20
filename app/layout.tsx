import type React from "react"
import ClientLayout from "./client-layout"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/react"
import Script from "next/script"
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
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-XL637GHGS1" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XL637GHGS1');
          `}
        </Script>
      </head>
      <body>
        <Suspense>
          <ClientLayout>
            {children}
            <Analytics />
          </ClientLayout>
        </Suspense>
      </body>
    </html>
  )
}
