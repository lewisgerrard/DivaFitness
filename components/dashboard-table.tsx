"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface Column {
  key: string
  label: string
}

interface DashboardTableProps {
  title?: string
  icon?: LucideIcon
  columns: Column[]
  data: Record<string, any>[]
  onRowClick?: (row: Record<string, any>) => void
}

export function DashboardTable({ title, icon: Icon, columns, data, onRowClick }: DashboardTableProps) {
  return (
    <Card>
      {title && (
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            {Icon && <Icon className="w-5 h-5" />}
            {title}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                {columns.map((column) => (
                  <th key={column.key} className="text-left py-3 px-4 font-semibold text-primary bg-primary/5">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-100 hover:bg-primary/5 transition-colors duration-200 ${
                    onRowClick ? "cursor-pointer" : ""
                  }`}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((column) => (
                    <td key={column.key} className="py-4 px-4 text-gray-900">
                      {row[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
