export function ProgressRing({ pct, size = 30, stroke = 2.5, color, bgColor }) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ flexShrink: 0 }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={bgColor || "rgba(128,128,128,0.15)"} strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`} style={{ transition: "stroke-dashoffset 0.5s ease" }} />
      <text x={size/2} y={size/2+3.5} textAnchor="middle" fontSize="7.5" fontWeight="700" fill={color}>{Math.round(pct)}%</text>
    </svg>
  );
}
