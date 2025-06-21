import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import ClientLayout from "./ClientLayout"

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
    <>
      {/* Google Analytics */}
      <Script src={`https://www.googletagmanager.com/gtag/js?id=G-XL637GHGS1`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XL637GHGS1', {
            page_path: window.location.pathname,
          });
          
          // Debug logging
          console.log('Google Analytics initialized for:', window.location.pathname);
        `}
      </Script>
      <ClientLayout>{children}</ClientLayout>
    </>
  )
}

import "./globals.css"
