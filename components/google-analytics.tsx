"use client"

import Script from "next/script"

export function GoogleAnalytics() {
  return (
    <>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-XL637GHGS1" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XL637GHGS1', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  )
}
