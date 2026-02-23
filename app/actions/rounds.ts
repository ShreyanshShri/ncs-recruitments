"use server";

import { prisma } from "@/app/lib/prisma";
import {
	Domain,
	RoundType,
	ApplicationStatus,
	SubmissionStatus,
	Year,
} from "@prisma/client";
import { requireAdmin } from "@/app/lib/auth";
import { FormState } from "@/components/admin/CreateRoundForm";
import { Prisma, Round } from "@prisma/client";

export async function createRound(
	_prevState: FormState,
	formData: FormData,
): Promise<FormState> {
	try {
		await requireAdmin();

		const scope = formData.get("scope") as "COMMON" | "DOMAIN";

		const domainRaw = formData.get("domain");
		const domain =
			scope === "DOMAIN" && domainRaw ? (domainRaw as Domain) : null;

		const year = formData.get("year") as Year;
		const type = formData.get("type") as RoundType;

		const title = formData.get("title")?.toString().trim();

		const order = Number(formData.get("order"));

		const startTime = formData.get("startTime")?.toString();
		const endTime = formData.get("endTime")?.toString();

		// 🔒 validation
		if (!scope || !type || !year || !title || Number.isNaN(order)) {
			return { success: false, error: "Missing required fields" };
		}

		if (scope === "DOMAIN" && !domain) {
			return { success: false, error: "Domain required for DOMAIN scope" };
		}

		await prisma.round.create({
			data: {
				scope,
				domain,
				year,
				type,
				title,
				order,
				startTime: startTime ? new Date(startTime) : null,
				endTime: endTime ? new Date(endTime) : null,
			},
		});

		return { success: true, error: null };
	} catch (e) {
		console.error(e);
		return { success: false, error: "Failed to create round" };
	}
}

export async function addMarkingScheme(roundId: string, scheme: any) {
	await requireAdmin();
	await prisma.round.update({
		where: { id: roundId },
		data: { markingScheme: scheme },
	});
}

export type StartRoundsState = {
	success: boolean;
	message: string;
	created?: number;
};

export async function startAllFirstRounds(
	_: StartRoundsState,
): Promise<StartRoundsState> {
	try {
		await requireAdmin();

		// 1️⃣ Get first order
		const firstOrder = (
			await prisma.round.aggregate({
				_min: { order: true },
			})
		)._min.order;

		if (firstOrder === null) {
			return {
				success: true,
				message: "No rounds found",
				created: 0,
			};
		}

		// 2️⃣ Get all first-order rounds
		const rounds = await prisma.round.findMany({
			where: { order: firstOrder },
			select: {
				id: true,
				scope: true,
				domain: true,
				year: true,
			},
		});

		const years = [...new Set(rounds.map((r) => r.year))];

		// 3️⃣ Fetch all relevant applications ONCE
		const applications = await prisma.application.findMany({
			where: {
				status: ApplicationStatus.SUBMITTED,
				user: {
					profile: {
						year: { in: years },
					},
				},
			},
			select: {
				id: true,
				domain: true,
				userId: true,
				user: {
					select: {
						profile: {
							select: { year: true },
						},
					},
				},
			},
		});

		// 4️⃣ Transaction → only writes
		const totalCreated = await prisma.$transaction(async (tx) => {
			let created = 0;

			for (const round of rounds) {
				// filter apps of this year (null-safe)
				const appsOfYear = applications.filter(
					(a) => a.user.profile?.year === round.year,
				);

				const distinctUsers = [...new Set(appsOfYear.map((a) => a.userId))];

				const appsByDomain = new Map<Domain, string[]>();

				for (const app of appsOfYear) {
					if (!appsByDomain.has(app.domain)) {
						appsByDomain.set(app.domain, []);
					}
					appsByDomain.get(app.domain)!.push(app.id);
				}

				if (round.scope === "COMMON") {
					const res = await tx.submission.createMany({
						data: distinctUsers.map((userId) => ({
							userId,
							roundId: round.id,
						})),
						skipDuplicates: true,
					});

					created += res.count;
				}

				if (round.scope === "DOMAIN" && round.domain) {
					const targetAppIds = appsByDomain.get(round.domain) ?? [];

					const res = await tx.submission.createMany({
						data: targetAppIds.map((applicationId) => ({
							applicationId,
							roundId: round.id,
						})),
						skipDuplicates: true,
					});

					created += res.count;
				}

				await tx.round.update({
					where: { id: round.id },
					data: { isActive: true },
				});
			}

			return created;
		});

		return {
			success: true,
			message: "Initial rounds started",
			created: totalCreated,
		};
	} catch (e) {
		console.error(e);
		return {
			success: false,
			message: "Failed to start rounds",
			created: 0,
		};
	}
}

