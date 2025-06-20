// Google Analytics helper functions
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "GA_MEASUREMENT_ID"

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    })
  }
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
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Track contact form submissions
export const trackContactForm = () => {
  event({
    action: "submit",
    category: "Contact",
    label: "Contact Form",
  })
}

// Track service page visits
export const trackServiceView = (service: string) => {
  event({
    action: "view",
    category: "Services",
    label: service,
  })
}

// Track booking button clicks
export const trackBookingClick = (service: string) => {
  event({
    action: "click",
    category: "Booking",
    label: service,
  })
}
