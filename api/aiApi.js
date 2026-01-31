/* eslint-disable no-console */
/* global process */

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;
  const apiKey = process.env.OPENROUTER_API_KEY;
  const model =
    process.env.OPENROUTER_MODEL || "meta-llama/llama-3.1-8b-instruct:free";

  console.log("🟢 [api/aiApi] Prompt received:", prompt);
  console.log("🔐 [api/aiApi] API Key present:", !!apiKey);
  console.log("🤖 [api/aiApi] Model:", model);

  if (!apiKey) {
    return res.status(500).json({ error: "Missing OpenRouter API key." });
  }

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required." });
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://stocklyzer.vercel.app",
        "X-Title": "Stocklyzer AI",
      },
      body: JSON.stringify({
        model,
        stream: true,
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
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ [api/aiApi] OpenRouter response error:", errorText);
      return res
        .status(response.status)
        .json({ error: "OpenRouter request failed.", detail: errorText });
    }

    if (!response.body) {
      throw new Error("No response body from OpenRouter.");
    }

    res.writeHead(200, {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    });

    for await (const chunk of response.body) {
      res.write(chunk);
    }

    res.end();
  } catch (err) {
    console.error("❌ [api/aiApi] OpenRouter error:", err);
    res.status(500).json({ error: "Something went wrong with OpenRouter AI." });
  }
}
