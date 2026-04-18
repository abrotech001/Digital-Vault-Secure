import { useState, useRef, useEffect, useCallback } from "react";
import { MessageSquare, X, Send, GripHorizontal, Loader2, Headphones } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";

const CHAT_W = 340;
const CHAT_H = 490;
const BTN_H = 52;
const BTN_W = 52; // 👈 Updated: Made it 52 to match the height and create a perfect circle
const DRAG_THRESHOLD = 6;
const API_BASE = "/api";

function clamp(v: number, min: number, max: number) { return Math.max(min, Math.min(max, v)); }
function genId() { return Math.random().toString(36).slice(2, 10) + Date.now().toString(36); }

interface Msg { id: number; sender: "user" | "bot"; text: string; }

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId] = useState(genId);
  const [initialized, setInitialized] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { id: 1, sender: "bot", text: "Hello! How can we assist you with your Web3BlockchainSecurity account today?" },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [agentTyping, setAgentTyping] = useState(false);
  const evtRef = useRef<EventSource | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const getDefault = useCallback(() => ({
    x: window.innerWidth - BTN_W - 20,
    y: window.innerHeight - BTN_H - 20,
  }), []);
  const [pos, setPos] = useState(getDefault);
  const dragRef = useRef<{ sx: number; sy: number; ix: number; iy: number; moved: boolean } | null>(null);

  useEffect(() => {
    const onResize = () => setPos((p) => ({
      x: clamp(p.x, 8, window.innerWidth - (isOpen ? CHAT_W : BTN_W) - 8),
      y: clamp(p.y, 8, window.innerHeight - (isOpen ? CHAT_H : BTN_H) - 8),
    }));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, agentTyping]);

  const initSession = useCallback(async () => {
    if (initialized) return;
    setInitialized(true);
    try {
      await fetch(`${API_BASE}/chat/init`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });
    } catch { /* silent */ }
    const es = new EventSource(`${API_BASE}/chat/stream/${sessionId}`);
    evtRef.current = es;
    es.onmessage = (e) => {
      try {
        const d = JSON.parse(e.data) as { text?: string };
        if (d.text) {
          setAgentTyping(false);
          setMessages((p) => [...p, { id: Date.now(), sender: "bot", text: d.text! }]);
        }
      } catch { /* ignore */ }
    };
    es.onerror = () => es.close();
  }, [initialized, sessionId]);

  const open = useCallback(() => { setIsOpen(true); initSession(); }, [initSession]);
  useEffect(() => () => { evtRef.current?.close(); }, []);

  /* Drag handlers */
  const onPD = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragRef.current = { sx: e.clientX, sy: e.clientY, ix: pos.x, iy: pos.y, moved: false };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPM = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.sx;
    const dy = e.clientY - dragRef.current.sy;
    if (!dragRef.current.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
    dragRef.current.moved = true;
    const maxX = window.innerWidth - (isOpen ? CHAT_W : BTN_W) - 8;
    const maxY = window.innerHeight - (isOpen ? CHAT_H : BTN_H) - 8;
    setPos({ x: clamp(dragRef.current.ix + dx, 8, maxX), y: clamp(dragRef.current.iy + dy, 8, maxY) });
  };
  const onPU = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    const wasDrag = dragRef.current.moved;
    dragRef.current = null;
    if (!wasDrag && !isOpen) open();
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || sending) return;
    setInput("");
    setSending(true);
    setMessages((p) => [...p, { id: Date.now(), sender: "user", text }]);
    try {
      await fetch(`${API_BASE}/chat/message`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, text }),
      });
      setAgentTyping(true);
      setTimeout(() => {
        setAgentTyping((cur) => {
          if (cur) {
            setMessages((p) => [...p, { id: Date.now(), sender: "bot", text: "Thank you for reaching out. A support agent will respond to you shortly." }]);
            return false;
          }
          return cur;
        });
      }, 9000);
    } catch {
      setMessages((p) => [...p, { id: Date.now(), sender: "bot", text: "Message received. An agent will be with you soon." }]);
    } finally {
      setSending(false);
    }
  };

  /* Chat panel */
  if (isOpen) {
    return (
      <motion.div
        className="fixed z-50 flex flex-col rounded-2xl overflow-hidden border border-primary/20 shadow-[0_12px_60px_rgba(0,0,0,0.7),0_0_0_1px_rgba(59,130,246,0.12)] bg-[#0a0f1e]/96 backdrop-blur-xl"
        style={{ left: pos.x, top: pos.y, width: CHAT_W, height: CHAT_H }}
        initial={{ opacity: 0, scale: 0.92, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 10 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        {/* Header - draggable */}
        <div
          className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] cursor-grab active:cursor-grabbing select-none shrink-0 bg-gradient-to-r from-primary/5 to-transparent"
          onPointerDown={onPD} onPointerMove={onPM} onPointerUp={onPU}
        >
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                <Headphones className="h-3.5 w-3.5 text-primary" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-[#0a0f1e]" />
            </div>
            <div>
              <p className="text-xs font-bold text-foreground leading-none">W3BS Support</p>
              <p className="text-[10px] text-green-400 leading-none mt-0.5">Online — typically replies in minutes</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <GripHorizontal className="h-4 w-4 text-muted-foreground/30 mr-1" />
            <button
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/[0.07] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 px-4 py-3">
          <div className="flex flex-col gap-3">
            {messages.map((m) => (
              <motion.div key={m.id}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                {m.sender === "bot" && (
                  <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center mr-2 mt-0.5 shrink-0">
                    <Headphones className="h-3 w-3 text-primary" />
                  </div>
                )}
                <div className={`max-w-[78%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                  m.sender === "user"
                    ? "bg-primary text-primary-foreground rounded-tr-sm shadow-[0_0_12px_rgba(59,130,246,0.3)]"
                    : "bg-white/[0.06] text-foreground/90 rounded-tl-sm border border-white/[0.06]"
                }`}>
                  {m.text}
                </div>
              </motion.div>
            ))}
            {agentTyping && (
              <motion.div className="flex justify-start" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center mr-2 mt-0.5 shrink-0">
                  <Headphones className="h-3 w-3 text-primary" />
                </div>
                <div className="px-3 py-3 rounded-2xl rounded-tl-sm bg-white/[0.06] border border-white/[0.06] flex items-center gap-1">
                  {[0, 150, 300].map((d) => (
                    <motion.span key={d} className="w-1.5 h-1.5 rounded-full bg-muted-foreground"
                      animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: d / 1000 }} />
                  ))}
                </div>
              </motion.div>
            )}
            <div ref={bottomRef} />
          </div>
        </ScrollArea>

        {/* Input */}
        <form onSubmit={handleSend} className="flex items-center gap-2 px-3 py-3 border-t border-white/[0.06] shrink-0">
          <Input
            value={input} onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-white/[0.04] border-white/10 focus:border-primary/50 text-sm h-9 rounded-xl placeholder:text-muted-foreground/40"
          />
          <motion.button type="submit" disabled={!input.trim() || sending}
            whileTap={{ scale: 0.9 }}
            className="h-9 w-9 rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all shadow-[0_0_14px_rgba(59,130,246,0.4)] shrink-0">
            {sending ? <Loader2 className="h-4 w-4 text-white animate-spin" /> : <Send className="h-4 w-4 text-white" />}
          </motion.button>
        </form>
      </motion.div>
    );
  }

  /* 👈 Updated: Circular Chat Button */
  return (
    <div
      className="fixed z-50 select-none"
      style={{ left: pos.x, top: pos.y, width: BTN_W, height: BTN_H }}
      onPointerDown={onPD} onPointerMove={onPM} onPointerUp={onPU}
    >
      {/* Outer pulse ring */}
      <motion.span
        className="absolute inset-0 rounded-full bg-primary/20 pointer-events-none"
        animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Second pulse */}
      <motion.span
        className="absolute inset-0 rounded-full bg-primary/10 pointer-events-none"
        animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      <motion.div
        className="relative w-full h-full flex items-center justify-center bg-[#0d1424] border border-primary/40 hover:border-primary/70 backdrop-blur-md rounded-full shadow-[0_0_22px_rgba(59,130,246,0.35),0_4px_24px_rgba(0,0,0,0.5)] cursor-pointer"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.06, boxShadow: "0 0 36px rgba(59,130,246,0.55),0 4px 24px rgba(0,0,0,0.6)" }}
        whileTap={{ scale: 0.95 }}
      >
        <Headphones className="h-6 w-6 text-primary" />
        <motion.span
          className="absolute top-1 right-1 w-3 h-3 rounded-full bg-green-400 border-2 border-[#0d1424]"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </div>
  );
}
