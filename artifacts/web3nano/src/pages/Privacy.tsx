import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, Server, RefreshCw, Mail } from "lucide-react";

const sections = [
  {
    icon: Eye,
    title: "Information We Collect",
    body: `Web3NanoLedger collects only the minimum data necessary to deliver our institutional-grade security services. This includes encrypted wallet metadata, session identifiers, and anonymized usage telemetry. We do not collect, store, or transmit your private keys, seed phrases, or any personally identifiable financial information in plaintext form. All data collection is governed by the principle of data minimization — if we don't need it, we don't keep it.`,
  },
  {
    icon: Lock,
    title: "How We Protect Your Data",
    body: `All data transmitted between your device and our infrastructure is encrypted using TLS 1.3 with Perfect Forward Secrecy. At rest, sensitive records are protected with AES-256-GCM encryption with keys managed by a hardware security module (HSM). Our zero-knowledge architecture ensures that even our own engineers cannot access your private information. Regular third-party penetration testing and automated vulnerability scanning are performed on all production systems.`,
  },
  {
    icon: Server,
    title: "Data Storage & Retention",
    body: `Your encrypted data is stored across geographically distributed, SOC 2 Type II compliant data centers. We retain account data only for as long as your account remains active or as required by applicable financial regulations. Upon account deletion, all personal data is permanently purged from our systems within 30 days. Anonymized, aggregated analytics may be retained indefinitely to improve our security models.`,
  },
  {
    icon: RefreshCw,
    title: "Third-Party Sharing",
    body: `Web3NanoLedger does not sell, trade, or rent your personal information to third parties. We may share de-identified, aggregated data with security research partners to improve threat intelligence. In cases required by law, court order, or regulatory authority, we will disclose only the minimum information legally required and will notify you to the fullest extent permitted by applicable law.`,
  },
  {
    icon: Shield,
    title: "Your Rights & Controls",
    body: `You have the right to access, correct, export, or delete your personal data at any time through your account settings. We support data portability in compliance with GDPR and CCPA. You may opt out of non-essential telemetry at any time. If you believe your data has been compromised or misused, you may submit a formal complaint to our Data Protection Officer. We are committed to resolving all privacy concerns within 72 hours.`,
  },
  {
    icon: Mail,
    title: "Contact & Updates",
    body: `This Privacy Policy was last updated on April 18, 2026. We will notify you of material changes via email and in-platform notification at least 30 days before they take effect. For privacy-related inquiries, contact our Data Protection Officer at privacy@web3nanoledger.io. We welcome feedback and transparency requests from all users and regulators.`,
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function Privacy() {
  return (
    <Layout>
      <section className="relative pt-28 pb-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 blur-[100px] rounded-full" />
        </div>
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Shield className="h-4 w-4" /> Privacy Policy
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Your Privacy Is Non-Negotiable</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We built Web3NanoLedger on a foundation of radical transparency. Here is exactly how we handle your information.
            </p>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col gap-6">
            {sections.map((s) => (
              <motion.div key={s.title} variants={itemVariants} className="bg-card/30 border border-border/20 rounded-2xl p-6 backdrop-blur-sm hover:border-primary/20 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                    <s.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold mb-2">{s.title}</h2>
                    <p className="text-muted-foreground text-sm leading-relaxed">{s.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.6 }} className="mt-10 p-5 rounded-2xl border border-primary/20 bg-primary/5 text-center">
            <p className="text-sm text-muted-foreground">
              Effective date: <span className="text-foreground font-medium">April 18, 2026</span> · Questions? Contact us at{" "}
              <a href="mailto:privacy@web3nanoledger.io" className="text-primary hover:underline">privacy@web3nanoledger.io</a>
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
