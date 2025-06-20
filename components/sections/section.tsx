import type React from "react"
import { cn } from "@/lib/utils"

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  background?: "white" | "gray" | "primary" | "gradient" | "transparent"
  padding?: "none" | "sm" | "md" | "lg" | "xl"
  containerSize?: "sm" | "md" | "lg" | "xl" | "full"
}

const backgroundVariants = {
  white: "bg-white",
  gray: "bg-gray-50",
  primary: "bg-primary",
  gradient: "bg-gradient-to-br from-primary/5 to-accent/5",
  transparent: "",
}

const paddingVariants = {
  none: "",
  sm: "py-8",
  md: "py-12",
  lg: "py-16",
  xl: "py-24",
}

const containerVariants = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-full",
}

export function Section({
  children,
  className,
  id,
  background = "transparent",
  padding = "lg",
  containerSize = "lg",
}: SectionProps) {
  return (
    <section id={id} className={cn(backgroundVariants[background], paddingVariants[padding], "relative", className)}>
      <div className={cn("mx-auto px-4 sm:px-6 lg:px-8", containerVariants[containerSize])}>{children}</div>
    </section>
  )
}
