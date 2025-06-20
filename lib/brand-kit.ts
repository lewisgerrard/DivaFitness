// Diva Fitness Brand Kit
// Comprehensive design system for consistent styling across the website

export const brandKit = {
  // Color Palette
  colors: {
    primary: {
      DEFAULT: "#7b329b",
      dark: "#6b2c87",
      light: "#9d4edd",
      lighter: "#c77dff",
      50: "#faf7fc",
      100: "#f3ecf8",
      200: "#e9ddf2",
      300: "#d9c2e8",
      400: "#c77dff",
      500: "#9d4edd",
      600: "#7b329b",
      700: "#6b2c87",
      800: "#5a2472",
      900: "#4a1d5e",
    },
    secondary: {
      DEFAULT: "#1A1A1A",
      50: "#f8f9fa",
      100: "#e9ecef",
      200: "#dee2e6",
      300: "#ced4da",
      400: "#6c757d",
      500: "#495057",
      600: "#343a40",
      700: "#212529",
      800: "#1A1A1A",
      900: "#0d1117",
    },
    accent: {
      DEFAULT: "#e0c3fc",
      dark: "#d4b3f7",
      light: "#f0e6ff",
      50: "#fefcff",
      100: "#f9f5ff",
      200: "#f0e6ff",
      300: "#e0c3fc",
      400: "#d4b3f7",
      500: "#c77dff",
      600: "#b347d9",
      700: "#9333ea",
      800: "#7c2d92",
      900: "#581c87",
    },
    muted: {
      DEFAULT: "#F8F9FA",
      foreground: "#6B7280",
      50: "#ffffff",
      100: "#F8F9FA",
      200: "#f1f3f4",
      300: "#e8eaed",
      400: "#dadce0",
      500: "#9aa0a6",
      600: "#6B7280",
      700: "#5f6368",
      800: "#3c4043",
      900: "#202124",
    },
  },

  // Typography System
  typography: {
    fontFamily: {
      heading: ["Poppins", "Montserrat", "sans-serif"],
      body: ["Roboto", "Archivo", "Maven Pro", "sans-serif"],
    },
    fontSize: {
      // Body text sizes
      xs: ["0.75rem", { lineHeight: "1rem" }], // 12px
      sm: ["0.875rem", { lineHeight: "1.25rem" }], // 14px
      base: ["1rem", { lineHeight: "1.5rem" }], // 16px
      lg: ["1.125rem", { lineHeight: "1.75rem" }], // 18px
      xl: ["1.25rem", { lineHeight: "1.75rem" }], // 20px

      // Heading sizes
      "2xl": ["1.5rem", { lineHeight: "2rem" }], // 24px
      "3xl": ["1.875rem", { lineHeight: "2.25rem" }], // 30px
      "4xl": ["2.25rem", { lineHeight: "2.5rem" }], // 36px
      "5xl": ["3rem", { lineHeight: "1" }], // 48px
      "6xl": ["3.75rem", { lineHeight: "1" }], // 60px
      "7xl": ["4.5rem", { lineHeight: "1" }], // 72px
    },
    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
  },

  // Spacing System
  spacing: {
    section: {
      sm: "py-12", // 48px top/bottom
      md: "py-16", // 64px top/bottom
      lg: "py-20", // 80px top/bottom
      xl: "py-24", // 96px top/bottom
    },
    container: {
      sm: "px-4", // 16px left/right
      md: "px-6", // 24px left/right
      lg: "px-8", // 32px left/right
    },
    gap: {
      xs: "gap-2", // 8px
      sm: "gap-4", // 16px
      md: "gap-6", // 24px
      lg: "gap-8", // 32px
      xl: "gap-12", // 48px
    },
  },

  // Component Styles
  components: {
    // Hero Section
    hero: {
      container: "relative bg-primary h-[400px] flex items-center justify-center overflow-hidden",
      content: "relative z-10 max-w-4xl mx-auto px-4 text-center text-white",
      badge: "inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4 animate-fade-in",
      title: "font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight animate-fade-in",
      subtitle: "block bg-gradient-to-r from-white to-accent-light bg-clip-text text-transparent",
      description: "text-lg md:text-xl mb-6 max-w-2xl mx-auto leading-relaxed opacity-90 animate-fade-in",
      buttonContainer: "flex flex-col sm:flex-row gap-3 justify-center items-center mb-4 animate-fade-in",
      button:
        "bg-white text-primary hover:bg-white/90 px-6 py-3 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 min-w-[160px]",
    },

    // Cards
    card: {
      base: "group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2",
      content: "p-6 text-center relative z-10",
      icon: "w-12 h-12 bg-gradient-to-br rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300",
      title:
        "font-heading text-lg font-bold text-secondary mb-3 group-hover:text-primary transition-colors duration-300",
      description: "text-muted-foreground leading-relaxed text-sm",
    },

    // Buttons
    button: {
      primary:
        "bg-primary hover:bg-primary-dark text-white font-semibold rounded-full px-6 py-3 transition-all duration-300 transform hover:scale-105",
      secondary:
        "bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white font-semibold rounded-full px-6 py-3 transition-all duration-300",
      outline:
        "border-primary text-primary hover:bg-primary hover:text-white font-medium rounded-full px-6 py-3 transition-all duration-300",
    },

    // Sections
    section: {
      base: "py-16 relative overflow-hidden",
      container: "max-w-7xl mx-auto px-4",
      header: "text-center mb-12",
      title: "font-heading text-3xl md:text-4xl font-bold text-secondary mb-4",
      subtitle: "block text-primary",
      description: "text-lg text-muted-foreground max-w-2xl mx-auto",
      badge: "inline-flex items-center gap-2 bg-accent/20 rounded-full px-4 py-2 mb-4",
    },
  },

  // Gradients
  gradients: {
    primary: "bg-gradient-to-r from-primary to-primary-light",
    secondary: "bg-gradient-to-r from-primary-light to-primary",
    accent: "bg-gradient-to-r from-primary to-primary-dark",
    background: "bg-gradient-to-br from-white via-muted to-accent-light/20",
    hero: "bg-gradient-to-br from-primary/5 to-accent/5",
  },

  // Animations
  animations: {
    fadeIn: "animate-fade-in",
    scaleHover: "transform hover:scale-105 transition-transform duration-300",
    slideUp: "transform hover:-translate-y-2 transition-all duration-500",
    pulse: "animate-pulse",
  },

  // Breakpoints (for reference)
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
} as const

// Utility functions for consistent styling
export const getBrandClass = (category: keyof typeof brandKit.components, element: string) => {
  return brandKit.components[category]?.[element as keyof (typeof brandKit.components)[typeof category]] || ""
}

export const getBrandColor = (color: string, shade?: string | number) => {
  const colorObj = brandKit.colors[color as keyof typeof brandKit.colors]
  if (!colorObj) return ""

  if (shade && typeof colorObj === "object" && shade in colorObj) {
    return colorObj[shade as keyof typeof colorObj]
  }

  return typeof colorObj === "string" ? colorObj : colorObj.DEFAULT
}

// Common component class combinations
export const brandClasses = {
  heroTitle: `${brandKit.components.hero.title}`,
  heroDescription: `${brandKit.components.hero.description}`,
  sectionTitle: `${brandKit.components.section.title}`,
  sectionDescription: `${brandKit.components.section.description}`,
  cardBase: `${brandKit.components.card.base}`,
  buttonPrimary: `${brandKit.components.button.primary}`,
  buttonSecondary: `${brandKit.components.button.secondary}`,
} as const

export default brandKit
