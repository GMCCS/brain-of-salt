import { useState, useEffect } from "react";
import { callClaude } from "../api";

export function ScenarioLesson({ lesson, onComplete, addXP, T, isMobile }) {
  const draftKey = `bos_draft_${lesson.id}`;
  const minLen = 60;

  const [answer, setAnswer] = useState(() => {
    try { return localStorage.getItem(draftKey) ?? ""; } catch { return ""; }
  });
  const [results, setResults] = useState(null);
  const [aiFeedback, setAiFeedback] = useState("");
  const [aiError, setAiError] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted) return;
    const timer = setTimeout(() => {
      try { localStorage.setItem(draftKey, answer); } catch {}
    }, 500);
    return () => clearTimeout(timer);
  }, [answer, submitted, draftKey]);

  const fetchFeedback = async (ans, testResults) => {
    setAiError(false);
    setLoadingAI(true);
    try {
      const fb = await callClaude(
        [{ role: "user", content: `Scenario: ${lesson.setup}\n\nStudent answer:\n${ans}\n\nPassed: ${testResults.filter(t => t.passed).map(t => t.label).join(", ")}\nMissed: ${testResults.filter(t => !t.passed).map(t => t.label).join(", ")}` }],
        `You are an expert AI Product Manager coach with a background in UX, product design, and product discovery. You have two roles: (1) Give direct, practical coaching on the student's PM answer — acknowledge what's strong, flag what's weak, give one concrete next step. (2) If the student's answer touches on user-facing features, interfaces, or discovery methods, proactively flag the most important implication they should consider — whether that's a UX concern, a discovery gap, or an assumption that needs validating. Keep total response to 4–5 sentences. Direct and opinionated. No fluff. You're coaching senior PMs who are smart but new to AI and rigorous discovery.`
      );
      setAiFeedback(fb);
    } catch {
      setAiError(true);
    }
    setLoadingAI(false);
  };

  const handleSubmit = async () => {
    if (answer.trim().length < minLen) return;
    const testResults = lesson.criteria.map((c) => ({ ...c, passed: c.check(answer) }));
    setResults(testResults);
    setSubmitted(true);
    const passedCount = testResults.filter(t => t.passed).length;
    addXP(Math.round((passedCount / testResults.length) * 60));
    try { localStorage.removeItem(draftKey); } catch {}
    await fetchFeedback(answer, testResults);
  };

  const passedCount = results ? results.filter(r => r.passed).length : 0;
  const allPassed = results && passedCount === results.length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 820 }}>
      <div style={{ background: T.bgSecondary, border: `1px solid ${T.border}`, borderRadius: 7, padding: "12px 14px" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: T.textMuted, marginBottom: 5, fontWeight: 700 }}>Scenario</div>
        <p style={{ fontSize: isMobile ? 14 : 13.5, lineHeight: 1.8, color: T.textSecondary, margin: 0 }}>{lesson.setup}</p>
      </div>
      <div style={{ background: T.accentBg, border: `1px solid ${T.border}`, borderRadius: 7, padding: "10px 14px" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: T.accent, marginBottom: 4, fontWeight: 700 }}>Your task</div>
        <p style={{ fontSize: isMobile ? 14 : 13.5, lineHeight: 1.65, color: T.text, margin: 0 }}>{lesson.task}</p>
      </div>
      {results && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {results.map((r) => (
            <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 10px", borderRadius: 20, background: r.passed ? T.successBg : T.dangerBg, border: `1px solid ${r.passed ? T.successBorder : T.dangerBorder}` }}>
              <span style={{ fontSize: 10, color: r.passed ? T.success : T.danger }}>{r.passed ? "✓" : "✗"}</span>
              <span style={{ fontSize: 12, color: r.passed ? T.success : T.danger, fontWeight: 600 }}>{r.label}</span>
            </div>
          ))}
        </div>
      )}
      <div>
        <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} disabled={submitted}
          placeholder={lesson.placeholder}
          aria-label="Your scenario answer"
          style={{ width: "100%", minHeight: isMobile ? 160 : 140, background: T.bg, border: `1px solid ${T.border}`, borderRadius: 7, padding: "12px 14px", color: T.text, fontSize: isMobile ? 15 : 13.5, lineHeight: 1.8, resize: "vertical", outline: "none", fontFamily: "inherit", boxSizing: "border-box", transition: "border-color 0.15s", WebkitAppearance: "none" }}
          onFocus={e => e.target.style.borderColor = T.accent}
          onBlur={e => e.target.style.borderColor = T.border}
        />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
          <span style={{ fontSize: 11.5, color: answer.length < minLen ? T.danger : T.textMuted }}>
            {answer.length} chars {answer.length < minLen ? `(min ${minLen})` : "✓"}
            {answer.length > 0 && !submitted && <span style={{ color: T.textMuted, marginLeft: 6 }}>· draft saved</span>}
          </span>
          {!submitted && (
            <p style={{ fontSize: 11, color: T.textMuted, margin: "6px 0 0", lineHeight: 1.5 }}>
              Your answer is reviewed by an AI coach (Anthropic). Don't include personal information.{" "}
              <a href="/privacy" style={{ color: T.textMuted, textDecoration: "underline" }}>Privacy policy</a>
            </p>
          )}
          {!submitted && (
            <button onClick={handleSubmit} disabled={answer.trim().length < minLen}
              aria-label="Run tests and submit your answer"
              style={{ padding: isMobile ? "12px 18px" : "7px 18px", background: answer.trim().length >= minLen ? T.accent : T.bgTertiary, border: `1px solid ${answer.trim().length >= minLen ? T.accent : T.border}`, borderRadius: 6, color: answer.trim().length >= minLen ? "#fff" : T.textMuted, fontSize: 13, fontWeight: 600, cursor: answer.trim().length >= minLen ? "pointer" : "default", transition: "all 0.15s", minHeight: 44 }}>
              Run tests & submit
            </button>
          )}
        </div>
      </div>
      {submitted && (
        <div style={{ background: T.bgSecondary, border: `1px solid ${T.border}`, borderRadius: 8, padding: "14px 16px" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: allPassed ? T.success : T.amber, marginBottom: 10 }}>
            {allPassed ? `✓ All ${results.length} tests passed — +60 XP` : `${passedCount} / ${results.length} tests passed — +${Math.round((passedCount / results.length) * 60)} XP`}
          </div>
          {loadingAI ? (
            <div style={{ display: "flex", alignItems: "center", gap: 7, color: T.textMuted, fontSize: 12 }}>
              <div style={{ width: 12, height: 12, border: `2px solid ${T.border}`, borderTopColor: T.accent, borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
              AI coach reviewing your answer...
            </div>
          ) : aiError ? (
            <div style={{ background: T.dangerBg, border: `1px solid ${T.dangerBorder}`, borderRadius: 7, padding: "12px 14px", display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ fontSize: 14, flexShrink: 0 }}>⚠️</span>
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: T.danger, marginBottom: 4 }}>Couldn't reach the AI coach</div>
                <div style={{ fontSize: 12.5, color: T.textSecondary, lineHeight: 1.6, marginBottom: 10 }}>Your answer was saved and graded. Check your connection and try again, or continue without feedback.</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button onClick={() => fetchFeedback(answer, results)}
                    style={{ padding: "7px 16px", background: T.accent, border: "none", borderRadius: 6, color: "#fff", fontSize: 12.5, fontWeight: 600, cursor: "pointer", minHeight: 36 }}>
                    Try again
                  </button>
                  <button onClick={onComplete}
                    style={{ padding: "7px 16px", background: "none", border: `1px solid ${T.border}`, borderRadius: 6, color: T.textSecondary, fontSize: 12.5, fontWeight: 600, cursor: "pointer", minHeight: 36 }}>
                    Continue anyway →
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: T.accent, marginBottom: 6, fontWeight: 700 }}>AI Coach · UX Feedback</div>
              <p style={{ fontSize: isMobile ? 14 : 13, lineHeight: 1.8, color: T.textSecondary, margin: "0 0 14px" }}>{aiFeedback}</p>
              <button onClick={onComplete}
                style={{ padding: isMobile ? "12px 20px" : "7px 18px", width: isMobile ? "100%" : "auto", background: T.accent, border: "none", borderRadius: 6, color: "#fff", fontSize: 13.5, fontWeight: 600, cursor: "pointer", minHeight: 44 }}>
                Continue →
              </button>
            </>
          )}
        </div>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
