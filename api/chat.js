const { readFileSync } = require('fs');
const { join } = require('path');

const ALLOWED_ORIGINS = [
  'https://brain-of-salt.vercel.app',
  'http://localhost:5173',
  'http://localhost:4173',
];

const ALLOWED_MODEL = 'claude-sonnet-4-20250514';
const MAX_TOKENS_CAP = 1000;

function getApiKey() {
  if (process.env.ANTHROPIC_API_KEY) return process.env.ANTHROPIC_API_KEY;
  try {
    const envFile = readFileSync(join(process.cwd(), '.env.local'), 'utf8');
    const match = envFile.match(/ANTHROPIC_API_KEY=(.+)/);
    if (match) return match[1].trim();
  } catch {}
  return null;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const origin = req.headers.origin || '';
  if (!ALLOWED_ORIGINS.includes(origin)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { model, max_tokens, system, messages } = req.body || {};

  if (model !== ALLOWED_MODEL) {
    return res.status(400).json({ error: 'Invalid model' });
  }
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Invalid messages' });
  }

  const apiKey = getApiKey();
  if (!apiKey) return res.status(500).json({ error: 'No API key found' });

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model,
      max_tokens: Math.min(max_tokens ?? MAX_TOKENS_CAP, MAX_TOKENS_CAP),
      system,
      messages,
    }),
  });

  const data = await response.json();
  return res.status(response.status).json(data);
};