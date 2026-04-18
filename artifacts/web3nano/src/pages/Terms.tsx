import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { FileText, AlertTriangle, CheckCircle, Ban, Scale, Globe } from "lucide-react";

const sections = [
  {
    icon: CheckCircle,
    title: "Acceptance of Terms",
    body: `By accessing or using Web3NanoLedger's platform, you agree to be bound by these Terms of Service. These terms constitute a legally binding agreement between you and Web3NanoLedger Inc. If you do not agree to these terms in their entirety, you must discontinue use of our services immediately. Your continued use following any modifications constitutes your acceptance of the revised terms.`,
  },
  {
    icon: FileText,
    title: "Description of Services",
    body: `Web3NanoLedger provides institutional-grade cryptocurrency custody, backup, and security services. Our platform enables encrypted storage of wallet credentials, multi-signature authorization workflows, and distributed backup verification. We reserve the right to modify, suspend, or discontinue any aspect of our services at any time with reasonable notice. We are not a licensed financial advisor, broker, or exchange — we do not facilitate trades or hold client funds on your behalf.`,
  },
  {
    icon: AlertTriangle,
    title: "User Responsibilities",
    body: `You are solely responsible for maintaining the confidentiality of your account credentials, recovery phrases, and backup identifiers. You must ensure that your use of Web3NanoLedger complies with all applicable local, national, and international laws and regulations. You agree not to use our services for any unlawful purpose, including money laundering, sanctions evasion, or fraud. Any unauthorized access attempts will result in immediate account termination and may be reported to relevant authorities.`,
  },
  {
    icon: Ban,
    title: "Prohibited Conduct",
    body: `The following activities are strictly prohibited: reverse engineering, decompiling, or disassembling any part of our platform; attempting to gain unauthorized access to other users' accounts or our backend systems; uploading malicious code, viruses, or exploits; scraping, data mining, or automated querying of our services without written authorization; using our platform to store or facilitate illegal asset transfers. Violations will result in permanent account suspension and potential legal action.`,
  },
  {
    icon: Scale,
    title: "Limitation of Liability",
    body: `Web3NanoLedger's total liability for any claims arising under these terms shall not exceed the amount you paid for our services in the twelve months prior to the claim. We are not liable for indirect, incidental, special, consequential, or punitive damages. We make no guarantee regarding the continuous availability of our services, and scheduled or emergency maintenance may result in temporary inaccessibility. Cryptocurrency markets are inherently volatile — we do not guarantee the value of any digital asset.`,
  },
  {
    icon: Globe,
    title: "Governing Law & Disputes",
    body: `These Terms of Service are governed by the laws of the State of Delaware, United States, without regard to conflict of law principles. Any disputes arising from these terms shall be resolved through binding arbitration under the rules of the American Arbitration Association, conducted in English. Class action lawsuits and jury trials are waived by both parties. You may opt out of arbitration within 30 days of first agreeing to these terms by sending written notice to legal@web3nanoledger.io.`,
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

export default function Terms() {
  return (
    <Layout>
      <section className="relative pt-28 pb-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/10 blur-[100px] rounded-full" />
        </div>
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6">
              <FileText className="h-4 w-4" /> Terms of Service
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Clear Terms, No Surprises</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We write our terms in plain language so you always know exactly what you're agreeing to.
            </p>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col gap-6">
            {sections.map((s) => (
              <motion.div key={s.title} variants={itemVariants} className="bg-card/30 border border-border/20 rounded-2xl p-6 backdrop-blur-sm hover:border-indigo-500/20 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <s.icon className="h-5 w-5 text-indigo-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold mb-2">{s.title}</h2>
                    <p className="text-muted-foreground text-sm leading-relaxed">{s.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.6 }} className="mt-10 p-5 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 text-center">
            <p className="text-sm text-muted-foreground">
              Last updated: <span className="text-foreground font-medium">April 18, 2026</span> · Legal inquiries:{" "}
              <a href="mailto:legal@web3nanoledger.io" className="text-indigo-400 hover:underline">legal@web3nanoledger.io</a>
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
