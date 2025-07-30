export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Only POST allowed");

  const { uid, text } = req.body;
  const botToken = process.env.BOT_TOKEN;

  if (!uid || !text) {
    return res.status(400).json({ error: "Missing uid or text" });
  }

  const message = `🆕 *New Clipboard Message!*\n\n📝 Text:\n${text}`;

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: uid, // ← هماغه UID ته واستوي
      text: message,
      parse_mode: "Markdown"
    })
  });

  const data = await response.json();

  if (!data.ok) {
    return res.status(500).json({ error: "Failed to send message", details: data });
  }

  res.status(200).json({ ok: true });
} 
