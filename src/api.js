export const callClaude = async (messages, systemPrompt) => {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: systemPrompt, messages }),
  });
  const data = await res.json();
  return data.content?.[0]?.text || "Unable to get feedback right now.";
};
