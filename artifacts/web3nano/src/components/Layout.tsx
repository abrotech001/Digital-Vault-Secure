import { ReactNode } from "react";
import { Link } from "wouter";
import { Shield } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { FloatingChat } from "./FloatingChat";

export function Layout({ children, showNav = true }: { children: ReactNode; showNav?: boolean }) {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#0a0f1e] text-foreground relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-50" />

      {showNav && (
        <header className="sticky top-0 z-40 w-full border-b border-border/10 bg-background/60 backdrop-blur-xl">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <span className="font-semibold text-lg tracking-tight">Web3BlockchainSecurity</span>
            </Link>

            <div className="flex items-center gap-4">
              <LanguageSwitcher />
            </div>
          </div>
        </header>
      )}

      <main className="flex-1 relative z-10 flex flex-col">
        {children}
      </main>

      {showNav && (
        <footer className="border-t border-border/10 bg-background/80 py-8 relative z-10">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>© {new Date().getFullYear()} Web3BlockchainSecurity. All rights reserved.</span>
            </div>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
              <Link href="/security" className="hover:text-foreground transition-colors">Security</Link>
            </div>
          </div>
        </footer>
      )}

      <FloatingChat />
    </div>
  );
}
