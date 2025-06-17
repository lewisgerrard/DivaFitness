"use client"

import type React from "react"
import { useRouter } from "next/navigation"

interface ProfilePageProps {
  params: { id: string[] }
}

const ProfilePage: React.FC<ProfilePageProps> = ({ params }) => {
  const router = useRouter()
  const profileId = params.id ? params.id.join("/") : "default"

  const primaryButtonText = "Edit Profile"
  const primaryButtonHref = "#edit-profile"
  const secondaryButtonText = "Back to Dashboard"
  const secondaryButtonHref = "/dashboard"
  const tertiaryButtonText = "Contact Support"
  const tertiaryButtonHref = "/contact"

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Profile ID: {profileId}</p>

      <button onClick={() => router.push(primaryButtonHref)}>{primaryButtonText}</button>
      <button onClick={() => router.push(secondaryButtonHref)}>{secondaryButtonText}</button>
      <button onClick={() => router.push(tertiaryButtonHref)}>{tertiaryButtonText}</button>
    </div>
  )
}

export default ProfilePage
