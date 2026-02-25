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
// import { Prisma, Round } from "@prisma/client";

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

export async function publishRound(
	roundId: string,
	_prev: PublishState,
	formData: FormData,
): Promise<PublishState> {
	try {
		await requireAdmin();

		const takeCount = Number(formData.get("takeCount"));
		const promoteToRoundId = formData.get("promoteToRoundId") as string | null;

		if (!takeCount || takeCount <= 0) {
			return { success: false, message: "Invalid take count" };
		}

		return await prisma.$transaction(async (tx) => {
			const round = await tx.round.findUnique({ where: { id: roundId } });
			if (!round) return { success: false, message: "Round not found" };

			// 🎯 ranked submissions (deterministic)
			const yearFilter =
				round.scope === "DOMAIN"
					? { application: { user: { profile: { year: round.year } } } }
					: { user: { profile: { year: round.year } } };

			const statusFilter =
				round.type === "MCQ"
					? {
							status: {
								in: [SubmissionStatus.SUBMITTED, SubmissionStatus.EVALUATED],
							},
						}
					: { status: SubmissionStatus.EVALUATED };

			const submissions = await tx.submission.findMany({
				where: {
					roundId,
					score: { not: null },
					...yearFilter,
					...statusFilter,
				},
				orderBy: [{ score: "desc" }, { createdAt: "asc" }],
			});

			if (!submissions.length) {
				return { success: false, message: "No evaluated submissions" };
			}

			const qualified = submissions.slice(0, takeCount);
			const cutoff = qualified.at(-1)?.score ?? 0;

			// ✅ MCQ auto-upgrade
			if (round.type === "MCQ") {
				await tx.submission.updateMany({
					where: {
						id: { in: qualified.map((q) => q.id) },
						status: "SUBMITTED",
					},
					data: { status: "EVALUATED" },
				});
			}

			// ❌ REJECT NON-QUALIFIED
			if (round.scope === "DOMAIN") {
				await tx.application.updateMany({
					where: {
						domain: round.domain!,
						user: { profile: { year: round.year } },
						status: { not: "REJECTED" },
						id: { notIn: qualified.map((q) => q.applicationId!) },
					},
					data: { status: "REJECTED" },
				});
			}

			if (round.scope === "COMMON") {
				const rejectedUserIds = submissions
					.map((s) => s.userId!)
					.filter((id) => !qualified.some((q) => q.userId === id));

				await tx.application.updateMany({
					where: {
						userId: { in: rejectedUserIds },
						user: { profile: { year: round.year } },
						status: { not: "REJECTED" },
					},
					data: { status: "REJECTED" },
				});
			}

			// 🚀 PROMOTION (explicit target)
			if (promoteToRoundId) {
				const targetRound = await tx.round.findUnique({
					where: { id: promoteToRoundId },
					select: { scope: true, year: true },
				});

				if (!targetRound || targetRound.year !== round.year) {
					throw new Error("Invalid promotion round");
				}

				if (targetRound.scope !== round.scope) {
					throw new Error("Scope mismatch");
				}

				const data =
					round.scope === "COMMON"
						? qualified.map((q) => ({
								userId: q.userId!,
								roundId: promoteToRoundId,
							}))
						: qualified.map((q) => ({
								applicationId: q.applicationId!,
								roundId: promoteToRoundId,
							}));

				await tx.submission.createMany({
					data,
					skipDuplicates: true,
				});
			}

			// 📦 FINALIZE
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
		return { success: false, message: "Failed to publish" };
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
