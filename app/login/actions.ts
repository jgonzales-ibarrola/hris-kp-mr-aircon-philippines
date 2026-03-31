"use server";

import { signIn } from "@/auth"; // from your NextAuth export
import { signInSchema } from "@/features/login/validations";
import { redirect } from "next/navigation";

export type LoginState = {
  error?: string;
};

export async function loginAction(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const parsed = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    const issue = parsed.error.issues[0]
    return {
      error: issue?.message ?? 'Invalid input',
    };
  }

  const { email, password } = parsed.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false, // we handle redirect manually
    });

    // ✅ success redirect
    redirect("/dashboard");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    return {
      error: "Invalid credentials",
    };
  }
}