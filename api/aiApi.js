/* eslint-disable no-console */
/* global process */

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;
  const apiKey = process.env.OPENROUTER_API_KEY;

  console.log("🟢 [api/aiApi] Prompt received:", prompt);
  console.log("🔐 [api/aiApi] API Key present:", !!apiKey);

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://stocklyzer.vercel.app",
          "X-Title": "Stocklyzer AI",
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3.3-8b-instruct:free",
          messages: [
            {
              role: "system",
              content:
                "You are Stocklyzer, a helpful stock market assistant. Provide concise summaries, explain financial terms, and assist users in understanding stock market data. Answer like a smart financial advisor.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      }
    );

    const result = await response.json();

    console.log("📦 [api/aiApi] OpenRouter raw response:", result);

    if (!result?.choices?.[0]?.message?.content) {
      throw new Error("Invalid OpenRouter response format.");
    }

    // Send only necessary content to frontend
    res.status(200).json({ choices: result.choices });
  } catch (err) {
    console.error("❌ [api/aiApi] OpenRouter error:", err);
    res.status(500).json({ error: "Something went wrong with OpenRouter AI." });
  }
}
