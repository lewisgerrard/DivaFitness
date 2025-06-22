interface RateLimitStore {
  [key: string]: { count: number; resetTime: number }
}

export class RateLimiter {
  private static store: RateLimitStore = {}

  static async checkLimit(
    identifier: string,
    maxRequests = 5,
    windowMs: number = 15 * 60 * 1000, // 15 minutes
  ): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
    const now = Date.now()
    const key = identifier

    // Clean up expired entries
    if (this.store[key] && now > this.store[key].resetTime) {
      delete this.store[key]
    }

    if (!this.store[key]) {
      this.store[key] = { count: 1, resetTime: now + windowMs }
      return { allowed: true, remaining: maxRequests - 1, resetTime: now + windowMs }
    }

    if (this.store[key].count >= maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: this.store[key].resetTime,
      }
    }

    this.store[key].count++
    return {
      allowed: true,
      remaining: maxRequests - this.store[key].count,
      resetTime: this.store[key].resetTime,
    }
  }
}
