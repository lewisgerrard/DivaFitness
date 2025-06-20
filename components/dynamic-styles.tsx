"use client"

import type React from "react"

import { useEffect } from "react"

interface DynamicStylesProps {
  primaryColor: string
  secondaryColor: string
}

const DynamicStyles: React.FC<DynamicStylesProps> = ({ primaryColor, secondaryColor }) => {
  useEffect(() => {
    // Dynamically set CSS variables
    document.documentElement.style.setProperty("--primary-color", primaryColor)
    document.documentElement.style.setProperty("--secondary-color", secondaryColor)
  }, [primaryColor, secondaryColor])

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="py-8">
        {/* Content will inherit styles from CSS variables */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dynamic Styles Example</h1>
        <p className="mt-4 text-gray-500 dark:text-gray-400">
          This content is styled using CSS variables set dynamically. The primary color is{" "}
          <span style={{ color: primaryColor }}>{primaryColor}</span> and the secondary color is{" "}
          <span style={{ color: secondaryColor }}>{secondaryColor}</span>.
        </p>
        <button className="mt-6 px-4 py-2 bg-primary-color text-white rounded hover:bg-primary-color-dark">
          Styled Button
        </button>
      </div>
    </div>
  )
}

export default DynamicStyles
