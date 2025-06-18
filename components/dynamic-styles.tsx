"use client"

import { useEffect, useState } from "react"
import { getBrandingSettings, generateCSSVariables } from "@/lib/branding"

export function DynamicStyles() {
  const [cssVariables, setCssVariables] = useState("")

  useEffect(() => {
    async function loadBranding() {
      try {
        const settings = await getBrandingSettings()
        const css = generateCSSVariables(settings)
        setCssVariables(css)
      } catch (error) {
        console.error("Error loading branding settings:", error)
      }
    }

    loadBranding()
  }, [])

  if (!cssVariables) return null

  return (
    <style jsx global>{`
      ${cssVariables}
      
      /* Apply dynamic styles */
      .dynamic-primary-bg {
        background-color: var(--primary-color) !important;
      }
      
      .dynamic-primary-text {
        color: var(--primary-color) !important;
      }
      
      .dynamic-primary-border {
        border-color: var(--primary-color) !important;
      }
      
      .dynamic-heading-font {
        font-family: var(--heading-font), sans-serif !important;
      }
      
      .dynamic-body-font {
        font-family: var(--body-font), sans-serif !important;
      }
      
      .dynamic-border-radius {
        border-radius: var(--border-radius) !important;
      }
      
      .dynamic-card-padding {
        padding: var(--card-padding) !important;
      }
      
      .dynamic-transition {
        transition: all var(--transition-duration) ease !important;
      }
    `}</style>
  )
}
