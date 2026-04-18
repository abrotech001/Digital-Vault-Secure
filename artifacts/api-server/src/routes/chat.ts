import { Router } from "express";
import { sendBot1Message } from "../lib/telegram.js";
import {
  createSession,
  registerSSE,
  removeSSE,
  recordOutboundMessage,
  touchSession,
} from "../lib/chatStore.js";

const router = Router();

router.post("/chat/init", async (req, res) => {
  const { sessionId } = req.body as { sessionId?: string };
  if (!sessionId) return res.status(400).json({ error: "sessionId required" });
  createSession(sessionId);
  const tgId = await sendBot1Message(
    `🟢 <b>New Support Session</b>\n<code>Session: ${sessionId}</code>\n<i>User has opened the chat. Reply to this message to respond.</i>`
  );
  if (tgId) await recordOutboundMessage(sessionId, tgId);
  res.json({ ok: true });
});

router.post("/chat/message", async (req, res) => {
  const { sessionId, text } = req.body as { sessionId?: string; text?: string };
  if (!sessionId || !text) return res.status(400).json({ error: "sessionId and text required" });
  touchSession(sessionId);
  const tgId = await sendBot1Message(
    `💬 <b>User Message</b>\n<code>Session: ${sessionId}</code>\n\n${text}`
  );
  if (tgId) await recordOutboundMessage(sessionId, tgId);
  res.json({ ok: true });
});

router.get("/chat/stream/:sessionId", (req, res) => {
  const { sessionId } = req.params;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");
  res.flushHeaders();

  res.write(`data: ${JSON.stringify({ connected: true })}\n\n`);

  registerSSE(sessionId, res);

  const heartbeat = setInterval(() => {
    try { res.write(`: ping\n\n`); } catch { /* ignore */ }
  }, 20000);

  req.on("close", () => {
    clearInterval(heartbeat);
    removeSSE(sessionId);
  });
});

export default router;
