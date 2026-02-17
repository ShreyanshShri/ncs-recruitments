import { Application, Round, Domain } from "@/types/db";
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
			OR: [
				{ scope: "COMMON" },
				{
					scope: "DOMAIN",
					domain: { in: domains },
				},
			],
		},
		orderBy: [{ order: "asc" }, { startTime: "asc" }],
	});

	const typedApplications = applications as unknown as Application[];
	const typedRounds = rounds as unknown as Round[];

	const appliedDomains = new Set(typedApplications.map((a) => a.domain));

	const allDomains = Object.values(Domain) as Domain[];
	const availableDomains = allDomains.filter((d) => !appliedDomains.has(d));

	// ✅ separate common rounds
	const commonRounds = typedRounds.filter((r) => r.scope === "COMMON");

	// ✅ group only domain rounds
	const domainRounds = typedRounds.filter(
		(r): r is Round & { domain: Domain } =>
			r.scope === "DOMAIN" && r.domain !== null,
	);

	const roundsByDomain = domainRounds.reduce((acc, r) => {
		if (!acc[r.domain]) {
			acc[r.domain] = [];
		}
		acc[r.domain].push(r);
		return acc;
	}, {} as Record<Domain, Round[]>);

	return {
		applications: typedApplications,
		availableDomains,
		roundsByDomain,
		commonRounds,
		user,
	};
}
