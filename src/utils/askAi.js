export const askStocklyzerAi = async (prompt) => {
  try {
    const response = await fetch("/api/aiApi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "No response from AI.";
  } catch (err) {
    console.error("AI Fetch Failed:", err);
    return "Something went wrong while contacting Stocklyzer AI.";
  }
};
