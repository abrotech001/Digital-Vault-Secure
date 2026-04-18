import { Layout } from "@/components/Layout";
import { Shield, Lock, Eye, Server, Key, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const sections = [
  {
    icon: Shield,
    title: "Encryption Standards",
    body: `Web3BlockchainSecurity employs AES-256-GCM symmetric encryption for all data at rest, combined with RSA-4096 and ECDSA P-521 asymmetric keys for transport-layer signing. Every secret is encrypted with a unique per-record key derived via HKDF-SHA512. We enforce TLS 1.3 with PFS (Perfect Forward Secrecy) for all client connections, ensuring that historical traffic cannot be decrypted even if long-term keys are later compromised.

Our cryptographic modules undergo annual FIPS 140-3 validation by accredited laboratories. Key material is stored exclusively within Hardware Security Modules (HSMs) rated at FIPS 140-3 Level 3, physically located in SOC 2 Type II certified data centers across three jurisdictions for disaster resilience.`,
  },
  {
    icon: Key,
    title: "Key Management & Custody",
    body: `We operate a hierarchical deterministic (HD) key management architecture. User wallet keys are never stored on our servers in plaintext form. Instead, we employ a threshold signature scheme (TSS) with Shamir's Secret Sharing: a minimum quorum of geographically-distributed key shards must cooperate to authorize any signing operation.

Seed phrase backups submitted through our platform are immediately encrypted client-side using the user's derived key before transmission. The raw phrase is never sent in plaintext. Our administrative staff have no access to individual user key material — access is governed by hardware-enforced policies and cryptographic access controls, not software permissions.`,
  },
  {
    icon: Server,
    title: "Infrastructure Security",
    body: `Our infrastructure is deployed on hardened bare-metal servers operated in Tier IV data centers. All servers run immutable OS images rebuilt weekly from verified sources. Network segmentation enforces strict zero-trust policies: every service authenticates to every other service using mTLS with short-lived certificates rotated every 24 hours.

Our perimeter is protected by a multi-layer DDoS mitigation stack capable of absorbing 10+ Tbps of traffic. Intrusion detection systems (IDS) monitor all ingress/egress traffic in real time against signatures and behavioral baselines. Any anomalous activity triggers immediate automated isolation and incident response escalation.`,
  },
  {
    icon: Eye,
    title: "Monitoring & Incident Response",
    body: `Web3BlockchainSecurity operates a 24/7 Security Operations Center (SOC) staffed by experienced threat analysts. All system logs are forwarded in real time to an immutable, air-gapped SIEM platform with a 365-day retention policy. Automated anomaly detection flags deviations within milliseconds of occurrence.

Our incident response plan follows NIST SP 800-61r2. Critical vulnerabilities are patched within 4 hours of disclosure; high-severity issues within 24 hours. We conduct quarterly red-team exercises and penetration tests by independent security firms. Results are reviewed by our CISO and remediated with full audit trails.`,
  },
  {
    icon: AlertTriangle,
    title: "Vulnerability Disclosure",
    body: `We operate a responsible disclosure program and welcome security researchers who identify potential vulnerabilities. If you discover a security issue, please contact our security team immediately at security@web3blockchainsecurity.com with a detailed description of the finding.

We commit to acknowledging all valid reports within 48 hours, keeping researchers informed of remediation progress, and, for critical findings, publicly crediting researchers upon resolution if desired. We do not take legal action against researchers who act in good faith. Scope includes all production services, APIs, and client applications under the web3blockchainsecurity.com domain.`,
  },
  {
    icon: Lock,
    title: "Compliance & Certifications",
    body: `Web3BlockchainSecurity maintains the following active certifications and compliance frameworks:

• SOC 2 Type II — Annual third-party audit covering Security, Availability, and Confidentiality trust service criteria
• ISO/IEC 27001:2022 — Information security management system certification
• FIPS 140-3 Level 3 — Cryptographic module validation
• GDPR (EU) — Full data protection compliance with appointed DPO
• CCPA (California) — Consumer privacy compliance with opt-out mechanisms
• PCI DSS Level 1 — For any payment data handling operations

Certificates and audit reports are available to institutional clients under NDA. Our compliance posture is reviewed quarterly by our internal GRC team and annually by external auditors.`,
  },
];

export default function Security() {
  return (
    <Layout>
      <div className="container mx-auto px-4 max-w-3xl py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-6">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-extrabold mb-4">Security</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            How Web3BlockchainSecurity protects your assets with industry-leading cryptographic and operational controls.
          </p>
          <p className="text-xs text-muted-foreground/50 mt-4">Last updated: April 18, 2026</p>
        </motion.div>

        <div className="space-y-10">
          {sections.map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="bg-card/30 border border-border/15 rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <s.icon className="h-4.5 w-4.5 text-primary" />
                </div>
                <h2 className="text-xl font-bold">{s.title}</h2>
              </div>
              <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{s.body}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
