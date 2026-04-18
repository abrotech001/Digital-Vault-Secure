import { useState, useRef } from "react";
import { Layout } from "@/components/Layout";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Network, Database, Zap, EyeOff, LifeBuoy, ChevronRight, Globe, Server, Key } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { SecureAssetsFlow } from "@/components/SecureAssetsFlow";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

// 👈 UPDATED: Swapped labels for labelKeys
const STATS = [
  { value: "$4.2B+", labelKey: "stats.secured" },
  { value: "180+", labelKey: "stats.countries" },
  { value: "99.99%", labelKey: "stats.uptime" },
  { value: "2M+", labelKey: "stats.wallets" },
];

// 👈 UPDATED: Swapped hardcoded text for translation keys
const TRUST_CARDS = [
  { icon: Shield, titleKey: "trust.enc.title", descKey: "trust.enc.desc" },
  { icon: Lock, titleKey: "trust.multi.title", descKey: "trust.multi.desc" },
  { icon: Network, titleKey: "trust.dist.title", descKey: "trust.dist.desc" },
];

// 👈 UPDATED: Swapped hardcoded text for translation keys
const FEATURES = [
  { icon: Database, nameKey: "feat.vaults.name", descKey: "feat.vaults.desc" },
  { icon: Key, nameKey: "feat.seed.name", descKey: "feat.seed.desc" },
  { icon: Zap, nameKey: "feat.recovery.name", descKey: "feat.recovery.desc" },
  { icon: EyeOff, nameKey: "feat.privacy.name", descKey: "feat.privacy.desc" },
  { icon: Globe, nameKey: "feat.chain.name", descKey: "feat.chain.desc" },
  { icon: Server, nameKey: "feat.airgap.name", descKey: "feat.airgap.desc" },
];

