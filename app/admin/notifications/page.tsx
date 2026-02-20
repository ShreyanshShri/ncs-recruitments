import Link from "next/link";
import { prisma } from "@/app/lib/prisma";
import { requireAdmin } from "@/app/lib/auth";

export default async function Page() {
	await requireAdmin();

	const notifications = await prisma.notification.findMany({
		orderBy: {
			createdAt: "desc",
		},
	});

	return (
		<div id="page" className="space-y-6">
			<Link
				href="/admin/notifications/create-notification"
				className="btn w-fit"
			>
				Add Notification
			</Link>

			<h1 className="text-xl font-semibold">All Notifications</h1>

			<div className="space-y-4">
				{notifications.length === 0 && (
					<p className="text-white/60">No notifications yet.</p>
				)}

				{notifications.map((n) => (
					<div key={n.id} className="glass-card p-5 space-y-3">
						{/* top row */}
						<div className="flex items-start justify-between gap-4">
							<h2 className="font-semibold text-white/85">{n.title}</h2>

							<span
								className="text-xs px-2.5 py-1 rounded-md
										 border border-white/15
										 bg-white/5 text-white/70 whitespace-nowrap"
							>
								{n.scope}
								{n.scope === "DOMAIN" && n.domain && ` • ${n.domain}`}
							</span>
						</div>

						{/* body */}
						<p className="text-sm text-white/60 whitespace-pre-line leading-relaxed">
							{n.body}
						</p>

						{/* meta */}
						<div className="flex flex-wrap gap-4 text-xs text-white/50">
							<span>Year: {n.year}</span>

							<span>{new Date(n.createdAt).toLocaleString()}</span>

							{!n.isActive && (
								<span className="font-medium text-red-400">Inactive</span>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
