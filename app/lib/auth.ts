import { getSession } from "./session";
import { redirect } from "next/navigation";

export async function requireUser() {
	const session = await getSession();
	if (!session) redirect("/auth/login");
	return session;
}

export async function requireAdmin() {
	const session = await getSession();
	if (!session || session.role !== "ADMIN") redirect("/");
	return session;
}

export async function getCurrentUser() {
	const session = await getSession();
	return session;
}
