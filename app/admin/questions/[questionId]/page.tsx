import { prisma } from "@/app/lib/prisma";
import { notFound } from "next/navigation";

type Props = {
	params: Promise<{
		questionId: string;
	}>;
};

export default async function Page({ params }: Props) {
	const { questionId } = await params;

	const question = await prisma.question.findUnique({
		where: { id: questionId },
		include: {
			round: {
				select: {
					title: true,
					type: true,
					domain: true,
					scope: true,
				},
			},
		},
	});

	if (!question) notFound();

	const isMCQ = question.type === "MCQ";
	const options = question.options as string[] | null;

	return (
		<div className="glass-card p-6 space-y-6">
			{/* Round meta */}
			<div className="text-sm text-white/50 space-y-0.5">
				<div>{question.round.title}</div>
				<div>
					{question.round.scope}
					{question.round.domain && ` • ${question.round.domain}`}
				</div>
			</div>

			{/* Question */}
			<h1 className="text-xl font-semibold text-white/90">
				{question.question}
			</h1>

			{/* MCQ options */}
			{isMCQ && options && (
				<div className="space-y-2">
					{options.map((opt, i) => {
						const isCorrect = opt === question.answer;

						return (
							<div
								key={i}
								className={`rounded-md px-3 py-2 border
							${
								isCorrect
									? "border-emerald-400 bg-emerald-400/10 text-emerald-200"
									: "border-white/10 bg-white/3"
							}`}
							>
								{opt}
							</div>
						);
					})}
				</div>
			)}

			{/* Correct answer (non-MCQ) */}
			<div className="rounded-md px-3 py-2 border border-emerald-400 bg-emerald-400/10 text-emerald-200">
				Correct Answer: {isMCQ ? "Option " : ""} {question.answer}
			</div>
		</div>
	);
}
