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
              width="180"
              height="auto"
              alt="Diva Fitness"
              style={logo}
            />
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={h1}>New Client Inquiry!</Heading>

            <Section style={alertBox}>
              <Text style={alertText}>✨ You have a new potential client inquiry</Text>
            </Section>

            <Text style={text}>
              Great news! Someone is interested in your services and has reached out through your website.
            </Text>

            {/* Contact Details Card */}
            <Section style={detailsCard}>
              <Heading style={h2}>Contact Information</Heading>

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
                <Text style={label}>Services of Interest:</Text>
                <Text style={value}>{service}</Text>
              </div>
            </Section>

            {/* Message Card */}
            <Section style={messageCard}>
              <Heading style={h2}>Their Message</Heading>
              <Text style={messageText}>{message}</Text>
            </Section>

            <Section style={buttonContainer}>
              <Button
                style={replyButton}
                href={`mailto:${email}?subject=Re: Your Diva Fitness Inquiry&body=Hi ${name},%0D%0A%0D%0AThank you for your interest in Diva Fitness.%0D%0A%0D%0ABest regards,%0D%0AEmma Fisher`}
              >
                Reply to {name}
              </Button>
            </Section>

            <Text style={reminderText}>
              💡 Remember to respond within 24 hours to maintain excellent customer service standards.
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              <strong>Diva Fitness Contact System</strong>
              <br />
              This inquiry was submitted through your website contact form.
            </Text>

            <Text style={footerText}>
              🌐{" "}
              <Link href="https://diva-fitness.co.uk/contact" style={link}>
                View Contact Page
              </Link>
            </Text>

            <Text style={footerSmall}>
              This email was automatically generated from your Diva Fitness website contact form.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// Styles matching the customer email design
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
  maxWidth: "180px",
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

const h2 = {
  color: "#7b329b",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "0 0 20px",
}

const text = {
  color: "#374151",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0 0 20px",
}

const alertBox = {
  backgroundColor: "#f0f9ff",
  border: "2px solid #e0c3fc",
  borderRadius: "12px",
  padding: "20px",
  margin: "0 0 30px",
  textAlign: "center" as const,
}

const alertText = {
  color: "#7b329b",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "0",
}

const detailsCard = {
  backgroundColor: "#f8f9fa",
  border: "1px solid #e5e7eb",
  borderRadius: "12px",
  padding: "25px",
  margin: "0 0 25px",
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
  minWidth: "140px",
  display: "inline-block",
}

const value = {
  fontSize: "16px",
  color: "#1f2937",
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

const messageCard = {
  backgroundColor: "#ffffff",
  border: "2px solid #e0c3fc",
  borderRadius: "12px",
  padding: "25px",
  margin: "0 0 30px",
}

const messageText = {
  color: "#374151",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
}

const buttonContainer = {
  textAlign: "center" as const,
  margin: "30px 0",
}

const replyButton = {
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

const reminderText = {
  color: "#6b7280",
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "20px 0 0",
  textAlign: "center" as const,
  fontStyle: "italic",
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

export default BusinessNotificationEmail
