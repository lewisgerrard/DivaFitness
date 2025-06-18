// Dynamic branding system
let brandingCache: Record<string, any> = {}
let lastFetch = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export async function getBrandingSettings() {
  const now = Date.now()

  // Return cached data if still fresh
  if (now - lastFetch < CACHE_DURATION && Object.keys(brandingCache).length > 0) {
    return brandingCache
  }

  try {
    const response = await fetch("/api/branding", {
      cache: "no-store",
      next: { revalidate: 0 },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch branding settings")
    }

    const data = await response.json()

    // Transform array to object for easier access
    const settings: Record<string, any> = {}
    data.settings.forEach((setting: any) => {
      let value = setting.setting_value

      // Convert based on type
      if (setting.setting_type === "number") {
        value = Number.parseInt(value)
      } else if (setting.setting_type === "boolean") {
        value = value === "true"
      }

      settings[setting.setting_key] = value
    })

    brandingCache = settings
    lastFetch = now

    return settings
  } catch (error) {
    console.error("Error fetching branding settings:", error)

    // Return default values if fetch fails
    return {
      primary_color: "#7b329b",
      primary_dark: "#5a1a75",
      accent_light: "#e879f9",
      background_light: "#f9fafb",
      text_primary: "#111827",
      text_secondary: "#4b5563",
      heading_font: "Inter",
      body_font: "Inter",
      base_font_size: 16,
      section_padding: 48,
      card_padding: 24,
      border_radius: 12,
      button_style: "rounded",
      shadow_style: "lg",
      transition_duration: 300,
    }
  }
}

export function clearBrandingCache() {
  brandingCache = {}
  lastFetch = 0
}

// CSS custom properties generator
export function generateCSSVariables(settings: Record<string, any>) {
  return `
    :root {
      --primary-color: ${settings.primary_color || "#7b329b"};
      --primary-dark: ${settings.primary_dark || "#5a1a75"};
      --accent-light: ${settings.accent_light || "#e879f9"};
      --background-light: ${settings.background_light || "#f9fafb"};
      --text-primary: ${settings.text_primary || "#111827"};
      --text-secondary: ${settings.text_secondary || "#4b5563"};
      --heading-font: ${settings.heading_font || "Inter"};
      --body-font: ${settings.body_font || "Inter"};
      --base-font-size: ${settings.base_font_size || 16}px;
      --section-padding: ${settings.section_padding || 48}px;
      --card-padding: ${settings.card_padding || 24}px;
      --border-radius: ${settings.border_radius || 12}px;
      --transition-duration: ${settings.transition_duration || 300}ms;
    }
  `
}
