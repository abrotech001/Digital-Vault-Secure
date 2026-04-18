import type { Response } from "express";
import { getBot1Updates, sendBot1Message } from "./telegram.js";
import { logger } from "./logger.js";

interface Session {
  id: string;
  createdAt: number;
  lastActivity: number;
}

const sessions = new Map<string, Session>();
const sseClients = new Map<string, Response>(); // sessionId → SSE res
const tgMsgToSession = new Map<number, string>(); // telegram message_id → sessionId
let lastActiveSession: string | null = null;
let pollOffset = 0;
let polling = false;

export function createSession(sessionId: string) {
  const now = Date.now();
  sessions.set(sessionId, { id: sessionId, createdAt: now, lastActivity: now });
  lastActiveSession = sessionId;
}

export function registerSSE(sessionId: string, res: Response) {
  sseClients.set(sessionId, res);
  if (!polling) startPolling();
}

export function removeSSE(sessionId: string) {
  sseClients.delete(sessionId);
}

export function touchSession(sessionId: string) {
  const s = sessions.get(sessionId);
  if (s) {
    s.lastActivity = Date.now();
    lastActiveSession = sessionId;
  }
}

export async function recordOutboundMessage(sessionId: string, tgMsgId: number) {
  tgMsgToSession.set(tgMsgId, sessionId);
  touchSession(sessionId);
}

function pushToClient(sessionId: string, text: string) {
  const res = sseClients.get(sessionId);
  if (!res) return;
  try {
    res.write(`data: ${JSON.stringify({ text })}\n\n`);
  } catch { /* client disconnected */ }
}

function startPolling() {
  if (polling) return;
  polling = true;
  logger.info("Starting Telegram Bot1 poll loop");

  const poll = async () => {
    if (sseClients.size === 0) {
      polling = false;
      return;
    }

    const updates = await getBot1Updates(pollOffset);

    for (const upd of updates) {
      pollOffset = upd.update_id + 1;

      const msg = upd.message;
      if (!msg?.text) continue;

      const adminChatId = process.env["BOT1_ADMIN_ID"]!;
      if (String(msg.chat.id) !== adminChatId) continue;

      let targetSession: string | null = null;

      if (msg.reply_to_message) {
        targetSession = tgMsgToSession.get(msg.reply_to_message.message_id) ?? null;
      }

      if (!targetSession) targetSession = lastActiveSession;

      if (targetSession) {
        pushToClient(targetSession, msg.text);
      }

      await sendBot1Message(`✅ Reply delivered to user.`, msg.message_id);
    }

    setTimeout(poll, 2000);
  };

  poll();
}
