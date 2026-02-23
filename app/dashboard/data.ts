import { prisma } from "@/app/lib/prisma";
import { Round, Domain } from "@/types/db";
import { SubmissionStatus } from "@prisma/client";

export async function getDashboardData(userId: string) {
	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: {
			id: true,
			name: true,
			email: true,
			role: true,
			profile: {
				select: { year: true },
			},
		},
	});

	if (!user) {
		throw new Error("Invariant violated: user missing");
	}

	const year = user.profile?.year;

	if (!year) {
		return {
			user,
			notifications: [],
		};
	}

	const notifications = await prisma.notification.findMany({
		where: {
			isActive: true,
			year,
			OR: [
				{ scope: "COMMON" },

				// only if you truly need domain scoping
				{
					scope: "DOMAIN",
					domain: {
						in: (
							await prisma.application.findMany({
								where: { userId },
								select: { domain: true },
							})
						).map((a) => a.domain),
					},
				},
			],
		},
		orderBy: { createdAt: "desc" },
	});

	return {
		user,
		notifications,
	};
}

export async function getNotificationsData(userId: string) {
	const [profile, applications] = await Promise.all([
		prisma.userProfile.findUnique({
			where: { userId },
			select: { year: true },
		}),
		prisma.application.findMany({
			where: { userId },
			select: { domain: true },
		}),
	]);

	const year = profile?.year;

	if (!year) {
		return { notifications: [] };
	}

	const domains = applications.map((a) => a.domain);

	const notifications = await prisma.notification.findMany({
		where: {
			isActive: true,
			year,
			OR: [
				{ scope: "COMMON" },
				{
					scope: "DOMAIN",
					domain: { in: domains },
				},
			],
		},
		orderBy: { createdAt: "desc" },
	});

	return { notifications };
}

export async function getProfileData(userId: string) {
	return prisma.user.findUnique({
		where: { id: userId },
		include: { profile: true },
	});
}

export async function getApplicationsData(userId: string) {
	const applications = await prisma.application.findMany({
		where: { userId },
		select: {
			id: true,
			domain: true,
			status: true,
		},
		orderBy: { createdAt: "desc" },
	});

	const appliedDomains = new Set(applications.map((a) => a.domain));
	const allDomains = Object.values(Domain) as Domain[];

	const availableDomains = allDomains.filter((d) => !appliedDomains.has(d));

	return {
		applications,
		availableDomains,
	};
}

export type RoundWithStatus = Round & {
	submissionStatus: SubmissionStatus;
};

export async function getRoundsData(userId: string) {
	const [applications, profile, evaluatedSubmissions] = await Promise.all([
		prisma.application.findMany({
			where: { userId },
			select: { domain: true },
		}),

		prisma.userProfile.findUnique({
			where: { userId },
			select: { year: true },
		}),

		prisma.submission.findMany({
			where: {
				userId,
				status: SubmissionStatus.EVALUATED, // ✅ only what you actually use
			},
			select: {
				roundId: true,
				status: true,
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
	]);

	const domains = applications.map((a) => a.domain);
	const year = profile?.year;

	if (!year) {
		return {
			commonRounds: [],
			roundsByDomain: {},
			passedDomains: [],
			upcomingDomains: domains,
		};
	}

	const allRounds = await prisma.round.findMany({
		where: {
			year,
			OR: [{ scope: "COMMON" }, { scope: "DOMAIN", domain: { in: domains } }],
		},
		orderBy: [{ order: "asc" }, { startTime: "asc" }],
	});

	// -----------------------------
	// highest cleared order per track
	// -----------------------------
	const clearedOrderByTrack = new Map<string, number>();

	for (const s of evaluatedSubmissions) {
		const r = s.round;
		const key = r.scope === "COMMON" ? "COMMON" : `DOMAIN:${r.domain}`;

		clearedOrderByTrack.set(
			key,
			Math.max(clearedOrderByTrack.get(key) ?? 0, r.order),
		);
	}

	const passedDomains = domains.filter((d) => {
		const key = `DOMAIN:${d}`;
		return (clearedOrderByTrack.get(key) ?? 0) > 0;
	});

	const upcomingDomains = domains.filter((d) => !passedDomains.includes(d));

	// -----------------------------
	// unlocked rounds
	// -----------------------------
	const visibleRounds = allRounds.filter((r) => {
		const key = r.scope === "COMMON" ? "COMMON" : `DOMAIN:${r.domain}`;
		const cleared = clearedOrderByTrack.get(key) ?? 0;

		if (r.order === 1) {
			if (r.scope === "COMMON") return true;
			return domains.includes(r.domain as Domain);
		}

		return cleared === r.order - 1;
	});

	// -----------------------------
	// submission status map
	// -----------------------------
	const submissionStatusByRound = new Map<string, SubmissionStatus>();

	for (const s of evaluatedSubmissions) {
		submissionStatusByRound.set(s.roundId, s.status);
	}

	// -----------------------------
	// attach submission status
	// -----------------------------
	const roundsWithStatus: RoundWithStatus[] = visibleRounds.map((r) => ({
		...(r as Round),
		submissionStatus:
			submissionStatusByRound.get(r.id) ?? SubmissionStatus.NOT_STARTED,
	}));

	const commonRounds = roundsWithStatus.filter((r) => r.scope === "COMMON");

	const domainRounds = roundsWithStatus.filter(
		(r): r is RoundWithStatus & { domain: Domain } =>
			r.scope === "DOMAIN" && r.domain !== null,
	);

	const roundsByDomain = Object.groupBy(
		domainRounds,
		(r) => r.domain,
	) as Record<Domain, RoundWithStatus[]>;

	return {
		commonRounds,
		roundsByDomain,
		passedDomains,
		upcomingDomains,
	};
}
