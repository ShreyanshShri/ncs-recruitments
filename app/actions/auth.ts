"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/app/lib/prisma";
import { createSession } from "@/app/lib/session";

type AuthState = {
	error?: string;
	success?: boolean;
	redirectTo?: string;
};

function isoDateToPassword(iso: string) {
	if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) {
		throw new Error("Invalid date format");
	}

	const [year, month, day] = iso.split("-");
	return `${day}${month}${year}`; // DDMMYYYY
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

			if (!email || !dob) return { error: "Missing required fields" };

			isoDateToPassword(dob); // validates format

			return { success: true };
		}

		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const rawDob = formData.get("password") as string;

		const rollNumber = formData.get("rollNumber") as string;
		const mobile = formData.get("mobile") as string;
		const linkedIn = formData.get("linkedIn") as string;
		const institution = formData.get("institution") as any;
		const year = formData.get("year") as any;
		const branch = formData.get("branch") as any;

		if (!email || !rawDob || !rollNumber || !mobile) {
			return { error: "Please fill all required fields" };
		}

		const password = isoDateToPassword(rawDob);

		const existing = await prisma.user.findUnique({ where: { email } });
		if (existing) return { error: "Email already in use" };

		const hashed = await bcrypt.hash(password, 10);

		const user = await prisma.user.create({
			data: {
				name,
				email,
				password: hashed,
				profile: {
					create: { rollNumber, mobile, institution, year, branch, linkedIn },
				},
			},
		});

		await createSession(user.id, user.role);

		return { success: true, redirectTo: "/dashboard" };
	} catch (e: any) {
		console.error(e);
		return { error: "Invalid date of birth" };
	}
}

export async function login(
	prevState: AuthState,
	formData: FormData,
): Promise<AuthState> {
	const email = formData.get("email") as string;
	const rawDob = formData.get("password") as string;

	if (!email || !rawDob) {
		return { error: "Missing fields" };
	}

	let password: string;

	try {
		password = isoDateToPassword(rawDob);
	} catch {
		return { error: "Invalid date of birth" };
	}

	const user = await prisma.user.findUnique({ where: { email } });

	if (!user || !user.password) {
		return { error: "Invalid email or password" };
	}

	const valid = await bcrypt.compare(password, user.password);

	if (!valid) {
		return { error: "Invalid email or password" };
	}

	await createSession(user.id, user.role);

	return {
		success: true,
		redirectTo: user.role === "ADMIN" ? "/admin" : "/dashboard",
	};
}
