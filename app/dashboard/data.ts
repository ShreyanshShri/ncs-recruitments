import { Application, Round, Domain } from "@/types/db"; // Your shared types
import { prisma } from "@/app/lib/prisma";

export async function getDashboardData(userId: string) {
	const [applications, user] = await prisma.$transaction([
		prisma.application.findMany({
			where: { userId },
			select: { domain: true },
		}),

		prisma.user.findUnique({
			where: { id: userId },
		}),
	]);

	const domains = applications.map((a) => a.domain);

	const rounds = await prisma.round.findMany({
		where: {
			domain: { in: domains },
		},
		orderBy: { startTime: "asc" },
	});

	// Cast the Prisma results to your shared interface types
	const typedApplications = applications as unknown as Application[];
	const typedRounds = rounds as unknown as Round[];

	const appliedDomains = new Set(typedApplications.map((a) => a.domain));

	// Use your shared Domain enum for the "All" list
	const allDomains = Object.values(Domain) as Domain[];

	const availableDomains = allDomains.filter((d) => !appliedDomains.has(d));

	// Ensure the grouped object knows it's holding your shared Round type
	const roundsByDomain = Object.groupBy(typedRounds, (r) => r.domain) as Record<
		Domain,
		Round[]
	>;

	return {
		applications: typedApplications,
		availableDomains,
		roundsByDomain,
		user,
	};
}
