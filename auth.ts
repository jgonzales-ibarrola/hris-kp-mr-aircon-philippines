  import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
          include: { profile: true }, // 👈 pull profile in same query
        });

        if (!user) return null;

        // 🔒 Block inactive users at login — not just in UI
        if (
          user.profile?.userStatus &&
          user.profile.userStatus !== "ACTIVE"
        ) {
          throw new Error('Invalid credentials.');
        }

        if (!user.profile) {
          throw new Error("User doesn't have profile.");
        }

        const isVerifiedPassword = await bcrypt.compareSync(
					credentials.password as string,
					user.passwordHash as string,
				); // true

				if (!user || !isVerifiedPassword) {
					throw new Error("Invalid credentials.");
				}

        return {
          id: user.id,
          email: user.email,
          role: user.role,
          userStatus: user.profile.userStatus,
          department: user.profile.department,
        };
      },
    }),
  ],

  callbacks: {
    // 1️⃣ Runs at login — persists custom fields into JWT
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.userStatus = user.userStatus;
        token.department = user.department;
      }
      return token;
    },

    // 2️⃣ Runs on every request — exposes JWT data as session
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as string;
      session.user.userStatus = token.userStatus as string;
      session.user.department = token.department as string;
      return session;
    },
  },

  session: {
		strategy: "jwt",
		maxAge: 30 * 2, // 30 minutes
	},
	secret: process.env.AUTH_SECRET!,
	debug: process.env.NODE_ENV === "development",
	trustHost: true,
});