"use client";

import { ReactNode, useState } from "react";
import { Menu, X } from "lucide-react";
import { logout } from "@/app/lib/session";
import ToastViewport from "@/components/common/ToastViewport";
import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardShell({
	user,
	toasts,
	children,
}: {
	user: any;
	toasts: { id: string; title: string; body: string }[];
	children: ReactNode;
}) {
	const [open, setOpen] = useState(false);

	return (
		<div className="h-screen flex flex-col text-beige bg-bg-dark">
			<ToastViewport initialToasts={toasts} />

			{/* TOPBAR */}
			<header className="h-16 flex items-center justify-between px-4 lg:px-6 border-b border-border-red shrink-0">
				<div className="flex items-center gap-3">
					{/* HAMBURGER */}
					<button
						onClick={() => setOpen(true)}
						className="lg:hidden p-2 rounded-md border border-border-red"
					>
						<Menu size={18} />
					</button>

					<h1 className="text-lg lg:text-xl font-shuriken">
						Welcome, <span className="text-primary-red">{user?.name}</span>
					</h1>
				</div>

				<form action={logout}>
					<button className="rounded-lg border border-border-red px-3 lg:px-4 py-1.5 text-sm font-shuriken hover:bg-primary-red transition">
						Logout
					</button>
				</form>
			</header>

			<div className="flex flex-1 overflow-hidden">
				{/* DESKTOP SIDEBAR */}
				<div className="hidden lg:block">
					<Sidebar />
				</div>

				{/* MOBILE SIDEBAR */}
				{open && (
					<>
						<div
							className="fixed inset-0 bg-black/60 z-40 lg:hidden"
							onClick={() => setOpen(false)}
						/>

						<div className="fixed inset-y-0 left-0 w-64 bg-bg-dark border-r border-border-red p-4 z-50 lg:hidden">
							<div className="flex justify-end mb-4">
								<button
									onClick={() => setOpen(false)}
									className="p-2 rounded-md border border-border-red"
								>
									<X size={18} />
								</button>
							</div>

							<Sidebar onNavigate={() => setOpen(false)} />
						</div>
					</>
				)}

				{/* CONTENT */}
				<main className="flex-1 overflow-y-auto bg-bg-dark/96 p-4 sm:p-6 lg:p-10">
					{children}
				</main>
			</div>
		</div>
	);
}
