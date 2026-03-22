import { prisma } from "@/lib/prisma";
import Link from "next/link";

const Page = async () => {
	const users = await prisma.user.findMany({
		orderBy: { createdAt: "desc" },
	});

	return (
		<div>
			<pre>{JSON.stringify(users, null, 2)}</pre>
			<Link href={"/login"}>Login</Link>
		</div>
	);
};

export default Page;
