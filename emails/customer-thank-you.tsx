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
            width="200"
            height="60"
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

          <Text style={text}>
            I've received your message and will personally respond within 24 hours.
          </Text>

        
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

// Styles using Diva Fitness brand colors
const main = {
  backgroundColor: "#f8f9fa",
  fontFamily: "Roboto, Arial, sans-serif",
}

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "0",
  marginBottom: "64px",
  maxWidth: "600px",
  borderRadius: "12px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
}

const header = {
  backgroundColor: "#7b329b",
  padding: "30px 30px 20px",
  textAlign: "center" as const,
  borderRadius: "12px 12px 0 0",
}

const logo = {
  margin: "0 auto 20px",
  filter: "brightness(0) invert(1)",
  maxWidth: "200px",
  height: "auto",
  display: "block",
}

const content = {
  padding: "40px 30px",
}

const h1 = {
  color: "#7b329b",
  fontSize: "28px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "0 0 30px",
  fontFamily: "Poppins, Arial, sans-serif",
}

const text = {
  color: "#1a1a1a",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "0 0 20px",
}

const bulletPoints = {
  margin: "30px 0",
  padding: "20px",
  backgroundColor: "#e0c3fc",
  borderRadius: "12px",
  border: "1px solid #d4b3f7",
}

const bulletPoint = {
  color: "#7b329b",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "0 0 10px",
  fontWeight: "500",
}

const ctaSection = {
  textAlign: "center" as const,
  margin: "40px 0",
}

const button = {
  backgroundColor: "#7b329b",
  borderRadius: "25px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 30px",
}

const signature = {
  color: "#1a1a1a",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "40px 0 0",
  textAlign: "center" as const,
}

const titleText = {
  color: "#7b329b",
  fontSize: "14px",
}

const footer = {
  backgroundColor: "#f8f9fa",
  padding: "30px",
  textAlign: "center" as const,
  borderTop: "1px solid #e0c3fc",
}

const footerText = {
  color: "#6b7280",
  fontSize: "14px",
  lineHeight: "20px",
  margin: "0 0 15px",
}

const footerLink = {
  color: "#7b329b",
  textDecoration: "none",
}

export default CustomerThankYouEmail
