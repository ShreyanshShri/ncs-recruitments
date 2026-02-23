"use client";

import { useActionState, useState } from "react";
import {
	updateQuestionAction,
	deleteQuestionAction,
} from "@/app/actions/questions";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function EditQuestionClient({
	question,
}: {
	question: {
		id: string;
		question: string;
		answer: string;
		marks: number;
		type: "MCQ" | "INPUT";
		options: string[];
	};
}) {
	const [state, updateAction, pending] = useActionState(
		updateQuestionAction,
		null,
	);

	const [, deleteAction, deletePending] = useActionState(
		deleteQuestionAction,
		null,
	);

	const [questionText, setQuestionText] = useState(question.question);

	return (
		<form action={updateAction} className="space-y-5">
			<input type="hidden" name="id" value={question.id} />
			<input type="hidden" name="type" value={question.type} />

			{/* Question */}
			<textarea
				name="question"
				value={questionText}
				onChange={(e) => setQuestionText(e.target.value)}
				className="glass-input min-h-30"
			/>

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
						{questionText || "_Nothing to preview_"}
					</ReactMarkdown>
				</div>
			</div>

			{/* Options */}
			{question.type === "MCQ" && (
				<div className="space-y-2">
					{question.options.map((opt, i) => (
						<input
							key={i}
							name="options"
							defaultValue={opt}
							className="glass-input"
						/>
					))}
				</div>
			)}

			{/* Answer */}
			<input
				name="answer"
				defaultValue={question.answer}
				className="glass-input"
			/>

			{/* Marks */}
			<input
				name="marks"
				type="number"
				defaultValue={question.marks}
				className="glass-input w-32 text-center"
			/>

			{/* Update */}
			<button disabled={pending} className="btn w-fit">
				{pending ? "Saving..." : "Update Question"}
			</button>

			{/* Delete */}
			<button
				formAction={deleteAction}
				disabled={deletePending}
				className="btn w-fit text-red-400"
			>
				{deletePending ? "Deleting..." : "Delete Question"}
			</button>

			{state?.success && (
				<p className="text-green-400 text-sm">Question updated</p>
			)}
		</form>
	);
}
