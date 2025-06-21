// components/dashboard-table.tsx

import type React from "react"

interface DashboardTableProps {
  data: any[]
  columns: {
    key: string
    title: string
    render?: (item: any) => React.ReactNode
  }[]
}

const DashboardTable: React.FC<DashboardTableProps> = ({ data, columns }) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={column.key}>{column.render ? column.render(item) : item[column.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default DashboardTable
export { DashboardTable }
