interface EmailQueueItem {
  id: string
  type: "customer" | "business"
  to: string
  data: any
  attempts: number
  maxAttempts: number
  nextRetry: Date
  status: "pending" | "sent" | "failed"
  error?: string
}

class EmailQueue {
  private queue: EmailQueueItem[] = []
  private processing = false

  add(item: Omit<EmailQueueItem, "id" | "attempts" | "nextRetry" | "status">) {
    const queueItem: EmailQueueItem = {
      ...item,
      id: `email-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      attempts: 0,
      nextRetry: new Date(),
      status: "pending",
    }

    this.queue.push(queueItem)
    console.log(`📬 Added email to queue: ${queueItem.id}`)

    if (!this.processing) {
      this.processQueue()
    }
  }

  private async processQueue() {
    if (this.processing) return
    this.processing = true

    console.log(`🔄 Processing email queue (${this.queue.length} items)`)

    while (this.queue.length > 0) {
      const item = this.queue.find(
        (i) => i.status === "pending" && i.nextRetry <= new Date() && i.attempts < i.maxAttempts,
      )

      if (!item) {
        // No items ready to process
        break
      }

      try {
        await this.processItem(item)
      } catch (error) {
        console.error(`❌ Failed to process queue item ${item.id}:`, error)
      }

      // Small delay between emails to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    this.processing = false
    console.log(`✅ Email queue processing complete`)
  }

  private async processItem(item: EmailQueueItem) {
    item.attempts++
    console.log(`📤 Processing email ${item.id} (attempt ${item.attempts}/${item.maxAttempts})`)

    try {
      // This would integrate with your actual email sending logic
      // For now, just simulate success
      await new Promise((resolve) => setTimeout(resolve, 500))

      item.status = "sent"
      console.log(`✅ Email ${item.id} sent successfully`)

      // Remove from queue
      this.queue = this.queue.filter((i) => i.id !== item.id)
    } catch (error: any) {
      console.error(`❌ Email ${item.id} failed:`, error.message)
      item.error = error.message

      if (item.attempts >= item.maxAttempts) {
        item.status = "failed"
        console.error(`💀 Email ${item.id} permanently failed after ${item.attempts} attempts`)
      } else {
        // Schedule retry with exponential backoff
        const delay = Math.pow(2, item.attempts) * 1000 // 2s, 4s, 8s, etc.
        item.nextRetry = new Date(Date.now() + delay)
        console.log(`⏳ Email ${item.id} scheduled for retry in ${delay}ms`)
      }
    }
  }

  getStatus() {
    return {
      total: this.queue.length,
      pending: this.queue.filter((i) => i.status === "pending").length,
      sent: this.queue.filter((i) => i.status === "sent").length,
      failed: this.queue.filter((i) => i.status === "failed").length,
      processing: this.processing,
    }
  }

  getFailedEmails() {
    return this.queue.filter((i) => i.status === "failed")
  }
}

export const emailQueue = new EmailQueue()
