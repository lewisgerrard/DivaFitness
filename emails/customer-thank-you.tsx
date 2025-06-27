import { Body, Container, Head, Heading, Html, Img, Link, Preview, Section, Text } from "@react-email/components"

interface CustomerThankYouEmailProps {
  name: string
}

export const CustomerThankYouEmail = ({ name }: CustomerThankYouEmailProps) => (
  <Html>
    <Head />
    <Preview>Thank you for contacting Diva Fitness - Emma will be in touch soon!</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header with Logo */}
        <Section style={header}>
          <Img
            src="https://diva-fitness.co.uk/logo-with-text.png"
            width="240"
            height="auto"
            alt="Diva Fitness"
            style={logo}
          />
        </Section>

        {/* Main Content */}
        <Section style={content}>
          <Heading style={h1}>Thank You, {name}!</Heading>

          <Text style={text}>
            Thank you for reaching out to Diva Fitness. I'm thrilled that you're considering taking the next step in
            your fitness journey!
          </Text>

          <Text style={text}>I've received your message and will personally respond within 24 hours.</Text>

          <Text style={text}>
            Every woman's fitness journey is unique, and I'm here to support you every step of the way in our beautiful
            garden studio.
          </Text>

          <Section style={ctaSection}>
            <Link href="https://diva-fitness.co.uk/about" style={button}>
              Learn More About Emma
            </Link>
          </Section>

          <Text style={signature}>
            With excitement for your journey,
            <br />
            <strong>Emma Fisher</strong>
            <br />
            <span style={titleText}>Personal Trainer & Wellness Coach</span>
          </Text>
        </Section>

        {/* Footer */}
        <Section style={footer}>
          <Text style={footerText}>
            <strong>Diva Fitness</strong>
            <br />
            Chester, UK
            <br />
            Phone:{" "}
            <Link href="tel:07966874821" style={footerLink}>
              07966 874 821
            </Link>
            <br />
            Email:{" "}
            <Link href="mailto:info@diva-fitness.co.uk" style={footerLink}>
              info@diva-fitness.co.uk
            </Link>
            <br />
            Website:{" "}
            <Link href="https://diva-fitness.co.uk" style={footerLink}>
              diva-fitness.co.uk
            </Link>
          </Text>

          <Text style={footerText}>
            You received this email because you contacted us through our website. If you have any questions, please
            reply to this email or contact us at info@diva-fitness.co.uk
          </Text>

          <Text style={footerText}>
            Follow us:
            <Link href="https://instagram.com/divafitnesschester" style={footerLink}>
              {" "}
              Instagram
            </Link>{" "}
            |
            <Link href="https://facebook.com/DivaFitnessChester" style={footerLink}>
              {" "}
              Facebook
            </Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

// Styles matching website design
const main = {
  backgroundColor: "#ffffff",
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  margin: "0",
  padding: "0",
}

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "0",
  maxWidth: "600px",
  width: "100%",
}

const header = {
  backgroundColor: "#ffffff",
  padding: "40px 30px 30px",
  textAlign: "center" as const,
  borderBottom: "1px solid #f1f5f9",
}

const logo = {
  margin: "0 auto",
  maxWidth: "240px",
  width: "240px",
  height: "auto",
  display: "block",
}

const content = {
  padding: "40px 30px",
  backgroundColor: "#ffffff",
}

const h1 = {
  color: "#7b329b",
  fontSize: "32px",
  fontWeight: "700",
  textAlign: "center" as const,
  margin: "0 0 32px",
  lineHeight: "1.2",
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
}

const text = {
  color: "#334155",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0 0 24px",
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
}

const ctaSection = {
  textAlign: "center" as const,
  margin: "40px 0",
}

const button = {
  backgroundColor: "#7b329b",
  borderRadius: "8px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "14px 28px",
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  transition: "background-color 0.2s ease",
}

const signature = {
  color: "#334155",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "40px 0 0",
  textAlign: "center" as const,
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
}

const titleText = {
  color: "#7b329b",
  fontSize: "14px",
  fontWeight: "500",
}

const footer = {
  backgroundColor: "#f8fafc",
  padding: "40px 30px",
  textAlign: "center" as const,
  borderTop: "1px solid #e2e8f0",
}

const footerText = {
  color: "#64748b",
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "0 0 16px",
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
}

const footerLink = {
  color: "#7b329b",
  textDecoration: "none",
  fontWeight: "500",
}

export default CustomerThankYouEmail
