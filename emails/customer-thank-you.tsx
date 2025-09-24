import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Button,
} from "@react-email/components"

interface CustomerThankYouEmailProps {
  name: string
}

export const CustomerThankYouEmail = ({ name }: CustomerThankYouEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Thank you for contacting Diva Fitness - Emma will be in touch soon!</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-mode-images/logo-with-text%281%29-x6qcMPKYlcsMamWV2TS5RavHeptGBA.png"
              width="240"
              height="auto"
              alt="Diva Fitness"
              style={logo}
            />
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={h1}>Thank you for your inquiry, {name}!</Heading>

            <Text style={text}>
              I've received your message and I'm excited to help you on your fitness journey. I'll personally review
              your inquiry and get back to you within 24 hours.
            </Text>

            <Text style={text}>
              In the meantime, feel free to explore my website to learn more about my approach to personal training and
              the beautiful garden studio where we'll work together.
            </Text>

            <Section style={buttonContainer}>
              <Button style={button} href="https://diva-fitness.co.uk/about">
                Learn More About Emma
              </Button>
            </Section>

            <Text style={text}>If you have any urgent questions, please don't hesitate to call me directly.</Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              <strong>Emma Fisher</strong>
              <br />
              Personal Trainer & Nutrition Coach
              <br />
              Diva Fitness
            </Text>

            <Text style={footerText}>
              📧{" "}
              <Link href="mailto:info@diva-fitness.co.uk" style={link}>
                info@diva-fitness.co.uk
              </Link>
              <br />🌐{" "}
              <Link href="https://diva-fitness.co.uk" style={link}>
                diva-fitness.co.uk
              </Link>
            </Text>

            <Text style={footerSmall}>This email was sent because you contacted Diva Fitness through our website.</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// Styles
const main = {
  backgroundColor: "#f8f9fa",
  fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
}

const container = {
  margin: "0 auto",
  padding: "0",
  maxWidth: "600px",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
}

const header = {
  backgroundColor: "#ffffff",
  padding: "40px 30px 30px",
  textAlign: "center" as const,
  borderBottom: "1px solid #e5e7eb",
}

const logo = {
  margin: "0 auto",
  maxWidth: "240px",
  height: "auto",
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
  lineHeight: "1.3",
}

const text = {
  color: "#374151",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0 0 20px",
}

const buttonContainer = {
  textAlign: "center" as const,
  margin: "30px 0",
}

const button = {
  backgroundColor: "#7b329b",
  borderRadius: "25px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "14px 28px",
  border: "none",
  cursor: "pointer",
}

const footer = {
  backgroundColor: "#f8f9fa",
  padding: "30px",
  textAlign: "center" as const,
  borderTop: "1px solid #e5e7eb",
}

const footerText = {
  color: "#6b7280",
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "0 0 15px",
}

const footerSmall = {
  color: "#9ca3af",
  fontSize: "12px",
  lineHeight: "1.4",
  margin: "20px 0 0",
}

const link = {
  color: "#7b329b",
  textDecoration: "none",
  fontWeight: "500",
}

export default CustomerThankYouEmail
