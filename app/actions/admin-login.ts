"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/app/lib/prisma";
import { createSession } from "@/app/lib/session";

type AuthState = {
	error?: string;
	success?: boolean;
	redirectTo?: string;
};

export async function login(
	prevState: AuthState,
	formData: FormData,
): Promise<AuthState> {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	if (!email || !password) {
		return { error: "Missing fields" };
	}

	const user = await prisma.user.findUnique({ where: { email } });

	if (!user || !user.password) {
		return { error: "Invalid email or password" };
	}

	// 🔒 Admin-only guard
	if (user.role !== "ADMIN") {
		return { error: "Unauthorized access" };
	}

	const valid = await bcrypt.compare(password, user.password);

	if (!valid) {
		return { error: "Invalid email or password" };
	}

	await createSession(user.id, user.role);

	return {
		success: true,
		redirectTo: "/admin",
	};
}
