import { prisma } from "@/app/lib/prisma";

export async function getAdminStats() {
	const [
		totalUsers,
		totalApplications,
		totalRounds,

		activeRounds,
		completedRounds,

		domainApplications,

		submissionEvaluated,
		submissionPending,

		registrationsByDay,
	] = await Promise.all([
		prisma.user.count({ where: { role: "USER" } }),

		prisma.application.count(),

		prisma.round.count(),

		prisma.round.count({ where: { isActive: true } }),

		prisma.round.count({ where: { isPublished: true } }),

		prisma.application.groupBy({
			by: ["domain"],
			_count: true,
		}),

		prisma.submission.count({
			where: { status: "EVALUATED" },
		}),

		prisma.submission.count({
			where: { status: "SUBMITTED" },
		}),

		prisma.user.groupBy({
			by: ["createdAt"],
			_count: true,
			orderBy: { createdAt: "asc" },
		}),
	]);

	return {
		totalUsers,
		totalApplications,
		totalRounds,
		activeRounds,
		completedRounds,
		domainApplications,

		evaluatedSubmissions: submissionEvaluated,
		pendingEvaluations: submissionPending,

		registrationsByDay,
	};
}
