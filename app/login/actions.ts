"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export type ActionState = {
  success: boolean;
  message: string;
} | null;

export async function login(_prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
	const supabase = await createClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs
	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	const { error } = await supabase.auth.signInWithPassword(data);

	if (error) {
		console.log(error.message);
		if (error.message === "Invalid login credentials") {
			console.log("error:" + "Invalid login credentials");
			return {
				success: false,
				message: "Invalid login credentials",
			};
		}
	}

	revalidatePath("/", "layout");
	redirect("/account");
}

export async function signup(_prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
	const supabase = await createClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs
	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	const { error } = await supabase.auth.signUp(data);

	if (error) {
		if (error.message === "User already registered") {
			console.log("error:" + "User already registered");
			return {
				success: false,
				message: "User already registered",
			};
		}
	}

	revalidatePath("/", "layout");
	redirect("/account");
}
