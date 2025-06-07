export const askStocklyzerAi = async (prompt) => {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemma-3n-e4b-it:free",
          messages: [
            {
              role: "user",
              content: `Summarize this stock information for an investor:\n\n${prompt}`,
            },
          ],
        }),
      }
    );

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "No response.";
  } catch (err) {
    console.error("AI Error:", err);
    return "Something went wrong while contacting Stocklyzer AI.";
  }
};
