import { type NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"
import { getContactSubmissions } from "@/lib/database"

// Force dynamic rendering
export const dynamic = "force-dynamic"

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key")

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const { payload } = await jwtVerify(token, secret)

    if (payload.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const submissions = await getContactSubmissions()
    return NextResponse.json({ submissions })
  } catch (error) {
    console.error("Get contact submissions error:", error)
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 })
  }
}
