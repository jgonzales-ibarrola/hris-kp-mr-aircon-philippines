import AccountForm from "./AccountForm";
import { createClient } from "@/lib/supabase/server";

const Page = async () => {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	
	return <AccountForm user={user} />;
};

export default Page;
