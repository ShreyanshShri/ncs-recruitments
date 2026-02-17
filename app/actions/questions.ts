"use server";

import { prisma } from "@/app/lib/prisma";
import { requireAdmin } from "@/app/lib/auth";

export async function createQuestion(data: {
	roundId: string;
	question: string;
	type: "MCQ" | "INPUT";
	options?: string[];
	answer: string;
	marks: number;
}) {
	await requireAdmin();

	await prisma.question.create({
		data: {
			roundId: data.roundId,
			question: data.question,
			type: data.type,
			options: data.type === "MCQ" ? data.options : {},
			answer: data.answer,
			marks: data.marks,
		},
	});
}

import { requireUser } from "@/app/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type MCQState = {
	error?: string;
	success?: boolean;
};

export async function submitMcq(
	prevState: MCQState,
	formData: FormData,
): Promise<MCQState> {
	const session = await requireUser();
	const roundId = formData.get("roundId") as string;

	const responses: Record<string, string> = {};
	formData.forEach((value, key) => {
		if (key.startsWith("responses.")) {
			const questionId = key.split(".")[1];
			responses[questionId] = value as string;
		}
	});

	try {
		const submission = await prisma.submission.findFirst({
			where: {
				roundId,
				OR: [
					{ userId: session.userId },
					{ application: { userId: session.userId } },
				],
			},
			include: {
				round: { include: { questions: true } },
			},
		});

		if (!submission) return { error: "Submission not found" };
		if (submission.status === "SUBMITTED")
			return { error: "Already submitted" };

		let score = 0;

		for (const q of submission.round.questions) {
			const correct = q.answer;
			const given = responses[q.id];
			if (correct === given) score += q.marks ?? 1;
		}

		await prisma.submission.update({
			where: { id: submission.id },
			data: {
				status: "SUBMITTED",
				responses: responses as any,
				score,
			},
		});
	} catch {
		return { error: "Failed to submit. Please try again." };
	}

	revalidatePath("/dashboard");
	redirect("/dashboard");
}
