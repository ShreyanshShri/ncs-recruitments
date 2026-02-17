import { prisma } from "@/app/lib/prisma";
import { requireUser } from "@/app/lib/auth";
import { notFound } from "next/navigation";

export default async function ResultPage({
	params,
}: {
	params: Promise<{ domain: string; roundId: string }>;
}) {
	const { userId } = await requireUser();
	const { roundId } = await params;

	const round = await prisma.round.findUnique({
		where: { id: roundId },
	});

	if (!round) return notFound();

	// ⏳ Not published yet
	if (!round.isPublished) {
		return (
			<div className="max-w-3xl mx-auto py-10 text-center">
				<h1 className="text-2xl font-semibold">Results not published</h1>
				<p className="text-muted-foreground mt-2">
					Please wait until the results are announced.
				</p>
			</div>
		);
	}

	// ✅ Find MY submission (COMMON + DOMAIN)
	const mySubmission = await prisma.submission.findFirst({
		where: {
			roundId: round.id,
			OR: [{ userId }, { application: { userId } }],
		},
	});

	if (!mySubmission) return notFound();

	// ✅ Leaderboard
	const leaderboard = await prisma.submission.findMany({
		where: {
			roundId: round.id,
			score: { gte: round.cutoff ?? 0 },
		},
		orderBy: { score: "desc" },
		take: 50,
		include: {
			user: { select: { name: true } }, // COMMON
			application: {
				include: {
					user: { select: { name: true } }, // DOMAIN
				},
			},
		},
	});

	const qualified =
		round.cutoff !== null &&
		mySubmission.score !== null &&
		mySubmission.score >= round.cutoff;

	const getName = (s: (typeof leaderboard)[number]) =>
		s.application?.user?.name ?? s.user?.name ?? "—";

	return (
		<div className="max-w-4xl mx-auto py-10 space-y-8">
			{/* Header */}
			<div>
				<h1 className="text-2xl font-bold">{round.title} — Result</h1>
				<p className="text-muted-foreground">
					{round.scope === "COMMON" ? "Common" : round.domain} • Round{" "}
					{round.order}
				</p>
			</div>

			{/* My Result */}
			<div className="border rounded-xl p-5 space-y-2">
				<div className="text-lg font-semibold">Your Performance</div>

				<div>Score: {mySubmission.score ?? "—"}</div>
				<div>Cutoff: {round.cutoff}</div>

				<div
					className={
						qualified
							? "text-green-600 font-medium"
							: "text-red-600 font-medium"
					}
				>
					{qualified ? "Qualified for next round" : "Not qualified"}
				</div>
			</div>

			{/* Leaderboard */}
			<div>
				<h2 className="text-xl font-semibold mb-3">
					Qualified Candidates (Top 50)
				</h2>

				<div className="border rounded-lg overflow-hidden">
					<table className="w-full text-sm">
						<thead className="bg-muted">
							<tr>
								<th className="p-2 text-left">Rank</th>
								<th className="p-2 text-left">Name</th>
								<th className="p-2 text-left">Score</th>
							</tr>
						</thead>

						<tbody>
							{leaderboard.map((s, i) => (
								<tr key={s.id} className="border-t">
									<td className="p-2">{i + 1}</td>
									<td className="p-2">{getName(s)}</td>
									<td className="p-2">{s.score}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
