import { useState, useRef, useEffect, useCallback } from "react";
import { MessageSquare, X, Send, GripHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

const CHAT_W = 340;
const CHAT_H = 480;
const BTN_W = 192;
const BTN_H = 48;
const DRAG_THRESHOLD = 6;

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: "bot", text: "Hello! How can we assist you with your Web3NanoLedger account today?" }
  ]);
  const [inputValue, setInputValue] = useState("");

  const getDefaultPos = useCallback(() => ({
    x: window.innerWidth - BTN_W - 24,
    y: window.innerHeight - BTN_H - 24,
  }), []);

  const [position, setPosition] = useState(getDefaultPos);
  const dragRef = useRef<{
    startX: number;
    startY: number;
    initX: number;
    initY: number;
    moved: boolean;
  } | null>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      setPosition((prev) => ({
        x: clamp(prev.x, 0, window.innerWidth - (isOpen ? CHAT_W : BTN_W) - 8),
        y: clamp(prev.y, 0, window.innerHeight - (isOpen ? CHAT_H : BTN_H) - 8),
      }));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initX: position.x,
      initY: position.y,
      moved: false,
    };
    isDragging.current = false;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    if (!dragRef.current.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;

    dragRef.current.moved = true;
    isDragging.current = true;

    const maxX = window.innerWidth - (isOpen ? CHAT_W : BTN_W) - 8;
    const maxY = window.innerHeight - (isOpen ? CHAT_H : BTN_H) - 8;

    setPosition({
      x: clamp(dragRef.current.initX + dx, 8, maxX),
      y: clamp(dragRef.current.initY + dy, 8, maxY),
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    const wasDrag = dragRef.current.moved;
    dragRef.current = null;

    if (!wasDrag && !isOpen) {
      setIsOpen(true);
    }

    setTimeout(() => { isDragging.current = false; }, 0);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const userMsg = { id: Date.now(), sender: "user", text: inputValue };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: "bot", text: "Thank you for reaching out. A support representative will review your message shortly." }
      ]);
    }, 1000);
  };

  if (isOpen) {
    return (
      <div
        className="fixed z-50 flex flex-col rounded-2xl overflow-hidden border border-primary/20 shadow-[0_8px_40px_rgba(0,0,0,0.6),0_0_0_1px_rgba(59,130,246,0.1)] bg-[#0a0f1e]/95 backdrop-blur-xl"
        style={{ left: position.x, top: position.y, width: CHAT_W, height: CHAT_H }}
        data-testid="chat-panel"
      >
        {/* Draggable header */}
        <div
          className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] cursor-grab active:cursor-grabbing select-none shrink-0"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          data-testid="chat-drag-handle"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_6px_rgba(74,222,128,0.8)]" />
            <span className="text-sm font-semibold text-foreground">Web3Nano Support</span>
          </div>
          <div className="flex items-center gap-1">
            <GripHorizontal className="h-4 w-4 text-muted-foreground/40 mr-1" />
            <button
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/[0.06] transition-colors"
              onClick={() => setIsOpen(false)}
              data-testid="btn-close-chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 px-4 py-3">
          <div className="flex flex-col gap-3">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                {m.sender === "bot" && (
                  <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center mr-2 mt-0.5 shrink-0">
                    <MessageSquare className="h-3 w-3 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[78%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                    m.sender === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-sm"
                      : "bg-white/[0.06] text-foreground/90 rounded-tl-sm border border-white/[0.05]"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input */}
        <form
          onSubmit={handleSend}
          className="flex items-center gap-2 px-3 py-3 border-t border-white/[0.06] shrink-0"
        >
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-white/[0.04] border-white/10 focus:border-primary/50 text-sm h-9 rounded-xl placeholder:text-muted-foreground/40"
            data-testid="input-chat"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="h-9 w-9 rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all shadow-[0_0_12px_rgba(59,130,246,0.3)] shrink-0"
            data-testid="btn-send-chat"
          >
            <Send className="h-4 w-4 text-white" />
          </button>
        </form>
      </div>
    );
  }

  return (
    <div
      className="fixed z-50 cursor-grab active:cursor-grabbing select-none"
      style={{ left: position.x, top: position.y }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      data-testid="chat-button"
    >
      <div className="flex items-center gap-2.5 bg-[#0d1424]/90 hover:bg-[#0d1424] border border-primary/30 hover:border-primary/50 backdrop-blur-md px-4 py-3 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.25),0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_28px_rgba(59,130,246,0.4),0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-300">
        <div className="relative">
          <MessageSquare className="h-4 w-4 text-primary" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-400 border border-[#0d1424]" />
        </div>
        <span className="text-sm font-medium text-foreground whitespace-nowrap">Web3Nano Support</span>
      </div>
    </div>
  );
}
