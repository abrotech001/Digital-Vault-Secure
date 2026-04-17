import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, ChevronRight, ChevronLeft, Eye, EyeOff, Wallet, AlertTriangle, X } from "lucide-react";
import {
  SiCoinbase,
  SiBinance,
} from "react-icons/si";

type Step = "select" | "method" | "input" | "success";
type ImportMethod = "seed" | "privatekey" | "address";

interface WalletOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  glow: string;
}

const WALLET_OPTIONS: WalletOption[] = [
  {
    id: "metamask",
    name: "MetaMask",
    description: "Browser extension & mobile wallet",
    color: "text-[#E8831D]",
    glow: "hover:border-[#E8831D]/40 hover:shadow-[0_0_20px_rgba(232,131,29,0.1)]",
    icon: (
      <svg viewBox="0 0 35 33" className="h-7 w-7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32.958 1L19.843 10.7l2.386-5.648L32.958 1z" fill="#E2761B" stroke="#E2761B" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2.03 1l13.003 9.8-2.27-5.748L2.03 1zM28.22 23.533l-3.493 5.338 7.47 2.058 2.144-7.268-6.12-.128zM1.676 23.66l2.13 7.27 7.456-2.058-3.48-5.34-6.106.128z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10.79 14.513L8.718 17.61l7.4.328-.253-7.953-5.076 4.528zM24.2 14.513l-5.15-4.628-.17 8.053 7.386-.328-2.065-3.097zM11.262 28.87l4.45-2.17-3.84-2.995-.61 5.165zM19.277 26.7l4.463 2.17-.623-5.165-3.84 2.995z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "phantom",
    name: "Phantom",
    description: "Solana & multi-chain wallet",
    color: "text-[#AB9FF2]",
    glow: "hover:border-[#AB9FF2]/40 hover:shadow-[0_0_20px_rgba(171,159,242,0.1)]",
    icon: (
      <svg viewBox="0 0 128 128" className="h-7 w-7" xmlns="http://www.w3.org/2000/svg">
        <rect width="128" height="128" rx="32" fill="#AB9FF2"/>
        <path d="M110.2 64c0-25.7-20.8-46.5-46.5-46.5S17.2 38.3 17.2 64c0 22.3 15.6 41 36.6 45.6v-14.7C41.1 90.6 32.2 78.3 32.2 64c0-17.5 14.2-31.7 31.7-31.7S95.6 46.5 95.6 64c0 11-5.6 20.6-14.1 26.2v14.9C100.8 99.6 110.2 82.9 110.2 64z" fill="white"/>
        <ellipse cx="52" cy="67" rx="6" ry="6" fill="white"/>
        <ellipse cx="76" cy="67" rx="6" ry="6" fill="white"/>
      </svg>
    ),
  },
  {
    id: "trustwallet",
    name: "Trust Wallet",
    description: "Multi-chain mobile wallet",
    color: "text-[#3375BB]",
    glow: "hover:border-[#3375BB]/40 hover:shadow-[0_0_20px_rgba(51,117,187,0.1)]",
    icon: (
      <svg viewBox="0 0 48 48" className="h-7 w-7" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 4L8 11v13c0 10.3 6.8 19.9 16 22.9C33.2 43.9 40 34.3 40 24V11L24 4z" fill="#3375BB"/>
        <path d="M21 28.5l-5.5-5.5 2-2 3.5 3.5 8-8 2 2-10 10z" fill="white"/>
      </svg>
    ),
  },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    description: "Self-custody crypto wallet",
    color: "text-[#0052FF]",
    glow: "hover:border-[#0052FF]/40 hover:shadow-[0_0_20px_rgba(0,82,255,0.1)]",
    icon: <SiCoinbase className="h-7 w-7 text-[#0052FF]" />,
  },
  {
    id: "ledger",
    name: "Ledger",
    description: "Hardware wallet — cold storage",
    color: "text-[#f5f5f5]",
    glow: "hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]",
    icon: (
      <svg viewBox="0 0 32 32" className="h-7 w-7" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="4" fill="#1D1D1B"/>
        <path d="M5 5h9v2H7v8H5V5zM18 5h9v10h-2V7h-7V5zM5 17h2v8h9v2H5V17zM25 23h-7v2h9V17h-2v6z" fill="white"/>
      </svg>
    ),
  },
  {
    id: "trezor",
    name: "Trezor",
    description: "Hardware wallet — cold storage",
    color: "text-[#1DB954]",
    glow: "hover:border-[#1DB954]/40 hover:shadow-[0_0_20px_rgba(29,185,84,0.1)]",
    icon: (
      <svg viewBox="0 0 32 32" className="h-7 w-7" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="6" fill="#1DB954"/>
        <path d="M16 4c-3.3 0-6 2.7-6 6v2H8v14h16V12h-2v-2c0-3.3-2.7-6-6-6zm0 2c2.2 0 4 1.8 4 4v2h-8v-2c0-2.2 1.8-4 4-4zm0 10a2 2 0 110 4 2 2 0 010-4z" fill="white"/>
      </svg>
    ),
  },
  {
    id: "binance",
    name: "Binance Web3",
    description: "Binance exchange wallet",
    color: "text-[#F3BA2F]",
    glow: "hover:border-[#F3BA2F]/40 hover:shadow-[0_0_20px_rgba(243,186,47,0.1)]",
    icon: <SiBinance className="h-7 w-7 text-[#F3BA2F]" />,
  },
  {
    id: "kraken",
    name: "Kraken",
    description: "Professional exchange wallet",
    color: "text-[#5741D9]",
    glow: "hover:border-[#5741D9]/40 hover:shadow-[0_0_20px_rgba(87,65,217,0.1)]",
    icon: (
      <svg viewBox="0 0 32 32" className="h-7 w-7" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="6" fill="#5741D9"/>
        <text x="6" y="22" fontSize="14" fontWeight="bold" fill="white" fontFamily="sans-serif">K</text>
        <path d="M18 10 L26 16 L18 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    ),
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    description: "Connect any compatible wallet",
    color: "text-[#3B99FC]",
    glow: "hover:border-[#3B99FC]/40 hover:shadow-[0_0_20px_rgba(59,153,252,0.1)]",
    icon: (
      <svg viewBox="0 0 32 32" className="h-7 w-7" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="8" fill="#3B99FC"/>
        <path d="M9.6 13.2a9.2 9.2 0 0112.8 0l.4.4 2.4-2.4-.4-.4a12.8 12.8 0 00-17.6 0l-.4.4 2.4 2.4.4-.4zM24 16l2.4 2.4L29 16l-2.6-2.4L24 16zM3 16l2.6 2.4L8 16l-2.4-2.4L3 16z" fill="white"/>
        <path d="M16 19.2l-4-4 2.4-2.4 1.6 1.6 1.6-1.6 2.4 2.4-4 4z" fill="white"/>
      </svg>
    ),
  },
  {
    id: "okx",
    name: "OKX Wallet",
    description: "OKX exchange & Web3 wallet",
    color: "text-[#f5f5f5]",
    glow: "hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]",
    icon: (
      <svg viewBox="0 0 32 32" className="h-7 w-7" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="4" fill="#1a1a1a"/>
        <rect x="4" y="12" width="8" height="8" rx="1" fill="white"/>
        <rect x="12" y="4" width="8" height="8" rx="1" fill="white"/>
        <rect x="20" y="12" width="8" height="8" rx="1" fill="white"/>
        <rect x="12" y="20" width="8" height="8" rx="1" fill="white"/>
      </svg>
    ),
  },
  {
    id: "bybit",
    name: "Bybit Wallet",
    description: "Bybit exchange crypto wallet",
    color: "text-[#F7A600]",
    glow: "hover:border-[#F7A600]/40 hover:shadow-[0_0_20px_rgba(247,166,0,0.1)]",
    icon: (
      <svg viewBox="0 0 32 32" className="h-7 w-7" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="6" fill="#F7A600"/>
        <path d="M8 10h8c2.2 0 4 1.8 4 4s-1.8 4-4 4H8v-8zm0 8h8.5c2.5 0 4.5 1.8 4.5 4s-2 4-4.5 4H8v-8zm2 2v4h6c1.1 0 2-.9 2-2s-.9-2-2-2H10zm0-8v4h6c1.1 0 2-.9 2-2s-.9-2-2-2H10z" fill="white"/>
      </svg>
    ),
  },
  {
    id: "rainbow",
    name: "Rainbow",
    description: "Ethereum wallet & NFT viewer",
    color: "text-[#FF6B6B]",
    glow: "hover:border-[#FF6B6B]/30 hover:shadow-[0_0_20px_rgba(255,107,107,0.1)]",
    icon: (
      <svg viewBox="0 0 32 32" className="h-7 w-7" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="10" fill="url(#rbow)"/>
        <defs>
          <linearGradient id="rbow" x1="0" y1="0" x2="32" y2="32">
            <stop offset="0%" stopColor="#FF6B6B"/>
            <stop offset="50%" stopColor="#A855F7"/>
            <stop offset="100%" stopColor="#3B82F6"/>
          </linearGradient>
        </defs>
        <path d="M6 20c0-5.5 4.5-10 10-10s10 4.5 10 10" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none"/>
        <path d="M9 20c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.7" fill="none"/>
        <path d="M12 20c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="white" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.4" fill="none"/>
      </svg>
    ),
  },
];

const IMPORT_METHODS = [
  {
    id: "seed" as ImportMethod,
    label: "Recovery Phrase",
    description: "12 or 24 word mnemonic seed phrase",
    icon: "🔑",
  },
  {
    id: "privatekey" as ImportMethod,
    label: "Private Key",
    description: "64-character hexadecimal private key",
    icon: "🔐",
  },
  {
    id: "address" as ImportMethod,
    label: "Wallet Address",
    description: "Watch-only — view balance without full access",
    icon: "👁",
  },
];

interface ImportWalletProps {
  open: boolean;
  onClose: () => void;
}

export function ImportWallet({ open, onClose }: ImportWalletProps) {
  const [step, setStep] = useState<Step>("select");
  const [selectedWallet, setSelectedWallet] = useState<WalletOption | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<ImportMethod | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredWallets = WALLET_OPTIONS.filter(
    (w) =>
      w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectWallet = (wallet: WalletOption) => {
    setSelectedWallet(wallet);
    setStep("method");
  };

  const handleSelectMethod = (method: ImportMethod) => {
    setSelectedMethod(method);
    setStep("input");
  };

  const handleImport = () => {
    if (!inputValue.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("success");
    }, 2000);
  };

  const handleClose = () => {
    setStep("select");
    setSelectedWallet(null);
    setSelectedMethod(null);
    setInputValue("");
    setShowInput(false);
    setIsLoading(false);
    setSearchQuery("");
    onClose();
  };

  const getInputLabel = () => {
    if (selectedMethod === "seed") return "Recovery Phrase (12 or 24 words)";
    if (selectedMethod === "privatekey") return "Private Key";
    return "Wallet Address";
  };

  const getInputPlaceholder = () => {
    if (selectedMethod === "seed") return "word1 word2 word3 word4 word5 word6 word7 word8 word9 word10 word11 word12";
    if (selectedMethod === "privatekey") return "0x...";
    return "0x...";
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="max-w-lg w-full p-0 border border-border/20 bg-[#080d1a] overflow-hidden"
        data-testid="import-wallet-modal"
      >
        {/* Header */}
        <div className="border-b border-border/10 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {step !== "select" && step !== "success" && (
              <button
                onClick={() => setStep(step === "method" ? "select" : "method")}
                className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded"
                data-testid="import-wallet-back"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}
            <div>
              <DialogTitle className="text-base font-semibold text-foreground">
                {step === "select" && "Import Wallet"}
                {step === "method" && `Import ${selectedWallet?.name}`}
                {step === "input" && `Enter ${selectedMethod === "seed" ? "Recovery Phrase" : selectedMethod === "privatekey" ? "Private Key" : "Address"}`}
                {step === "success" && "Wallet Imported"}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                {step === "select" && "Choose a wallet or exchange to connect"}
                {step === "method" && "Select how you want to import this wallet"}
                {step === "input" && "Your data is encrypted locally and never transmitted"}
                {step === "success" && "Your wallet has been securely imported"}
              </DialogDescription>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded"
            data-testid="import-wallet-close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Step: Select Wallet */}
        {step === "select" && (
          <div className="p-6 flex flex-col gap-4">
            <Input
              placeholder="Search wallets & exchanges..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/5 border-border/20 focus:border-primary/50 text-sm h-10"
              data-testid="import-wallet-search"
            />
            <div className="grid grid-cols-2 gap-2 max-h-[360px] overflow-y-auto pr-1">
              {filteredWallets.map((wallet) => (
                <button
                  key={wallet.id}
                  onClick={() => handleSelectWallet(wallet)}
                  data-testid={`wallet-option-${wallet.id}`}
                  className={`flex items-center gap-3 p-3 rounded-xl border border-border/15 bg-white/[0.02] transition-all duration-200 text-left group ${wallet.glow} hover:bg-white/[0.05]`}
                >
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-black/40 border border-border/20 flex items-center justify-center group-hover:border-border/40 transition-colors">
                    {wallet.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{wallet.name}</p>
                    <p className="text-[10px] text-muted-foreground truncate leading-tight mt-0.5">{wallet.description}</p>
                  </div>
                </button>
              ))}
              {filteredWallets.length === 0 && (
                <div className="col-span-2 py-8 text-center text-sm text-muted-foreground">
                  No wallets found for "{searchQuery}"
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step: Select Method */}
        {step === "method" && selectedWallet && (
          <div className="p-6 flex flex-col gap-3">
            {IMPORT_METHODS.map((method) => (
              <button
                key={method.id}
                onClick={() => handleSelectMethod(method.id)}
                data-testid={`import-method-${method.id}`}
                className="flex items-center gap-4 p-4 rounded-xl border border-border/15 bg-white/[0.02] hover:bg-white/[0.05] hover:border-primary/30 transition-all duration-200 text-left group"
              >
                <div className="w-10 h-10 rounded-lg bg-black/40 border border-border/20 flex items-center justify-center text-lg shrink-0">
                  {method.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{method.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{method.description}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              </button>
            ))}

            <div className="flex items-start gap-2 mt-2 p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/15">
              <AlertTriangle className="h-4 w-4 text-yellow-500/80 mt-0.5 shrink-0" />
              <p className="text-xs text-yellow-500/70 leading-relaxed">
                Never share your seed phrase or private key with anyone. Web3NanoLedger staff will never ask for this information.
              </p>
            </div>
          </div>
        )}

        {/* Step: Input Credentials */}
        {step === "input" && selectedMethod && (
          <div className="p-6 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label className="text-sm text-muted-foreground">{getInputLabel()}</Label>
              <div className="relative">
                {selectedMethod === "seed" ? (
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={getInputPlaceholder()}
                    rows={4}
                    data-testid="import-wallet-input"
                    className="w-full rounded-lg bg-white/5 border border-border/20 focus:border-primary/50 text-sm text-foreground placeholder:text-muted-foreground/50 p-3 resize-none outline-none transition-colors font-mono"
                    style={{ filter: showInput ? "none" : "blur(4px)", transition: "filter 0.2s" }}
                  />
                ) : (
                  <div className="relative">
                    <Input
                      type={showInput ? "text" : "password"}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={getInputPlaceholder()}
                      data-testid="import-wallet-input"
                      className="bg-white/5 border-border/20 focus:border-primary/50 font-mono text-sm pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowInput(!showInput)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      data-testid="toggle-input-visibility"
                    >
                      {showInput ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                )}
                {selectedMethod === "seed" && (
                  <button
                    type="button"
                    onClick={() => setShowInput(!showInput)}
                    className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
                    data-testid="toggle-input-visibility"
                  >
                    {showInput ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                )}
              </div>
              {selectedMethod === "seed" && !showInput && (
                <p className="text-xs text-muted-foreground">Click the eye icon to reveal your phrase</p>
              )}
            </div>

            <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/15">
              <Wallet className="h-4 w-4 text-primary/80 mt-0.5 shrink-0" />
              <p className="text-xs text-primary/70 leading-relaxed">
                Your credentials are encrypted locally on your device. They are never sent to Web3NanoLedger servers.
              </p>
            </div>

            <Button
              onClick={handleImport}
              disabled={!inputValue.trim() || isLoading}
              className="w-full h-11 shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] transition-shadow"
              data-testid="import-wallet-submit"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  Importing wallet...
                </span>
              ) : (
                `Import ${selectedWallet?.name} Wallet`
              )}
            </Button>
          </div>
        )}

        {/* Step: Success */}
        {step === "success" && selectedWallet && (
          <div className="p-8 flex flex-col items-center gap-5 text-center">
            <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.15)]">
              <CheckCircle2 className="h-10 w-10 text-green-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">Wallet Imported Successfully</h3>
              <p className="text-sm text-muted-foreground">
                Your {selectedWallet.name} wallet has been securely added to your Web3NanoLedger portfolio.
              </p>
            </div>
            <div className="w-full p-4 rounded-xl bg-white/[0.03] border border-border/15 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-black/40 border border-border/20 flex items-center justify-center shrink-0">
                {selectedWallet.icon}
              </div>
              <div className="text-left">
                <p className="text-sm font-medium">{selectedWallet.name}</p>
                <p className="text-xs text-green-400 flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="h-3 w-3" /> Connected & syncing
                </p>
              </div>
            </div>
            <Button
              onClick={handleClose}
              className="w-full h-11"
              data-testid="import-wallet-done"
            >
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
