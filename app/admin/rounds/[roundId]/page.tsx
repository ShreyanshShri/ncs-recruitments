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
		<div className="max-w-5xl mx-auto py-10 space-y-6">
			{/* Round header */}
			<div>
				<h1 className="text-2xl font-bold">{round.title}</h1>
				<p className="text-sm text-muted-foreground">
					{round.domain} • Round {round.order} • {round.type}
				</p>
			</div>

			{/* ================= MCQ ================= */}
			{round.type === "MCQ" && (
				<div className="space-y-4">
					<PublishMcqForm
						roundId={round.id}
						totalSubmissions={submissions.length}
						isPublished={round.isPublished}
					/>

					<h2 className="text-xl font-semibold">Leaderboard</h2>

					<div className="border rounded-lg overflow-hidden">
						<table className="w-full text-sm">
							<thead className="bg-muted">
								<tr>
									<th className="p-2 text-left">Rank</th>
									<th className="p-2 text-left">Name</th>
									<th className="p-2 text-left">Email</th>
									<th className="p-2 text-left">Score</th>
									<th className="p-2 text-left">Status</th>
								</tr>
							</thead>

							<tbody>
								{submissions.map((s, i) => (
									<tr key={s.id} className="border-t">
										<td className="p-2">{i + 1}</td>
										<td className="p-2">
											{s.application?.user?.name ?? s.user?.name ?? "—"}
										</td>
										<td className="p-2">
											{s.application?.user?.email ?? s.user?.email ?? "—"}
										</td>
										<td className="p-2">{s.score ?? "-"}</td>
										<td className="p-2">{s.status}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}

			{/* ================= OFFLINE ================= */}
			{round.type === "OFFLINE" && (
				<div className="space-y-4">
					<PublishMcqForm
						roundId={round.id}
						totalSubmissions={submissions.length}
						isPublished={round.isPublished}
					/>
					<h2 className="text-xl font-semibold">Manual Evaluation</h2>
					<OfflineMarkingTable
						roundId={round.id}
						submissions={submissions}
						markingScheme={round.markingScheme}
					/>
				</div>
			)}

			{round.type === "RESUME" && (
				<div className="space-y-4">
					<PublishMcqForm
						roundId={round.id}
						totalSubmissions={submissions.length}
						isPublished={round.isPublished}
					/>

					<h2 className="text-xl font-semibold">Resume Evaluation</h2>

					<ResumeEvaluationTable submissions={submissions} />
				</div>
			)}
		</div>
	);
}
