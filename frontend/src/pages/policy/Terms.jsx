import React, { useState } from "react";
import { Link } from "react-router-dom";

const terms = [
  {
    id: "acceptance",
    number: "01",
    title: "Acceptance of Terms",
    content: `By accessing or using the MiniMe website, mobile application, or any of our services, you confirm that you are at least 18 years of age (or have parental consent), have read and understood these Terms & Conditions, and agree to be legally bound by them. If you do not agree, please discontinue use of our services immediately.

MiniMe reserves the right to update or modify these Terms at any time without prior notice. Your continued use of our services after any changes constitutes your acceptance of the revised Terms. We recommend reviewing this page periodically.`,
  },
  {
    id: "account",
    number: "02",
    title: "Account Registration & Responsibility",
    content: `To access certain features of MiniMe — such as placing orders, saving wishlists, and tracking deliveries — you may need to create an account. You agree to provide accurate, current, and complete information during registration and to update such information as necessary.

You are solely responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. MiniMe will not be liable for any loss or damage resulting from unauthorized use of your account. Notify us immediately at clothingminime4@gmail.com if you suspect any breach of security or unauthorized use.`,
  },
  {
    id: "orders",
    number: "03",
    title: "Orders, Pricing & Payment",
    content: `All orders placed through MiniMe are subject to product availability. We reserve the right to refuse or cancel any order for reasons including but not limited to product unavailability, errors in product or pricing information, or suspected fraudulent activity.

Prices displayed on MiniMe are in Indian Rupees (INR) unless otherwise stated and are inclusive of applicable taxes. Payment must be made in full at the time of placing an order. We accept major credit/debit cards, UPI, net banking, and select digital wallets. MiniMe uses secure, PCI-DSS-compliant payment gateways and does not store your full payment details.`,
  },
  {
    id: "shipping",
    number: "04",
    title: "Shipping & Delivery",
    content: `MiniMe aims to dispatch all orders within 2–3 business days of order confirmation. Delivery timelines vary by location, typically ranging from 4–7 business days for domestic orders. Estimated delivery dates are provided at checkout and are indicative only — MiniMe is not liable for delays caused by courier partners, natural events, or circumstances beyond our control.

Risk of loss and title for items purchased pass to you upon delivery. If your order is visibly damaged upon delivery, please refuse it and contact us within 24 hours.`,
  },
  {
    id: "returns",
    number: "05",
    title: "Returns, Exchanges & Refunds",
    content: `MiniMe accepts returns and exchanges within 14 days of delivery for items that are unused, unworn, unwashed, and in their original packaging with all tags attached. Certain product categories — including innerwear, swimwear, earrings, and sale items — are non-returnable for hygiene and safety reasons.

To initiate a return or exchange, log in to your MiniMe account and raise a request under "My Orders", or contact our support team. Approved refunds will be processed within 7–10 business days to your original payment method. Shipping charges are non-refundable unless the return is due to a MiniMe error or a defective product.`,
  },
  {
    id: "ip",
    number: "06",
    title: "Intellectual Property",
    content: `All content on the MiniMe platform — including but not limited to logos, brand name, product images, text, graphics, UI design, and software — is the exclusive property of MiniMe or its content suppliers and is protected by applicable intellectual property laws.

You may not reproduce, distribute, modify, publicly display, or create derivative works of any MiniMe content without our express written permission. Unauthorized use of MiniMe's intellectual property may result in legal action.`,
  },
  {
    id: "conduct",
    number: "07",
    title: "Prohibited Conduct",
    content: `When using MiniMe, you agree not to engage in any conduct that is unlawful, harmful, threatening, abusive, harassing, or fraudulent. Specifically, you must not: attempt to gain unauthorized access to our systems; use automated tools (bots, scrapers) to extract data from our platform; submit false, misleading, or fraudulent orders or reviews; impersonate any person or entity; or violate any applicable local, national, or international law or regulation.

MiniMe reserves the right to suspend or terminate accounts that violate these terms, with or without notice.`,
  },
  {
    id: "liability",
    number: "08",
    title: "Limitation of Liability",
    content: `To the fullest extent permitted by applicable law, MiniMe and its directors, employees, partners, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, goodwill, or other intangible losses, resulting from your use of or inability to use our services.

MiniMe's total liability to you for any claim arising out of or relating to these Terms or our services shall not exceed the amount paid by you for the specific order giving rise to the claim in the 12 months preceding the claim.`,
  },
  {
    id: "governing",
    number: "09",
    title: "Governing Law & Disputes",
    content: `These Terms & Conditions shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles. Any disputes arising out of or in connection with these Terms shall first be attempted to be resolved through good-faith negotiation between the parties.

If a dispute cannot be resolved informally, it shall be subject to the exclusive jurisdiction of the courts located in New Delhi, India. You agree to submit to the personal jurisdiction of such courts for the purpose of litigating any such disputes.`,
  },
  {
    id: "contact",
    number: "10",
    title: "Contact & Support",
    content: `If you have any questions, concerns, or feedback about these Terms & Conditions or any aspect of MiniMe's services, we'd love to hear from you. You can reach our support team at:

Email: clothingminime4@gmail.com
Phone: +91 98100 00000 (Mon–Sat, 10am–6pm IST)
Address: MiniMe HQ, 12 Style Avenue, Fashion District, New Delhi — 110001, India

We aim to respond to all queries within 2 business days.`,
  },
];

