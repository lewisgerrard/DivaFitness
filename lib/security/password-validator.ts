export class PasswordValidator {
  private static readonly MIN_LENGTH = 8
  private static readonly PATTERNS = {
    uppercase: /[A-Z]/,
    lowercase: /[a-z]/,
    number: /\d/,
    special: /[!@#$%^&*(),.?":{}|<>]/,
  }

  static validate(password: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = []

    if (password.length < this.MIN_LENGTH) {
      errors.push(`Password must be at least ${this.MIN_LENGTH} characters long`)
    }

    if (!this.PATTERNS.uppercase.test(password)) {
      errors.push("Password must contain at least one uppercase letter")
    }

    if (!this.PATTERNS.lowercase.test(password)) {
      errors.push("Password must contain at least one lowercase letter")
    }

    if (!this.PATTERNS.number.test(password)) {
      errors.push("Password must contain at least one number")
    }

    if (!this.PATTERNS.special.test(password)) {
      errors.push("Password must contain at least one special character")
    }

    return { isValid: errors.length === 0, errors }
  }

  static generateSalt(): string {
    return Math.random().toString(36).substring(2, 15)
  }
}
