import { MODULES } from "../data/modules";
import { ProgressRing } from "./ProgressRing";
import { XPBar } from "./XPBar";

const typeLabel = { lesson: "Read", quiz: "Quiz", scenario: "Lab" };
const typeColor = (type, T) => type === "lesson" ? T.accent : type === "quiz" ? T.amber : T.teal;

export function ModuleDrawer({ open, onClose, T, activeModuleId, activeLessonId, completed, xp, onSelectLesson, onReset }) {
  const totalLessons = MODULES.reduce((a, m) => a + m.lessons.length, 0);
  const completedCount = Object.keys(completed).length;

  return (
    <>
      {open && (
        <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 150, backdropFilter: "blur(2px)" }} />
      )}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: "82vh", background: T.card, borderRadius: "16px 16px 0 0", zIndex: 160, display: "flex", flexDirection: "column", transform: open ? "translateY(0)" : "translateY(100%)", transition: "transform 0.3s cubic-bezier(0.32,0.72,0,1)", boxShadow: "0 -8px 40px rgba(0,0,0,0.15)" }}>
        <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 4px" }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: T.border }} />
        </div>
        <div style={{ padding: "8px 18px 14px", borderBottom: `1px solid ${T.border}` }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 2 }}>
            <span style={{ color: T.textMuted }}>with a </span>
            <span style={{ color: T.accent }}>brain of salt</span>
          </div>
          <XPBar xp={xp} T={T} />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
            <span style={{ fontSize: 10.5, color: T.textMuted }}>{completedCount}/{totalLessons} lessons</span>
            <span style={{ fontSize: 10.5, color: T.textMuted }}>{Math.round((completedCount / totalLessons) * 100)}% done</span>
          </div>
          {completedCount > 0 && (
            <button onClick={() => { onReset(); onClose(); }}
              style={{ marginTop: 8, width: "100%", padding: "7px 0", background: "none", border: `1px solid ${T.border}`, borderRadius: 6, color: T.textMuted, fontSize: 11, cursor: "pointer" }}>
              Reset progress
            </button>
          )}
        </div>
        <div style={{ flex: 1, overflow: "auto", padding: "10px 12px 24px" }}>
          {MODULES.map(mod => {
            const modDone = mod.lessons.filter(l => completed[l.id]).length;
            const isActive = mod.id === activeModuleId;
            const pct = Math.round((modDone / mod.lessons.length) * 100);
            return (
              <div key={mod.id} style={{ marginBottom: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 8, background: isActive ? T.accentBg : "transparent", border: `1px solid ${isActive ? T.accent : "transparent"}` }}>
                  <ProgressRing pct={pct} color={isActive ? T.accent : T.textMuted} bgColor={T.border} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: isActive ? T.text : T.textSecondary, marginBottom: 1 }}>{mod.title}</div>
                    <div style={{ fontSize: 10, color: T.textMuted, letterSpacing: "0.06em" }}>{mod.tag} · {modDone}/{mod.lessons.length} done</div>
                  </div>
                </div>
                <div style={{ marginLeft: 10, marginTop: 2, display: "flex", flexDirection: "column", gap: 1 }}>
                  {mod.lessons.map(lesson => {
                    const isCurrent = activeLessonId === lesson.id;
                    return (
                      <button key={lesson.id}
                        onClick={() => { onSelectLesson(mod.id, lesson.id); onClose(); }}
                        style={{ background: isCurrent ? T.bgTertiary : "transparent", border: "none", borderRadius: 6, padding: "9px 10px", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, width: "100%", minHeight: 44 }}>
                        <span style={{ fontSize: 9, color: completed[lesson.id] ? T.success : isCurrent ? T.accent : T.textMuted, flexShrink: 0 }}>
                          {completed[lesson.id] ? "●" : isCurrent ? "◉" : "○"}
                        </span>
                        <span style={{ fontSize: 13, color: isCurrent ? T.text : T.textSecondary, flex: 1, lineHeight: 1.35 }}>{lesson.title}</span>
                        <span style={{ fontSize: 9.5, padding: "2px 6px", borderRadius: 3, background: T.bgTertiary, color: typeColor(lesson.type, T), fontWeight: 700, letterSpacing: "0.05em", flexShrink: 0 }}>{typeLabel[lesson.type]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
