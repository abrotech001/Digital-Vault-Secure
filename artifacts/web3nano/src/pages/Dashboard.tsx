import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Copy, ArrowUpRight, ArrowDownLeft, Clock, CheckCircle2, ChevronRight, LogOut, Settings, User, Database, Download } from "lucide-react";
import { SiEthereum, SiBitcoin } from "react-icons/si";
import { Link } from "wouter";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ImportWallet } from "@/components/ImportWallet";

export default function Dashboard() {
  const { t } = useI18n();
  const [importOpen, setImportOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("0x1234abcd5678efgh9012ijkl3456mnop7890qrst");
    // normally trigger a toast here
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground">
      {/* Dashboard Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-border/10 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <span className="font-semibold tracking-tight">Web3NanoLedger</span>
          </Link>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <LanguageSwitcher />
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <User className="h-5 w-5" />
            </Button>
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
                <LogOut className="h-4 w-4 mr-2 hidden sm:inline" />
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Hero & Actions */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Main Balance Card */}
            <Card className="bg-card/40 backdrop-blur-md border-border/20 shadow-[0_0_30px_rgba(59,130,246,0.05)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardContent className="p-8 md:p-10 relative z-10">
                <p className="text-sm font-medium text-muted-foreground mb-2 tracking-wide uppercase">{t("dashboard.totalBalance")}</p>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-4">$12,450.00</h1>
                <div className="flex items-center gap-2 text-sm text-green-400">
                  <Shield className="h-4 w-4" />
                  <span>{t("dashboard.secureAssets")}</span>
                </div>
              </CardContent>
            </Card>

            {/* Wallet Info & Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-card/30 border-border/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-1">{t("dashboard.walletAddress")}</p>
                  <div className="flex items-center justify-between bg-background/50 p-3 rounded-lg border border-border/30">
                    <span className="font-mono text-sm">0x1234...abcd</span>
                    <Button variant="ghost" size="icon" onClick={handleCopy} className="h-8 w-8 text-muted-foreground hover:text-primary">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{t("dashboard.network")}</span>
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs font-medium">Ethereum</span>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col gap-3 justify-center">
                <Button className="w-full justify-start h-12 text-base shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:shadow-[0_0_20px_rgba(59,130,246,0.25)] transition-shadow" data-testid="button-deposit">
                  <ArrowDownLeft className="mr-3 h-5 w-5" /> {t("dashboard.deposit")}
                </Button>
                <Button variant="outline" className="w-full justify-start h-12 text-base border-border/30 hover:bg-card/50" data-testid="button-withdraw">
                  <ArrowUpRight className="mr-3 h-5 w-5" /> {t("dashboard.withdraw")}
                </Button>
                <Button variant="secondary" className="w-full justify-start h-12 text-base bg-secondary/50 hover:bg-secondary/80" data-testid="button-backup">
                  <Database className="mr-3 h-5 w-5" /> {t("dashboard.backup")}
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start h-12 text-base border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 shadow-[0_0_15px_rgba(59,130,246,0.08)] hover:shadow-[0_0_20px_rgba(59,130,246,0.18)] transition-all"
                  onClick={() => setImportOpen(true)}
                  data-testid="button-import-wallet"
                >
                  <Download className="mr-3 h-5 w-5" /> Import Wallet
                </Button>
              </div>
            </div>

            {/* Assets List */}
            <Card className="bg-card/30 border-border/20 backdrop-blur-sm mt-2">
              <CardHeader>
                <CardTitle className="text-lg">Digital Assets</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border/10">
                  {[
                    { symbol: "ETH", name: "Ethereum", amount: "2.45", val: "$8,203.00", iconNode: <SiEthereum className="h-5 w-5 text-[#627EEA]" /> },
                    { symbol: "USDC", name: "USD Coin", amount: "1,500.00", val: "$1,500.00", iconNode: (
                      <svg viewBox="0 0 32 32" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="16" cy="16" r="16" fill="#2775CA"/>
                        <path d="M16 5C9.9 5 5 9.9 5 16s4.9 11 11 11 11-4.9 11-11S22.1 5 16 5zm0 1.5c5.2 0 9.5 4.3 9.5 9.5s-4.3 9.5-9.5 9.5-9.5-4.3-9.5-9.5S10.8 6.5 16 6.5zm1.5 3h-3v2.1c-2.3.5-3.9 2.1-3.9 4.1 0 2.3 1.7 3.5 4.4 4.1 2.2.5 2.9 1.1 2.9 2.1s-.8 1.7-2.4 1.7c-1.3 0-2.3-.5-2.6-1.5H10v.1c.3 2.1 1.9 3.5 4.4 3.9V26h3v-2.1c2.4-.5 4-2.1 4-4.2 0-2.3-1.6-3.4-4.3-4-2.3-.5-3-.9-3-2 0-.9.7-1.6 2.2-1.6 1.2 0 2.1.5 2.5 1.4H22v-.1c-.3-2-1.8-3.3-4-3.7V9.5z" fill="white"/>
                      </svg>
                    )},
                    { symbol: "BTC", name: "Bitcoin", amount: "0.032", val: "$2,747.00", iconNode: <SiBitcoin className="h-5 w-5 text-[#F7931A]" /> },
                  ].map((coin) => (
                    <div key={coin.symbol} className="flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors cursor-pointer group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center border border-border/30 group-hover:border-border/50 transition-colors">
                          {coin.iconNode}
                        </div>
                        <div>
                          <p className="font-medium">{coin.symbol}</p>
                          <p className="text-xs text-muted-foreground">{coin.name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{coin.val}</p>
                        <p className="text-xs text-muted-foreground">{coin.amount} {coin.symbol}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Right Column: Activity & Security */}
          <div className="flex flex-col gap-6">
            
            {/* Security Notice Panel */}
            <Card className="bg-[#0a1a12] border-green-900/30">
              <CardContent className="p-6 flex gap-4">
                <Shield className="h-8 w-8 text-green-500 shrink-0" />
                <div>
                  <h3 className="font-medium text-green-400 mb-1">{t("dashboard.securityStatus")}</h3>
                  <p className="text-sm text-green-500/70 leading-relaxed">
                    {t("dashboard.securityMessage")}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-card/30 border-border/20 backdrop-blur-sm flex-1">
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border/10">
                  {[
                    { type: "Received", asset: "ETH", amount: "+0.5", date: "Today, 10:23 AM", status: "Completed", icon: ArrowDownLeft },
                    { type: "Sent", asset: "USDC", amount: "-500.00", date: "Yesterday", status: "Completed", icon: ArrowUpRight },
                    { type: "Received", asset: "BTC", amount: "+0.01", date: "Oct 12", status: "Completed", icon: ArrowDownLeft },
                    { type: "Sent", asset: "ETH", amount: "-0.1", date: "Oct 10", status: "Completed", icon: ArrowUpRight },
                    { type: "Received", asset: "USDC", amount: "+250.00", date: "Oct 05", status: "Pending", icon: ArrowDownLeft },
                  ].map((tx, i) => (
                    <div key={i} className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-background border border-border/30 ${tx.type === 'Received' ? 'text-green-400' : 'text-muted-foreground'}`}>
                          <tx.icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{tx.type} {tx.asset}</p>
                          <p className="text-xs text-muted-foreground">{tx.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${tx.type === 'Received' ? 'text-green-400' : ''}`}>{tx.amount} {tx.asset}</p>
                        <div className="flex items-center justify-end gap-1 mt-1">
                          {tx.status === "Completed" ? (
                            <CheckCircle2 className="h-3 w-3 text-green-500" />
                          ) : (
                            <Clock className="h-3 w-3 text-yellow-500" />
                          )}
                          <span className="text-[10px] text-muted-foreground">{tx.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 pt-2">
                  <Button variant="ghost" className="w-full text-sm text-muted-foreground hover:text-primary">
                    View all activity <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Support Card */}
            <Card className="bg-card/30 border-border/20 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <h3 className="font-medium mb-2">{t("dashboard.needHelp")}</h3>
                <p className="text-sm text-muted-foreground mb-4">Dedicated support for private clients.</p>
                <Button variant="outline" className="w-full border-border/50 hover:bg-card/50">
                  {t("dashboard.contactSupport")}
                </Button>
              </CardContent>
            </Card>

          </div>
        </div>
      </main>

      <ImportWallet open={importOpen} onClose={() => setImportOpen(false)} />
    </div>
  );
}
