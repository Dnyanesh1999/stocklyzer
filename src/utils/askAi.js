export async function askStocklyzerAi(prompt, onChunk) {
  const res = await fetch("/api/aiApi", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg =
      data?.detail?.error?.message ||
      data?.error ||
      "OpenRouter request failed.";
    throw new Error(msg);
  }

  const text = data?.answer ?? "";

  // ✅ "fake streaming" so your UI works as-is
  const chunks = text.match(/.{1,18}/g) || [];
  for (const chunk of chunks) {
    onChunk(chunk);
    await new Promise((r) => setTimeout(r, 12));
  }

  return text;
}
