"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddClientModalProps {
  isOpen: boolean
  onClose: () => void
  onAddClient: (client: {
    name: string
    email: string
    phone?: string
    service_interest?: string
    status: string
    notes?: string
  }) => void
}

export default function AddClientModal({ isOpen, onClose, onAddClient }: AddClientModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service_interest: "",
    status: "active",
    notes: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate form
    if (!formData.name || !formData.email) {
      alert("Name and email are required")
      setIsSubmitting(false)
      return
    }

    onAddClient(formData)
    setIsSubmitting(false)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      service_interest: "",
      status: "active",
      notes: "",
    })
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose()
          resetForm()
        }
      }}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-primary">Add New Client</DialogTitle>
          <DialogDescription>Enter client details below. Fields marked with * are required.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="service_interest">Service Interest</Label>
              <Select
                value={formData.service_interest}
                onValueChange={(value) => handleSelectChange("service_interest", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-to-1 Personal Training">1-to-1 Personal Training</SelectItem>
                  <SelectItem value="Group Training">Group Training</SelectItem>
                  <SelectItem value="Nutrition Coaching">Nutrition Coaching</SelectItem>
                  <SelectItem value="Free Consultation">Free Consultation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="consultation">Consultation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                placeholder="Add any additional notes about the client..."
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onClose()
                resetForm()
              }}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary-dark">
              {isSubmitting ? "Adding..." : "Add Client"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
