import { Layout } from "@/components/Layout";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Network, Database, LayoutDashboard, Zap, EyeOff, LifeBuoy } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function Home() {
  const { t } = useI18n();

  return (
    <Layout>
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
              <Shield className="h-4 w-4" /> Institutional-Grade Security
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 leading-tight">
              {t("hero.headline")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              {t("hero.subheadline")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg" className="w-full sm:w-auto text-base px-8 h-14 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all">
                  {t("hero.getStarted")}
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8 h-14 border-primary/20 hover:bg-primary/5">
                  {t("hero.createAccount")}
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Floating Illustration */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-20 relative w-full max-w-lg mx-auto"
          >
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
            <svg viewBox="0 0 400 400" className="w-full h-full relative z-10 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              <defs>
                <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <motion.path 
                d="M200 50 L320 100 V200 C320 280 270 340 200 380 C130 340 80 280 80 200 V100 Z" 
                fill="url(#shieldGrad)" 
                stroke="hsl(var(--primary))" 
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <circle cx="200" cy="200" r="40" fill="none" stroke="hsl(var(--primary))" strokeWidth="4" />
              <circle cx="200" cy="200" r="20" fill="hsl(var(--primary))" />
              <line x1="200" y1="120" x2="200" y2="160" stroke="hsl(var(--primary))" strokeWidth="2" />
              <line x1="200" y1="240" x2="200" y2="280" stroke="hsl(var(--primary))" strokeWidth="2" />
              <line x1="120" y1="200" x2="160" y2="200" stroke="hsl(var(--primary))" strokeWidth="2" />
              <line x1="240" y1="200" x2="280" y2="200" stroke="hsl(var(--primary))" strokeWidth="2" />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* 2. Trust / Security Section */}
      <section className="py-24 bg-background/50 border-y border-border/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t("trust.title")}</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-16 text-lg">
            {t("trust.body")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Shield, title: "Military-Grade Encryption" },
              { icon: Lock, title: "Multi-Signature Wallets" },
              { icon: Network, title: "Distributed Consensus" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center p-6 bg-card/30 rounded-2xl border border-border/20 backdrop-blur-sm">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Feature Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Database, name: "Secure Storage", desc: "End-to-end encrypted vaults" },
              { icon: LayoutDashboard, name: "Simple Dashboard", desc: "Clean, intuitive interface" },
              { icon: Zap, name: "Fast Transactions", desc: "Low-latency secure transfers" },
              { icon: EyeOff, name: "Privacy First", desc: "Zero-knowledge architecture" }
            ].map((f, i) => (
              <Card key={i} className="bg-card/40 backdrop-blur-md border-border/20 hover:border-primary/30 transition-colors group">
                <CardContent className="p-6 flex flex-col items-start">
                  <f.icon className="h-10 w-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-lg mb-2">{f.name}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Future Protection Section */}
      <section className="py-24 bg-card/20 relative overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t("future.title")}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("future.body")}
            </p>
          </div>
          <div className="flex-1 w-full max-w-md relative">
             <div className="absolute inset-0 bg-indigo-500/20 blur-[80px] rounded-full" />
             <svg viewBox="0 0 200 200" className="w-full h-auto relative z-10 drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]">
               <polygon points="100,10 190,55 190,145 100,190 10,145 10,55" fill="none" stroke="currentColor" className="text-primary/50" strokeWidth="1" />
               <polygon points="100,30 170,70 170,130 100,170 30,130 30,70" fill="none" stroke="currentColor" className="text-primary" strokeWidth="2" />
               <circle cx="100" cy="100" r="30" fill="none" stroke="currentColor" className="text-indigo-400" strokeWidth="2" strokeDasharray="4 4" />
               <circle cx="100" cy="100" r="10" fill="currentColor" className="text-primary" />
             </svg>
          </div>
        </div>
      </section>

      {/* 5 & 6. Assistance Section & Support Instruction */}
      <section className="py-24 border-t border-border/10">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <LifeBuoy className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-6">{t("assistance.title")}</h2>
          <p className="text-lg text-muted-foreground mb-8">
            {t("assistance.body")}
          </p>
          <div className="p-6 bg-card/30 rounded-xl border border-border/20 text-sm text-muted-foreground">
            {t("support.text")}
          </div>
        </div>
      </section>

      {/* 7. Final CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-10">{t("cta.title")}</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/login">
              <Button size="lg" className="w-full sm:w-auto text-base px-8 h-14 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]">
                {t("cta.freeAccount")}
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8 h-14 border-primary/20 hover:bg-primary/5">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
