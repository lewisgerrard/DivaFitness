import * as React from "react"
import { cn } from "@/lib/utils"

interface ServicesContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const ServicesContent = React.forwardRef<HTMLDivElement, ServicesContentProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("p-6 pt-0 flex flex-col h-full text-center items-center justify-between", className)}
      {...props}
    >
      {children}
    </div>
  ),
)
ServicesContent.displayName = "ServicesContent"

export { ServicesContent }
