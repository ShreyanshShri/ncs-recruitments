import { prisma } from "@/app/lib/prisma";

export async function getMcqRoundForUser({
	userId,
	roundId,
}: {
	userId: string;
	roundId: string;
}) {
	const submission = await prisma.submission.findFirst({
		where: {
			roundId,
			OR: [
				{ userId },
				{
					application: {
						userId,
					},
				},
			],
		},
		include: {
			round: {
				include: { questions: true },
			},
		},
	});

	if (!submission) {
		return {
			error: "You are not eligible for this round.",
			status: "NOT_FOUND",
		};
	}

	const { round } = submission;

	if (round.type !== "MCQ") {
		return { error: "Round not found", status: "NOT_FOUND" };
	}

	const now = new Date();

	if (!round.isActive)
		return { error: "This round is currently disabled.", status: "INACTIVE" };

	if (round.startTime && now < round.startTime)
		return { error: "This round hasn't started yet.", status: "TOO_EARLY" };

	if (round.endTime && now > round.endTime)
		return { error: "This round has already ended.", status: "COMPLETED" };

	if (submission.status === "SUBMITTED") {
		return {
			error: "You have already submitted this round.",
			status: "SUBMITTED",
		};
	}

	// optional: mark started when user opens
	if (submission.status === "NOT_STARTED") {
		await prisma.submission.update({
			where: { id: submission.id },
			data: { status: "STARTED" },
		});

		submission.status = "STARTED";
	}

	return { round, submission, status: "SUCCESS" };
}
