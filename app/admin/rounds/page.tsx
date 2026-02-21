import { requireAdmin } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import Link from "next/link";

export default async function RoundsAdminPage() {
	await requireAdmin();

	const rounds = await prisma.round.findMany({
		orderBy: [{ domain: "asc" }, { order: "asc" }, { createdAt: "asc" }],
		include: {
			_count: {
				select: { submissions: true },
			},
		},
	});

	return (
		<div className="">
			{/* Top actions */}
			<div className="flex gap-4">
				<Link href="/admin/rounds/create-round" className="btn">
					Create Round
				</Link>
				<Link href="/admin/rounds/markings" className="btn">
					Markings
				</Link>
			</div>

			{/* Rounds list */}
			<div className="grid gap-4 mt-4">
				{rounds.map((round) => (
					<Link
						key={round.id}
						href={`/admin/rounds/${round.id}`}
						className=" glass-card px-6 py-4"
					>
						<div className="flex justify-between items-center">
							<div>
								<div className="text-lg font-semibold">{round.title}</div>

								<div className="text-sm text-muted-foreground">
									{round.scope === "DOMAIN" ? round.domain : "COMMON"} • Round{" "}
									{round.order} • {round.type}
								</div>
							</div>

							<div className="text-right text-sm opacity-75">
								{/* <div>{round.isActive ? "🟢 Active" : "⚪ Inactive"}</div> */}
								<div>{round._count.submissions} participants</div>
							</div>
						</div>

						{(round.startTime || round.endTime) && (
							<div className="text-xs text-muted-foreground mt-2">
								{round.startTime?.toLocaleString()} →{" "}
								{round.endTime?.toLocaleString()}
							</div>
						)}
					</Link>
				))}

				{rounds.length === 0 && (
					<div className="text-muted-foreground text-sm">
						No rounds created yet.
					</div>
				)}
			</div>
		</div>
	);
}
