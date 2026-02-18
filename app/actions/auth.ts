"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/app/lib/prisma";
import { createSession } from "@/app/lib/session";
import { redirect } from "next/navigation";

type AuthState = {
	error?: string;
	success?: boolean;
	redirectTo?: string;
};

function dobToPassword(dob: string) {
	const [year, month, day] = dob.split("-");
	return `${day}${month}${year}`;
}

export async function signup(
	prevState: AuthState,
	formData: FormData,
): Promise<AuthState> {
	try {
		const step = formData.get("step");

		if (step === "step1") {
			const email = formData.get("email") as string;
			const dob = formData.get("password") as string;

			if (!email || !dob) {
				return { error: "Missing required fields" };
			}

			return { success: true };
		}

		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const rawDob = formData.get("password") as string;

		const rollNumber = formData.get("rollNumber") as string;
		const mobile = formData.get("mobile") as string;
		const institution = formData.get("institution") as any;
		const year = formData.get("year") as any;
		const branch = formData.get("branch") as any;

		if (!email || !rawDob || !rollNumber || !mobile) {
			return { error: "Please fill all required fields" };
		}

		const password = dobToPassword(rawDob);

		const existing = await prisma.user.findUnique({ where: { email } });
		if (existing) return { error: "Email already in use" };

		const hashed = await bcrypt.hash(password, 10);

		const user = await prisma.user.create({
			data: {
				name,
				email,
				password: hashed,
				profile: {
					create: { rollNumber, mobile, institution, year, branch },
				},
			},
		});

		await createSession(user.id, user.role);

		return { success: true, redirectTo: "/dashboard" };
	} catch (error) {
		console.error("Signup error:", error);
		return { error: "Something went wrong. Please try again." };
	}
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
