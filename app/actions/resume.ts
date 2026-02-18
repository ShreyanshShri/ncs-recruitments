"use server";

import { prisma } from "@/app/lib/prisma";
import { requireUser, requireAdmin } from "@/app/lib/auth";
import { revalidatePath } from "next/cache";
import { updateResumeUrlByEmail } from "@/app/lib/googleSheets";

type State = {
	success?: boolean;
	error?: string;
};

export async function saveResume(
	roundId: string,
	_: State,
	formData: FormData,
): Promise<State> {
	const session = await requireUser();
	const userId = session.userId;

	const url = formData.get("resumeUrl") as string | null;

	if (!url) return { error: "Upload failed. No file URL received." };

	const round = await prisma.round.findUnique({
		where: { id: roundId },
		select: { id: true },
	});

	if (!round) return { error: "Invalid round." };

	const application = await prisma.application.findFirst({
		where: { userId },
		select: { id: true },
	});

	if (!application) {
		return { error: "Apply to a domain before uploading resume." };
	}

	await prisma.submission.upsert({
		where: {
			userId_roundId: { userId, roundId },
		},
		update: {
			resumeUrl: url,
			status: "SUBMITTED",
		},
		create: {
			userId,
			roundId,
			applicationId: application.id,
			resumeUrl: url,
			status: "SUBMITTED",
		},
	});

	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: {
			email: true,
			profile: { select: { year: true } },
		},
	});

	if (user?.profile?.year === "SECOND") {
		await updateResumeUrlByEmail({
			sheetName: "registrations_year2",
			email: user.email,
			resumeUrl: url,
		});
	}

	revalidatePath("/dashboard");

	return { success: true };
}

export async function evaluateResumeAction(_: any, formData: FormData) {
	await requireAdmin();

	const submissionId = formData.get("submissionId") as string;
	const score = Number(formData.get("score"));

	if (!submissionId || isNaN(score)) {
		return { error: "Invalid data" };
	}

	if (score < 0 || score > 100) {
		return { error: "Score must be between 0 and 100" };
	}

	await prisma.submission.update({
		where: { id: submissionId },
		data: {
			score,
			status: "EVALUATED",
			evaluatedBy: "ADMIN", // optionally pass admin id from session
		},
	});

	return { success: true };
}
