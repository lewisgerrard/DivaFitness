import type React from "react"
import { cn } from "@/lib/utils"

interface SectionProps {
  children: React.ReactNode
  className?: string
  padding?: "none" | "sm" | "md" | "lg" | "xl"
  background?: "white" | "gray" | "transparent"
  id?: string
  container?: boolean
}

const Section: React.FC<SectionProps> = ({
  children,
  className,
  padding = "lg",
  background = "transparent",
  id,
  container = true,
}) => {
  const paddingClasses = {
    none: "",
    sm: "py-8",
    md: "py-12",
    lg: "py-16",
    xl: "py-24",
  }

  const backgroundClasses = {
    white: "bg-white",
    gray: "bg-gray-50",
    transparent: "",
  }

  const content = container ? <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div> : children

  return (
    <section id={id} className={cn(paddingClasses[padding], backgroundClasses[background], className)}>
      {content}
    </section>
  )
}

export default Section
