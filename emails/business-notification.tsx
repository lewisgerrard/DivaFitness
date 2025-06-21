import { Body, Container, Head, Heading, Html, Img, Link, Preview, Section, Text } from "@react-email/components"

interface BusinessNotificationEmailProps {
  name: string
  email: string
  phone?: string
  message: string
  service?: string
}

export const BusinessNotificationEmail = ({ name, email, phone, message, service }: BusinessNotificationEmailProps) => (
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
            height="60"
            alt="Diva Fitness"
            style={logo}
          />
          <Heading style={h1}>New Contact Form Submission</Heading>
        </Section>

        {/* Main Content */}
        <Section style={content}>
          <Text style={alertText}>✓ You have a new potential client inquiry!</Text>

          <Section style={detailsBox}>
            <Heading style={h2}>Contact Details</Heading>

            <Section style={detailRow}>
              <Text style={label}>Name:</Text>
              <Text style={value}>{name}</Text>
            </Section>

            <Section style={detailRow}>
              <Text style={label}>Email:</Text>
              <Text style={value}>
                <Link href={`mailto:${email}`} style={emailLink}>
                  {email}
                </Link>
              </Text>
            </Section>

            {phone && (
              <Section style={detailRow}>
                <Text style={label}>Phone:</Text>
                <Text style={value}>
                  <Link href={`tel:${phone}`} style={phoneLink}>
                    {phone}
                  </Link>
                </Text>
              </Section>
            )}

            {service && (
              <Section style={detailRow}>
                <Text style={label}>Interested In:</Text>
                <Text style={value}>{service}</Text>
              </Section>
            )}
          </Section>

          <Section style={messageBox}>
            <Heading style={h2}>Message</Heading>
            <Text style={messageText}>{message}</Text>
          </Section>

          <Section style={actionSection}>
            <Text style={reminderText}>
              • Remember to respond within 24 hours to maintain our excellent customer service standards!
            </Text>

            <Link href={`mailto:${email}?subject=Re: Your Diva Fitness Inquiry`} style={replyButton}>
              Reply to {name}
            </Link>
          </Section>
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

// Styles
const main = {
  backgroundColor: "#f8f9fa",
  fontFamily: "Roboto, Arial, sans-serif",
}

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "0",
  marginBottom: "64px",
  maxWidth: "650px",
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

const h1 = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "0",
  fontFamily: "Poppins, Arial, sans-serif",
}

const content = {
  padding: "40px 30px",
}

const alertText = {
  color: "#7b329b",
  fontSize: "18px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "0 0 30px",
  padding: "15px",
  backgroundColor: "#e0c3fc",
  borderRadius: "8px",
}

const detailsBox = {
  backgroundColor: "#f8f9fa",
  padding: "25px",
  borderRadius: "12px",
  border: "1px solid #e0c3fc",
  margin: "0 0 25px",
}

const h2 = {
  color: "#7b329b",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "0 0 20px",
  fontFamily: "Poppins, Arial, sans-serif",
}

const detailRow = {
  display: "flex",
  margin: "0 0 15px",
  alignItems: "flex-start",
}

const label = {
  color: "#6b7280",
  fontSize: "14px",
  fontWeight: "bold",
  margin: "0",
  minWidth: "120px",
  display: "inline-block",
}

const value = {
  color: "#1a1a1a",
  fontSize: "16px",
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

const messageBox = {
  backgroundColor: "#ffffff",
  padding: "25px",
  borderRadius: "12px",
  border: "2px solid #e0c3fc",
  margin: "0 0 30px",
}

const messageText = {
  color: "#1a1a1a",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
}

const actionSection = {
  textAlign: "center" as const,
  margin: "30px 0",
}

const reminderText = {
  color: "#7b329b",
  fontSize: "14px",
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
  color: "#6b7280",
  fontSize: "12px",
  lineHeight: "18px",
  margin: "0 0 10px",
}

const footerLink = {
  color: "#7b329b",
  textDecoration: "none",
}

export default BusinessNotificationEmail
