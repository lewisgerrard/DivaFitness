"use client"
import { useEffect } from "react"

interface DynamicStylesProps {
  primaryColor: string
  secondaryColor: string
}

export default function DynamicStyles({ primaryColor, secondaryColor }: DynamicStylesProps) {
  useEffect(() => {
    // Dynamically set CSS variables
    document.documentElement.style.setProperty("--primary-color", primaryColor)
    document.documentElement.style.setProperty("--secondary-color", secondaryColor)
  }, [primaryColor, secondaryColor])

  return null // This component doesn't render anything visible
}

// Also export as named export for compatibility
export { DynamicStyles }
