export function LessonContent({ content, T, isMobile }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 16 : 20 }}>
      {content.map((block, i) => {
        if (block.type === "intro") return (
          <p key={i} style={{ fontSize: 15, lineHeight: 1.85, color: T.textSecondary, margin: 0, paddingLeft: 14, borderLeft: `2px solid ${T.accent}` }}>{block.text}</p>
        );
        if (block.type === "concept") return (
          <div key={i} style={{ background: T.accentBg, border: `1px solid ${T.border}`, borderRadius: 8, padding: isMobile ? "12px 14px" : "14px 16px" }}>
            <div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: T.accent, marginBottom: 7, fontWeight: 700 }}>{block.label}</div>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: T.text, margin: 0 }}>{block.text}</p>
          </div>
        );
        if (block.type === "distinction") return (
          <div key={i} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {block.items.map((item, j) => (
              <div key={j} style={{ background: T.bgSecondary, border: `1px solid ${T.border}`, borderRadius: 7, padding: "12px 14px", display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 3, height: 3, borderRadius: "50%", background: T.accent, flexShrink: 0, marginTop: 7 }} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: T.text, marginBottom: 3 }}>{item.term}</div>
                  <div style={{ fontSize: 13, lineHeight: 1.65, color: T.textSecondary }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        );
        if (block.type === "callout") return (
          <div key={i} style={{ background: T.warningBg, border: `1px solid ${T.warningBorder}`, borderRadius: 7, padding: "12px 14px", display: "flex", gap: 10, alignItems: "flex-start" }}>
            <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>💡</span>
            <div>
              <div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: T.amber, marginBottom: 4, fontWeight: 700 }}>{block.label}</div>
              <p style={{ fontSize: 13, lineHeight: 1.65, color: T.text, margin: 0 }}>{block.text}</p>
            </div>
          </div>
        );
        return null;
      })}
    </div>
  );
}
