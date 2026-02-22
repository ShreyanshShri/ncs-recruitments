import type { Metadata } from "next";
import { ReactNode } from "react";
import { requireUser } from "@/app/lib/auth";
import { getDashboardData } from "./data";
import { logout } from "@/app/lib/session";
import NavLink from "@/components/dashboard/NavLink";
import ToastViewport from "@/components/common/ToastViewport";

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
		<div className="h-screen flex flex-col text-beige">
			<ToastViewport initialToasts={toasts} />

			{/* TOPBAR */}
			<header className="h-16 flex items-center justify-between px-6 border-b border-border-red bg-bg-dark shrink-0">
				<h1 className="text-xl font-shuriken">
					Welcome, <span className="text-primary-red">{user?.name}</span>
				</h1>

				<form action={logout}>
					<button className="rounded-lg border border-border-red px-4 py-1.5 text-sm font-shuriken hover:bg-primary-red transition">
						Logout
					</button>
				</form>
			</header>

			<div className="flex flex-1 overflow-hidden">
				{/* SIDEBAR */}
				<aside className="w-64 bg-bg-dark border-r border-border-red p-4 space-y-3">
					<NavLink
						href="/dashboard/applications"
						segment="applications"
						label="Applications"
					/>
					<NavLink href="/dashboard/rounds" segment="rounds" label="Rounds" />
					<NavLink
						href="/dashboard/notifications"
						segment="notifications"
						label="Notifications"
					/>
					<NavLink
						href="/dashboard/profile"
						segment="profile"
						label="Profile"
					/>
				</aside>

				{/* CONTENT */}
				<main className="flex-1 overflow-y-auto bg-bg-dark/96 p-6 lg:p-10">
					{children}
				</main>
			</div>
		</div>
	);
}
