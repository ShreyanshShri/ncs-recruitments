export default function NotificationsView({ data }: { data: any }) {
	const { notifications } = data;

	return (
		<div className="space-y-6 max-w-3xl">
			<h2 className="text-2xl font-shuriken text-primary-red">Notifications</h2>

			{notifications?.length === 0 && (
				<p className="text-beige/70">No notifications</p>
			)}

			<div className="space-y-4">
				{notifications?.map((n: any) => (
					<div
						key={n.id}
						className="rounded-2xl bg-bg-dark border border-border-red p-5 shadow-[0_0_20px_rgba(255,0,0,0.06)]"
					>
						<p className="font-shuriken text-primary-red text-sm mb-1">
							{n.title}
						</p>

						<p className="text-sm text-beige/80 whitespace-pre-line">
							{n.body}
						</p>

						<p className="text-xs text-beige/40 mt-3">
							{new Date(n.createdAt).toLocaleString()}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
