const { readFileSync } = require('fs');
const { join } = require('path');

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

  const apiKey = getApiKey();
  if (!apiKey) return res.status(500).json({ error: 'No API key found' });

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify(req.body),
  });

  const data = await response.json();
  return res.status(response.status).json(data);
};