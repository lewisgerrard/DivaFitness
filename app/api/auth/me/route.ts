import { type NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"
import { getUserById } from "@/lib/auth"

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key")

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const { payload } = await jwtVerify(token, secret)
    const user = await getUserById(payload.userId as number)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }
}
