import { useState, useEffect, useRef } from "react";
import { callClaude } from "../api";

export function DesignAgent({ onClose, T, isMobile }) {
  const [messages, setMessages] = useState([{
    role: "assistant",
    content: "I'm your AI Design Expert — dual-mode.\n\n① UX critique for AI features (confidence signals, fallback states, trust design)\n\n② PM answer review (paste your scenario response and I'll coach you)\n\nWhat are you working on?"
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const resp = await callClaude(next.map(m => ({ role: m.role, content: m.content })),
        `You are a dual-role expert for product managers entering AI. ROLE 1 — AI Product UX Designer: Specialist in AI-native experiences — uncertainty design, confidence signaling, graceful degradation, human-in-the-loop flows. Give direct critique: cite specific design principles, name anti-patterns, give actionable next steps. ROLE 2 — AI PM Coach: When someone shares a scenario answer or PM reasoning, evaluate against best practices. Acknowledge what's strong, identify what's missing, give a concrete improvement. Detect mode from context, blend both when relevant. 4–5 sentences max. Direct and opinionated. No hedging.`
      );
      setMessages(prev => [...prev, { role: "assistant", content: resp }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Connection error. Try again." }]);
    }
    setLoading(false);
  };

  const panelStyle = isMobile
    ? { position: "fixed", inset: 0, background: T.card, display: "flex", flexDirection: "column", zIndex: 300 }
    : { position: "fixed", right: 20, bottom: 20, width: 352, height: 490, background: T.card, border: `1px solid ${T.borderStrong}`, borderRadius: 12, display: "flex", flexDirection: "column", zIndex: 200, boxShadow: "0 8px 40px rgba(0,0,0,0.15)" };

  return (
    <div style={panelStyle}>
      <div style={{ padding: isMobile ? "16px 16px" : "12px 14px", borderBottom: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: T.accent }} />
          <div>
            <div style={{ fontSize: isMobile ? 14 : 12, fontWeight: 700, color: T.text }}>Your Companion</div>
            <div style={{ fontSize: 11, color: T.textMuted }}>UX critique · PM coaching</div>
          </div>
        </div>
        <button onClick={onClose} style={{ background: T.bgSecondary, border: `1px solid ${T.border}`, borderRadius: 6, color: T.textMuted, fontSize: 14, cursor: "pointer", padding: "6px 12px", lineHeight: 1, minHeight: 36 }}>
          {isMobile ? "← Back" : "×"}
        </button>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "14px", display: "flex", flexDirection: "column", gap: 10 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{ maxWidth: isMobile ? "92%" : "88%", padding: "10px 13px", borderRadius: m.role === "user" ? "12px 12px 3px 12px" : "12px 12px 12px 3px", background: m.role === "user" ? T.accent : T.bgSecondary, border: `1px solid ${m.role === "user" ? T.accent : T.border}`, fontSize: isMobile ? 14 : 12.5, lineHeight: 1.65, color: m.role === "user" ? "#fff" : T.text, whiteSpace: "pre-line" }}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", gap: 4, padding: "6px 10px" }}>
            {[0, 1, 2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: T.textMuted, animation: `blink 1.2s ease-in-out ${i * 0.2}s infinite` }} />)}
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div style={{ padding: "10px 12px", borderTop: `1px solid ${T.border}`, display: "flex", gap: 8, flexShrink: 0 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
          placeholder="UX question or paste your scenario answer..."
          style={{ flex: 1, background: T.bgSecondary, border: `1px solid ${T.border}`, borderRadius: 7, padding: "10px 12px", color: T.text, fontSize: isMobile ? 15 : 12.5, outline: "none", fontFamily: "inherit", minHeight: 44 }} />
        <button onClick={send} disabled={!input.trim() || loading}
          style={{ padding: "10px 16px", background: input.trim() ? T.accent : T.bgTertiary, border: `1px solid ${input.trim() ? T.accent : T.border}`, borderRadius: 7, color: input.trim() ? "#fff" : T.textMuted, fontSize: 14, cursor: input.trim() ? "pointer" : "default", transition: "all 0.15s", minHeight: 44 }}>
          ↑
        </button>
      </div>
      <style>{`@keyframes blink { 0%, 100% { opacity: 0.25; transform: translateY(0); } 50% { opacity: 1; transform: translateY(-2px); } }`}</style>
    </div>
  );
}
