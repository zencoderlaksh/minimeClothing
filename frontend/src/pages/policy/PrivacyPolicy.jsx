import React, { useState } from "react";
import { Link } from "react-router-dom";

const sections = [
  {
    id: "info",
    icon: "🧩",
    title: "Information We Collect",
    content: [
      {
        subtitle: "Personal Information",
        text: "When you create an account or place an order with MiniMe, we collect information such as your name, email address, shipping address, phone number, and payment details. This information is essential to process your orders and provide you with our services.",
      },
      {
        subtitle: "Usage Data",
        text: "We automatically collect information about how you interact with our website, including your IP address, browser type, pages visited, time spent on pages, and referring URLs. This helps us understand how our customers use MiniMe and improve their experience.",
      },
      {
        subtitle: "Device Information",
        text: "We may collect information about the device you use to access MiniMe, including hardware model, operating system, unique device identifiers, and mobile network information.",
      },
    ],
  },
  {
    id: "use",
    icon: "✨",
    title: "How We Use Your Information",
    content: [
      {
        subtitle: "Order Processing",
        text: "We use your personal information primarily to process and fulfill your orders, send order confirmations and shipping updates, handle returns and exchanges, and provide customer support.",
      },
      {
        subtitle: "Personalization",
        text: "MiniMe uses your data to personalize your shopping experience — including product recommendations, tailored content, and remembering your preferences and wishlist items.",
      },
      {
        subtitle: "Communications",
        text: "With your consent, we send promotional emails about new collections, exclusive offers, and MiniMe news. You may unsubscribe from marketing emails at any time via the link in any email we send.",
      },
      {
        subtitle: "Analytics & Improvement",
        text: "We analyze usage data to understand trends, troubleshoot issues, test new features, and continually improve our website and services.",
      },
    ],
  },
  {
    id: "sharing",
    icon: "🔗",
    title: "Sharing Your Information",
    content: [
      {
        subtitle: "Service Providers",
        text: "We share your information with trusted third-party service providers who assist us in operating MiniMe — including payment processors, shipping carriers, cloud hosting providers, and analytics partners. These providers are contractually obligated to protect your data.",
      },
      {
        subtitle: "Legal Requirements",
        text: "We may disclose your information if required by law, regulation, legal process, or governmental request, or if we believe disclosure is necessary to protect the rights, property, or safety of MiniMe, our customers, or others.",
      },
      {
        subtitle: "Business Transfers",
        text: "In the event of a merger, acquisition, or sale of all or part of MiniMe's assets, your information may be transferred as part of that transaction. We will notify you of any such change.",
      },
    ],
  },
  {
    id: "cookies",
    icon: "🍪",
    title: "Cookies & Tracking",
    content: [
      {
        subtitle: "What Are Cookies",
        text: "Cookies are small text files stored on your device when you visit MiniMe. We use cookies to keep you logged in, remember your cart, understand your preferences, and improve site performance.",
      },
      {
        subtitle: "Types We Use",
        text: "We use essential cookies (required for the site to work), preference cookies (to remember your settings), analytics cookies (to understand usage patterns), and marketing cookies (to show relevant ads). You can control cookie settings through your browser.",
      },
      {
        subtitle: "Third-Party Tracking",
        text: "Some of our pages use tools like Google Analytics and Meta Pixel. These services may collect information about your activity on MiniMe and other websites. Please review their respective privacy policies for more information.",
      },
    ],
  },
  {
    id: "rights",
    icon: "🛡️",
    title: "Your Rights & Choices",
    content: [
      {
        subtitle: "Access & Correction",
        text: "You have the right to access the personal information MiniMe holds about you and to request corrections if any information is inaccurate or incomplete. You can update most information directly through your account settings.",
      },
      {
        subtitle: "Deletion",
        text: "You may request that MiniMe delete your personal data. We will honor such requests subject to our legal obligations to retain certain records (e.g., for tax or fraud prevention purposes).",
      },
      {
        subtitle: "Opt-Out",
        text: "You can opt out of marketing communications at any time. You may also opt out of certain data processing activities, including the sale of your personal information, where applicable under local law.",
      },
    ],
  },
  {
    id: "security",
    icon: "🔒",
    title: "Data Security",
    content: [
      {
        subtitle: "How We Protect Your Data",
        text: "MiniMe implements industry-standard security measures including SSL/TLS encryption, secure payment processing through PCI-DSS compliant providers, and strict access controls on our internal systems. We regularly review our security practices.",
      },
      {
        subtitle: "Data Retention",
        text: "We retain your personal information for as long as your account is active or as needed to provide services, comply with our legal obligations, resolve disputes, and enforce our agreements.",
      },
    ],
  },
  {
    id: "children",
    icon: "👶",
    title: "Children's Privacy",
    content: [
      {
        subtitle: "Age Requirement",
        text: "MiniMe's services are not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that a child under 13 has provided us with personal information, we will take steps to delete such information promptly.",
      },
    ],
  },
  {
    id: "contact",
    icon: "📬",
    title: "Contact Us",
    content: [
      {
        subtitle: "Get In Touch",
        text: "If you have any questions, concerns, or requests regarding this Privacy Policy or how MiniMe handles your personal data, please contact our Privacy Team at privacy@minime.com or write to us at: MiniMe Privacy Team, 12 Style Avenue, Fashion District, New Delhi — 110001, India.",
      },
    ],
  },
];

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState(null);

  const toggle = (id) => setActiveSection(activeSection === id ? null : id);

  return (
    <div style={{ minHeight: "100vh", background: "#FDF8F3", fontFamily: "'Georgia', serif" }}>

      {/* Header */}
      <div style={{ background: "#1A1A2E", padding: "0 32px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 0" }}>
          <Link to="/" style={{ color: "#F9A8D4", fontSize: 13, letterSpacing: "0.08em", textDecoration: "none", fontFamily: "sans-serif" }}>
            ← Back to MiniMe
          </Link>
          <span style={{ color: "#fff", fontFamily: "sans-serif", fontSize: 13, opacity: 0.5 }}>
            Last updated: May 2026
          </span>
        </div>
      </div>

      {/* Hero */}
      <div style={{ background: "#1A1A2E", padding: "60px 32px 80px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-block", background: "#F9A8D4", color: "#1A1A2E", fontSize: 12, fontFamily: "sans-serif", fontWeight: 700, letterSpacing: "0.15em", padding: "6px 18px", borderRadius: 999, marginBottom: 24, textTransform: "uppercase" }}>
            Privacy Policy
          </div>
          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", color: "#fff", lineHeight: 1.1, margin: "0 0 20px", fontStyle: "italic" }}>
            Your privacy, <br />our promise.
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, lineHeight: 1.8, maxWidth: 520, margin: "0 auto", fontFamily: "sans-serif" }}>
            At MiniMe, we believe your personal information is yours. Here's exactly how we collect, use, and protect it.
          </p>
        </div>
      </div>

      {/* Wave divider */}
      <div style={{ background: "#1A1A2E", lineHeight: 0 }}>
        <svg viewBox="0 0 1440 60" style={{ display: "block", width: "100%" }}>
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z" fill="#FDF8F3" />
        </svg>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px 80px" }}>

        <p style={{ fontFamily: "sans-serif", fontSize: 15, color: "#666", lineHeight: 1.8, marginBottom: 48, padding: "24px 28px", background: "#fff", borderRadius: 16, borderLeft: "4px solid #F9A8D4" }}>
          This Privacy Policy applies to all products and services offered by <strong>MiniMe</strong>. By using our website or placing an order, you agree to the terms outlined below. We encourage you to read it in full.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {sections.map((section) => {
            const isOpen = activeSection === section.id;
            return (
              <div
                key={section.id}
                style={{
                  background: "#fff",
                  borderRadius: 20,
                  overflow: "hidden",
                  border: isOpen ? "1.5px solid #F9A8D4" : "1.5px solid #EDE8E2",
                  transition: "border-color 0.25s",
                }}
              >
                <button
                  onClick={() => toggle(section.id)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "22px 28px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    gap: 16,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span style={{ fontSize: 24 }}>{section.icon}</span>
                    <span style={{ fontSize: 18, fontFamily: "Georgia, serif", color: "#1A1A2E", fontStyle: "italic" }}>
                      {section.title}
                    </span>
                  </div>
                  <span style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: isOpen ? "#1A1A2E" : "#F3EDE7",
                    color: isOpen ? "#fff" : "#1A1A2E",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 18, flexShrink: 0,
                    transition: "all 0.25s",
                    transform: isOpen ? "rotate(45deg)" : "none",
                    fontFamily: "sans-serif",
                  }}>
                    +
                  </span>
                </button>

                {isOpen && (
                  <div style={{ padding: "0 28px 28px", borderTop: "1px solid #F3EDE7" }}>
                    {section.content.map((item, i) => (
                      <div key={i} style={{ marginTop: 20 }}>
                        <h4 style={{ fontFamily: "sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#F9A8D4", marginBottom: 8 }}>
                          {item.subtitle}
                        </h4>
                        <p style={{ fontFamily: "sans-serif", fontSize: 15, color: "#555", lineHeight: 1.8 }}>
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div style={{ marginTop: 60, textAlign: "center" }}>
          <div style={{ display: "inline-block", background: "#1A1A2E", color: "#fff", padding: "32px 48px", borderRadius: 24 }}>
            <p style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: 20, marginBottom: 8 }}>
              Questions about your privacy?
            </p>
            <p style={{ fontFamily: "sans-serif", fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 20 }}>
              Our team is here to help.
            </p>
            <a
              href="mailto:privacy@minime.com"
              style={{ display: "inline-block", background: "#F9A8D4", color: "#1A1A2E", padding: "12px 28px", borderRadius: 999, fontFamily: "sans-serif", fontSize: 14, fontWeight: 700, textDecoration: "none", letterSpacing: "0.05em" }}
            >
              privacy@minime.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;