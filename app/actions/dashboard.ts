"use server";

import { prisma } from "@/app/lib/prisma";
import { requireUser } from "@/app/lib/auth";
import { Domain } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { upsertRegistrationRow } from "@/app/lib/googleSheets";

type ApplyState = {
	success: boolean;
	message: string;
};

export async function applyToDomain(
	prevState: ApplyState,
	formData: FormData,
): Promise<ApplyState> {
	try {
		const session = await requireUser();
		const domain = formData.get("domain") as Domain;

		const user = await prisma.user.findUnique({
			where: { id: session.userId },
			include: { profile: true },
		});

		if (!user || !user.profile) {
			return { success: false, message: "Complete profile first." };
		}

		await prisma.$transaction(async (tx) => {
			// ✅ create application
			const application = await tx.application.create({
				data: {
					userId: session.userId,
					domain,
				},
			});

			// ✅ fetch ONLY order = 1 rounds (COMMON + selected DOMAIN)
			const entryRounds = await tx.round.findMany({
				where: {
					year: user.profile!.year,
					order: 1,
					OR: [{ scope: "COMMON" }, { scope: "DOMAIN", domain }],
				},
				select: {
					id: true,
					scope: true,
				},
			});

			const commonRound = entryRounds.find((r) => r.scope === "COMMON");

			const domainRound = entryRounds.find((r) => r.scope === "DOMAIN");

			// ✅ COMMON → userId based → skip if already exists
			if (commonRound) {
				await tx.submission.createMany({
					data: [
						{
							roundId: commonRound.id,
							userId: session.userId,
							status: "NOT_STARTED",
						},
					],
					skipDuplicates: true,
				});
			}

			// ✅ DOMAIN → tied to this application
			if (domainRound) {
				await tx.submission.create({
					data: {
						roundId: domainRound.id,
						applicationId: application.id,
						userId: session.userId,
						status: "NOT_STARTED",
					},
				});
			}

			// ✅ Google Sheet logic (unchanged, inside tx for consistency of read values)
			let sheetName: "registrations_year1" | "registrations_year2";

			if (user.profile!.year === "FIRST") {
				sheetName = "registrations_year1";
			} else if (user.profile!.year === "SECOND") {
				sheetName = "registrations_year2";
			} else {
				return;
			}

			await upsertRegistrationRow({
				sheetName,
				user: {
					name: user.name,
					email: user.email,
				},
				profile: {
					mobile: user.profile!.mobile,
					rollNumber: user.profile!.rollNumber,
					branch: user.profile!.branch,
					institution: user.profile!.institution,
				},
				newDomain: domain,
			});
		});

		revalidatePath("/dashboard");

		return { success: true, message: "Applied successfully." };
	} catch (err) {
		console.error(err);
		return { success: false, message: "Try again." };
	}
}
