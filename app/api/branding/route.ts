import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    // Check if branding_settings table exists first
    const tableExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'branding_settings'
      );
    `

    if (!tableExists[0]?.exists) {
      console.log("Branding settings table does not exist")
      return NextResponse.json({
        settings: [],
        message: "Branding table not found. Please run script: 012-update-branding-structure.sql",
      })
    }

    const settings = await sql`
      SELECT 
        id,
        setting_key, 
        setting_value, 
        setting_type, 
        category, 
        subcategory,
        description,
        css_variable,
        display_order
      FROM branding_settings
      ORDER BY display_order, category, subcategory, setting_key
    `

    // If no settings found, return empty array
    if (!settings || settings.length === 0) {
      console.log("No branding settings found")
      return NextResponse.json({
        settings: [],
        message: "No design tokens found. Please run script: 012-update-branding-structure.sql",
      })
    }

    return NextResponse.json({ settings })
  } catch (error) {
    console.error("Error fetching branding settings:", error)

    return NextResponse.json({
      settings: [],
      message: "Database error. Please run script: 012-update-branding-structure.sql",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { setting_key, setting_value } = await request.json()

    if (!setting_key || setting_value === undefined) {
      return NextResponse.json({ error: "Missing setting_key or setting_value" }, { status: 400 })
    }

    // Check if table exists before updating
    const tableExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'branding_settings'
      );
    `

    if (!tableExists[0]?.exists) {
      return NextResponse.json(
        {
          error: "Branding settings table does not exist. Please run the database migration first.",
        },
        { status: 500 },
      )
    }

    await sql`
      UPDATE branding_settings 
      SET setting_value = ${setting_value}, updated_at = CURRENT_TIMESTAMP
      WHERE setting_key = ${setting_key}
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating branding setting:", error)
    return NextResponse.json(
      {
        error: "Failed to update branding setting",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
