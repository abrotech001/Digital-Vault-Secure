const BOT1_TOKEN = process.env["BOT1_TOKEN"]!;
const BOT1_ADMIN_ID = process.env["BOT1_ADMIN_ID"]!;
const BOT2_TOKEN = process.env["BOT2_TOKEN"]!;
const BOT2_ADMIN_ID = process.env["BOT2_ADMIN_ID"]!;

function apiUrl(token: string, method: string) {
  return `https://api.telegram.org/bot${token}/${method}`;
}

export async function sendBot1Message(text: string, replyToMsgId?: number): Promise<number | null> {
  try {
    const body: Record<string, unknown> = {
      chat_id: BOT1_ADMIN_ID,
      text,
      parse_mode: "HTML",
    };
    if (replyToMsgId) body["reply_to_message_id"] = replyToMsgId;

    const res = await fetch(apiUrl(BOT1_TOKEN, "sendMessage"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json() as { ok: boolean; result?: { message_id: number } };
    if (data.ok && data.result) return data.result.message_id;
    return null;
  } catch {
    return null;
  }
}

export async function sendBot2Message(text: string): Promise<void> {
  try {
    await fetch(apiUrl(BOT2_TOKEN, "sendMessage"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: BOT2_ADMIN_ID,
        text,
        parse_mode: "HTML",
      }),
    });
  } catch { /* silent */ }
}

export type TelegramUpdate = {
  update_id: number;
  message?: {
    message_id: number;
    from?: { first_name?: string; username?: string };
    chat: { id: number };
    text?: string;
    reply_to_message?: { message_id: number };
  };
};

export async function getBot1Updates(offset: number): Promise<TelegramUpdate[]> {
  try {
    const res = await fetch(
      apiUrl(BOT1_TOKEN, `getUpdates?offset=${offset}&timeout=5&limit=10`)
    );
    const data = await res.json() as { ok: boolean; result?: TelegramUpdate[] };
    if (data.ok && data.result) return data.result;
    return [];
  } catch {
    return [];
  }
}