export type PublishState = {
	success: boolean;
	message: string;
};

async function getRankedSubmissionsForPublish(
	tx: Prisma.TransactionClient,
	round: Round,
) {
	const baseWhere = {
		roundId: round.id,
		score: { not: null },
		OR: [
			{ application: { user: { profile: { year: round.year } } } },
			{ user: { profile: { year: round.year } } },
		],
	};

	if (round.type === "MCQ") {
		return tx.submission.findMany({
			where: {
				...baseWhere,
				status: {
					in: [SubmissionStatus.SUBMITTED, SubmissionStatus.EVALUATED],
				},
			},
			orderBy: { score: "desc" },
		});
	}

	// RESUME + OFFLINE → ONLY evaluated
	return tx.submission.findMany({
		where: {
			...baseWhere,
			status: SubmissionStatus.EVALUATED,
		},
		orderBy: { score: "desc" },
	});
}

export async function publishMcqRound(
	roundId: string,
	_prevState: PublishState,
	formData: FormData,
): Promise<PublishState> {
	try {
		await requireAdmin();

		const takeCount = Number(formData.get("takeCount"));
		if (!takeCount || takeCount <= 0) {
			return { success: false, message: "Invalid take count" };
		}

		return await prisma.$transaction(async (tx) => {
			const round = await tx.round.findUnique({ where: { id: roundId } });
			if (!round) return { success: false, message: "Invalid round" };

			// 🟢 ACCEPT SUBMITTED + EVALUATED
			// const submissions = await tx.submission.findMany({
			// 	where: {
			// 		roundId,
			// 		status: {
			// 			in: [SubmissionStatus.SUBMITTED, SubmissionStatus.EVALUATED],
			// 		},
			// 		OR: [
			// 			{
			// 				application: {
			// 					user: { profile: { year: round.year } },
			// 				},
			// 			},
			// 			{
			// 				user: {
			// 					profile: { year: round.year },
			// 				},
			// 			},
			// 		],
			// 	},
			// 	orderBy: { score: "desc" },
			// });
			const submissions = await getRankedSubmissionsForPublish(tx, round);

			if (round.type !== "MCQ" && submissions.length === 0) {
				return {
					success: false,
					message: "No evaluated submissions to publish",
				};
			}

			const qualified = submissions.slice(0, takeCount);
			const cutoff = qualified.at(-1)?.score ?? 0;

			// ✅ Upgrade qualified to EVALUATED
			if (qualified.length) {
				await tx.submission.updateMany({
					where: {
						id: { in: qualified.map((q) => q.id) },
						status: SubmissionStatus.SUBMITTED,
					},
					data: {
						status: SubmissionStatus.EVALUATED,
					},
				});
			}

			// =====================================================
			// ❌ REJECTION — YEAR SAFE
			// =====================================================

			if (round.scope === "DOMAIN") {
				const qualifiedAppIds = qualified.map((s) => s.applicationId!);

				await tx.application.updateMany({
					where: {
						domain: round.domain!,
						status: { not: ApplicationStatus.REJECTED },
						user: { profile: { year: round.year } },
						id: { notIn: qualifiedAppIds },
					},
					data: { status: ApplicationStatus.REJECTED },
				});
			}

			if (round.scope === "COMMON") {
				const qualifiedUserIds = new Set(qualified.map((s) => s.userId!));

				const rejectedUserIds = submissions
					.map((s) => s.userId!)
					.filter((id) => !qualifiedUserIds.has(id));

				await tx.application.updateMany({
					where: {
						userId: { in: rejectedUserIds },
						status: { not: ApplicationStatus.REJECTED },
						user: { profile: { year: round.year } },
					},
					data: { status: ApplicationStatus.REJECTED },
				});
			}

			// =====================================================
			// 🚀 PROMOTION
			// =====================================================

			const nextOrder = round.order + 1;

			const nextCommonRound = await tx.round.findFirst({
				where: {
					order: nextOrder,
					scope: "COMMON",
					year: round.year,
				},
			});

			console.log("Next Common Round: ", nextCommonRound);

			if (nextCommonRound) {
				let aliveUserIds: string[] = [];

				if (round.scope === "DOMAIN") {
					const aliveApps = await tx.application.findMany({
						where: {
							id: {
								in: qualified.map((q) => q.applicationId!),
							},
							status: { not: ApplicationStatus.REJECTED },
							user: { profile: { year: round.year } },
						},
						select: { userId: true },
						distinct: ["userId"],
					});

					aliveUserIds = aliveApps.map((a) => a.userId);
				}

				if (round.scope === "COMMON") {
					aliveUserIds = qualified.map((q) => q.userId!);
				}

				await tx.submission.createMany({
					data: aliveUserIds.map((userId) => ({
						userId,
						roundId: nextCommonRound.id,
					})),
					skipDuplicates: true,
				});
			} else {
				const nextDomainRounds = await tx.round.findMany({
					where: {
						order: nextOrder,
						scope: "DOMAIN",
						year: round.year,
					},
				});

				console.log("Next Domain Rounds", nextDomainRounds);

				const domainRoundMap = new Map(
					nextDomainRounds.map((r) => [r.domain, r.id]),
				);

				let aliveApps: { id: string; domain: Domain }[] = [];

				if (round.scope === "COMMON") {
					aliveApps = await tx.application.findMany({
						where: {
							userId: {
								in: qualified.map((q) => q.userId!),
							},
							status: { not: ApplicationStatus.REJECTED },
							user: { profile: { year: round.year } },
						},
						select: { id: true, domain: true },
					});
				}

				if (round.scope === "DOMAIN") {
					aliveApps = await tx.application.findMany({
						where: {
							id: {
								in: qualified.map((q) => q.applicationId!),
							},
							status: { not: ApplicationStatus.REJECTED },
							user: { profile: { year: round.year } },
						},
						select: { id: true, domain: true },
					});
				}

				console.log("Alive Apps: ", aliveApps);

				const data = aliveApps
					.map((app) => {
						const targetRoundId = domainRoundMap.get(app.domain);
						if (!targetRoundId) return null;

						return {
							applicationId: app.id,
							roundId: targetRoundId,
						};
					})
					.filter(Boolean) as any[];

				if (data.length) {
					await tx.submission.createMany({
						data,
						skipDuplicates: true,
					});
				}
			}

			// =====================================================
			// 📦 FINALIZE ROUND
			// =====================================================

			await tx.round.update({
				where: { id: roundId },
				data: {
					isPublished: true,
					publishedAt: new Date(),
					cutoff,
				},
			});

			return {
				success: true,
				message: `Published. Promoted ${qualified.length}. Cutoff = ${cutoff}`,
			};
		});
	} catch (e) {
		console.error(e);
		return { success: false, message: "Failed to publish results" };
	}
}

export type OfflineSaveState = {
	success: boolean;
	message: string;
};

export async function saveOfflineMarks(
	roundId: string,
	_prev: OfflineSaveState,
	formData: FormData,
): Promise<OfflineSaveState> {
	try {
		await requireAdmin();

		const submissionId = formData.get("submissionId") as string;
		const raw = formData.get("sections") as string;

		const sections: Record<string, number> = JSON.parse(raw);

		const total = Object.values(sections).reduce(
			(a, b) => a + Number(b || 0),
			0,
		);

		await prisma.submission.update({
			where: { id: submissionId },
			data: {
				responses: sections,
				score: total,
				status: SubmissionStatus.EVALUATED,
			},
		});

		return { success: true, message: "Saved" };
	} catch (e: any) {
		console.error(e);
		return { success: false, message: "Failed to save marks" };
	}
}
