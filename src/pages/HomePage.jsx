import { useNavigate } from "react-router-dom";
import { MODULES } from "../data/modules";
import { loadProgress } from "../storage";

export function HomePage({ dark, setDark, T, isMobile }) {
  const navigate = useNavigate();

  const handleStart = () => {
    const saved = loadProgress();
    const moduleId = saved?.activeModuleId ?? 1;
    const lessonId = saved?.activeLessonId ?? "1a";
    navigate(`/learn/${moduleId}/${lessonId}`);
  };

  const S = {
    section: { maxWidth: 760, margin: "0 auto", padding: isMobile ? "52px 22px" : "80px 40px" },
    eyebrow: { fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: T.textMuted, marginBottom: 20 },
    divider: { borderTop: `1px solid ${T.border}` },
  };

  return (
    <div style={{ minHeight: "100vh", background: T.bg, color: T.text, fontFamily: "'DM Sans','Instrument Sans','Segoe UI',system-ui,sans-serif", overflowX: "hidden" }}>

      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: T.bg, borderBottom: `1px solid ${T.border}`, padding: isMobile ? "13px 22px" : "13px 48px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase" }}>
          <span style={{ color: T.textMuted }}>with a </span>
          <span style={{ color: T.accent }}>brain of salt</span>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button onClick={() => setDark(!dark)}
            style={{ background: "none", border: `1px solid ${T.border}`, borderRadius: 6, padding: "5px 10px", cursor: "pointer", color: T.textMuted, fontSize: 13, lineHeight: 1 }}>
            {dark ? "☀" : "◑"}
          </button>
          <button onClick={handleStart}
            style={{ padding: "7px 16px", background: T.accent, border: "none", borderRadius: 6, color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
            Open companion →
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ ...S.section, paddingTop: isMobile ? 64 : 100, paddingBottom: isMobile ? 52 : 80, textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "4px 12px", borderRadius: 20, border: `1px solid ${T.border}`, background: T.bgSecondary, marginBottom: 32 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.success, flexShrink: 0 }} />
          <span style={{ fontSize: 11, fontWeight: 600, color: T.textSecondary }}>a thinking companion for product managers</span>
        </div>
        <h1 style={{ fontSize: isMobile ? 36 : 52, fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.028em", color: T.text, margin: "0 0 24px" }}>
          There's a gap between<br />
          seeing a problem and<br />
          <span style={{ color: T.accent }}>knowing what to do with it.</span>
        </h1>
        <p style={{ fontSize: isMobile ? 16 : 17, lineHeight: 1.85, color: T.textSecondary, margin: "0 auto 40px", maxWidth: 520 }}>
          Not a course. Not a certification. A companion that thinks alongside you —
          through discovery, through decisions, through the messy middle of building
          something that matters.
        </p>
        <button onClick={handleStart}
          style={{ padding: isMobile ? "15px 32px" : "13px 32px", background: T.accent, border: "none", borderRadius: 8, color: "#fff", fontSize: isMobile ? 16 : 15, fontWeight: 700, cursor: "pointer", minHeight: 50, letterSpacing: "0.01em" }}>
          Start thinking →
        </button>
      </section>

      <div style={S.divider} />

      {/* ── HOW IT WORKS ── */}
      <section style={S.section}>
        <div style={S.eyebrow}>How it works</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 36 }}>
          {[
            { label: "Read", icon: "◌", color: T.accent, bg: T.accentBg, desc: "Concepts written the way a senior PM would brief you — direct, specific, no textbook language." },
            { label: "Think", icon: "◎", color: T.amber, bg: T.warningBg, desc: "Four-option scenarios designed to reveal how you reason, not just test what you know." },
            { label: "Do", icon: "◉", color: T.teal, bg: T.tealBg, desc: "Write it out. Graded against real criteria, then reviewed by an AI coach that reads what you actually said." },
          ].map((f, i) => (
            <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "16px 18px", background: T.bgSecondary, border: `1px solid ${T.border}`, borderRadius: 9 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flexShrink: 0 }}>
                <span style={{ fontSize: 16, color: f.color, lineHeight: 1 }}>{f.icon}</span>
                <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "2px 6px", borderRadius: 3, background: f.bg, color: f.color, border: `1px solid ${T.border}` }}>{f.label}</span>
              </div>
              <span style={{ fontSize: 13.5, lineHeight: 1.75, color: T.textSecondary, paddingTop: 2 }}>{f.desc}</span>
            </div>
          ))}
        </div>
        <button onClick={handleStart}
          style={{ padding: isMobile ? "14px 28px" : "11px 28px", background: "none", border: `1px solid ${T.accent}`, borderRadius: 8, color: T.accent, fontSize: isMobile ? 15 : 14, fontWeight: 700, cursor: "pointer", minHeight: 46 }}>
          Try a lesson →
        </button>
      </section>

      <div style={S.divider} />

      {/* ── WHAT'S INSIDE ── */}
      <section style={{ ...S.section, paddingBottom: isMobile ? 24 : 40 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 20, gap: 12 }}>
          <div style={S.eyebrow}>What's inside</div>
          <span style={{ fontSize: 12, color: T.textMuted }}>{MODULES.length} modules · free</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {MODULES.map((mod, i) => {
            const iconColor = ["#6366f1","#3d3df5","#10b981","#f59e0b","#0ea5e9","#6366f1","#ec4899","#6b6b63","#0f766e"][i] || T.textMuted;
            return (
              <div key={mod.id} onClick={handleStart}
                style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 16px", background: T.bgSecondary, border: `1px solid ${T.border}`, borderRadius: 8, cursor: "pointer", transition: "all 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = T.accent; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: T.bgTertiary, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 17, color: iconColor, lineHeight: 1 }}>{mod.icon}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: T.text, marginBottom: 1 }}>{mod.title}</div>
                  <div style={{ fontSize: 12, color: T.textSecondary }}>{mod.subtitle}</div>
                </div>
                <div style={{ fontSize: 11, color: T.textMuted, flexShrink: 0 }}>→</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section style={{ maxWidth: 760, margin: "0 auto", padding: isMobile ? "32px 22px 72px" : "48px 40px 96px" }}>
        <div style={{ background: T.bgSecondary, border: `1px solid ${T.border}`, borderRadius: 14, padding: isMobile ? "36px 24px" : "52px 52px" }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: T.textMuted, marginBottom: 16 }}>For the PM who can't stop thinking about problems</div>
          <h2 style={{ fontSize: isMobile ? 28 : 38, fontWeight: 800, letterSpacing: "-0.02em", color: T.text, margin: "0 0 18px", lineHeight: 1.15 }}>
            Start where you are.<br />
            Think further than you have.
          </h2>
          <p style={{ fontSize: isMobile ? 14.5 : 15, color: T.textSecondary, lineHeight: 1.8, margin: "0 0 32px" }}>
            No prerequisites. No syllabus to finish.
            Just a companion — with a brain of salt — that meets you where you are
            and helps you think better about what to build next.
          </p>
          <button onClick={handleStart}
            style={{ padding: isMobile ? "15px 32px" : "13px 36px", background: T.accent, border: "none", borderRadius: 8, color: "#fff", fontSize: isMobile ? 16 : 15, fontWeight: 700, cursor: "pointer", minHeight: 52, width: isMobile ? "100%" : "auto" }}>
            Open your companion →
          </button>
        </div>
      </section>

      <div style={{ borderTop: `1px solid ${T.border}`, padding: isMobile ? "20px 22px" : "20px 48px", display: "flex", justifyContent: "center" }}>
        <a href="/privacy" style={{ fontSize: 11, color: T.textMuted, textDecoration: "none" }}
          onMouseEnter={e => e.target.style.color = T.textSecondary}
          onMouseLeave={e => e.target.style.color = T.textMuted}>
          Privacy Policy
        </a>
      </div>

    </div>
  );
}
