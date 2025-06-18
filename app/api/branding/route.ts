import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    const settings = await sql`
      SELECT setting_key, setting_value, setting_type, category, description
      FROM branding_settings
      ORDER BY category, setting_key
    `

    return NextResponse.json({ settings })
  } catch (error) {
    console.error("Error fetching branding settings:", error)
    return NextResponse.json({ error: "Failed to fetch branding settings" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { setting_key, setting_value } = await request.json()

    if (!setting_key || setting_value === undefined) {
      return NextResponse.json({ error: "Missing setting_key or setting_value" }, { status: 400 })
    }

    await sql`
      UPDATE branding_settings 
      SET setting_value = ${setting_value}, updated_at = CURRENT_TIMESTAMP
      WHERE setting_key = ${setting_key}
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating branding setting:", error)
    return NextResponse.json({ error: "Failed to update branding setting" }, { status: 500 })
  }
}
