export const askStocklyzerAi = async (prompt, onChunk) => {
  try {
    const response = await fetch("/api/aiApi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!response.body) {
      throw new Error("No response body");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const parts = buffer.split("\n\n");
      buffer = parts.pop();
      for (const part of parts) {
        const line = part.trim();
        if (!line.startsWith("data:")) continue;
        const data = line.replace("data:", "").trim();
        if (data === "[DONE]") continue;
        try {
          const json = JSON.parse(data);
          const delta = json.choices?.[0]?.delta?.content;
          if (delta && onChunk) onChunk(delta);
        } catch (e) {
          console.error("Chunk parse error", e);
        }
      }
    }
  } catch (err) {
    console.error("AI Fetch Failed:", err);
    if (onChunk) {
      onChunk("Something went wrong while contacting Stocklyzer AI.");
    }
  }
};
