import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.BOT_TOKEN);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Only POST allowed');
  }

  try {
    const { image, uid } = req.body;

    if (!uid || !image) {
      return res.status(400).json({ error: 'Missing uid or image' });
    }

    const base64 = image.replace(/^data:image\/\w+;base64,/, '');
    const imgBuffer = Buffer.from(base64, 'base64');

    await bot.telegram.sendPhoto(uid, { source: imgBuffer });

    return res.status(200).json({ ok: true, message: '✅ Image delivered' });
  } catch (err) {
    console.error('❌ Failed to send image:', err);
    return res.status(500).json({ error: 'Image delivery failed' });
  }
} 
