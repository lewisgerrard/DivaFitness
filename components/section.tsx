import type React from "react"
import { cn } from "@/lib/utils"

interface SectionProps {
  children: React.ReactNode
  className?: string
  padding?: "none" | "sm" | "md" | "lg" | "xl"
  background?: "white" | "gray" | "transparent"
  id?: string
}

const Section: React.FC<SectionProps> = ({ children, className, padding = "lg", background = "transparent", id }) => {
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

  return (
    <section id={id} className={cn(paddingClasses[padding], backgroundClasses[background], className)}>
      {children}
    </section>
  )
}

export default Section