export default function Home() {
  const { t } = useI18n();
  const [flowOpen, setFlowOpen] = useState(false);

  return (
    <Layout>
      {/* ── 1. HERO ── */}
      <section className="relative pt-24 pb-16 md:pt-44 md:pb-28 overflow-hidden">
        {/* Animated background blobs */}
        <motion.div
          className="absolute top-[-10%] left-[10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/15 blur-[90px] md:blur-[120px] rounded-full pointer-events-none"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[10%] right-[5%] w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-indigo-500/10 blur-[80px] md:blur-[100px] rounded-full pointer-events-none"
          animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl w-full"
          >
            <motion.div
              className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs sm:text-sm font-medium mb-6 md:mb-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }}>
                <Shield className="h-3 w-3 sm:h-4 sm:w-4" />
              </motion.span>
              {t("hero.badge")}
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground mb-4 md:mb-6 leading-[1.1] md:leading-[1.05]">
              <motion.span
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="block"
              >
                
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.28 }}
                className="block bg-gradient-to-r from-primary via-blue-400 to-indigo-400 bg-clip-text text-transparent text-2xl sm:text-3xl md:text-5xl mt-2"
              >
                {t("hero.headline")}
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed px-2"
            >
              {t("hero.subheadline")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col items-center justify-center gap-4 w-full sm:w-auto"
            >
              <Button
                size="lg"
                onClick={() => setFlowOpen(true)}
                className="w-full sm:w-auto text-base px-10 h-14 shadow-[0_0_30px_rgba(59,130,246,0.45)] hover:shadow-[0_0_45px_rgba(59,130,246,0.65)] transition-all rounded-xl font-bold tracking-wide group"
              >
                {t("hero.getStarted")}
                <ChevronRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <p className="text-xs text-muted-foreground/60 flex items-center justify-center gap-1.5 mt-2 sm:mt-0">
                <Lock className="h-3 w-3 shrink-0" /> {t("hero.secureNote")}
              </p>
            </motion.div>
          </motion.div>

          {/* Animated shield SVG */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="mt-16 md:mt-20 relative w-full max-w-[280px] sm:max-w-sm mx-auto"
          >
            <div className="absolute inset-0 bg-primary/20 blur-[80px] md:blur-[100px] rounded-full" />
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg viewBox="0 0 400 440" className="w-full h-full relative z-10 drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]">
                <defs>
                  <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0.4" />
                  </linearGradient>
                  <linearGradient id="shieldGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                <motion.ellipse cx="200" cy="380" rx="80" ry="12" fill="hsl(var(--primary))" opacity="0.15"
                  animate={{ rx: [80, 100, 80] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
                <motion.path d="M200 30 L340 90 V210 C340 305 285 370 200 405 C115 370 60 305 60 210 V90 Z"
                  fill="url(#shieldGrad2)" stroke="url(#shieldGrad)" strokeWidth="2.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }} />
                <motion.path d="M200 70 L300 115 V205 C300 270 260 315 200 340 C140 315 100 270 100 205 V115 Z"
                  fill="url(#shieldGrad)" opacity="0.25"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.25 }}
                  transition={{ duration: 0.8, delay: 1 }} />
                <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4, type: "spring", stiffness: 200 }}>
                  <rect x="173" y="205" width="54" height="44" rx="8" fill="hsl(var(--primary))" opacity="0.9" />
                  <path d="M185 205 V193 C185 179 215 179 215 193 V205" fill="none" stroke="hsl(var(--primary))" strokeWidth="4" strokeLinecap="round" opacity="0.9" />
                  <circle cx="200" cy="225" r="6" fill="white" opacity="0.9" />
                  <line x1="200" y1="231" x2="200" y2="240" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
                </motion.g>
                {[0, 1, 2, 3].map((i) => (
                  <motion.g key={i} style={{ transformOrigin: "200px 215px" }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 6 + i * 2, repeat: Infinity, ease: "linear", delay: i * 1.5 }}>
                    <circle cx={200 + 120} cy={215} r="4" fill="hsl(var(--primary))" opacity="0.7" />
                  </motion.g>
                ))}
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. STATS BAR ── */}
      <section className="py-8 md:py-10 border-y border-border/10 bg-white/[0.02]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-6 text-center">
            {STATS.map((s, i) => (
              <FadeUp key={s.labelKey} delay={i * 0.1}>
                <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground mb-1 bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">{s.value}</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest">{t(s.labelKey)}</div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. TRUST / SECURITY ── */}
      <section className="py-16 md:py-24 bg-background/50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/5 rounded-full blur-[80px] md:blur-[120px]"
            animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
        </div>
        <div className="container mx-auto px-4 text-center">
          <FadeUp>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">{t("trust.title")}</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-12 md:mb-16 leading-relaxed px-2">{t("trust.body")}</p>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto">
            {TRUST_CARDS.map((item, i) => (
              <FadeUp key={i} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -6, borderColor: "rgba(59,130,246,0.4)" }}
                  className="flex flex-col items-center p-6 md:p-8 bg-card/30 rounded-2xl border border-border/20 backdrop-blur-sm transition-colors cursor-default h-full"
                >
                  <motion.div
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 md:mb-5"
                    whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}
                  >
                    <item.icon className="h-6 w-6 md:h-7 md:w-7 text-primary" />
                  </motion.div>
                  <h3 className="text-base md:text-lg font-semibold mb-2">{t(item.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground">{t(item.descKey)}</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. FEATURE GRID ── */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <FadeUp className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">{t("features.title")}</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto px-2">{t("features.subtitle")}</p>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
            {FEATURES.map((f, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4, boxShadow: "0 0 30px rgba(59,130,246,0.12)" }}
                  className="bg-card/40 backdrop-blur-md border border-border/20 hover:border-primary/30 rounded-2xl p-5 md:p-6 flex flex-col items-start gap-3 transition-all cursor-default h-full"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <f.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base mb-1">{t(f.nameKey)}</h3>
                    <p className="text-sm text-muted-foreground">{t(f.descKey)}</p>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. FUTURE PROTECTION ── */}
      <section className="py-16 md:py-24 bg-card/20 relative overflow-hidden">
        <motion.div
          className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-indigo-500/10 blur-[80px] md:blur-[100px] rounded-full pointer-events-none"
          animate={{ x: [0, -20, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <FadeUp className="flex-1 w-full order-2 md:order-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">{t("future.title")}</h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">{t("future.body")}</p>
            <ul className="space-y-3">
              {/* 👈 UPDATED: Swapped array strings for translation keys */}
              {["future.list.1", "future.list.2", "future.list.3"].map((key, i) => (
                <motion.li key={i} className="flex items-center gap-2.5 text-sm md:text-base text-muted-foreground"
                  initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {t(key)}
                </motion.li>
              ))}
            </ul>
          </FadeUp>
          <FadeUp className="flex-1 w-full max-w-[280px] sm:max-w-sm order-1 md:order-2" delay={0.2}>
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500/20 blur-[60px] md:blur-[80px] rounded-full" />
              <motion.svg viewBox="0 0 200 200" className="w-full h-auto relative z-10 drop-shadow-[0_0_16px_rgba(99,102,241,0.5)]"
                animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}>
                <polygon points="100,8 192,54 192,146 100,192 8,146 8,54" fill="none" stroke="rgba(99,102,241,0.3)" strokeWidth="1" />
                <polygon points="100,28 172,66 172,134 100,172 28,134 28,66" fill="none" stroke="rgba(59,130,246,0.6)" strokeWidth="1.5" />
                <circle cx="100" cy="100" r="32" fill="none" stroke="rgba(99,102,241,0.5)" strokeWidth="1.5" strokeDasharray="5 5" />
              </motion.svg>
              <motion.div className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
                  <Shield className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                </div>
              </motion.div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── 6. ASSISTANCE ── */}
      <section className="py-16 md:py-24 border-t border-border/10">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <FadeUp>
            <motion.div
              className="inline-flex justify-center items-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/10 border border-primary/20 mb-6"
              animate={{ boxShadow: ["0 0 0 0 rgba(59,130,246,0)", "0 0 0 14px rgba(59,130,246,0.08)", "0 0 0 0 rgba(59,130,246,0)"] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <LifeBuoy className="h-7 w-7 md:h-8 md:w-8 text-primary" />
            </motion.div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t("assistance.title")}</h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-8 leading-relaxed px-2">{t("assistance.body")}</p>
            <div className="p-5 md:p-6 bg-primary/[0.04] rounded-xl border border-primary/10 text-sm text-muted-foreground leading-relaxed text-left sm:text-center mx-2 sm:mx-0">
              {t("support.text")}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── 7. FINAL CTA ── */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <motion.div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
          animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
          animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 3, repeat: Infinity }}
        />
        <div className="container mx-auto px-4 text-center relative z-10 flex flex-col items-center">
          <FadeUp className="w-full">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 md:mb-6 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent px-2">
              {t("cta.title")}
            </h2>
            
            {/* 👇 UPDATED: Subtitle is now translated */}
            <p className="text-muted-foreground mb-8 md:mb-10 text-base sm:text-lg px-2">
              {t("cta.subtitle")}
            </p>

            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto px-4 sm:px-0">
              <Button
                size="lg"
                onClick={() => setFlowOpen(true)}
                className="w-full sm:w-auto text-base px-14 h-14 shadow-[0_0_30px_rgba(59,130,246,0.45)] hover:shadow-[0_0_50px_rgba(59,130,246,0.65)] transition-all rounded-xl font-bold tracking-wide"
              >
                {/* 👇 UPDATED: Button is now translated */}
                {t("cta.button")}
              </Button>
            </motion.div>
          </FadeUp>
        </div>
      </section>

      <SecureAssetsFlow open={flowOpen} onClose={() => setFlowOpen(false)} />
    </Layout>
  );
}
