import { type NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"
import { getUserHealthData } from "@/lib/profile"

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key")

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const { payload } = await jwtVerify(token, secret)
    const userId = Number.parseInt(params.userId)

    if (payload.userId !== userId && payload.role !== "admin") {
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    const healthData = await getUserHealthData(userId)
    return NextResponse.json({ healthData })
  } catch (error) {
    console.error("Get health data error:", error)
    return NextResponse.json({ error: "Failed to fetch health data" }, { status: 500 })
  }
}
