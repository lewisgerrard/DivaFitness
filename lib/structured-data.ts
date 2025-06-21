import { seoConfig } from "./seo"

export function generateBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FitnessCenter",
    name: seoConfig.businessName,
    description: seoConfig.defaultDescription,
    url: seoConfig.siteUrl,
    telephone: "+44-YOUR-PHONE-NUMBER",
    address: {
      "@type": "PostalAddress",
      streetAddress: seoConfig.location.address,
      addressLocality: seoConfig.location.city,
      postalCode: seoConfig.location.postcode,
      addressCountry: seoConfig.location.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "YOUR-LATITUDE",
      longitude: "YOUR-LONGITUDE",
    },
    openingHours: ["Mo-Fr 06:00-20:00", "Sa 08:00-16:00", "Su 10:00-14:00"],
    priceRange: "££",
    image: `${seoConfig.siteUrl}/images/studio-exterior-cropped.jpg`,
    sameAs: [seoConfig.social.facebook, seoConfig.social.instagram, seoConfig.social.twitter],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Fitness Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Personal Training",
            description: "One-to-one personal training sessions",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Nutrition Coaching",
            description: "Personalized nutrition guidance and meal planning",
          },
        },
      ],
    },
  }
}

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Emma Fisher",
    jobTitle: "Personal Trainer & Fitness Coach",
    worksFor: {
      "@type": "FitnessCenter",
      name: seoConfig.businessName,
    },
    description: "Qualified personal trainer specializing in women's fitness and nutrition coaching since 2017",
    image: `${seoConfig.siteUrl}/images/emma-studio.jpg`,
    url: `${seoConfig.siteUrl}/about`,
    sameAs: [seoConfig.social.instagram, seoConfig.social.facebook],
  }
}

export function generateServiceSchema(service: {
  name: string
  description: string
  price?: string
  duration?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@type": "FitnessCenter",
      name: seoConfig.businessName,
    },
    areaServed: {
      "@type": "Place",
      name: seoConfig.location.city,
    },
    ...(service.price && {
      offers: {
        "@type": "Offer",
        price: service.price,
        priceCurrency: "GBP",
      },
    }),
  }
}
