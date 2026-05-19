import { useNavigate } from "react-router-dom";
import { MODULES } from "../data/modules";
import { loadProgress } from "../storage";

export function HomePage({ dark, setDark, T, isMobile }) {
  const navigate = useNavigate();
  const totalLessons = MODULES.reduce((a, m) => a + m.lessons.length, 0);

  const handleStart = () => {
    const saved = loadProgress();
    const moduleId = saved?.activeModuleId ?? 1;
    const lessonId = saved?.activeLessonId ?? "1a";
    navigate(`/learn/${moduleId}/${lessonId}`);
  };

  const S = {
    section: { maxWidth: 620, margin: "0 auto", padding: isMobile ? "52px 22px" : "80px 40px" },
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

      <section style={{ ...S.section, paddingTop: isMobile ? 64 : 100, paddingBottom: isMobile ? 52 : 80 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "4px 12px", borderRadius: 20, border: `1px solid ${T.border}`, background: T.bgSecondary, marginBottom: 32 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.success, flexShrink: 0 }} />
          <span style={{ fontSize: 11, fontWeight: 600, color: T.textSecondary }}>a thinking companion for product managers</span>
        </div>
        <h1 style={{ fontSize: isMobile ? 36 : 52, fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.028em", color: T.text, margin: "0 0 24px" }}>
          There's a gap between<br />
          seeing a problem and<br />
          <span style={{ color: T.accent }}>knowing what to do with it.</span>
        </h1>
        <p style={{ fontSize: isMobile ? 16 : 17, lineHeight: 1.85, color: T.textSecondary, margin: "0 0 40px", maxWidth: 520 }}>
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

      <section id="the-gap" style={S.section}>
        <div style={S.eyebrow}>The problem it's solving</div>
        <p style={{ fontSize: isMobile ? 15 : 16, lineHeight: 1.9, color: T.text, margin: "0 0 20px", fontWeight: 500 }}>
          Product managers are busy. Genuinely busy. But most of that busyness is execution —
          sprints, stakeholders, roadmaps, reviews.
        </p>
        <p style={{ fontSize: isMobile ? 14.5 : 15, lineHeight: 1.9, color: T.textSecondary, margin: "0 0 20px" }}>
          The thinking that happens <em style={{ color: T.text, fontStyle: "normal", fontWeight: 600 }}>before</em> execution —
          why does this problem matter, who does it actually affect,
          is this the right thing to build at all — gets squeezed.
          Not because PMs don't care about it. Because there's rarely a space designed for it.
        </p>
        <p style={{ fontSize: isMobile ? 14.5 : 15, lineHeight: 1.9, color: T.textSecondary, margin: "0 0 40px" }}>
          AI makes this more urgent, not less. When building is cheap and fast,
          judgment about <em style={{ color: T.text, fontStyle: "normal", fontWeight: 600 }}>what to build</em> becomes the scarce resource.
          The PM who can think clearly about a problem before reaching for a solution
          is worth ten times the one who just executes quickly.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 1, borderTop: `1px solid ${T.border}` }}>
          {[
            { q: "Why do most discovery processes fail?", a: "Because they're designed to confirm decisions already made, not to find out what's actually true. This companion teaches the other kind." },
            { q: "What does it mean to think in AI?", a: "Understanding what AI can and can't do well enough to make product decisions — not to write the code, but to own the outcome." },
            { q: "What's a 'thinking companion' vs a course?", a: "A course ends. A companion grows with you. New problems, new scenarios, new thinking prompts — added as the field changes and as you do." },
          ].map((item, i, arr) => (
            <div key={i} style={{ padding: "22px 0", borderBottom: i < arr.length - 1 ? `1px solid ${T.border}` : "none" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 8 }}>{item.q}</div>
              <div style={{ fontSize: isMobile ? 13.5 : 14, lineHeight: 1.8, color: T.textSecondary }}>{item.a}</div>
            </div>
          ))}
        </div>
      </section>

      <div style={S.divider} />

      <section style={S.section}>
        <div style={S.eyebrow}>How it works</div>
        <p style={{ fontSize: isMobile ? 14.5 : 15, lineHeight: 1.9, color: T.textSecondary, margin: "0 0 32px" }}>
          Every module pairs a concept with a real decision to practice.
          You don't read about discovery — you do discovery.
          You don't read about evaluating AI features — you evaluate one, then get coached on your thinking.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 28 }}>
          {[
            { label: "Read", icon: "◌", color: T.accent, bg: T.accentBg, desc: "Concepts written the way a senior PM would brief you — direct, specific, no textbook language." },
            { label: "Think", icon: "◎", color: T.amber, bg: T.warningBg, desc: "A scenario question with four options, each designed to reveal something about how you reason." },
            { label: "Do", icon: "◉", color: T.teal, bg: T.tealBg, desc: "An open-ended lab you write out. Graded against real criteria, then reviewed by an AI coach that reads what you actually said." },
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
        <div style={{ padding: "20px 22px", background: T.accentBg, border: `1px solid ${T.border}`, borderRadius: 10, display: "flex", gap: 14, alignItems: "flex-start" }}>
          <span style={{ fontSize: 20, flexShrink: 0, lineHeight: 1, color: T.accent }}>◈</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.accent, marginBottom: 6 }}>Your companion — always in the room</div>
            <div style={{ fontSize: 13.5, lineHeight: 1.8, color: T.textSecondary }}>
              At any point, open your companion and describe what you're thinking about.
              A UX decision. A discovery problem. An answer you just wrote and aren't sure about.
              It'll push back, tell you what's strong, and flag what you're missing.
              Not a chatbot. A thinking partner.
            </div>
          </div>
        </div>
      </section>

      <div style={S.divider} />

      <section style={S.section}>
        <div style={S.eyebrow}>The arc</div>
        <p style={{ fontSize: isMobile ? 14.5 : 15, lineHeight: 1.9, color: T.textSecondary, margin: "0 0 28px" }}>
          The companion follows the natural shape of product thinking —
          from the question that comes before everything else,
          to the moment you're defending a decision to a room full of people who need to trust you.
        </p>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {[
            { n: "01", icon: "◌", phase: "Discover", desc: "What's worth building — and how do you know? The discipline of genuine curiosity, behavioral signals, and being willing to find out you're wrong." },
            { n: "02", icon: "⬡", phase: "Think in AI", desc: "How AI actually works, where it breaks, and what changes about your job when the rules are learned instead of written." },
            { n: "03", icon: "◉", phase: "Speak the language", desc: "LLMs, prompts, evals, failure modes — the technical vocabulary you need to make real product decisions without becoming an engineer." },
            { n: "04", icon: "◆", phase: "Own the data", desc: "Models hallucinate. Data drifts. Bias hides in training sets. How you think about data determines what you can build responsibly." },
            { n: "05", icon: "◎", phase: "Decide", desc: "Build vs buy vs fine-tune. Sequencing under real constraints. Saying an intelligent no to the things that aren't the one thing." },
            { n: "06", icon: "◐", phase: "Build with integrity", desc: "Ethics and governance aren't compliance theater — they're product decisions that determine whether your AI feature is trusted or abandoned." },
            { n: "07", icon: "◇", phase: "Ship and watch", desc: "Deployment patterns, drift detection, incident response. What it means to be responsible for something that keeps changing after you ship it." },
            { n: "08", icon: "◑", phase: "Communicate", desc: "Translating AI tradeoffs for engineers, executives, and customers — each of whom needs something different from you." },
          ].map((step, i, arr) => (
            <div key={i} style={{ display: "flex", gap: 16, padding: "18px 0", borderBottom: i < arr.length - 1 ? `1px solid ${T.border}` : "none", alignItems: "flex-start" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flexShrink: 0, minWidth: 32 }}>
                <span style={{ fontSize: 17, color: T.textMuted, lineHeight: 1 }}>{step.icon}</span>
                <span style={{ fontSize: 9, fontWeight: 800, color: T.textMuted, letterSpacing: "0.04em" }}>{step.n}</span>
              </div>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: T.text, marginBottom: 5 }}>{step.phase}</div>
                <div style={{ fontSize: 13.5, lineHeight: 1.8, color: T.textSecondary }}>{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={S.divider} />

      <section style={S.section}>
        <div style={S.eyebrow}>Who it's for</div>
        <p style={{ fontSize: isMobile ? 15 : 16, lineHeight: 1.9, color: T.text, margin: "0 0 28px", fontWeight: 500 }}>
          Product managers who care about the thinking, not just the doing.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            "You feel the pressure to 'add AI' and want to know how to think about it properly — not just react to it",
            "You're good at executing but want to get better at the earlier, harder question: what's actually worth building?",
            "You want to understand AI well enough to make real product decisions, not just nod in technical conversations",
            "You're building something yourself and need a thinking partner for the decisions nobody else is around to help with",
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "14px 16px", background: T.bgSecondary, border: `1px solid ${T.border}`, borderRadius: 8 }}>
              <span style={{ color: T.success, fontSize: 13, flexShrink: 0, marginTop: 1 }}>✓</span>
              <span style={{ fontSize: 14, lineHeight: 1.75, color: T.textSecondary }}>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <div style={S.divider} />

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

      <section style={{ maxWidth: 620, margin: "0 auto", padding: isMobile ? "32px 22px 72px" : "48px 40px 96px" }}>
        <div style={{ background: T.bgSecondary, border: `1px solid ${T.border}`, borderRadius: 14, padding: isMobile ? "36px 24px" : "52px 52px" }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: T.textMuted, marginBottom: 16 }}>For the PM who can't stop thinking about problems</div>
          <h2 style={{ fontSize: isMobile ? 28 : 38, fontWeight: 800, letterSpacing: "-0.02em", color: T.text, margin: "0 0 18px", lineHeight: 1.15 }}>
            Start where you are.<br />
            Think further than you have.
          </h2>
          <p style={{ fontSize: isMobile ? 14.5 : 15, color: T.textSecondary, lineHeight: 1.8, margin: "0 0 32px", maxWidth: 400 }}>
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

    </div>
  );
}
