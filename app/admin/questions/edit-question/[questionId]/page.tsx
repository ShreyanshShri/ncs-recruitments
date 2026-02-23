import { prisma } from "@/app/lib/prisma";
import { requireAdmin } from "@/app/lib/auth";
import EditQuestionClient from "./EditQuestionClient";
import { notFound } from "next/navigation";

export default async function Page({
	params,
}: {
	params: Promise<{ questionId: string }>;
}) {
	await requireAdmin();

	const { questionId } = await params;

	const question = await prisma.question.findUnique({
		where: { id: questionId },
	});

	if (!question) return notFound();

	return (
		<div className="max-w-3xl mx-auto py-10">
			<h1 className="text-xl font-semibold mb-6">Edit Question</h1>

			<EditQuestionClient
				question={{
					...question,
					options:
						question.type === "MCQ" ? (question.options as string[]) : [],
				}}
			/>
		</div>
	);
}
