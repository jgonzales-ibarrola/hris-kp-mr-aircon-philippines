import { createClient } from "@/lib/supabase/server";
import LoginContent from "./_components/LoginContent";
import { redirect } from "next/navigation";

export default async function LoginPage() {
	const supabase = await createClient();
	const { data } = await supabase.auth.getSession()
	
	if (data.session?.user) {
		redirect('/')
	}

	return (
		<LoginContent />
	)
}
