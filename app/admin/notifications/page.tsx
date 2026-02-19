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
			<Link href="/admin/notifications/create-notification" className="btn">
				Add Notification
			</Link>

			<h1 className="text-xl font-semibold">All Notifications</h1>

			<div className="space-y-4">
				{notifications.length === 0 && (
					<p className="text-muted-foreground">No notifications yet.</p>
				)}

				{notifications.map((n) => (
					<div
						key={n.id}
						className="border rounded-lg p-4 space-y-2 bg-bg-dark/40"
					>
						<div className="flex items-center justify-between">
							<h2 className="font-semibold">{n.title}</h2>

							<span className="text-xs px-2 py-1 rounded border">
								{n.scope}
								{n.scope === "DOMAIN" && n.domain && ` • ${n.domain}`}
							</span>
						</div>

						<p className="text-sm text-muted-foreground whitespace-pre-line">
							{n.body}
						</p>

						<div className="text-xs text-muted-foreground flex gap-4">
							<span>Year: {n.year}</span>
							<span>{new Date(n.createdAt).toLocaleString()}</span>
							{!n.isActive && (
								<span className="text-red-500 font-medium">Inactive</span>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
