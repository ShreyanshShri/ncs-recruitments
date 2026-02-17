import { prisma } from "@/app/lib/prisma";

export async function getMcqRoundForUser({
	userId,
	domain,
	roundId,
}: {
	userId: string;
	domain: string;
	roundId: string;
}) {
	const application = await prisma.application.findUnique({
		where: { userId_domain: { userId, domain: domain as any } },
	});

	if (!application)
		return { error: "Application not found", status: "NOT_FOUND" };

	const round = await prisma.round.findUnique({
		where: { id: roundId },
		include: { questions: true },
	});

	if (!round || round.domain !== domain || round.type !== "MCQ") {
		return { error: "Round not found", status: "NOT_FOUND" };
	}

	const now = new Date();

	// Specific logic for timing
	if (!round.isActive)
		return { error: "This round is currently disabled.", status: "INACTIVE" };
	if (round.startTime && now < round.startTime)
		return { error: "This round hasn't started yet.", status: "TOO_EARLY" };
	if (round.endTime && now > round.endTime)
		return { error: "This round has already ended.", status: "COMPLETED" };

	let submission = await prisma.submission.findUnique({
		where: {
			applicationId_roundId: { applicationId: application.id, roundId },
		},
	});

	if (submission?.status === "SUBMITTED") {
		return {
			error: "You have already submitted this round.",
			status: "SUBMITTED",
		};
	}

	if (!submission) {
		submission = await prisma.submission.create({
			data: { applicationId: application.id, roundId, status: "STARTED" },
		});
	}

	return { round, submission, status: "SUCCESS" };
}
