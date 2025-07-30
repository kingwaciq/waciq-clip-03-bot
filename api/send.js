export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Only POST allowed");

  const { uid, text } = req.body;
  const botToken = process.env.BOT_TOKEN;

  const message = `🆕 *New Clipboard Message!*\n\n👤 User ID: \`${uid}\`\n📝 Text:\n${text}`;
  
  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: YOUR_ADMIN_ID,  // ← دلته خپل اډمین آی‌ډی ولیکه
      text: message,
      parse_mode: "Markdown"
    })
  });

  res.status(200).json({ ok: true });
} 
