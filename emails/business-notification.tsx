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
            width="240"
            height="auto"
            alt="Diva Fitness"
            style={logo}
          />
          <Heading style={h1}>New Contact Form Submission</Heading>
        </Section>

        {/* Main Content */}
        <Section style={content}>
          <Section style={alertBox}>
            <Text style={alertText}>✨ You have a new potential client inquiry!</Text>
          </Section>

          <Section style={detailsCard}>
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

          <Section style={messageCard}>
            <Heading style={h2}>Message</Heading>
            <Text style={messageText}>{message}</Text>
          </Section>

          <Section style={actionSection}>
            <Text style={reminderText}>
              💡 Remember to respond within 24 hours to maintain excellent customer service!
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
  margin: "0 auto 24px",
  maxWidth: "240px",
  width: "240px",
  height: "auto",
  display: "block",
}

const h1 = {
  color: "#7b329b",
  fontSize: "28px",
  fontWeight: "700",
  textAlign: "center" as const,
  margin: "0",
  lineHeight: "1.2",
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
}

const content = {
  padding: "40px 30px",
  backgroundColor: "#ffffff",
}

const alertBox = {
  backgroundColor: "#f0f9ff",
  border: "1px solid #7b329b",
  borderRadius: "8px",
  padding: "20px",
  margin: "0 0 32px",
  textAlign: "center" as const,
}

const alertText = {
  color: "#7b329b",
  fontSize: "18px",
  fontWeight: "600",
  margin: "0",
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
}

const detailsCard = {
  backgroundColor: "#f8fafc",
  border: "1px solid #e2e8f0",
  borderRadius: "8px",
  padding: "24px",
  margin: "0 0 24px",
}

const h2 = {
  color: "#7b329b",
  fontSize: "20px",
  fontWeight: "600",
  margin: "0 0 20px",
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
}

const detailRow = {
  margin: "0 0 16px",
  display: "block",
}

const label = {
  color: "#64748b",
  fontSize: "14px",
  fontWeight: "600",
  margin: "0 0 4px",
  display: "block",
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
}

const value = {
  color: "#1e293b",
  fontSize: "16px",
  margin: "0",
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
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
  border: "1px solid #e2e8f0",
  borderRadius: "8px",
  padding: "24px",
  margin: "0 0 32px",
}

const messageText = {
  color: "#1e293b",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
}

const actionSection = {
  textAlign: "center" as const,
  margin: "32px 0",
}

const reminderText = {
  color: "#7b329b",
  fontSize: "14px",
  fontWeight: "500",
  margin: "0 0 24px",
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
}

const replyButton = {
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

export default BusinessNotificationEmail