const Terms = () => {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => setOpenId(openId === id ? null : id);

  return (
    <div style={{ minHeight: "100vh", background: "#F5F3EE", fontFamily: "sans-serif" }}>

      {/* Top bar */}
      <div style={{ background: "#0D0D0D", padding: "14px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link to="/" style={{ color: "#E8C547", fontSize: 13, letterSpacing: "0.06em", textDecoration: "none" }}>
          ← Back to MiniMe
        </Link>
        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, letterSpacing: "0.06em" }}>
          EFFECTIVE: MAY 2026
        </span>
      </div>

      {/* Hero */}
      <div style={{ background: "#0D0D0D", padding: "64px 32px 0" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ marginBottom: 28 }}>
            <span style={{ background: "#E8C547", color: "#0D0D0D", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", padding: "5px 16px", borderRadius: 4, textTransform: "uppercase" }}>
              Legal
            </span>
          </div>
          <h1 style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", color: "#fff", lineHeight: 1, marginBottom: 24, fontFamily: "Georgia, serif", fontWeight: 400 }}>
            Terms &<br />
            <span style={{ color: "#E8C547" }}>Conditions.</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, lineHeight: 1.8, maxWidth: 560, paddingBottom: 48 }}>
            These terms govern your use of MiniMe. Please read them carefully — by using our services, you agree to these conditions.
          </p>

          {/* Section index pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, paddingBottom: 48 }}>
            {terms.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  toggle(t.id);
                  setTimeout(() => {
                    document.getElementById(`term-${t.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
                  }, 100);
                }}
                style={{
                  background: openId === t.id ? "#E8C547" : "rgba(255,255,255,0.08)",
                  color: openId === t.id ? "#0D0D0D" : "rgba(255,255,255,0.6)",
                  border: "none",
                  padding: "6px 14px",
                  borderRadius: 999,
                  fontSize: 12,
                  cursor: "pointer",
                  letterSpacing: "0.04em",
                  transition: "all 0.2s",
                  fontFamily: "sans-serif",
                }}
              >
                {t.number} {t.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px 80px" }}>

        <p style={{ fontSize: 14, color: "#888", lineHeight: 1.8, marginBottom: 40, padding: "20px 24px", background: "#fff", borderRadius: 12, borderLeft: "3px solid #E8C547" }}>
          These Terms & Conditions ("Terms") constitute a legally binding agreement between you and <strong>MiniMe</strong> ("we", "our", "us"). By accessing our platform or purchasing our products, you accept these Terms in full.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {terms.map((term) => {
            const isOpen = openId === term.id;
            return (
              <div
                key={term.id}
                id={`term-${term.id}`}
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  overflow: "hidden",
                  border: isOpen ? "1.5px solid #E8C547" : "1.5px solid #E8E4DC",
                  transition: "border-color 0.2s",
                }}
              >
                <button
                  onClick={() => toggle(term.id)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "20px 24px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    gap: 16,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                    <span style={{
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      color: isOpen ? "#0D0D0D" : "#bbb",
                      background: isOpen ? "#E8C547" : "#F5F3EE",
                      padding: "4px 10px",
                      borderRadius: 6,
                      transition: "all 0.2s",
                      flexShrink: 0,
                    }}>
                      {term.number}
                    </span>
                    <span style={{ fontSize: 16, fontFamily: "Georgia, serif", color: "#0D0D0D" }}>
                      {term.title}
                    </span>
                  </div>
                  <span style={{
                    width: 28, height: 28,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: isOpen ? "#0D0D0D" : "#F5F3EE",
                    color: isOpen ? "#E8C547" : "#888",
                    borderRadius: "50%",
                    fontSize: 16,
                    flexShrink: 0,
                    transform: isOpen ? "rotate(45deg)" : "none",
                    transition: "all 0.25s",
                    fontFamily: "sans-serif",
                  }}>
                    +
                  </span>
                </button>

                {isOpen && (
                  <div style={{ padding: "4px 24px 24px", borderTop: "1px solid #F0EDE6" }}>
                    {term.content.split("\n\n").map((para, i) => (
                      <p key={i} style={{ fontSize: 14, color: "#555", lineHeight: 1.9, marginTop: 16 }}>
                        {para}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA footer */}
        <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ background: "#0D0D0D", borderRadius: 20, padding: "32px 28px" }}>
            <p style={{ color: "#E8C547", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>Need help?</p>
            <p style={{ color: "#fff", fontFamily: "Georgia, serif", fontSize: 18, marginBottom: 16, lineHeight: 1.4 }}>
              Got questions about our terms?
            </p>
            <a href="mailto:clothingminime4@gmail.com" style={{ color: "#E8C547", fontSize: 13, letterSpacing: "0.06em", textDecoration: "none", borderBottom: "1px solid #E8C547", paddingBottom: 2 }}>
              clothingminime4@gmail.com →
            </a>
          </div>
          <div style={{ background: "#E8C547", borderRadius: 20, padding: "32px 28px" }}>
            <p style={{ color: "#0D0D0D", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10, opacity: 0.6 }}>Also read</p>
            <p style={{ color: "#0D0D0D", fontFamily: "Georgia, serif", fontSize: 18, marginBottom: 16, lineHeight: 1.4 }}>
              Privacy Policy
            </p>
            <Link to="/privacy-policy" style={{ color: "#0D0D0D", fontSize: 13, letterSpacing: "0.06em", textDecoration: "none", borderBottom: "1px solid #0D0D0D", paddingBottom: 2 }}>
              View Privacy Policy →
            </Link>
          </div>
        </div>

        <p style={{ textAlign: "center", fontSize: 13, color: "#aaa", marginTop: 48 }}>
          © {new Date().getFullYear()} MiniMe. All rights reserved. These terms were last updated in May 2026.
        </p>
      </div>
    </div>
  );
};

export default Terms;