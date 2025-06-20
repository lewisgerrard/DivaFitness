import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get("slug")
    const status = searchParams.get("status")

    let sql = `
      SELECT 
        p.*,
        COALESCE(
          json_agg(
            json_build_object(
              'id', s.id,
              'section_type', s.section_type,
              'section_order', s.section_order,
              'content', s.content,
              'is_active', s.is_active
            ) ORDER BY s.section_order
          ) FILTER (WHERE s.id IS NOT NULL),
          '[]'::json
        ) as sections
      FROM cms_pages p
      LEFT JOIN cms_sections s ON p.id = s.page_id
    `

    const params: any[] = []
    const conditions: string[] = []

    if (slug) {
      conditions.push(`p.slug = $${params.length + 1}`)
      params.push(slug)
    }

    if (status) {
      conditions.push(`p.status = $${params.length + 1}`)
      params.push(status)
    }

    if (conditions.length > 0) {
      sql += ` WHERE ${conditions.join(" AND ")}`
    }

    sql += ` GROUP BY p.id ORDER BY p.created_at DESC`

    const result = await query(sql, params)

    return NextResponse.json({
      success: true,
      pages: result.rows,
      count: result.rows.length,
    })
  } catch (error) {
    console.error("Error fetching CMS pages:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch CMS pages",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { slug, title, meta_description, content, status = "draft" } = body

    if (!slug || !title) {
      return NextResponse.json(
        {
          success: false,
          error: "slug and title are required",
        },
        { status: 400 },
      )
    }

    const sql = `
      INSERT INTO cms_pages (slug, title, meta_description, content, status, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
      RETURNING *
    `

    const result = await query(sql, [slug, title, meta_description || "", content || {}, status])

    return NextResponse.json({
      success: true,
      page: result.rows[0],
      message: "Page created successfully",
    })
  } catch (error) {
    console.error("Error creating CMS page:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create CMS page",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
