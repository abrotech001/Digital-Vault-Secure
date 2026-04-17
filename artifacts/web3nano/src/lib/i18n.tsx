import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "es" | "fr" | "de" | "zh";

type Translations = Record<string, Record<Language, string>>;

const translations: Translations = {
  // Navigation
  "nav.dashboard": { en: "Dashboard", es: "Panel", fr: "Tableau de bord", de: "Dashboard", zh: "仪表板" },
  "nav.login": { en: "Login", es: "Iniciar sesión", fr: "Connexion", de: "Anmelden", zh: "登录" },
  
  // Hero
  "hero.headline": { en: "Web3NanoLedger — Secure Your Digital Assets with Confidence", es: "Asegure sus activos digitales con confianza", fr: "Sécurisez vos actifs numériques en toute confiance", de: "Sichern Sie Ihre digitalen Vermögenswerte mit Vertrauen", zh: "充满信心地保护您的数字资产" },
  "hero.subheadline": { en: "A modern crypto storage platform designed for security, simplicity, and long-term protection.", es: "Una plataforma moderna diseñada para la seguridad, simplicidad y protección a largo plazo.", fr: "Une plateforme moderne conçue pour la sécurité, la simplicité et la protection à long terme.", de: "Eine moderne Plattform, entwickelt für Sicherheit, Einfachheit und langfristigen Schutz.", zh: "专为安全性、简单性和长期保护而设计的现代加密存储平台。" },
  "hero.getStarted": { en: "Get Started", es: "Empezar", fr: "Commencer", de: "Loslegen", zh: "开始" },
  "hero.createAccount": { en: "Create Account", es: "Crear cuenta", fr: "Créer un compte", de: "Konto erstellen", zh: "创建账户" },

  // Trust / Security
  "trust.title": { en: "Built for Security and Trust", es: "Construido para la seguridad y la confianza", fr: "Conçu pour la sécurité et la confiance", de: "Für Sicherheit und Vertrauen gebaut", zh: "为安全和信任而建" },
  "trust.body": { en: "Web3NanoLedger uses advanced encryption and secure infrastructure to protect your digital assets against evolving cyber threats, including emerging risks from next-generation technologies.", es: "Utilizamos cifrado avanzado e infraestructura segura...", fr: "Nous utilisons un cryptage avancé...", de: "Wir verwenden fortschrittliche Verschlüsselung...", zh: "我们使用高级加密和安全基础架构..." },

  // Future Protection
  "future.title": { en: "Future-Ready Asset Protection", es: "Protección de activos lista para el futuro", fr: "Protection des actifs prête pour l'avenir", de: "Zukunftssicherer Vermögensschutz", zh: "面向未来的资产保护" },
  "future.body": { en: "Securely back up your digital assets to stay protected against evolving cyber threats, including risks associated with advanced computing technologies.", es: "Realice copias de seguridad de sus activos de forma segura...", fr: "Sauvegardez vos actifs en toute sécurité...", de: "Sichern Sie Ihre Vermögenswerte...", zh: "安全地备份您的数字资产..." },

  // Assistance
  "assistance.title": { en: "Prepare to Get Started", es: "Prepárese para empezar", fr: "Préparez-vous à commencer", de: "Bereiten Sie sich auf den Start vor", zh: "准备开始" },
  "assistance.body": { en: "We are here to offer assistance with any issues you are experiencing regarding your wallet account.", es: "Estamos aquí para ofrecer asistencia...", fr: "Nous sommes là pour vous aider...", de: "Wir sind hier, um Ihnen zu helfen...", zh: "我们在这里为您提供帮助..." },

  // Support
  "support.text": { en: "Inform us of any additional problems you are encountering and proceed with the guided steps after completing this section.", es: "Infórmenos de cualquier problema adicional...", fr: "Informez-nous de tout problème supplémentaire...", de: "Informieren Sie uns über zusätzliche Probleme...", zh: "告知我们您遇到的任何其他问题..." },

  // Final CTA
  "cta.title": { en: "Start Securing Your Crypto Today", es: "Comience a asegurar su cripto hoy", fr: "Commencez à sécuriser votre crypto aujourd'hui", de: "Beginnen Sie heute mit der Sicherung Ihrer Krypto", zh: "今天开始保护您的加密货币" },
  "cta.freeAccount": { en: "Create Free Account", es: "Crear cuenta gratis", fr: "Créer un compte gratuit", de: "Kostenloses Konto erstellen", zh: "创建免费账户" },

  // Dashboard
  "dashboard.totalBalance": { en: "Total Balance", es: "Saldo total", fr: "Solde total", de: "Gesamtsaldo", zh: "总余额" },
  "dashboard.secureAssets": { en: "Securely stored assets", es: "Activos almacenados de forma segura", fr: "Actifs stockés en toute sécurité", de: "Sicher gespeicherte Vermögenswerte", zh: "安全存储的资产" },
  "dashboard.walletAddress": { en: "Wallet Address", es: "Dirección de billetera", fr: "Adresse du portefeuille", de: "Wallet-Adresse", zh: "钱包地址" },
  "dashboard.network": { en: "Network", es: "Red", fr: "Réseau", de: "Netzwerk", zh: "网络" },
  "dashboard.deposit": { en: "Deposit", es: "Depositar", fr: "Dépôt", de: "Einzahlen", zh: "存款" },
  "dashboard.withdraw": { en: "Withdraw", es: "Retirar", fr: "Retrait", de: "Abheben", zh: "提款" },
  "dashboard.backup": { en: "Backup", es: "Respaldo", fr: "Sauvegarde", de: "Backup", zh: "备份" },
  "dashboard.securityStatus": { en: "Security Status", es: "Estado de seguridad", fr: "Statut de sécurité", de: "Sicherheitsstatus", zh: "安全状态" },
  "dashboard.securityMessage": { en: "Your assets are protected with encrypted storage and secure transaction handling.", es: "Sus activos están protegidos...", fr: "Vos actifs sont protégés...", de: "Ihre Vermögenswerte sind geschützt...", zh: "您的资产受到保护..." },
  "dashboard.needHelp": { en: "Need Help?", es: "¿Necesita ayuda?", fr: "Besoin d'aide ?", de: "Brauchen Sie Hilfe?", zh: "需要帮助？" },
  "dashboard.contactSupport": { en: "Contact Support", es: "Contactar soporte", fr: "Contacter le support", de: "Support kontaktieren", zh: "联系客服" },
};

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string) => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    return key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
