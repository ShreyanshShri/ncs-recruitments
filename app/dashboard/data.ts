import { prisma } from "@/app/lib/prisma";
import { Application, Round, Domain } from "@/types/db";
import { SubmissionStatus } from "@prisma/client";

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

			prisma.notification.findMany({
				where: { isActive: true },
				orderBy: { createdAt: "desc" },
			}),
		]);

	const domains = applications.map((a) => a.domain);
	const year = userProfile?.year;

	// -----------------------------
	// 🔔 notification filter
	// -----------------------------
	const filteredNotifications = notifications.filter((n) => {
		if (n.year !== year) return false;
		if (n.scope === "COMMON") return true;
		return n.domain && domains.includes(n.domain);
	});

	// -----------------------------
	// all relevant rounds
	// -----------------------------
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

	// -----------------------------
	// highest cleared order per track
	// -----------------------------
	const clearedOrderByTrack = new Map<string, number>();
	const passedDomains = domains.filter((d) => {
		const key = `DOMAIN:${d}`;
		return (clearedOrderByTrack.get(key) ?? 0) > 0;
	});

	const upcomingDomains = domains.filter((d) => !passedDomains.includes(d));

	for (const s of submissions) {
		if (s.status !== SubmissionStatus.EVALUATED) continue;
		const r = s.round;
		const key = r.scope === "COMMON" ? "COMMON" : `DOMAIN:${r.domain}`;
		const prev = clearedOrderByTrack.get(key) ?? 0;

		if (r.order > prev) {
			clearedOrderByTrack.set(key, r.order);
		}
	}

	// -----------------------------
	// unlocked rounds
	// -----------------------------
	const visibleRounds = allRounds.filter((r) => {
		const key = r.scope === "COMMON" ? "COMMON" : `DOMAIN:${r.domain}`;
		const cleared = clearedOrderByTrack.get(key) ?? 0;

		// return r.order === 1 || cleared === r.order - 1;
		// allow first round always if relevant to user
		if (r.order === 1) {
			if (r.scope === "COMMON") return true;
			return domains.includes(r.domain as Domain);
		}

		// const key = r.scope === "COMMON" ? "COMMON" : `DOMAIN:${r.domain}`;
		// const cleared = clearedOrderByTrack.get(key) ?? 0;

		// next unlocked round
		return cleared === r.order - 1;
	});

	// -----------------------------
	// 🧠 submission status map
	// -----------------------------
	const submissionStatusByRound = new Map<string, SubmissionStatus>();

	for (const s of submissions) {
		submissionStatusByRound.set(s.roundId, s.status);
	}

	// -----------------------------
	// attach status to rounds
	// -----------------------------
	const roundsWithStatus: RoundWithStatus[] = visibleRounds.map((r) => ({
		...(r as Round),
		submissionStatus:
			submissionStatusByRound.get(r.id) ?? SubmissionStatus.NOT_STARTED,
	}));

	// -----------------------------
	// available domains
	// -----------------------------
	const appliedDomains = new Set(applications.map((a) => a.domain));
	const allDomains = Object.values(Domain) as Domain[];

	const availableDomains = allDomains.filter((d) => !appliedDomains.has(d));

	// -----------------------------
	// separate rounds
	// -----------------------------
	const commonRounds = roundsWithStatus.filter((r) => r.scope === "COMMON");

	const domainRounds = roundsWithStatus.filter(
		(r): r is RoundWithStatus & { domain: Domain } =>
			r.scope === "DOMAIN" && r.domain !== null,
	);

	const roundsByDomain = Object.groupBy(
		domainRounds,
		(r) => r.domain,
	) as Record<Domain, RoundWithStatus[]>;

	// -----------------------------
	// payload
	// -----------------------------
	const payload = {
		applications: applications as Application[],
		availableDomains,
		roundsByDomain,
		commonRounds,
		user,
		notifications: filteredNotifications,
		passedDomains,
		upcomingDomains,
	};

	return JSON.parse(JSON.stringify(payload));
}

export async function getNotificationsData(userId: string) {
	const [profile, applications, notifications] = await Promise.all([
		prisma.userProfile.findUnique({
			where: { userId },
			select: { year: true },
		}),
		prisma.application.findMany({
			where: { userId },
			select: { domain: true },
		}),
		prisma.notification.findMany({
			where: { isActive: true },
			orderBy: { createdAt: "desc" },
		}),
	]);

	const domains = applications.map((a) => a.domain);
	const year = profile?.year;

	const filtered = notifications.filter((n) => {
		if (n.year !== year) return false;
		if (n.scope === "COMMON") return true;
		return n.domain && domains.includes(n.domain);
	});

	return { notifications: filtered };
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
	// -----------------------------
	// core user context
	// -----------------------------
	const [applications, profile, submissions] = await Promise.all([
		prisma.application.findMany({
			where: { userId },
			select: { domain: true },
		}),

		prisma.userProfile.findUnique({
			where: { userId },
			select: { year: true },
		}),

		prisma.submission.findMany({
			where: { userId },
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

	// -----------------------------
	// relevant rounds
	// -----------------------------
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

	// -----------------------------
	// highest cleared order per track
	// -----------------------------
	const clearedOrderByTrack = new Map<string, number>();

	for (const s of submissions) {
		if (s.status !== SubmissionStatus.EVALUATED) continue;

		const r = s.round;
		const key = r.scope === "COMMON" ? "COMMON" : `DOMAIN:${r.domain}`;

		const prev = clearedOrderByTrack.get(key) ?? 0;

		if (r.order > prev) {
			clearedOrderByTrack.set(key, r.order);
		}
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

		// first round always visible if relevant
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

	for (const s of submissions) {
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

	// -----------------------------
	// separate common / domain
	// -----------------------------
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
