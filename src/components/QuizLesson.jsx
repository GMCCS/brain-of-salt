import { useState } from "react";

export function QuizLesson({ lesson, onComplete, addXP, T, isMobile }) {
  const storageKey = `bos_quiz_${lesson.id}`;

  const [selected, setSelected] = useState(() => {
    try { return JSON.parse(localStorage.getItem(storageKey))?.selected ?? null; } catch { return null; }
  });
  const [submitted, setSubmitted] = useState(() => {
    try { return JSON.parse(localStorage.getItem(storageKey))?.submitted ?? false; } catch { return false; }
  });
  const isCorrect = selected === lesson.correct;

  const handleSubmit = () => {
    if (!selected) return;
    setSubmitted(true);
    addXP(isCorrect ? 30 : 10);
    try { localStorage.setItem(storageKey, JSON.stringify({ selected, submitted: true })); } catch {}
  };

  const handleSelect = (id) => {
    if (submitted) return;
    setSelected(id);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <p style={{ fontSize: isMobile ? 15 : 14.5, lineHeight: 1.8, color: T.text, margin: 0 }}>{lesson.question}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {lesson.options.map((opt) => {
          let bg = T.bgSecondary, border = `1px solid ${T.border}`, textColor = T.textSecondary;
          if (selected === opt.id && !submitted) { bg = T.accentBg; border = `1px solid ${T.accent}`; textColor = T.text; }
          if (submitted && opt.id === lesson.correct) { bg = T.successBg; border = `1px solid ${T.successBorder}`; textColor = T.success; }
          if (submitted && selected === opt.id && !isCorrect) { bg = T.dangerBg; border = `1px solid ${T.dangerBorder}`; textColor = T.danger; }
          return (
            <button key={opt.id} onClick={() => handleSelect(opt.id)}
              style={{ background: bg, border, borderRadius: 8, padding: isMobile ? "14px 14px" : "11px 13px", minHeight: 44, textAlign: "left", cursor: submitted ? "default" : "pointer", transition: "all 0.15s", display: "flex", gap: 10, alignItems: "flex-start", width: "100%" }}
              aria-label={`Option ${opt.id.toUpperCase()}: ${opt.text}`}>
              <span style={{ fontSize: 11, fontWeight: 800, color: submitted ? "inherit" : selected === opt.id ? T.accent : T.textMuted, minWidth: 14, marginTop: 2, flexShrink: 0 }}>{opt.id.toUpperCase()}</span>
              <span style={{ fontSize: isMobile ? 14 : 13.5, lineHeight: 1.65, color: textColor }}>{opt.text}</span>
            </button>
          );
        })}
      </div>
      {!submitted ? (
        <button onClick={handleSubmit} disabled={!selected}
          style={{ padding: isMobile ? "13px 20px" : "8px 20px", width: isMobile ? "100%" : "auto", alignSelf: isMobile ? "stretch" : "flex-start", background: selected ? T.accent : T.bgTertiary, border: `1px solid ${selected ? T.accent : T.border}`, borderRadius: 7, color: selected ? "#fff" : T.textMuted, fontSize: 13.5, fontWeight: 600, cursor: selected ? "pointer" : "default", transition: "all 0.15s", minHeight: 44 }}>
          Submit answer
        </button>
      ) : (
        <div style={{ background: isCorrect ? T.successBg : T.dangerBg, border: `1px solid ${isCorrect ? T.successBorder : T.dangerBorder}`, borderRadius: 8, padding: "14px 16px" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: isCorrect ? T.success : T.danger, marginBottom: 7 }}>
            {isCorrect ? "✓ Correct — +30 XP" : "✗ Not quite — +10 XP for trying"}
          </div>
          <p style={{ fontSize: 13.5, lineHeight: 1.7, color: T.textSecondary, margin: "0 0 14px" }}>
            {isCorrect ? lesson.explanation : lesson.wrongExplanation}
          </p>
          <button onClick={onComplete}
            style={{ padding: isMobile ? "12px 20px" : "7px 18px", width: isMobile ? "100%" : "auto", background: T.accent, border: "none", borderRadius: 6, color: "#fff", fontSize: 13.5, fontWeight: 600, cursor: "pointer", minHeight: 44 }}>
            Continue →
          </button>
        </div>
      )}
    </div>
  );
}
