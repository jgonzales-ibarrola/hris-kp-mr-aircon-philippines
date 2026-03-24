"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
	AlertCircle,
	Eye,
	EyeOff,
	Loader2,
	Lock,
	Mail,
	ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { ActionState, login } from "../actions";

const LoginContent = () => {
  const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [isPending, setIsPending] = useState(false);

	const [loginState, loginAction] = useActionState<ActionState, FormData>(
		login,
		null,
	);

	const handleLogin = async (formData: FormData) => {
		setIsPending(true);
		await loginAction(formData);
		setIsPending(false);
	};

  return (
		<div className="relative min-h-svh w-full overflow-hidden bg-[#080a10] flex items-center justify-center px-4">
			{/* ── Background ambient glows ── */}
			<div className="pointer-events-none absolute inset-0 overflow-hidden">
				<div className="absolute -top-40 -left-40 h-150 w-150 rounded-full bg-primary/10 blur-[120px]" />
				<div className="absolute -bottom-32 -right-32 h-100 w-100 rounded-full bg-primary/5 blur-[100px]" />
				<div className="absolute top-1/2 left-1/2 h-75 w-75 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/4 blur-[80px]" />
			</div>

			{/* ── Dot-grid texture overlay ── */}
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.035]"
				style={{
					backgroundImage:
						"radial-gradient(circle, white 1px, transparent 1px)",
					backgroundSize: "28px 28px",
				}}
			/>

			{/* ── Card ── */}
			<div className="relative z-10 w-full max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
				{/* Brand mark */}
				<div className="mb-8 flex flex-col items-center gap-3">
					<div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 shadow-lg shadow-primary/10">
						<ShieldCheck className="h-5 w-5 text-primary" />
					</div>
					<div className="text-center">
						<h1 className="text-xl font-semibold tracking-tight text-white">
							Sign in to your workspace
						</h1>
						<p className="mt-1 text-sm text-zinc-500">
							Access is managed by your administrator
						</p>
						<Button variant={"link"} asChild>
							<Link href={"/"} className="text-white">
								Go back to home
							</Link>
						</Button>
					</div>
				</div>

				{/* Form card */}
				<div className="rounded-2xl border border-white/6 bg-white/3 p-6 shadow-2xl shadow-black/40 backdrop-blur-sm">
					{/* Error state */}
					{loginState?.message && (
						<Alert className="mb-5 border-red-500/20 bg-red-500/10 text-red-400">
							<AlertCircle className="h-4 w-4 text-red-400" />
							<AlertDescription className="text-red-400 text-sm">
								{loginState.message}
							</AlertDescription>
						</Alert>
					)}

					<form action={handleLogin} className="space-y-4">
						{/* Email */}
						<div className="space-y-1.5">
							<Label
								htmlFor="email"
								className="text-[11px] font-medium uppercase tracking-widest text-zinc-500"
							>
								Email
							</Label>
							<div className="relative">
								<Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />
								<Input
									id="email"
									name="email"
									type="email"
									required
									autoComplete="email"
									placeholder="you@company.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="h-11 border-white/[0.07] bg-white/4 pl-10 text-sm text-zinc-100 placeholder:text-zinc-700 focus-visible:border-primary/50 focus-visible:ring-1 focus-visible:ring-primary/30 focus-visible:ring-offset-0 rounded-xl transition-all"
								/>
							</div>
						</div>

						{/* Password */}
						<div className="space-y-1.5">
							<Label
								htmlFor="password"
								className="text-[11px] font-medium uppercase tracking-widest text-zinc-500"
							>
								Password
							</Label>
							<div className="relative">
								<Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />
								<Input
									id="password"
									name="password"
									type={showPassword ? "text" : "password"}
									required
									autoComplete="current-password"
									placeholder="••••••••"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									className="h-11 border-white/[0.07] bg-white/4 pl-10 pr-10 text-sm text-zinc-100 placeholder:text-zinc-700 focus-visible:border-primary/50 focus-visible:ring-1 focus-visible:ring-primary/30 focus-visible:ring-offset-0 rounded-xl transition-all"
								/>
								<button
									type="button"
									onClick={() => setShowPassword((v) => !v)}
									aria-label={
										showPassword
											? "Hide password"
											: "Show password"
									}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-300 transition-colors"
								>
									{showPassword ? (
										<EyeOff className="h-4 w-4" />
									) : (
										<Eye className="h-4 w-4" />
									)}
								</button>
							</div>
						</div>

						{/* Submit */}
						<Button
							type="submit"
							disabled={isPending}
							className="mt-2 h-11 w-full rounded-xl bg-primary text-primary-foreground text-sm font-medium tracking-wide shadow-lg shadow-primary/20 transition-all hover:brightness-110 hover:-translate-y-px hover:shadow-xl hover:shadow-primary/30 disabled:pointer-events-none disabled:opacity-40"
						>
							{isPending ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Signing in…
								</>
							) : (
								"Sign In"
							)}
						</Button>
					</form>
				</div>

				{/* Footer note */}
				<p className="mt-5 text-center text-[11px] text-zinc-600 tracking-wide">
					Don&apos;t have access?{" "}
					<span className="text-zinc-500">
						Contact your administrator.
					</span>
				</p>
			</div>
		</div>
	);
}

export default LoginContent