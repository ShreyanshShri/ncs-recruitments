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

		const result = await prisma.$transaction(async (tx) => {
			const firstOrder = (
				await tx.round.aggregate({
					_min: { order: true },
				})
			)._min.order;

			if (firstOrder === null) return { created: 0 };

			const rounds = await tx.round.findMany({
				where: { order: firstOrder },
			});

			let totalCreated = 0;

			for (const round of rounds) {
				// ✅ applications ONLY of this year
				const applications = await tx.application.findMany({
					where: {
						status: ApplicationStatus.SUBMITTED,
						user: {
							profile: {
								year: round.year,
							},
						},
					},
					select: { id: true, domain: true, userId: true },
				});

				const distinctUsers = [...new Set(applications.map((a) => a.userId))];

				const appsByDomain = new Map<Domain, string[]>();

				for (const app of applications) {
					if (!appsByDomain.has(app.domain)) appsByDomain.set(app.domain, []);
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

					totalCreated += res.count;
				}

				if (round.scope === "DOMAIN" && round.domain) {
					const targetAppIds = appsByDomain.get(round.domain) ?? [];

					const res = await tx.submission.createMany({
						data: targetAppIds.map((id) => ({
							applicationId: id,
							roundId: round.id,
						})),
						skipDuplicates: true,
					});

					totalCreated += res.count;
				}

				await tx.round.update({
					where: { id: round.id },
					data: { isActive: true },
				});
			}

			return { created: totalCreated };
		});

		return {
			success: true,
			message: "Initial rounds started",
			created: result.created,
		};
	} catch {
		return { success: false, message: "Failed to start rounds" };
	}
}

export type PublishState = {
	success: boolean;
	message: string;
};

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

			// 🟢 ONLY submissions of this YEAR
			const submissions = await tx.submission.findMany({
				where: {
					roundId,
					status: SubmissionStatus.EVALUATED,
					OR: [
						{
							application: {
								user: {
									profile: { year: round.year },
								},
							},
						},
						{
							user: {
								profile: { year: round.year },
							},
						},
					],
				},
				orderBy: { score: "desc" },
			});

			const qualified = submissions.slice(0, takeCount);
			const cutoff = qualified.at(-1)?.score ?? 0;

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

			if (nextCommonRound) {
				// DOMAIN → COMMON OR COMMON → COMMON

				let aliveUserIds: string[] = [];

				if (round.scope === "DOMAIN") {
					const aliveApps = await tx.application.findMany({
						where: {
							id: { in: qualified.map((q) => q.applicationId!) },
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
				// COMMON → DOMAIN OR DOMAIN → DOMAIN

				const nextDomainRounds = await tx.round.findMany({
					where: {
						order: nextOrder,
						scope: "DOMAIN",
						year: round.year,
					},
				});

				const domainRoundMap = new Map(
					nextDomainRounds.map((r) => [r.domain, r.id]),
				);

				let aliveApps: { id: string; domain: Domain }[] = [];

				if (round.scope === "COMMON") {
					aliveApps = await tx.application.findMany({
						where: {
							userId: { in: qualified.map((q) => q.userId!) },
							status: { not: ApplicationStatus.REJECTED },
							user: { profile: { year: round.year } },
						},
						select: { id: true, domain: true },
					});
				}

				if (round.scope === "DOMAIN") {
					aliveApps = await tx.application.findMany({
						where: {
							id: { in: qualified.map((q) => q.applicationId!) },
							status: { not: ApplicationStatus.REJECTED },
							user: { profile: { year: round.year } },
						},
						select: { id: true, domain: true },
					});
				}

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

		const raw = formData.get("data") as string;

		const parsed: {
			submissionId: string;
			sections: Record<string, number>;
		}[] = JSON.parse(raw);

		await prisma.$transaction(async (tx) => {
			for (const row of parsed) {
				const total = Object.values(row.sections).reduce(
					(a, b) => a + Number(b || 0),
					0,
				);

				await tx.submission.update({
					where: { id: row.submissionId },
					data: {
						responses: row.sections,
						score: total,
						status: SubmissionStatus.EVALUATED,
					},
				});
			}
		});

		return { success: true, message: "Marks saved" };
	} catch {
		return { success: false, message: "Failed to save marks" };
	}
}
