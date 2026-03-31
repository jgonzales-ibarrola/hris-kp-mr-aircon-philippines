import { auth } from "@/auth";
import { NextResponse } from "next/server";

// Define which roles can access which route prefixes
const ROUTE_PERMISSIONS: Record<string, string[]> = {
	"/admin": ["ADMIN"],
	"/admin/hr": ["ADMIN", "HR"],
};

export default auth((req) => {
	const { pathname } = req.nextUrl;
	const session = req.auth;

	// 1. Not logged in → redirect to login
	if (!session) {
		return NextResponse.redirect(new URL("/login", req.url));
	}

	if (!session.user) {
		return NextResponse.redirect(new URL("/login", req.url));
	}

	// 2. Logged in but inactive (e.g. session existed before termination)
	if (session.user.userStatus !== "ACTIVE") {
		return NextResponse.redirect(new URL("/login?error=inactive", req.url));
	}

	// 3. Check role against route
	const matchedRoute = Object.keys(ROUTE_PERMISSIONS).find((route) =>
		pathname.startsWith(route),
	);

	if (matchedRoute) {
		const allowedRoles = ROUTE_PERMISSIONS[matchedRoute];
		if (!allowedRoles.includes(session.user.role)) {
			return NextResponse.redirect(new URL("/unauthorized", req.url));
		}
	}

	return NextResponse.next();
});

export const config = {
	matcher: ["/admin/:path*"],
};
