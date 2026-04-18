import { useState, useRef, useEffect } from "react";
import { useI18n } from "@/lib/i18n";
import { Globe, Check, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LANGUAGES = [
  { code: "en", label: "English",            flag: "🇬🇧", region: "Global" },
  { code: "es", label: "Español",            flag: "🇪🇸", region: "España" },
  { code: "fr", label: "Français",           flag: "🇫🇷", region: "France" },
  { code: "de", label: "Deutsch",            flag: "🇩🇪", region: "Deutschland" },
  { code: "zh", label: "中文",               flag: "🇨🇳", region: "中国" },
  { code: "pt", label: "Português",          flag: "🇧🇷", region: "Brasil" },
  { code: "ru", label: "Русский",            flag: "🇷🇺", region: "Россия" },
  { code: "ja", label: "日本語",             flag: "🇯🇵", region: "日本" },
  { code: "ko", label: "한국어",             flag: "🇰🇷", region: "한국" },
  { code: "ar", label: "العربية",            flag: "🇸🇦", region: "العربية" },
  { code: "it", label: "Italiano",           flag: "🇮🇹", region: "Italia" },
  { code: "tr", label: "Türkçe",             flag: "🇹🇷", region: "Türkiye" },
  { code: "nl", label: "Nederlands",         flag: "🇳🇱", region: "Nederland" },
  { code: "pl", label: "Polski",             flag: "🇵🇱", region: "Polska" },
  { code: "hi", label: "हिंदी",              flag: "🇮🇳", region: "भारत" },
  { code: "id", label: "Bahasa Indonesia",   flag: "🇮🇩", region: "Indonesia" },
  { code: "th", label: "ภาษาไทย",            flag: "🇹🇭", region: "ไทย" },
  { code: "vi", label: "Tiếng Việt",         flag: "🇻🇳", region: "Việt Nam" },
  { code: "sv", label: "Svenska",            flag: "🇸🇪", region: "Sverige" },
  { code: "no", label: "Norsk",              flag: "🇳🇴", region: "Norge" },
  { code: "da", label: "Dansk",              flag: "🇩🇰", region: "Danmark" },
  { code: "fi", label: "Suomi",              flag: "🇫🇮", region: "Suomi" },
  { code: "el", label: "Ελληνικά",           flag: "🇬🇷", region: "Ελλάδα" },
  { code: "cs", label: "Čeština",            flag: "🇨🇿", region: "Česko" },
  { code: "ro", label: "Română",             flag: "🇷🇴", region: "România" },
] as const;

export function LanguageSwitcher() {
  const { language, setLanguage } = useI18n();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const current = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];

  const filtered = LANGUAGES.filter(
    (l) =>
      l.label.toLowerCase().includes(search.toLowerCase()) ||
      l.region.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 80);
  }, [open]);

  return (
    <div className="relative" ref={ref} data-testid="btn-lang-switcher">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 h-9 px-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/[0.06] border border-transparent hover:border-white/[0.08] transition-all"
        aria-label="Switch language"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{current.flag} {current.label}</span>
        <span className="sm:hidden">{current.flag}</span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-56 z-50 bg-[#080d1a] border border-white/[0.09] rounded-xl shadow-[0_16px_48px_rgba(0,0,0,0.7)] overflow-hidden"
          >
            <div className="p-2 border-b border-white/[0.06]">
              <input
                ref={inputRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search language..."
                className="w-full bg-white/[0.05] border border-white/[0.08] rounded-lg px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/40 transition-colors"
              />
            </div>

            <div className="max-h-64 overflow-y-auto py-1 scrollbar-thin">
              {filtered.length === 0 && (
                <p className="text-xs text-muted-foreground text-center py-4">No results</p>
              )}
              {filtered.map((lang) => (
                <button
                  key={lang.code}
                  data-testid={`menu-item-lang-${lang.code}`}
                  onClick={() => {
                    setLanguage(lang.code as typeof language);
                    setOpen(false);
                    setSearch("");
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-white/[0.05] transition-colors text-left ${
                    language === lang.code ? "text-primary bg-primary/[0.08]" : "text-foreground/80"
                  }`}
                >
                  <span className="text-base leading-none w-5 text-center">{lang.flag}</span>
                  <span className="flex-1 truncate">{lang.label}</span>
                  {language === lang.code && <Check className="h-3.5 w-3.5 text-primary shrink-0" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
