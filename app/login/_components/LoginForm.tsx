"use client";

import { useActionState, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { loginAction, LoginState } from "../actions";
import { EyeClosedIcon, EyeIcon } from "lucide-react";

const initialState: LoginState = {};

export function LoginForm() {
	const [showPassword, setShowPassword] = useState(false);
	const [state, formAction, isPending] = useActionState(
		loginAction,
		initialState,
	);

	return (
		<Card className="w-full max-w-md shadow-xl">
			<CardHeader>
				<CardTitle className="text-2xl font-semibold text-center">
					Login
				</CardTitle>
			</CardHeader>

			<CardContent>
				<form action={formAction} className="space-y-4">
					{/* Email */}
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							name="email"
							type="email"
							placeholder="you@example.com"
							required
						/>
					</div>

					{/* Password */}
					<div className="space-y-2">
						<Label htmlFor="password">Password</Label>

						<div className="relative">
							<Input
								name="password"
								type={showPassword ? "text" : "password"}
								placeholder="••••••••"
								required
								className="pr-10"
							/>

							<button
								type="button"
								onClick={() => setShowPassword((prev) => !prev)}
								className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground"
							>
								{showPassword ? <EyeClosedIcon className="size-5 cursor-pointer" /> : <EyeIcon className="size-5 cursor-pointer" />}
							</button>
						</div>
					</div>

					{/* Error */}
					{state?.error && (
						<p className="text-sm text-red-500 text-center">
							{state.error}
						</p>
					)}

					{/* Submit */}
					<Button
						type="submit"
						className="w-full"
						disabled={isPending}
					>
						{isPending ? "Logging in..." : "Login"}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
