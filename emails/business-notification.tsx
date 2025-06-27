import { Body, Container, Head, Heading, Html, Img, Link, Preview, Section, Text } from "@react-email/components"

interface BusinessNotificationEmailProps {
  name: string
  email: string
  phone?: string
  message: string
  service: string
}

export const BusinessNotificationEmail = ({ name, email, phone, message, service }: BusinessNotificationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>New contact form submission from {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Img
              src="https://diva-fitness.co.uk/logo-with-text.png"
              width="200"
              height="auto"
              alt="Diva Fitness"
              style={logo}
            />
            <Heading style={h1}>New Contact Form Submission</Heading>
          </Section>

          {/* Alert */}
          <Section style={alertSection}>
            <Text style={alertText}>✓ You have a new potential client inquiry!</Text>
          </Section>

          {/* Contact Details */}
          <Section style={detailsSection}>
            <Heading style={h2}>Contact Details</Heading>

            <div style={detailRow}>
              <Text style={label}>Name:</Text>
              <Text style={value}>{name}</Text>
            </div>

            <div style={detailRow}>
              <Text style={label}>Email:</Text>
              <Text style={value}>
                <Link href={`mailto:${email}`} style={emailLink}>
                  {email}
                </Link>
              </Text>
            </div>

            {phone && (
              <div style={detailRow}>
                <Text style={label}>Phone:</Text>
                <Text style={value}>
                  <Link href={`tel:${phone}`} style={phoneLink}>
                    {phone}
                  </Link>
                </Text>
              </div>
            )}

            <div style={detailRow}>
              <Text style={label}>Interested In:</Text>
              <Text style={value}>{service}</Text>
            </div>
          </Section>

          {/* Message */}
          <Section style={messageSection}>
            <Heading style={h2}>Message</Heading>
            <Text style={messageText}>{message}</Text>
          </Section>

          {/* Action Section */}
          <Section style={actionSection}>
            <Text style={reminderText}>
              • Remember to respond within 24 hours to maintain our excellent customer service standards!
            </Text>
            <Link href={`mailto:${email}?subject=Re: Your Diva Fitness Inquiry`} style={replyButton}>
              Reply to {name}
            </Link>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>This email was sent from the Diva Fitness contact form on your website.</Text>
            <Text style={footerText}>
              <Link href="https://diva-fitness.co.uk/contact" style={footerLink}>
                View Contact Page
              </Link>
            </Text>
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
  maxWidth: "650px",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  marginBottom: "64px",
}

const header = {
  backgroundColor: "#7b329b",
  padding: "30px 30px 20px",
  textAlign: "center" as const,
}

const logo = {
  margin: "0 auto 20px",
  filter: "brightness(0) invert(1)",
  maxWidth: "200px",
  height: "auto",
}

const h1 = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "0",
}

const h2 = {
  color: "#7b329b",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "0 0 20px",
}

const alertSection = {
  padding: "20px 30px",
  textAlign: "center" as const,
}

const alertText = {
  fontSize: "18px",
  color: "#7b329b",
  fontWeight: "bold",
  margin: "0",
  padding: "15px",
  backgroundColor: "#e0c3fc",
  borderRadius: "8px",
}

const detailsSection = {
  backgroundColor: "#f8f9fa",
  padding: "25px",
  borderRadius: "12px",
  border: "1px solid #e0c3fc",
  margin: "0 30px 25px",
}

const detailRow = {
  display: "flex",
  margin: "0 0 15px",
  alignItems: "flex-start",
}

const label = {
  fontSize: "14px",
  color: "#6b7280",
  fontWeight: "bold",
  margin: "0",
  minWidth: "120px",
  display: "inline-block",
}

const value = {
  fontSize: "16px",
  color: "#1a1a1a",
  margin: "0",
  flex: "1",
}

const emailLink = {
  color: "#7b329b",
  textDecoration: "none",
  fontWeight: "500",
}

const phoneLink = {
  color: "#7b329b",
  textDecoration: "none",
  fontWeight: "500",
}

const messageSection = {
  backgroundColor: "#ffffff",
  padding: "25px",
  borderRadius: "12px",
  border: "2px solid #e0c3fc",
  margin: "0 30px 30px",
}

const messageText = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#1a1a1a",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
}

const actionSection = {
  textAlign: "center" as const,
  margin: "30px 0",
  padding: "0 30px",
}

const reminderText = {
  fontSize: "14px",
  color: "#7b329b",
  fontStyle: "italic",
  margin: "0 0 20px",
}

const replyButton = {
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

const footer = {
  backgroundColor: "#f8f9fa",
  padding: "20px 30px",
  textAlign: "center" as const,
  borderTop: "1px solid #e0c3fc",
}

const footerText = {
  fontSize: "12px",
  color: "#6b7280",
  margin: "0 0 10px",
}

const footerLink = {
  color: "#7b329b",
  textDecoration: "none",
}

export default BusinessNotificationEmail
