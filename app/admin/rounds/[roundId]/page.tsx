import { requireAdmin } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { notFound } from "next/navigation";
import { PublishMcqForm } from "@/components/admin/PublishMcqForm";
import { OfflineMarkingTable } from "@/components/admin/OfflineMarkingTable";
import { ResumeEvaluationTable } from "@/components/admin/ResumeEvaluationTable";
import LeaderboardTable from "@/components/admin/LeaderboardTable";

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
		orderBy: {
			score: {
				sort: "desc",
				nulls: "last",
			},
		},
		include: {
			user: true,
			application: {
				include: { user: true },
			},
		},
	});

	const promotionRounds = await prisma.round.findMany({
		where: {
			year: round.year,
			scope: round.scope,
			isPublished: false,
			id: { not: round.id },
		},
		orderBy: { order: "asc" },
		select: {
			id: true,
			title: true,
			order: true,
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
							promotionRounds={promotionRounds}
						/>
					</div>

					<LeaderboardTable submissions={submissions} />
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
							promotionRounds={promotionRounds}
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
							promotionRounds={promotionRounds}
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
