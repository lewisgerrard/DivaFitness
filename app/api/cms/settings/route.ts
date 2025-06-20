import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")

    let sql = "SELECT setting_key, setting_value FROM cms_settings"
    const params: any[] = []

    if (category) {
      sql += " WHERE category = $1"
      params.push(category)
    }

    sql += " ORDER BY setting_key"

    const result = await query(sql, params)

    // Convert array of settings to object
    const settings: Record<string, string> = {}
    result.rows.forEach((row) => {
      settings[row.setting_key] = row.setting_value
    })

    return NextResponse.json({
      success: true,
      settings,
      count: result.rows.length,
    })
  } catch (error) {
    console.error("Error fetching CMS settings:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch CMS settings",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { setting_key, setting_value } = body

    if (!setting_key) {
      return NextResponse.json(
        {
          success: false,
          error: "setting_key is required",
        },
        { status: 400 },
      )
    }

    // Update or insert setting
    const sql = `
      INSERT INTO cms_settings (setting_key, setting_value, category, updated_at)
      VALUES ($1, $2, 'general', NOW())
      ON CONFLICT (setting_key)
      DO UPDATE SET 
        setting_value = EXCLUDED.setting_value,
        updated_at = NOW()
      RETURNING *
    `

    const result = await query(sql, [setting_key, setting_value || ""])

    return NextResponse.json({
      success: true,
      setting: result.rows[0],
      message: "Setting updated successfully",
    })
  } catch (error) {
    console.error("Error updating CMS setting:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update CMS setting",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { setting_key, setting_value, category = "general" } = body

    if (!setting_key) {
      return NextResponse.json(
        {
          success: false,
          error: "setting_key is required",
        },
        { status: 400 },
      )
    }

    const sql = `
      INSERT INTO cms_settings (setting_key, setting_value, category, created_at, updated_at)
      VALUES ($1, $2, $3, NOW(), NOW())
      RETURNING *
    `

    const result = await query(sql, [setting_key, setting_value || "", category])

    return NextResponse.json({
      success: true,
      setting: result.rows[0],
      message: "Setting created successfully",
    })
  } catch (error) {
    console.error("Error creating CMS setting:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create CMS setting",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
