"use server";

import { prisma } from "@/app/lib/prisma";
import {
	Domain,
	RoundType,
	ApplicationStatus,
	SubmissionStatus,
} from "@prisma/client";
import { requireAdmin } from "@/app/lib/auth";
import { FormState } from "@/components/admin/CreateRoundForm";

export async function createRound(
	_prevState: FormState,
	formData: FormData,
): Promise<FormState> {
	try {
		await requireAdmin();

		const domain = formData.get("domain") as Domain;
		const type = formData.get("type") as RoundType;
		const title = formData.get("title") as string;
		const order = (formData.get("order") as unknown as number) || 0;

		const startTime = formData.get("startTime") as string;
		const endTime = formData.get("endTime") as string;

		await prisma.round.create({
			data: {
				domain,
				type,
				title,
				startTime: startTime ? new Date(startTime) : null,
				endTime: endTime ? new Date(endTime) : null,
				order: parseInt(order.toString()),
			},
		});

		return { success: true, error: null };
	} catch (e) {
		console.error(e);
		return { error: "Failed to create round", success: false };
	}
}

export async function addMarkingScheme(roundId: string, scheme: any) {
	await requireAdmin();
	await prisma.round.update({
		where: { id: roundId },
		data: {
			markingScheme: scheme,
		},
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
			// 1️⃣ get all round-1s
			const roundOnes = await tx.round.findMany({
				where: { order: 1 },
				select: { id: true, domain: true },
			});

			if (roundOnes.length === 0) {
				return { created: 0 };
			}

			let totalCreated = 0;

			for (const round of roundOnes) {
				// 2️⃣ get eligible applications for that domain
				const applications = await tx.application.findMany({
					where: {
						domain: round.domain,
						status: ApplicationStatus.SUBMITTED,
					},
					select: { id: true },
				});

				if (applications.length === 0) continue;

				// 3️⃣ create submissions
				const res = await tx.submission.createMany({
					data: applications.map((app) => ({
						applicationId: app.id,
						roundId: round.id,
					})),
					skipDuplicates: true,
				});

				totalCreated += res.count;

				// 4️⃣ activate the round
				await tx.round.update({
					where: { id: round.id },
					data: { isActive: true },
				});
			}

			return { created: totalCreated };
		});

		return {
			success: true,
			message: "Round 1 started for all domains",
			created: result.created,
		};
	} catch {
		return {
			success: false,
			message: "Failed to start rounds",
		};
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
			const round = await tx.round.findUnique({
				where: { id: roundId },
			});

			if (!round) {
				return { success: false, message: "Invalid round" };
			}

			if (round.isPublished) {
				return { success: false, message: "Results already published" };
			}

			const submissions = await tx.submission.findMany({
				where: { roundId },
				orderBy: { score: "desc" },
			});

			if (submissions.length === 0) {
				return { success: false, message: "No submissions found" };
			}

			const qualified = submissions.slice(0, takeCount);
			const cutoff = qualified.at(-1)?.score ?? 0;

			// next round
			const nextRound = await tx.round.findFirst({
				where: {
					domain: round.domain,
					order: round.order + 1,
				},
			});

			if (nextRound && qualified.length > 0) {
				await tx.submission.createMany({
					data: qualified.map((s) => ({
						applicationId: s.applicationId,
						roundId: nextRound.id,
					})),
					skipDuplicates: true,
				});
			}

			await tx.submission.updateMany({
				where: { roundId },
				data: { status: SubmissionStatus.EVALUATED },
			});

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
	} catch {
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
