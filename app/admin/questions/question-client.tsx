"use client";

import { useState } from "react";
import { createQuestion } from "@/app/actions/questions";

type Round = {
	id: string;
	title: string;
	domain: string;
};

export default function QuestionClient({ rounds }: { rounds: Round[] }) {
	const [roundId, setRoundId] = useState("");
	const [type, setType] = useState<"MCQ" | "INPUT">("MCQ");
	const [question, setQuestion] = useState("");
	const [answer, setAnswer] = useState("");
	const [marks, setMarks] = useState(0);
	const [options, setOptions] = useState<string[]>([]);

	function addOption() {
		setOptions([...options, ""]);
	}

	function updateOption(index: number, value: string) {
		const copy = [...options];
		copy[index] = value;
		setOptions(copy);
	}

	function removeOption(index: number) {
		setOptions(options.filter((_, i) => i !== index));
	}

	async function handleSave() {
		if (!roundId) return alert("Select round");

		await createQuestion({
			roundId,
			question,
			type,
			options,
			answer,
			marks,
		});

		alert("Question created");

		setQuestion("");
		setAnswer("");
		setMarks(0);
		setOptions([]);
	}

	return (
		<div className="space-y-5">
			{/* Round selector */}
			<select
				value={roundId}
				onChange={(e) => setRoundId(e.target.value)}
				className="w-full border px-3 py-2 rounded"
			>
				<option value="">Select MCQ Round</option>
				{rounds.map((r) => (
					<option key={r.id} value={r.id}>
						{r.title} — {r.domain}
					</option>
				))}
			</select>

			{/* Question */}
			<textarea
				placeholder="Question"
				value={question}
				onChange={(e) => setQuestion(e.target.value)}
				className="w-full border px-3 py-2 rounded"
			/>

			{/* Type selector */}
			<select
				value={type}
				onChange={(e) => setType(e.target.value as any)}
				className="border px-3 py-2 rounded"
			>
				<option value="MCQ">MCQ</option>
				<option value="INPUT">INPUT</option>
			</select>

			{/* Options (MCQ only) */}
			{type === "MCQ" && (
				<div className="space-y-3">
					{options.map((opt, i) => (
						<div key={i} className="flex gap-2">
							<input
								value={opt}
								onChange={(e) => updateOption(i, e.target.value)}
								placeholder={`Option ${i + 1}`}
								className="border px-3 py-2 w-full rounded"
							/>
							<button onClick={() => removeOption(i)} className="text-red-500">
								✕
							</button>
						</div>
					))}

					<button
						onClick={addOption}
						className="border px-3 py-1 rounded text-sm"
					>
						+ Add Option
					</button>
				</div>
			)}

			{/* Answer */}
			<input
				placeholder={
					type === "MCQ"
						? 'Correct option index ("1", "2"...)'
						: "Correct answer"
				}
				value={answer}
				onChange={(e) => setAnswer(e.target.value)}
				className="w-full border px-3 py-2 rounded"
			/>

			{/* Marks */}
			<input
				type="number"
				placeholder="Marks"
				value={marks}
				onChange={(e) => setMarks(Number(e.target.value))}
				className="border px-3 py-2 rounded w-32"
			/>

			<button
				onClick={handleSave}
				className="bg-black text-white px-4 py-2 rounded"
			>
				Save Question
			</button>
		</div>
	);
}
