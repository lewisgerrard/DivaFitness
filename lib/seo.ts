export const seoConfig = {
  defaultTitle: "Diva Fitness - Personal Training & Fitness Studio for Women",
  titleTemplate: "%s | Diva Fitness",
  defaultDescription:
    "Transform your body and mind with expert personal training in our private women-only fitness studio. Specializing in female fitness since 2017.",
  siteUrl: "https://divafitness.co.uk",
  businessName: "Diva Fitness",
  businessType: "Fitness Center",
  location: {
    address: "Your Address Here",
    city: "Your City",
    postcode: "Your Postcode",
    country: "UK",
  },
  social: {
    facebook: "https://facebook.com/divafitness",
    instagram: "https://instagram.com/divafitness",
    twitter: "https://twitter.com/divafitness",
  },
  keywords: [
    "personal trainer",
    "women's fitness",
    "female personal trainer",
    "fitness studio",
    "weight training",
    "nutrition coaching",
    "body transformation",
    "private gym",
    "ladies gym",
  ],
}

export function generatePageMetadata({
  title,
  description,
  keywords = [],
  image = "/images/studio-exterior-cropped.jpg",
  path = "",
}: {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  path?: string
}) {
  const fullTitle = title ? `${title} | ${seoConfig.businessName}` : seoConfig.defaultTitle
  const fullDescription = description || seoConfig.defaultDescription
  const fullUrl = `${seoConfig.siteUrl}${path}`
  const fullImage = `${seoConfig.siteUrl}${image}`

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: [...seoConfig.keywords, ...keywords].join(", "),
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url: fullUrl,
      siteName: seoConfig.businessName,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: "en_GB",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
      images: [fullImage],
    },
    alternates: {
      canonical: fullUrl,
    },
  }
}
