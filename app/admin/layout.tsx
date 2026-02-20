// app/admin/layout.tsx

import Sidebar from "@/components/admin/Sidebar";
import { logout } from "@/app/lib/session";

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen bg-bg-base text-white font-sans">
			<header className="relative border-b border-white/20 px-6 py-4 max-h-16.25">
				<div className="flex items-center justify-between">
					<h1 className="text-lg tracking-widest font-bold opacity-75">
						NCS – Admin
					</h1>

					<form action={logout}>
						<button className="text-sm border border-white/15 px-3 py-1.5 rounded-lg hover:bg-white/10 transition">
							Logout
						</button>
					</form>
				</div>

				<div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent opacity-30" />
			</header>

			<div className="grid grid-cols-[240px_1fr]">
				<Sidebar />
				<main className="px-6 py-6 max-h-[calc(100vh-65px)] overflow-auto">
					{children}
				</main>
			</div>
		</div>
	);
}
