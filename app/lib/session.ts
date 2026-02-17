"use server";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secret = process.env.JWT_SECRET || "default_secret_key_for_development_only";
const key = new TextEncoder().encode(secret);

export async function createSession(userId: string, role: string) {
	const token = await new SignJWT({ userId, role })
		.setProtectedHeader({ alg: "HS256" })
		.setExpirationTime("7d")
		.sign(key);

	(await cookies()).set("session", token, {
		httpOnly: true,
		secure: true,
		path: "/",
	});
}

export async function getSession() {
	const token = (await cookies()).get("session")?.value;
	if (!token) return null;

	try {
		const { payload } = await jwtVerify(token, key);
		return payload as { userId: string; role: string };
	} catch (error) {
		return null;
	}
}

export async function logout() {
	(await cookies()).delete("session");
}
