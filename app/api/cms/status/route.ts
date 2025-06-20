import { NextResponse } from "next/server"
import { query } from "@/lib/database"

export async function GET() {
  try {
    // Test if CMS tables exist
    const tables = ["cms_settings", "cms_pages", "cms_sections", "cms_media"]
    const results = []

    for (const table of tables) {
      try {
        await query(`SELECT 1 FROM ${table} LIMIT 1`)
        results.push({ table, exists: true, error: null })
      } catch (error) {
        results.push({
          table,
          exists: false,
          error: error instanceof Error ? error.message : "Unknown error",
        })
      }
    }

    const allTablesExist = results.every((r) => r.exists)

    return NextResponse.json({
      success: true,
      tablesExist: allTablesExist,
      tables: results,
      message: allTablesExist
        ? "All CMS tables are available"
        : "Some CMS tables are missing. Please run the setup script.",
    })
  } catch (error) {
    console.error("Error checking CMS status:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to check CMS status",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
