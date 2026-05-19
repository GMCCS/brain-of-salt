import { useNavigate } from "react-router-dom";

export function PrivacyPage({ T, isMobile }) {
  const navigate = useNavigate();

  const S = {
    section: { maxWidth: 680, margin: "0 auto", padding: isMobile ? "40px 22px" : "64px 40px" },
    h2: { fontSize: isMobile ? 15 : 15, fontWeight: 700, color: T.text, margin: "32px 0 8px" },
    p: { fontSize: isMobile ? 14 : 14, lineHeight: 1.85, color: T.textSecondary, margin: "0 0 12px" },
  };

  return (
    <div style={{ minHeight: "100vh", background: T.bg, color: T.text, fontFamily: "'DM Sans','Instrument Sans','Segoe UI',system-ui,sans-serif" }}>

      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: T.bg, borderBottom: `1px solid ${T.border}`, padding: isMobile ? "13px 22px" : "13px 48px", display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={() => navigate(-1)}
          style={{ background: "none", border: "none", cursor: "pointer", color: T.textMuted, fontSize: 11, padding: 0 }}>
          ← Back
        </button>
        <div style={{ width: 1, height: 16, background: T.border }} />
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase" }}>
          <span style={{ color: T.textMuted }}>with a </span>
          <span style={{ color: T.accent }}>brain of salt</span>
        </div>
      </nav>

      <div style={S.section}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: T.textMuted, marginBottom: 16 }}>Privacy</div>
        <h1 style={{ fontSize: isMobile ? 28 : 36, fontWeight: 800, letterSpacing: "-0.02em", color: T.text, margin: "0 0 12px", lineHeight: 1.15 }}>Privacy Policy</h1>
        <p style={{ ...S.p, color: T.textMuted }}>Last updated: May 2026</p>

        <div style={{ borderTop: `1px solid ${T.border}`, marginTop: 24 }} />

        <h2 style={S.h2}>What this app does</h2>
        <p style={S.p}>
          With a Brain of Salt is a learning platform for product managers. It is free to use
          and does not require an account or registration of any kind.
        </p>

        <h2 style={S.h2}>Data stored on your device</h2>
        <p style={S.p}>
          Your learning progress — completed lessons, quiz answers, XP, and draft scenario
          responses — is stored in your browser's <code style={{ fontSize: 12, background: T.bgSecondary, padding: "1px 5px", borderRadius: 3, color: T.text }}>localStorage</code>.
          This data never leaves your device and is not accessible to us. You can clear it at
          any time using the "Reset progress" button in the app, or by clearing your browser's
          local storage.
        </p>

        <h2 style={S.h2}>AI coach — data sent to Anthropic</h2>
        <p style={S.p}>
          When you submit a scenario exercise, your written answer is sent to Anthropic's API
          to generate coaching feedback. This means the text you write is processed by
          Anthropic, a third party. Please do not include personal information
          (names, email addresses, company details) in your answers.
        </p>
        <p style={S.p}>
          Anthropic's own privacy policy applies to this processing:{" "}
          <a href="https://www.anthropic.com/privacy" target="_blank" rel="noopener noreferrer"
            style={{ color: T.accent }}>anthropic.com/privacy</a>
        </p>

        <h2 style={S.h2}>Analytics</h2>
        <p style={S.p}>
          This site uses Vercel Web Analytics to understand how the platform is used.
          Vercel's analytics does not use cookies, does not fingerprint individual users,
          and does not collect personally identifiable information. It tracks page views
          and general visitor metadata (country, browser type, device type).
        </p>
        <p style={S.p}>
          Vercel's privacy policy:{" "}
          <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer"
            style={{ color: T.accent }}>vercel.com/legal/privacy-policy</a>
        </p>

        <h2 style={S.h2}>Cookies</h2>
        <p style={S.p}>
          This app does not use cookies for tracking or advertising. The only browser
          storage used is <code style={{ fontSize: 12, background: T.bgSecondary, padding: "1px 5px", borderRadius: 3, color: T.text }}>localStorage</code> for your learning progress,
          which stays on your device.
        </p>

        <h2 style={S.h2}>Third-party processors</h2>
        <p style={S.p}>
          This app is hosted on Vercel (infrastructure and analytics) and uses Anthropic's
          API (AI coaching). Both are subject to their own privacy policies linked above.
          No other third-party services are used.
        </p>

        <h2 style={S.h2}>Your rights (GDPR)</h2>
        <p style={S.p}>
          Because no personal data is stored server-side, there is nothing for us to delete
          or export on your behalf. Your scenario answers are processed by Anthropic transiently
          and are not retained by this platform. For data held by Anthropic, refer to their
          privacy policy.
        </p>
        <p style={S.p}>
          If you have questions about privacy, contact:{" "}
          <a href="mailto:goncalomccs@gmail.com" style={{ color: T.accent }}>goncalomccs@gmail.com</a>
        </p>

        <div style={{ borderTop: `1px solid ${T.border}`, marginTop: 40, paddingTop: 24 }}>
          <button onClick={() => navigate(-1)}
            style={{ padding: "9px 20px", background: T.accent, border: "none", borderRadius: 7, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            ← Back to the app
          </button>
        </div>
      </div>
    </div>
  );
}
