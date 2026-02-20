"use client";

import { useState } from "react";
import { addMarkingScheme } from "@/app/actions/rounds";
// import { Domain } from "@/types/db";/
import { Domain, RoundScope } from "@prisma/client";

type RoundOption = {
	id: string;
	title: string;
	domain: Domain | null;
	scope: RoundScope;
};

export default function MarkingSchemeClient({
	rounds,
}: {
	rounds: RoundOption[];
}) {
	const [roundId, setRoundId] = useState("");
	const [criteria, setCriteria] = useState<
		{ title: string; maxMarks: number }[]
	>([]);

	function addRow() {
		setCriteria([...criteria, { title: "", maxMarks: 0 }]);
	}

	function updateRow(
		index: number,
		field: "title" | "maxMarks",
		value: string,
	) {
		const copy = [...criteria];

		copy[index] = {
			...copy[index],
			[field]: field === "maxMarks" ? Number(value) : value,
		};

		setCriteria(copy);
	}

	function removeRow(index: number) {
		setCriteria(criteria.filter((_, i) => i !== index));
	}

	async function handleSave() {
		if (!roundId) return alert("Select a round");

		await addMarkingScheme(roundId, criteria);

		alert("Saved");
		setCriteria([]);
	}

	const total = criteria.reduce((sum, c) => sum + (c.maxMarks || 0), 0);

	return (
		<div className="">
			{/* Round selector */}
			<select
				value={roundId}
				onChange={(e) => setRoundId(e.target.value)}
				className="glass-input"
			>
				<option value="">Select round</option>

				{rounds.map((r) => (
					<option
						key={r.id}
						value={r.id}
						className="bg-bg-elevated text-neutral-200"
					>
						{r.title} — {r.scope === "COMMON" ? "Common" : r.domain}
					</option>
				))}
			</select>

			{/* Criteria rows */}
			{criteria.map((c, i) => (
				<div key={i} className="flex gap-3 mt-4">
					<input
						placeholder="Title"
						value={c.title}
						onChange={(e) => updateRow(i, "title", e.target.value)}
						className="glass-input"
					/>

					<input
						type="number"
						placeholder="Marks"
						value={c.maxMarks}
						onChange={(e) => updateRow(i, "maxMarks", e.target.value)}
						className="glass-input"
					/>

					<button onClick={() => removeRow(i)} className="text-red-500 btn">
						✕
					</button>
				</div>
			))}

			<button onClick={addRow} className="btn mt-4">
				+ Add
			</button>

			<div className="font-medium mt-4">Total: {total}</div>

			<button onClick={handleSave} className="btn mt-4">
				Save
			</button>
		</div>
	);
}
