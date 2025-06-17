import type { LucideIcon } from "lucide-react"

interface AdminPageHeaderProps {
  icon: LucideIcon
  title: string
  description: string
}

export function AdminPageHeader({ icon: Icon, title, description }: AdminPageHeaderProps) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-purple-600 mb-1">{title}</h1>
          <p className="text-lg text-purple-400">{description}</p>
        </div>
      </div>
    </div>
  )
}
