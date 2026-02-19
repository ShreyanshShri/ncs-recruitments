import { Application, Round, Domain } from "@/types/db";
import { prisma } from "@/app/lib/prisma";

export async function getDashboardData(userId: string) {
	const [applications, userProfile, user, submissions, notifications] =
		await prisma.$transaction([
			prisma.application.findMany({
				where: { userId },
				select: { domain: true },
			}),

			prisma.userProfile.findUnique({
				where: { userId },
				select: { year: true },
			}),

			prisma.user.findUnique({
				where: { id: userId },
				include: { profile: true },
			}),

			prisma.submission.findMany({
				where: { userId },
				select: {
					roundId: true,
					round: {
						select: {
							id: true,
							order: true,
							scope: true,
							domain: true,
						},
					},
				},
			}),

			// 🔔 notifications — filtered at DB level
			prisma.notification.findMany({
				where: {
					isActive: true,
					year: undefined, // placeholder, fixed below via dynamic filter
				},
				orderBy: { createdAt: "desc" },
			}),
		]);

	const domains = applications.map((a) => a.domain);
	const year = userProfile?.year;

	// --------------------------------------------------
	// 🎯 filter notifications properly (in-memory because
	// transaction results are already resolved)
	// --------------------------------------------------

	const filteredNotifications = notifications.filter((n) => {
		if (n.year !== year) return false;

		if (n.scope === "COMMON") return true;

		return n.domain && domains.includes(n.domain);
	});

	// --------------------------------------------------
	// all rounds relevant to the user
	// --------------------------------------------------

	const allRounds = await prisma.round.findMany({
		where: {
			year,
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

	// --------------------------------------------------
	// highest cleared order per track
	// --------------------------------------------------

	const clearedOrderByTrack = new Map<string, number>();

	for (const s of submissions) {
		const r = s.round;
		const key = r.scope === "COMMON" ? "COMMON" : `DOMAIN:${r.domain}`;
		const prev = clearedOrderByTrack.get(key) ?? 0;

		if (r.order > prev) {
			clearedOrderByTrack.set(key, r.order);
		}
	}

	// --------------------------------------------------
	// unlocked rounds
	// --------------------------------------------------

	const visibleRounds = allRounds.filter((r) => {
		const key = r.scope === "COMMON" ? "COMMON" : `DOMAIN:${r.domain}`;
		const cleared = clearedOrderByTrack.get(key) ?? 0;

		return r.order === 1 || cleared === r.order - 1;
	});

	// --------------------------------------------------
	// typing
	// --------------------------------------------------

	const typedApplications = applications as Application[];
	const typedRounds = visibleRounds as Round[];

	// --------------------------------------------------
	// available domains
	// --------------------------------------------------

	const appliedDomains = new Set(typedApplications.map((a) => a.domain));
	const allDomains = Object.values(Domain) as Domain[];
	const availableDomains = allDomains.filter((d) => !appliedDomains.has(d));

	// --------------------------------------------------
	// separate rounds
	// --------------------------------------------------

	const commonRounds = typedRounds.filter((r) => r.scope === "COMMON");

	const domainRounds = typedRounds.filter(
		(r): r is Round & { domain: Domain } =>
			r.scope === "DOMAIN" && r.domain !== null,
	);

	const roundsByDomain = Object.groupBy(
		domainRounds,
		(r) => r.domain,
	) as Record<Domain, Round[]>;

	// --------------------------------------------------
	// payload
	// --------------------------------------------------

	const payload = {
		applications,
		availableDomains,
		roundsByDomain,
		commonRounds,
		user,
		notifications: filteredNotifications,
	};

	return JSON.parse(JSON.stringify(payload));
}
