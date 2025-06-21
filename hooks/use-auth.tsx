"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface User {
  id: number
  email: string
  first_name?: string
  last_name?: string
  role: "admin" | "client" | "member"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  loading: boolean
  token: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      console.log("🔍 Checking authentication...")

      // Check if we have a token in localStorage
      const storedToken = localStorage.getItem("auth-token")
      console.log("🎫 Stored token found:", !!storedToken)
      console.log("🎫 Token length:", storedToken?.length || 0)

      if (!storedToken) {
        console.log("❌ No stored token found")
        setUser(null)
        setToken(null)
        setLoading(false)
        return
      }

      // Verify token with server
      const response = await fetch("/api/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      })

      console.log("🔍 Auth check response status:", response.status)

      if (response.ok) {
        const data = await response.json()
        console.log("✅ Auth check successful, user data:", data.user)
        setUser(data.user)
        setToken(storedToken)
      } else {
        console.log("❌ Auth check failed, response:", response.status)
        // Don't clear token immediately, try to refresh it
        if (response.status === 401) {
          console.log("🔄 Token might be expired, attempting refresh...")
          // Try to refresh the session
          const refreshResponse = await fetch("/api/auth/refresh", {
            method: "POST",
            credentials: "include",
          })

          if (refreshResponse.ok) {
            const refreshData = await refreshResponse.json()
            if (refreshData.token) {
              localStorage.setItem("auth-token", refreshData.token)
              setToken(refreshData.token)
              setUser(refreshData.user)
              console.log("✅ Token refreshed successfully")
              return
            }
          }
        }

        console.log("❌ Clearing stored token")
        localStorage.removeItem("auth-token")
        setUser(null)
        setToken(null)
      }
    } catch (error) {
      console.error("❌ Auth check failed:", error)
      // Don't clear token on network errors
      console.log("🔄 Network error, keeping token for retry")
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log("🔐 Attempting login for:", email)
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      })

      console.log("🔐 Login response status:", response.status)

      if (response.ok) {
        const data = await response.json()
        console.log("✅ Login successful, user data:", data.user)
        console.log("🎫 Token received:", !!data.token)

        // Store token in localStorage
        if (data.token) {
          localStorage.setItem("auth-token", data.token)
          setToken(data.token)
          console.log("💾 Token stored in localStorage")
        }

        setUser(data.user)
        return true
      } else {
        const errorData = await response.json().catch(() => ({}))
        console.error("❌ Login failed:", errorData)
        return false
      }
    } catch (error) {
      console.error("❌ Login failed:", error)
      return false
    }
  }

  const logout = async () => {
    try {
      console.log("🚪 Logging out...")

      // Clear local storage first
      localStorage.removeItem("auth-token")
      setUser(null)
      setToken(null)

      // Optionally call logout endpoint
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        credentials: "include",
      }).catch(() => {
        // Ignore errors on logout
        console.log("⚠️ Logout endpoint error (ignored)")
      })

      console.log("✅ Logout completed")
    } catch (error) {
      console.error("❌ Logout failed:", error)
    }
  }

  return <AuthContext.Provider value={{ user, login, logout, loading, token }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
