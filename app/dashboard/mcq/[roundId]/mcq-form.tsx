"use client";

import { useActionState } from "react";
import { submitMcq } from "@/app/actions/questions";

export default function McqForm({ round }: { round: any }) {
	const [state, formAction, isPending] = useActionState(submitMcq, {});

	return (
		<div className="min-h-screen bg-bg-dark text-beige px-6 py-12">
			<form action={formAction} className="space-y-8 max-w-3xl mx-auto">
				<input type="hidden" name="roundId" value={round.id} />

				{/* Header */}
				<h1 className="text-3xl font-shuriken text-primary-red tracking-wide text-center">
					MCQ Round
				</h1>

				{/* Questions */}
				{round.questions.map((q: any, qIndex: number) => (
					<div
						key={q.id}
						className="bg-light-beige text-bg-dark p-6 rounded-2xl border border-border-red shadow-lg space-y-4"
					>
						<p className="font-shuriken text-dark-red text-lg">
							Q{qIndex + 1}. {q.question}
						</p>

						<div className="space-y-3">
							{q.type === "MCQ" &&
								(q.options as string[]).map((opt, index) => (
									<label
										key={opt}
										className="flex items-center gap-3 p-3 rounded-lg cursor-pointer border border-transparent hover:border-border-red hover:bg-beige/40 transition"
									>
										<input
											type="radio"
											name={`responses.${q.id}`}
											value={index + 1}
											required
											className="accent-primary-red"
										/>
										<span>{opt}</span>
									</label>
								))}

							{q.type === "INPUT" && (
								<input
									type="text"
									name={`responses.${q.id}`}
									required
									className="w-full bg-bg-dark text-beige border border-border-red rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-red"
								/>
							)}
						</div>
					</div>
				))}

				{/* Error */}
				{state?.error && (
					<p className="text-primary-red text-center font-medium">
						{state.error}
					</p>
				)}

				{/* Submit */}
				<button
					type="submit"
					disabled={isPending}
					className="w-full bg-primary-red hover:bg-dark-red text-beige font-shuriken tracking-wide py-3 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{isPending ? "Submitting..." : "Submit Answers"}
				</button>
			</form>
		</div>
	);
}
