"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/app/lib/prisma";
import { createSession } from "@/app/lib/session";
import { redirect } from "next/navigation";

type AuthState = {
	error?: string;
};

export async function signup(
	prevState: AuthState,
	formData: FormData,
): Promise<AuthState> {
	const name = formData.get("name") as string;
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	if (!email || !password) {
		return { error: "Missing fields" };
	}

	const existing = await prisma.user.findUnique({ where: { email } });

	if (existing) {
		return { error: "Email already in use" };
	}

	const hashed = await bcrypt.hash(password, 10);

	const user = await prisma.user.create({
		data: { name, email, password: hashed },
	});

	await createSession(user.id, user.role);

	redirect("/dashboard");
}

// Updated login action
export async function login(
	prevState: AuthState, // Add prevState
	formData: FormData,
): Promise<AuthState> {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	if (!email || !password) {
		return { error: "Missing fields" };
	}

	const user = await prisma.user.findUnique({ where: { email } });

	// Using a generic error message for security (don't reveal if email exists)
	if (!user || !user.password) {
		return { error: "Invalid email or password" };
	}

	const valid = await bcrypt.compare(password, user.password);
	if (!valid) {
		return { error: "Invalid email or password" };
	}

	await createSession(user.id, user.role);

	if (user.role === "USER") {
		redirect("/dashboard");
	} else {
		redirect("/admin");
	}
}
