// CMS helper functions
interface CMSPage {
  id: number
  slug: string
  title: string
  meta_description?: string
  content: any
  sections?: CMSSection[]
  status: "draft" | "published" | "archived"
}

interface CMSSection {
  id: number
  section_type: string
  section_order: number
  content: any
  is_active: boolean
}

interface CMSSettings {
  [key: string]: any
}

let settingsCache: CMSSettings = {}
let pagesCache: Record<string, CMSPage> = {}
let lastFetch = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export async function getCMSSettings(category?: string): Promise<CMSSettings> {
  const now = Date.now()

  if (now - lastFetch < CACHE_DURATION && Object.keys(settingsCache).length > 0) {
    return settingsCache
  }

  try {
    const baseUrl =
      typeof window !== "undefined"
        ? window.location.origin
        : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

    const url = category
      ? `${baseUrl}/api/cms/settings?category=${encodeURIComponent(category)}`
      : `${baseUrl}/api/cms/settings`

    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()

    if (!data.success) {
      throw new Error(data.error || "Failed to fetch settings")
    }

    settingsCache = data.settings
    lastFetch = now

    return settingsCache
  } catch (error) {
    console.error("Error fetching CMS settings:", error)
    return {}
  }
}

export async function getCMSPage(slug: string): Promise<CMSPage | null> {
  if (pagesCache[slug]) {
    return pagesCache[slug]
  }

  try {
    const baseUrl =
      typeof window !== "undefined"
        ? window.location.origin
        : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

    const response = await fetch(`${baseUrl}/api/cms/pages?slug=${encodeURIComponent(slug)}`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()

    if (!data.success) {
      throw new Error(data.error || "Failed to fetch page")
    }

    if (data.pages && data.pages.length > 0) {
      const page = data.pages[0]
      pagesCache[slug] = page
      return page
    }

    return null
  } catch (error) {
    console.error("Error fetching CMS page:", error)
    return null
  }
}

export async function updateCMSSetting(key: string, value: any): Promise<boolean> {
  try {
    const baseUrl =
      typeof window !== "undefined"
        ? window.location.origin
        : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

    const response = await fetch(`${baseUrl}/api/cms/settings`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ setting_key: key, setting_value: String(value) }),
    })

    if (response.ok) {
      // Clear cache to force refresh
      settingsCache = {}
      return true
    }

    const errorData = await response.json().catch(() => ({}))
    console.error("Update failed:", errorData)
    return false
  } catch (error) {
    console.error("Error updating CMS setting:", error)
    return false
  }
}

export function clearCMSCache() {
  settingsCache = {}
  pagesCache = {}
  lastFetch = 0
}
