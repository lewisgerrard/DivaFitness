// Image usage audit and strategic distribution plan
export const imageUsageAudit = {
  // Current duplications found:
  duplicatedImages: [
    {
      path: "/images/studio-emma-doorway.jpg",
      usedIn: ["homepage", "services", "studio-showcase", "about"],
      recommendation: "Keep in studio-showcase only",
    },
    {
      path: "/images/studio-exterior-full.jpg",
      usedIn: ["hero-home", "hero-page", "about"],
      recommendation: "Keep in hero sections only",
    },
    {
      path: "/images/action-training-session.jpg",
      usedIn: ["homepage", "about", "services", "training"],
      recommendation: "Keep in training page only",
    },
    {
      path: "/images/equipment-wide-shot.jpg",
      usedIn: ["homepage", "services", "training"],
      recommendation: "Keep in services page only",
    },
    {
      path: "/images/studio-emma-sitting.jpg",
      usedIn: ["nutrition", "services"],
      recommendation: "Keep in nutrition page only",
    },
  ],

  // Strategic image distribution plan
  strategicDistribution: {
    homepage: {
      hero: "/images/studio-exterior-full.jpg",
      about: "/images/emma-studio-portrait.jpg", // NEW
      services: "/images/emma-kettlebell-training.jpg", // NEW
    },
    about: {
      story: "/images/emma-studio-portrait.jpg", // NEW
      gallery: [
        "/images/emma-kettlebell-training.jpg", // NEW
        "/images/professional-dumbbells.jpg", // NEW
        "/images/studio-exterior-cropped.jpg",
        "/images/weights-close-up.jpg",
      ],
    },
    services: {
      personalTraining: "/images/action-training-session.jpg",
      wellness: "/images/studio-emma-exterior.jpg",
      groupTraining: "/images/equipment-wide-shot.jpg",
      nutrition: "/images/nutrition-body-measurement.jpg",
      transformation: "/images/weights-close-up.jpg",
      studioHire: "/images/studio-garden-pathway.jpg",
    },
    training: {
      personalTraining: "/images/emma-kettlebell-training.jpg", // NEW
      wellness: "/images/emma-studio-portrait.jpg", // NEW
      groupTraining: "/images/professional-dumbbells.jpg", // NEW
      transformation: "/images/studio-emma-exterior.jpg",
      studioHire: "/images/studio-exterior-cropped.jpg",
    },
    nutrition: {
      main: "/images/nutrition-body-measurement.jpg",
      gallery: ["/images/nutrition-pantry-organization.jpg", "/images/nutrition-healthy-breakfast.jpg"],
    },
  },
}
