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

	if (!round.isPublished) {
		return (
			<div className="min-h-screen bg-bg-dark text-beige flex items-center justify-center px-6">
				<div className="text-center space-y-3">
					<h1 className="text-3xl font-shuriken text-primary-red">
						Results not published
					</h1>
					<p className="text-light-beige">
						Please wait until the results are announced.
					</p>
				</div>
			</div>
		);
	}

	const mySubmission = await prisma.submission.findFirst({
		where: {
			roundId: round.id,
			OR: [{ userId }, { application: { userId } }],
		},
	});

	if (!mySubmission) return notFound();

	const leaderboard = await prisma.submission.findMany({
		where: {
			roundId: round.id,
			score: { gte: round.cutoff ?? 0 },
		},
		orderBy: { score: "desc" },
		take: 50,
		include: {
			user: { select: { name: true } },
			application: {
				include: { user: { select: { name: true } } },
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
		<div className="min-h-screen bg-bg-dark text-beige py-14 px-6">
			<div className="max-w-4xl mx-auto space-y-10">
				{/* Header */}
				<div className="space-y-2">
					<h1 className="text-4xl font-shuriken text-primary-red tracking-wide">
						{round.title} — Result
					</h1>

					<p className="text-light-beige">
						{round.scope === "COMMON" ? "Common" : round.domain} • Round{" "}
						{round.order}
					</p>
				</div>

				{/* My Result Card */}
				<div className="bg-light-beige text-bg-dark rounded-2xl p-6 border border-border-red shadow-lg space-y-3">
					<h2 className="text-2xl font-shuriken text-dark-red">
						Your Performance
					</h2>

					<div className="flex justify-between text-sm">
						<span>Score</span>
						<span className="font-semibold">{mySubmission.score ?? "—"}</span>
					</div>

					<div className="flex justify-between text-sm">
						<span>Cutoff</span>
						<span className="font-semibold">{round.cutoff}</span>
					</div>

					<div
						className={`pt-2 text-sm font-semibold ${
							qualified ? "text-green-700" : "text-primary-red"
						}`}
					>
						{qualified ? "Qualified for next round" : "Not qualified"}
					</div>
				</div>

				{/* Leaderboard */}
				<div className="space-y-4">
					<h2 className="text-2xl font-shuriken text-beige">
						Qualified Candidates (Top 50)
					</h2>

					<div className="rounded-xl overflow-hidden border border-border-red">
						<table className="w-full text-sm">
							<thead className="bg-deep-brown text-light-beige">
								<tr>
									<th className="p-3 text-left font-shuriken tracking-wide">
										Rank
									</th>
									<th className="p-3 text-left font-shuriken tracking-wide">
										Name
									</th>
									<th className="p-3 text-left font-shuriken tracking-wide">
										Score
									</th>
								</tr>
							</thead>

							<tbody>
								{leaderboard.map((s, i) => (
									<tr
										key={s.id}
										className="border-t border-border-red/40 hover:bg-deep-brown/40 transition"
									>
										<td className="p-3">{i + 1}</td>
										<td className="p-3">{getName(s)}</td>
										<td className="p-3 font-semibold text-light-beige">
											{s.score}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}
