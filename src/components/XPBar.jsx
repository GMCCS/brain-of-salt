export function XPBar({ xp, T }) {
  const pct = Math.min((xp / 700) * 100, 100);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ flex: 1, height: 3, background: T.border, borderRadius: 2, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: T.accent, borderRadius: 2, transition: "width 0.6s ease" }} />
      </div>
      <span style={{ fontSize: 10.5, color: T.textMuted, minWidth: 52, fontVariantNumeric: "tabular-nums" }}>{xp} / 700 XP</span>
    </div>
  );
}
