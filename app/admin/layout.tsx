"use client";

import { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import { logout } from "@/app/lib/session";
import { Menu, X } from "lucide-react";

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [open, setOpen] = useState(false);

	return (
		<div className="min-h-screen bg-bg-base text-white font-sans">
			{/* HEADER */}
			<header className="relative border-b border-white/20 px-4 md:px-6 py-4 h-16 flex items-center">
				<div className="flex items-center justify-between w-full">
					<div className="flex items-center gap-3">
						{/* HAMBURGER (mobile only) */}
						<button
							onClick={() => setOpen(true)}
							className="md:hidden p-2 rounded-lg hover:bg-white/10 transition"
						>
							<Menu size={18} />
						</button>

						<h1 className="text-lg tracking-widest font-bold opacity-75">
							NCS – Admin
						</h1>
					</div>

					<form action={logout}>
						<button className="text-sm border border-white/15 px-3 py-1.5 rounded-lg hover:bg-white/10 transition">
							Logout
						</button>
					</form>
				</div>

				<div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent opacity-30" />
			</header>

			{/* BODY */}
			<div className="md:grid md:grid-cols-[240px_1fr]">
				{/* DESKTOP SIDEBAR */}
				<div className="hidden md:block">
					<Sidebar />
				</div>

				{/* MOBILE SIDEBAR */}
				<div
					className={`fixed inset-0 z-50 md:hidden transition ${
						open ? "visible" : "invisible"
					}`}
				>
					{/* backdrop */}
					<div
						onClick={() => setOpen(false)}
						className={`absolute inset-0 bg-black/50 transition-opacity ${
							open ? "opacity-100" : "opacity-0"
						}`}
					/>

					{/* drawer */}
					<div
						className={`absolute left-0 top-0 h-full w-64 bg-bg-base border-r border-white/20 transform transition-transform ${
							open ? "translate-x-0" : "-translate-x-full"
						}`}
					>
						<div className="flex justify-end p-4">
							<button
								onClick={() => setOpen(false)}
								className="p-2 rounded-lg hover:bg-white/10"
							>
								<X size={18} />
							</button>
						</div>

						<Sidebar />
					</div>
				</div>

				{/* MAIN */}
				<main className="px-4 md:px-6 py-6 md:max-h-[calc(100vh-65px)] overflow-auto">
					{children}
				</main>
			</div>
		</div>
	);
}
