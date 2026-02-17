// app/dashboard/[domain]/mcq/[roundId]/mcq-form.tsx
"use client";

import { useActionState } from "react";
import { submitMcq } from "@/app/actions/questions";

export default function McqForm({ round }: { round: any }) {
	const [state, formAction, isPending] = useActionState(submitMcq, {});

	return (
		<form action={formAction} className="space-y-6 max-w-2xl mx-auto">
			<input type="hidden" name="roundId" value={round.id} />

			{round.questions.map((q: any) => (
				<div key={q.id} className="p-4 border rounded-lg shadow-sm">
					<p className="font-bold mb-4">{q.question}</p>
					<div className="space-y-2">
						{q.type === "MCQ" &&
							(q.options as string[]).map((opt, index) => (
								<label
									key={opt}
									className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
								>
									<input
										type="radio"
										name={`responses.${q.id}`}
										value={index + 1}
										required
									/>
									{opt}
								</label>
							))}
						{q.type === "INPUT" && (
							<input type="text" name={`responses.${q.id}`} />
						)}
					</div>
				</div>
			))}

			{state?.error && <p className="text-red-500">{state.error}</p>}

			<button
				type="submit"
				disabled={isPending}
				className="w-full bg-black text-white p-3 rounded disabled:bg-gray-400"
			>
				{isPending ? "Submitting..." : "Submit Answers"}
			</button>
		</form>
	);
}
