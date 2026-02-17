"use client";

import { useState } from "react";
import { addMarkingScheme } from "@/app/actions/rounds";

type Round = {
	id: string;
	title: string;
	domain: string;
};

export default function MarkingSchemeClient({ rounds }: { rounds: Round[] }) {
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
		(copy[index][field] as string | number) =
			field === "maxMarks" ? Number(value) : value;

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
		<div className="space-y-6">
			{/* Round selector */}
			<select
				value={roundId}
				onChange={(e) => setRoundId(e.target.value)}
				className="w-full border px-3 py-2 rounded"
			>
				<option value="">Select round</option>
				{rounds.map((r) => (
					<option key={r.id} value={r.id}>
						{r.title} — {r.domain}
					</option>
				))}
			</select>

			{/* Criteria rows */}
			{criteria.map((c, i) => (
				<div key={i} className="flex gap-3">
					<input
						placeholder="Title"
						value={c.title}
						onChange={(e) => updateRow(i, "title", e.target.value)}
						className="border px-3 py-2 w-full rounded"
					/>

					<input
						type="number"
						placeholder="Marks"
						value={c.maxMarks}
						onChange={(e) => updateRow(i, "maxMarks", e.target.value)}
						className="border px-3 py-2 w-24 rounded"
					/>

					<button onClick={() => removeRow(i)} className="text-red-500">
						✕
					</button>
				</div>
			))}

			{/* Add button */}
			<button onClick={addRow} className="border px-3 py-1 rounded text-sm">
				+ Add
			</button>

			{/* Total */}
			<div className="font-medium">Total: {total}</div>

			{/* Save */}
			<button
				onClick={handleSave}
				className="bg-black text-white px-4 py-2 rounded"
			>
				Save
			</button>
		</div>
	);
}
