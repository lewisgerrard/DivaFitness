export class InputSanitizer {
  static sanitizeString(input: string): string {
    return input
      .trim()
      .replace(/[<>]/g, "") // Remove potential HTML tags
      .substring(0, 1000) // Limit length
  }

  static sanitizeEmail(email: string): string {
    return email.toLowerCase().trim()
  }

  static sanitizePhone(phone: string): string {
    return phone.replace(/[^\d+\-\s()]/g, "")
  }

  static validateAndSanitize(data: Record<string, any>): Record<string, any> {
    const sanitized: Record<string, any> = {}

    for (const [key, value] of Object.entries(data)) {
      if (typeof value === "string") {
        if (key === "email") {
          sanitized[key] = this.sanitizeEmail(value)
        } else if (key === "phone") {
          sanitized[key] = this.sanitizePhone(value)
        } else {
          sanitized[key] = this.sanitizeString(value)
        }
      } else {
        sanitized[key] = value
      }
    }

    return sanitized
  }
}
