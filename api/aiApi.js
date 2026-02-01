/* eslint-disable no-console */
/* global process */

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = req.body || {};
    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "Missing OPENROUTER_API_KEY" });

    console.log("🟢 [api/aiApi] Prompt received:", prompt);
    console.log("🔐 [api/aiApi] API Key present:", !!apiKey);

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        // These are optional but fine:
        "HTTP-Referer": "https://stocklyzer.vercel.app",
        "X-Title": "Stocklyzer AI",
      },
      body: JSON.stringify({
        model: "arcee-ai/trinity-large-preview:free",
        messages: [
          {
            role: "system",
            content:
              "You are Stocklyzer AI. You are not a SEBI-registered advisor. Ask timeframe and risk level before giving an opinion. Be concise and structured.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.3,
        max_tokens: 400,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ [api/aiApi] OpenRouter error response:", data);
      return res.status(response.status).json({
        error: "OpenRouter request failed",
        detail: data,
      });
    }

    const answer = data?.choices?.[0]?.message?.content ?? "";
    return res.status(200).json({ answer });
  } catch (err) {
    console.error("❌ [api/aiApi] Error:", err);
    return res.status(500).json({ error: "Something went wrong with OpenRouter AI." });
  }
}
