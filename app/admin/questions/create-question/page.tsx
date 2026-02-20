import { prisma } from "@/app/lib/prisma";
import { requireAdmin } from "@/app/lib/auth";
import QuestionClient from "./question-client";

export default async function Page() {
	await requireAdmin();

	const rounds = await prisma.round.findMany({
		where: { type: "MCQ" },
		select: {
			id: true,
			title: true,
			domain: true,
			scope: true,
		},
		orderBy: { createdAt: "desc" },
	});

	return (
		<div className="max-w-3xl mx-auto py-10">
			<h1 className="text-xl font-semibold mb-6">Create Question</h1>

			<QuestionClient rounds={rounds} />
		</div>
	);
}
