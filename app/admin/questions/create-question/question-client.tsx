"use client";

import { useState } from "react";
import { createQuestion } from "@/app/actions/questions";
import { Domain, RoundScope } from "@prisma/client";

type RoundOption = {
	id: string;
	title: string;
	domain: Domain | null;
	scope: RoundScope;
};

export default function QuestionClient({ rounds }: { rounds: RoundOption[] }) {
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
				className="glass-input appearance-none"
			>
				<option value="">Select MCQ Round</option>
				{rounds.map((r) => (
					<option
						key={r.id}
						value={r.id}
						className="bg-bg-elevated text-neutral-200"
					>
						{r.title} — {r.domain}
					</option>
				))}
			</select>

			{/* Question */}
			<label className="text-white/60 font-lg mb-2">Question</label>
			<textarea
				placeholder="Question"
				value={question}
				onChange={(e) => setQuestion(e.target.value)}
				className="glass-input min-h-30 resize-y"
			/>

			{/* Type selector */}
			<label className="text-white/60 font-lg mb-2">Type</label>
			<select
				value={type}
				onChange={(e) => setType(e.target.value as any)}
				className="glass-input appearance-none w-fit min-w-40"
			>
				<option className="bg-bg-elevated text-neutral-200" value="MCQ">
					MCQ
				</option>
				<option className="bg-bg-elevated text-neutral-200" value="INPUT">
					INPUT
				</option>
			</select>

			{/* Options (MCQ only) */}
			{type === "MCQ" && (
				<div className="space-y-3">
					<label className="text-white/60 font-lg mb-2">Options</label>
					{options.map((opt, i) => (
						<div key={i} className="flex gap-2">
							<input
								value={opt}
								onChange={(e) => updateOption(i, e.target.value)}
								placeholder={`Option ${i + 1}`}
								className="glass-input"
							/>

							<button
								onClick={() => removeOption(i)}
								className="btn h-10.5 px-3 text-red-400 hover:text-red-300"
							>
								✕
							</button>
						</div>
					))}

					<button onClick={addOption} className="btn text-sm w-fit">
						+ Add Option
					</button>
				</div>
			)}

			{/* Answer */}
			<label className="text-white/60 font-lg mb-2">Correct Answer</label>
			<input
				placeholder={
					type === "MCQ"
						? 'Correct option index ("1", "2"...)'
						: "Correct answer"
				}
				value={answer}
				onChange={(e) => setAnswer(e.target.value)}
				className="glass-input"
			/>

			{/* Marks */}
			<label className="text-white/60 font-lg mb-2">Marks</label>
			<input
				type="number"
				placeholder="Marks"
				value={marks}
				onChange={(e) => setMarks(Number(e.target.value))}
				className="glass-input w-32 text-center"
			/>

			<button onClick={handleSave} className="btn w-fit">
				Save Question
			</button>
		</div>
	);
}
