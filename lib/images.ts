// Centralized image management to avoid duplication across the website
export const siteImages = {
  // Emma portraits and training photos
  emma: {
    studioPortrait: "/images/emma-studio-portrait.jpg",
    kettlebellTraining: "/images/emma-kettlebell-training.jpg",
    sitting: "/images/studio-emma-sitting.jpg",
    doorway: "/images/studio-emma-doorway.jpg",
    exterior: "/images/studio-emma-exterior.jpg",
  },

  // Equipment and studio photos
  equipment: {
    professionalDumbbells: "/images/professional-dumbbells.jpg",
    weightsCloseUp: "/images/weights-close-up.jpg",
    equipmentWideShot: "/images/equipment-wide-shot.jpg",
  },

  // Studio and exterior photos
  studio: {
    exteriorCropped: "/images/studio-exterior-cropped.jpg",
    exteriorFull: "/images/studio-exterior-full.jpg",
    gardenPathway: "/images/studio-garden-pathway.jpg",
  },

  // Training and action shots
  training: {
    actionSession: "/images/action-training-session.jpg",
    emmaKettlebell: "/images/emma-kettlebell-training.jpg",
  },

  // Nutrition related photos
  nutrition: {
    bodyMeasurement: "/images/nutrition-body-measurement.jpg",
    pantryOrganization: "/images/nutrition-pantry-organization.jpg",
    healthyBreakfast: "/images/nutrition-healthy-breakfast.jpg",
  },

  // Journey/transformation photos
  journey: {
    before: "/images/journey-before.jpg",
    plan: "/images/journey-plan.jpg",
    construction: "/images/journey-construction.jpg",
    complete: "/images/journey-complete.jpg",
  },

  // Branding
  branding: {
    logoWithText: "/logo-with-text.png",
    logoIcon: "/logo-icon.png",
    divaLogoFitness: "/diva-logo-fitness.png",
  },
} as const

// Helper function to get image with alt text
export function getImage(category: keyof typeof siteImages, key: string) {
  const categoryImages = siteImages[category] as Record<string, string>
  return categoryImages[key] || "/placeholder.svg"
}

// Predefined alt texts for accessibility
export const imageAlts = {
  emma: {
    studioPortrait: "Emma Fisher, personal trainer, smiling confidently in her Diva Fitness studio",
    kettlebellTraining: "Emma demonstrating kettlebell training technique",
    sitting: "Emma sitting in her private fitness studio",
    doorway: "Emma welcoming clients at the studio entrance",
    exterior: "Emma outside her garden fitness studio",
  },

  equipment: {
    professionalDumbbells: "Professional hex dumbbells of various weights on wooden studio floor",
    weightsCloseUp: "Close-up view of professional fitness weights",
    equipmentWideShot: "Wide view of professional fitness equipment in the studio",
  },

  studio: {
    exteriorCropped: "Exterior view of the private garden fitness studio",
    exteriorFull: "Full exterior view of Diva Fitness garden studio",
    gardenPathway: "Peaceful garden pathway leading to the fitness studio",
  },

  training: {
    actionSession: "Personal training session in progress at Diva Fitness",
    emmaKettlebell: "Emma demonstrating proper kettlebell form and technique",
  },

  nutrition: {
    bodyMeasurement: "Body composition measurement for nutrition tracking",
    pantryOrganization: "Organized pantry with healthy ingredients in glass jars",
    healthyBreakfast: "Nutritious breakfast bowl with fresh fruits and healthy toppings",
  },

  journey: {
    before: "Empty garden space before studio construction",
    plan: "Planning and design phase of the studio build",
    construction: "Construction phase of the garden studio",
    complete: "Completed Diva Fitness garden studio",
  },

  branding: {
    logoWithText: "Diva Fitness logo with text",
    logoIcon: "Diva Fitness icon logo",
    divaLogoFitness: "Diva Fitness brand logo",
  },
} as const
