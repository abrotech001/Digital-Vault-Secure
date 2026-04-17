import { useState, useRef, useEffect } from "react";
import { MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: "bot", text: "Hello! How can we assist you with your Web3NanoLedger account today?" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [position, setPosition] = useState({ x: window.innerWidth - 200, y: window.innerHeight - 80 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; initX: number; initY: number } | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setPosition((prev) => ({
        x: Math.min(prev.x, window.innerWidth - 200),
        y: Math.min(prev.y, window.innerHeight - 80)
      }));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isOpen) return;
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initX: position.x,
      initY: position.y
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    setIsDragging(true);
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setPosition({
      x: Math.max(0, Math.min(window.innerWidth - 180, dragRef.current.initX + dx)),
      y: Math.max(0, Math.min(window.innerHeight - 60, dragRef.current.initY + dy))
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragRef.current) {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      dragRef.current = null;
    }
    setTimeout(() => setIsDragging(false), 0);
  };

  const handleClick = () => {
    if (!isDragging) {
      setIsOpen(true);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const newMsg = { id: Date.now(), sender: "user", text: inputValue };
    setMessages((prev) => [...prev, newMsg]);
    setInputValue("");
    
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), sender: "bot", text: "Thank you for reaching out. A support representative will review your message shortly." }
      ]);
    }, 1000);
  };

  if (isOpen) {
    return (
      <Card className="fixed bottom-6 right-6 w-80 md:w-96 h-[500px] flex flex-col shadow-2xl border-primary/20 z-50 bg-background/95 backdrop-blur-xl">
        <CardHeader className="p-4 border-b border-border/50 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Web3Nano Support
          </CardTitle>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setIsOpen(false)} data-testid="btn-close-chat">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="flex-1 p-0 overflow-hidden">
          <ScrollArea className="h-full p-4">
            <div className="flex flex-col gap-3">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.sender === "user" ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-muted text-muted-foreground rounded-tl-sm"}`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="p-3 border-t border-border/50">
          <form onSubmit={handleSend} className="flex w-full gap-2">
            <Input 
              value={inputValue} 
              onChange={(e) => setInputValue(e.target.value)} 
              placeholder="Type a message..." 
              className="bg-background border-border/50"
              data-testid="input-chat"
            />
            <Button type="submit" size="sm" data-testid="btn-send-chat">Send</Button>
          </form>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div
      className="fixed z-50 cursor-grab active:cursor-grabbing"
      style={{ left: position.x, top: position.y }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onClick={handleClick}
    >
      <div className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 backdrop-blur-md px-4 py-3 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-colors duration-300">
        <MessageSquare className="h-5 w-5 text-primary" />
        <span className="text-sm font-medium text-primary-foreground hidden sm:inline">Web3Nano Support</span>
      </div>
    </div>
  );
}
