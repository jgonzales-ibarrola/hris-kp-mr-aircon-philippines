import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const users = await prisma.user.findMany({
			orderBy: { createdAt: "desc" },
		});

    return NextResponse.json({
      data: users,
      success: true,
    })
	} catch (error) {
		return NextResponse.json(error);
	}
}
