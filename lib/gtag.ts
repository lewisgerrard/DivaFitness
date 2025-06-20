export const GA_TRACKING_ID = "G-XL637GHGS1"

declare global {
  interface Window {
    gtag: (command: "config" | "event" | "js" | "set", targetId: string | Date, config?: Record<string, any>) => void
    dataLayer: Record<string, any>[]
  }
}

// Track page views
export const pageview = (url: string) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  })
}

// Track custom events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}
