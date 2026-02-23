import { prisma } from "@/app/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
			<div className="flex justify-between">
				<div className="text-sm text-white/50 space-y-0.5">
					<div>{question.round.title}</div>
					<div>
						{question.round.scope}
						{question.round.domain && ` • ${question.round.domain}`}
					</div>
				</div>
				{/* actions */}
				<Link href={`/admin/questions/edit-question/${questionId}/`}>
					<button className="btn">Edit</button>
				</Link>
			</div>

			{/* Question */}
			<div className="space-y-2 glass-card p-4">
				<p className="text-white/40 text-sm">Preview</p>

				<div
					className="
						prose prose-invert max-w-none
						prose-headings:text-beige
						prose-p:text-neutral-200
						prose-li:text-neutral-200
						prose-strong:text-beige
						prose-code:text-pink-300
						prose-pre:bg-black/40
					"
				>
					<ReactMarkdown remarkPlugins={[remarkGfm]}>
						{question.question || "_Nothing to preview_"}
					</ReactMarkdown>
				</div>
			</div>

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
