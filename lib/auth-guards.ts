import { auth } from "@/auth";
import { Role } from "@/generated/prisma/enums";
import { redirect } from "next/navigation";

export async function requireRole(...roles: Role[]) {
  const session = await auth();

  if (!session?.user) redirect("/login");

  if (session.user.userStatus !== "ACTIVE") redirect("/login?error=inactive");

  if (!roles.includes(session.user.role as Role)) redirect("/unauthorized");

  return session;
}