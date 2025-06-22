"use client"

import { useState, useCallback } from "react"
import { useAuth } from "./use-auth"

interface ApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export function useApi<T>() {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const { token } = useAuth()

  const execute = useCallback(
    async (url: string, options: RequestInit = {}): Promise<T | null> => {
      setState((prev) => ({ ...prev, loading: true, error: null }))

      try {
        const response = await fetch(url, {
          ...options,
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers,
          },
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.error || `HTTP ${response.status}`)
        }

        const result = await response.json()
        setState({ data: result.data, loading: false, error: null })
        return result.data
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error"
        setState({ data: null, loading: false, error: errorMessage })
        return null
      }
    },
    [token],
  )

  return { ...state, execute }
}
