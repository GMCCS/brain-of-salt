import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MODULES } from "../data/modules";
import { saveProgress, clearProgress } from "../storage";
import { useIsMobile } from "../hooks/useIsMobile";
import { XPBar } from "../components/XPBar";
import { ProgressRing } from "../components/ProgressRing";
import { LessonContent } from "../components/LessonContent";
import { QuizLesson } from "../components/QuizLesson";
import { ScenarioLesson } from "../components/ScenarioLesson";
import { DesignAgent } from "../components/DesignAgent";
import { ModuleDrawer } from "../components/ModuleDrawer";

const typeLabel = { lesson: "Read", quiz: "Quiz", scenario: "Lab" };
const typeColor = (type, T) => type === "lesson" ? T.accent : type === "quiz" ? T.amber : T.teal;

export function LearnPage({ dark, setDark, T, saved }) {
  const { moduleId, lessonId } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const activeModuleId = parseInt(moduleId);
  const activeLessonId = lessonId;

  const [completed, setCompleted] = useState(() => saved?.completed ?? {});
  const [xp, setXP] = useState(() => saved?.xp ?? 0);
  const [showAgent, setShowAgent] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    saveProgress({ dark, activeModuleId, activeLessonId, completed, xp });
  }, [dark, activeModuleId, activeLessonId, completed, xp]);

  const addXP = useCallback((n) => setXP(p => p + n), []);

  const markComplete = useCallback((id) => {
    setCompleted(prev => {
      if (prev[id]) return prev;
      addXP(20);
      return { ...prev, [id]: true };
    });
    const all = MODULES.flatMap(m => m.lessons);
    const idx = all.findIndex(l => l.id === id);
    const next = all[idx + 1];
    if (next) {
      const nm = MODULES.find(m => m.lessons.some(l => l.id === next.id));
      navigate(`/learn/${nm.id}/${next.id}`);
    }
  }, [addXP, navigate]);

  const resetProgress = useCallback(() => {
    clearProgress();
    setCompleted({});
    setXP(0);
    navigate("/learn/1/1a");
  }, [navigate]);

  const handleSelectLesson = (modId, lesId) => navigate(`/learn/${modId}/${lesId}`);

  const activeModule = MODULES.find(m => m.id === activeModuleId);
  const activeLesson = activeModule?.lessons.find(l => l.id === activeLessonId);

  const totalLessons = MODULES.reduce((a, m) => a + m.lessons.length, 0);
  const completedCount = Object.keys(completed).length;

  const allLessons = MODULES.flatMap(m => m.lessons);
  const currentIdx = allLessons.findIndex(l => l.id === activeLessonId);
  const prevLesson = allLessons[currentIdx - 1];
  const nextLesson = allLessons[currentIdx + 1];

  return (
    <div style={{ display: "flex", height: "100vh", background: T.bg, color: T.text, fontFamily: "'DM Sans', 'Instrument Sans', 'Segoe UI', system-ui, sans-serif", overflow: "hidden", fontSize: 14, transition: "background 0.2s, color 0.2s" }}>

      {/* ── DESKTOP SIDEBAR ── */}
      {!isMobile && (
        <div style={{ width: sidebarOpen ? 262 : 0, minWidth: sidebarOpen ? 262 : 0, overflow: "hidden", transition: "all 0.25s ease", display: "flex", flexDirection: "column", background: T.bgSecondary, borderRight: `1px solid ${T.border}`, flexShrink: 0 }}>
          <div style={{ padding: "18px 16px 14px", borderBottom: `1px solid ${T.border}` }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 1 }}>
              <span style={{ color: T.textMuted }}>with a </span>
              <span style={{ color: T.accent }}>brain of salt</span>
            </div>
            <div style={{ fontSize: 10, color: T.textMuted, marginBottom: 14 }}>A companion for product thinkers</div>
            <XPBar xp={xp} T={T} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
              <span style={{ fontSize: 10, color: T.textMuted }}>{completedCount}/{totalLessons} lessons</span>
              <span style={{ fontSize: 10, color: T.textMuted }}>{Math.round((completedCount / totalLessons) * 100)}% done</span>
            </div>
            {completedCount > 0 && (
              <button onClick={resetProgress}
                style={{ marginTop: 8, width: "100%", padding: "5px 0", background: "none", border: `1px solid ${T.border}`, borderRadius: 5, color: T.textMuted, fontSize: 10, cursor: "pointer", letterSpacing: "0.04em" }}>
                Reset progress
              </button>
            )}
          </div>
          <div style={{ flex: 1, overflow: "auto", padding: "8px 8px" }}>
            {MODULES.map(mod => {
              const modDone = mod.lessons.filter(l => completed[l.id]).length;
              const isActive = mod.id === activeModuleId;
              const pct = Math.round((modDone / mod.lessons.length) * 100);
              return (
                <div key={mod.id} style={{ marginBottom: 3 }}>
                  <button onClick={() => navigate(`/learn/${mod.id}/${mod.lessons[0].id}`)}
                    style={{ width: "100%", background: isActive ? T.accentBg : "transparent", border: `1px solid ${isActive ? T.accent : "transparent"}`, borderRadius: 6, padding: "8px 10px", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "all 0.15s" }}>
                    <ProgressRing pct={pct} color={isActive ? T.accent : T.textMuted} bgColor={T.border} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: isActive ? T.text : T.textSecondary, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginBottom: 1 }}>{mod.title}</div>
                      <div style={{ fontSize: 9.5, color: T.textMuted, letterSpacing: "0.06em" }}>{mod.tag} · {modDone}/{mod.lessons.length}</div>
                    </div>
                  </button>
                  {isActive && (
                    <div style={{ marginLeft: 8, marginTop: 1, display: "flex", flexDirection: "column", gap: 1 }}>
                      {mod.lessons.map(lesson => {
                        const isCurrent = activeLessonId === lesson.id;
                        return (
                          <button key={lesson.id} onClick={() => navigate(`/learn/${mod.id}/${lesson.id}`)}
                            style={{ background: isCurrent ? T.bgTertiary : "transparent", border: "none", borderRadius: 5, padding: "5px 8px", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, transition: "background 0.1s" }}>
                            <span style={{ fontSize: 8.5, color: completed[lesson.id] ? T.success : isCurrent ? T.accent : T.textMuted, flexShrink: 0 }}>
                              {completed[lesson.id] ? "●" : isCurrent ? "◉" : "○"}
                            </span>
                            <span style={{ fontSize: 11, color: isCurrent ? T.text : T.textSecondary, flex: 1, lineHeight: 1.35 }}>{lesson.title}</span>
                            <span style={{ fontSize: 9, padding: "1px 5px", borderRadius: 3, background: T.bgTertiary, color: typeColor(lesson.type, T), fontWeight: 700, letterSpacing: "0.05em", flexShrink: 0 }}>{typeLabel[lesson.type]}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── MAIN CONTENT ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>

        {/* ── TOPBAR ── */}
        <div style={{ padding: isMobile ? "12px 16px" : "11px 22px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 10, background: T.bg, flexShrink: 0 }}>
          {isMobile ? (
            <>
              <button onClick={() => setDrawerOpen(true)}
                style={{ background: T.bgSecondary, border: `1px solid ${T.border}`, borderRadius: 7, padding: "8px 12px", cursor: "pointer", color: T.textSecondary, fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 6, minHeight: 38, flexShrink: 0 }}>
                <span style={{ fontSize: 14 }}>☰</span>
              </button>
              <button onClick={() => navigate("/")}
                style={{ background: "none", border: "none", cursor: "pointer", color: T.textMuted, fontSize: 11, padding: "4px 0", flexShrink: 0 }}>
                ← Home
              </button>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 10, color: T.textMuted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 1 }}>{activeModule?.tag}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{activeLesson?.title}</div>
              </div>
              <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                <div style={{ fontSize: 11, color: T.textMuted, padding: "5px 9px", background: T.bgSecondary, border: `1px solid ${T.border}`, borderRadius: 5, fontVariantNumeric: "tabular-nums", display: "flex", alignItems: "center" }}>
                  {xp} XP
                </div>
                <button onClick={() => setDark(!dark)}
                  style={{ background: T.bgSecondary, border: `1px solid ${T.border}`, borderRadius: 6, padding: "5px 9px", cursor: "pointer", color: T.textMuted, fontSize: 14, minHeight: 36, display: "flex", alignItems: "center" }}>
                  {dark ? "☀" : "◑"}
                </button>
                <button onClick={() => setShowAgent(true)}
                  style={{ padding: "5px 11px", background: T.accentBg, border: `1px solid ${T.accent}`, borderRadius: 6, color: T.accent, fontSize: 11, fontWeight: 700, cursor: "pointer", minHeight: 36, display: "flex", alignItems: "center", gap: 4 }}
                  aria-label="Open companion">
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: T.accent }} />
                  Companion
                </button>
              </div>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/")}
                style={{ background: "none", border: "none", cursor: "pointer", color: T.textMuted, fontSize: 11, padding: "4px 2px", letterSpacing: "0.02em", flexShrink: 0 }}>
                ← Home
              </button>
              <div style={{ width: 1, height: 18, background: T.border }} />
              <button onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
                style={{ background: T.bgSecondary, border: `1px solid ${T.border}`, borderRadius: 5, padding: "4px 8px", cursor: "pointer", color: T.textMuted, fontSize: 11, lineHeight: 1, transition: "all 0.15s" }}>
                {sidebarOpen ? "◀" : "▶"}
              </button>
              <div style={{ width: 1, height: 18, background: T.border }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 9.5, color: T.textMuted, marginBottom: 1, letterSpacing: "0.1em", textTransform: "uppercase" }}>{activeModule?.title} · {activeModule?.tag}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{activeLesson?.title}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ fontSize: 10.5, color: T.textMuted, padding: "3px 9px", background: T.bgSecondary, border: `1px solid ${T.border}`, borderRadius: 4, fontVariantNumeric: "tabular-nums" }}>{xp} XP</div>
                <button onClick={() => setDark(!dark)}
                  aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
                  style={{ background: T.bgSecondary, border: `1px solid ${T.border}`, borderRadius: 5, padding: "4px 9px", cursor: "pointer", color: T.textMuted, fontSize: 11, transition: "all 0.15s" }}>
                  {dark ? "Light" : "Dark"}
                </button>
                <button onClick={() => setShowAgent(!showAgent)}
                  style={{ padding: "5px 12px", background: showAgent ? T.accent : T.bgSecondary, border: `1px solid ${showAgent ? T.accent : T.border}`, borderRadius: 5, color: showAgent ? "#fff" : T.textSecondary, fontSize: 11, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, transition: "all 0.15s" }}
                  aria-label={showAgent ? "Close companion" : "Open companion"}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: showAgent ? "#fff" : T.accent, flexShrink: 0 }} />
                  Companion
                </button>
              </div>
            </>
          )}
        </div>

        {/* ── LESSON CONTENT ── */}
        <div style={{ flex: 1, overflow: "auto", padding: isMobile ? "24px 16px 100px" : "40px 48px", maxWidth: isMobile ? "100%" : 680, width: "100%", margin: "0 auto", boxSizing: "border-box" }}>
          {activeLesson && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 22, flexWrap: "wrap" }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", padding: "4px 8px", borderRadius: 4, background: activeLesson.type === "lesson" ? T.accentBg : activeLesson.type === "quiz" ? T.warningBg : T.tealBg, color: typeColor(activeLesson.type, T), border: `1px solid ${T.border}` }}>
                  {activeLesson.type === "lesson" ? "Lesson" : activeLesson.type === "quiz" ? "Knowledge check" : "Lab exercise"}
                </span>
                <span style={{ fontSize: 10.5, color: T.textMuted }}>
                  {activeLesson.type === "scenario" ? "TDD-graded · AI-reviewed" : activeLesson.type === "quiz" ? "+30 XP correct" : "+20 XP on complete"}
                </span>
              </div>

              {activeLesson.type === "lesson" && (
                <>
                  <LessonContent content={activeLesson.content} T={T} isMobile={isMobile} />
                  <button onClick={() => markComplete(activeLesson.id)}
                    style={{ marginTop: 28, padding: isMobile ? "14px 20px" : "9px 22px", width: isMobile ? "100%" : "auto", background: completed[activeLesson.id] ? T.successBg : T.accent, border: `1px solid ${completed[activeLesson.id] ? T.successBorder : T.accent}`, borderRadius: 7, color: completed[activeLesson.id] ? T.success : "#fff", fontSize: isMobile ? 15 : 12.5, fontWeight: 700, cursor: "pointer", minHeight: 48 }}>
                    {completed[activeLesson.id] ? "✓ Completed — Next lesson →" : "Mark complete & continue →"}
                  </button>
                </>
              )}
              {activeLesson.type === "quiz" && (
                <QuizLesson key={activeLesson.id} lesson={activeLesson} onComplete={() => markComplete(activeLesson.id)} addXP={addXP} T={T} isMobile={isMobile} />
              )}
              {activeLesson.type === "scenario" && (
                <ScenarioLesson key={activeLesson.id} lesson={activeLesson} onComplete={() => markComplete(activeLesson.id)} addXP={addXP} T={T} isMobile={isMobile} />
              )}

              {isMobile && (
                <div style={{ display: "flex", gap: 10, marginTop: 32 }}>
                  {prevLesson && (
                    <button onClick={() => {
                        const nm = MODULES.find(m => m.lessons.some(l => l.id === prevLesson.id));
                        handleSelectLesson(nm.id, prevLesson.id);
                      }}
                      style={{ flex: 1, padding: "12px 14px", background: T.bgSecondary, border: `1px solid ${T.border}`, borderRadius: 8, color: T.textSecondary, fontSize: 12.5, fontWeight: 600, cursor: "pointer", textAlign: "left", minHeight: 48 }}>
                      ← {prevLesson.title}
                    </button>
                  )}
                  {nextLesson && (
                    <button onClick={() => {
                        const nm = MODULES.find(m => m.lessons.some(l => l.id === nextLesson.id));
                        handleSelectLesson(nm.id, nextLesson.id);
                      }}
                      style={{ flex: 1, padding: "12px 14px", background: T.bgSecondary, border: `1px solid ${T.border}`, borderRadius: 8, color: T.textSecondary, fontSize: 12.5, fontWeight: 600, cursor: "pointer", textAlign: "right", minHeight: 48 }}>
                      {nextLesson.title} →
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── MOBILE BOTTOM NAV ── */}
        {isMobile && (
          <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: T.bg, borderTop: `1px solid ${T.border}`, padding: "10px 16px 20px", display: "flex", alignItems: "center", gap: 10, zIndex: 100 }}>
            <button onClick={() => setDrawerOpen(true)}
              style={{ flex: 1, padding: "10px 14px", background: T.bgSecondary, border: `1px solid ${T.border}`, borderRadius: 8, color: T.textSecondary, fontSize: 12.5, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 7, minHeight: 44 }}>
              <span style={{ fontSize: 14 }}>☰</span>
              <span style={{ flex: 1, textAlign: "left", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{activeModule?.title}</span>
              <span style={{ fontSize: 10, color: T.textMuted, background: T.bgTertiary, padding: "2px 6px", borderRadius: 4, flexShrink: 0 }}>
                {activeModule && `${activeModule.lessons.findIndex(l => l.id === activeLessonId) + 1}/${activeModule.lessons.length}`}
              </span>
            </button>
            <button onClick={() => setShowAgent(true)}
              style={{ padding: "10px 14px", background: T.accentBg, border: `1px solid ${T.accent}`, borderRadius: 8, color: T.accent, fontSize: 12, fontWeight: 700, cursor: "pointer", minHeight: 44, display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.accent }} />
              Expert
            </button>
          </div>
        )}
      </div>

      {isMobile && (
        <ModuleDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          T={T}
          activeModuleId={activeModuleId}
          activeLessonId={activeLessonId}
          completed={completed}
          xp={xp}
          onSelectLesson={handleSelectLesson}
          onReset={resetProgress}
        />
      )}

      {showAgent && <DesignAgent onClose={() => setShowAgent(false)} T={T} isMobile={isMobile} />}
    </div>
  );
}
