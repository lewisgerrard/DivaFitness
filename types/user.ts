export interface User {
  id: number
  first_name: string
  last_name: string
  email: string
  role: "admin" | "client"
  status: "active" | "inactive"
  created_at: string
  updated_at?: string
}

export interface CreateUserRequest {
  first_name: string
  last_name: string
  email: string
  password: string
  role?: "admin" | "client"
}

export interface UpdateUserRequest {
  first_name?: string
  last_name?: string
  phone?: string
  address?: string
}
