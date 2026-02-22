import type { Metadata } from "next";
import { ReactNode } from "react";
import { requireUser } from "@/app/lib/auth";
import { getDashboardData } from "./data";
import DashboardShell from "@/components/dashboard/DashboardShell";

export const metadata: Metadata = {
	title: "Dashboard | NCS Recruitments",
	description: "Official website for NCS Recruitments",
};

export default async function DashboardLayout({
	children,
}: {
	children: ReactNode;
}) {
	const session = await requireUser();
	const data = await getDashboardData(session.userId);

	const { user, notifications } = data;

	const toasts = (notifications ?? []).map((n: any) => ({
		id: crypto.randomUUID(),
		title: n.title,
		body: n.body,
	}));

	return (
		<DashboardShell user={user} toasts={toasts}>
			{children}
		</DashboardShell>
	);
}
