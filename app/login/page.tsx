"use client";

import { useActionState, useState } from "react";
import { login, signup, ActionState } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Mail,
  Lock,
  LogIn,
  UserPlus,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginPending, setIsLoginPending] = useState(false);
  const [isSignupPending, setIsSignupPending] = useState(false);

  const [loginState, loginAction] = useActionState<ActionState, FormData>(login, null);
  const [signupState, signupAction] = useActionState<ActionState, FormData>(signup, null);

  const handleLogin = async (formData: FormData) => {
    setIsLoginPending(true);
    await loginAction(formData);
    setIsLoginPending(false);
  };

  const handleSignup = async (formData: FormData) => {
    setIsSignupPending(true);
    await signupAction(formData);
    setIsSignupPending(false);
  };

  const sharedFields = (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
          Email
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 bg-muted/40 border-border/60 focus:border-primary transition-colors"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
          Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10 pr-10 bg-muted/40 border-border/60 focus:border-primary transition-colors"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      {/* Subtle background grid */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="w-full max-w-md space-y-8 relative">
        {/* Logo / Brand */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 mb-2">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Sign in to your account or create a new one</p>
        </div>

        <Card className="border-border/50 shadow-xl shadow-black/5 bg-card/80 backdrop-blur-sm">
          <Tabs defaultValue="login" className="w-full">
            <CardHeader className="pb-0">
              <TabsList className="w-full grid grid-cols-2 bg-muted/50">
                <TabsTrigger value="login" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  <LogIn className="h-3.5 w-3.5 mr-2" />
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  <UserPlus className="h-3.5 w-3.5 mr-2" />
                  Create Account
                </TabsTrigger>
              </TabsList>
            </CardHeader>

            {/* LOGIN TAB */}
            <TabsContent value="login">
              <form action={handleLogin}>
                <CardContent className="pt-6 space-y-4">
                  {loginState?.message && (
                    <Alert variant="destructive" className="border-destructive/50 bg-destructive/10 text-destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{loginState.message}</AlertDescription>
                    </Alert>
                  )}
                  {sharedFields}
                  {/* <div className="flex items-center justify-end">
                    <button type="button" className="text-xs text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline">
                      Forgot password?
                    </button>
                  </div> */}
                </CardContent>
                <CardFooter className="flex-col gap-4 pt-2">
                  <Button type="submit" className="w-full font-medium" disabled={isLoginPending}>
                    {isLoginPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Signing in…
                      </>
                    ) : (
                      <>
                        <LogIn className="h-4 w-4 mr-2" />
                        Sign In
                      </>
                    )}
                  </Button>
                  {/* <div className="relative w-full">
                    <Separator />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                      or
                    </span>
                  </div> */}
                  {/* <p className="text-xs text-center text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <button
                      type="button"
                      onClick={() => document.querySelector<HTMLButtonElement>('[data-value="signup"]')?.click()}
                      className="text-primary hover:underline underline-offset-4 font-medium"
                    >
                      Create one
                    </button>
                  </p> */}
                </CardFooter>
              </form>
            </TabsContent>

            {/* SIGNUP TAB */}
            <TabsContent value="signup">
              <form action={handleSignup}>
                <CardContent className="pt-6 space-y-4">
                  {signupState?.message && (
                    <Alert variant="destructive" className="border-destructive/50 bg-destructive/10 text-destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{signupState.message}</AlertDescription>
                    </Alert>
                  )}
                  {sharedFields}
                  <p className="text-xs text-muted-foreground">
                    By creating an account, you agree to our{" "}
                    <a href="/terms" className="text-primary hover:underline underline-offset-4">Terms</a>
                    {" "}and{" "}
                    <a href="/privacy" className="text-primary hover:underline underline-offset-4">Privacy Policy</a>.
                  </p>
                </CardContent>
                <CardFooter className="flex-col gap-4 pt-2">
                  <Button type="submit" className="w-full font-medium" disabled={isSignupPending}>
                    {isSignupPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Creating account…
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Create Account
                      </>
                    )}
                  </Button>
                  {/* <div className="relative w-full">
                    <Separator />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                      or
                    </span>
                  </div>
                  <p className="text-xs text-center text-muted-foreground">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => document.querySelector<HTMLButtonElement>('[data-value="login"]')?.click()}
                      className="text-primary hover:underline underline-offset-4 font-medium"
                    >
                      Sign in
                    </button>
                  </p> */}
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}