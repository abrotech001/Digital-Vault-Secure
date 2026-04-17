import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function Login() {
  const [, setLocation] = useLocation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // mock login -> go to dashboard
    setLocation("/dashboard");
  };

  return (
    <Layout showNav={false}>
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-card/50 backdrop-blur-xl border-border/20 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <CardHeader className="space-y-4 text-center pb-6">
            <div className="mx-auto w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold tracking-tight">Secure Access</CardTitle>
              <CardDescription className="text-muted-foreground">
                Enter your credentials to access your vault
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="vault@example.com" 
                  required 
                  className="bg-background/50 border-border/30 h-11 focus-visible:ring-primary/50"
                  data-testid="input-login-email"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-xs text-primary hover:underline" tabIndex={-1}>
                    Forgot password?
                  </a>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  className="bg-background/50 border-border/30 h-11 focus-visible:ring-primary/50"
                  data-testid="input-login-password"
                />
              </div>
              <Button type="submit" className="w-full h-11 mt-2 text-base shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-shadow" data-testid="btn-submit-login">
                Access Vault
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-border/10 pt-6">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Request Access
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}
