import { requireAdmin } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { notFound } from "next/navigation";
import { PublishMcqForm } from "@/components/admin/PublishMcqForm";
import { OfflineMarkingTable } from "@/components/admin/OfflineMarkingTable";
import { ResumeEvaluationTable } from "@/components/admin/ResumeEvaluationTable";

export default async function RoundPage({
	params,
}: {
	params: Promise<{ roundId: string }>;
}) {
	await requireAdmin();
	const resolvedParams = await params;
	const roundId = resolvedParams.roundId;

	const round = await prisma.round.findUnique({
		where: { id: roundId },
	});

	if (!round) return notFound();

	const submissions = await prisma.submission.findMany({
		where: { roundId: round.id },
		orderBy: { score: "desc" },
		include: {
			user: true,
			application: {
				include: { user: true },
			},
		},
	});

	return (
		<div className="">
			{/* Round header */}
			<div className="glass-card p-6 mb-4">
				<h1 className="text-2xl font-semibold">{round.title}</h1>

				<p className="mt-1 text-sm text-white/60">
					{round.domain} • Round {round.order} • {round.type}
				</p>
			</div>

			{/* ================= MCQ ================= */}
			{round.type === "MCQ" && (
				<div className="space-y-4">
					<div className="glass-card p-5">
						<PublishMcqForm
							roundId={round.id}
							totalSubmissions={submissions.length}
							isPublished={round.isPublished}
						/>
					</div>

					<div className="glass-card p-5 space-y-4">
						<h2 className="text-lg font-semibold">Leaderboard</h2>

						<div className="overflow-hidden rounded-xl border border-glass-border-soft">
							<table className="w-full text-sm">
								<thead className="bg-white/5 text-white/70">
									<tr>
										<th className="p-3 text-left font-medium">Rank</th>
										<th className="p-3 text-left font-medium">Name</th>
										<th className="p-3 text-left font-medium">Email</th>
										<th className="p-3 text-left font-medium">Score</th>
										<th className="p-3 text-left font-medium">Status</th>
									</tr>
								</thead>

								<tbody>
									{submissions.map((s, i) => (
										<tr
											key={s.id}
											className="border-t border-white/5 hover:bg-white/4 transition-colors"
										>
											<td className="p-3">{i + 1}</td>

											<td className="p-3">
												{s.application?.user?.name ?? s.user?.name ?? "—"}
											</td>

											<td className="p-3 text-white/60">
												{s.application?.user?.email ?? s.user?.email ?? "—"}
											</td>

											<td className="p-3 font-medium">{s.score ?? "-"}</td>

											<td className="p-3 text-white/70">{s.status}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			)}

			{/* ================= OFFLINE ================= */}
			{round.type === "OFFLINE" && (
				<div className="space-y-4">
					<div className="glass-card p-5">
						<PublishMcqForm
							roundId={round.id}
							totalSubmissions={submissions.length}
							isPublished={round.isPublished}
						/>
					</div>

					<div className="glass-card p-5 space-y-4">
						<h2 className="text-lg font-semibold">Manual Evaluation</h2>

						<OfflineMarkingTable
							roundId={round.id}
							submissions={submissions}
							markingScheme={round.markingScheme}
						/>
					</div>
				</div>
			)}

			{/* ================= RESUME ================= */}
			{round.type === "RESUME" && (
				<div className="space-y-4">
					<div className="glass-card p-5">
						<PublishMcqForm
							roundId={round.id}
							totalSubmissions={submissions.length}
							isPublished={round.isPublished}
						/>
					</div>

					<div className="glass-card p-5 space-y-4">
						<h2 className="text-lg font-semibold">Resume Evaluation</h2>

						<ResumeEvaluationTable submissions={submissions} />
					</div>
				</div>
			)}
		</div>
	);
}
