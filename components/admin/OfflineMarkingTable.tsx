"use client";

import { useState, useActionState } from "react";
import { saveOfflineMarks, OfflineSaveState } from "@/app/actions/rounds";

const initialState: OfflineSaveState = {
	success: false,
	message: "",
};

export function OfflineMarkingTable({
	roundId,
	submissions,
	markingScheme,
}: any) {
	const [rows, setRows] = useState(() =>
		submissions.map((s: any) => ({
			submissionId: s.id,
			sections: s.responses || {},
		})),
	);

	function updateValue(index: number, key: string, value: number) {
		const copy = [...rows];
		copy[index].sections[key] = value;
		setRows(copy);
	}

	return (
		<div className="p-5">
			<div className="overflow-hidden rounded-xl border border-glass-border-soft">
				<table className="w-full text-sm">
					<thead className="bg-white/5 text-white/70">
						<tr>
							<th className="p-3 text-left font-medium">Name</th>
							<th className="p-3 text-left font-medium">Email</th>

							{markingScheme?.map((m: any) => (
								<th key={m.title} className="p-3 text-left font-medium">
									{m.title} ({m.maxMarks})
								</th>
							))}

							<th className="p-3 text-left font-medium">Total</th>
						</tr>
					</thead>

					<tbody>
						{submissions.map((s: any, i: number) => {
							return (
								<RowForm
									key={s.id}
									index={i}
									s={s}
									rows={rows}
									updateValue={updateValue}
									markingScheme={markingScheme}
									roundId={roundId}
								/>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}

function RowForm({ s, index, rows, updateValue, markingScheme, roundId }: any) {
	const action = saveOfflineMarks.bind(null, roundId);
	const [state, formAction, pending] = useActionState(action, initialState);

	const total = Object.values(rows[index].sections).reduce(
		(a: number, b: any) => a + Number(b || 0),
		0,
	);

	return (
		<tr className="border-t border-white/5 hover:bg-white/4 transition-colors">
			<td className="p-3">
				{s.application?.user?.name ?? s.user?.name ?? "—"}
			</td>

			<td className="p-3 text-white/60">
				{s.application?.user?.email ?? s.user?.email ?? "—"}
			</td>

			{markingScheme?.map((m: any) => (
				<td key={m.title} className="p-3">
					<input
						type="number"
						min={0}
						max={m.maxMarks}
						value={rows[index].sections[m.title] || ""}
						onChange={(e) =>
							updateValue(index, m.title, Number(e.target.value))
						}
						className="glass-input w-20 text-center"
					/>
				</td>
			))}

			<td className="p-3 font-semibold text-white/80">
				<form action={formAction} className="flex items-center gap-3">
					<span className="w-10 text-right">{total}</span>

					<input
						type="hidden"
						name="submissionId"
						value={rows[index].submissionId}
					/>

					<input
						type="hidden"
						name="sections"
						value={JSON.stringify(rows[index].sections)}
					/>

					<button type="submit" className="btn" disabled={pending}>
						{pending ? "..." : "Save"}
					</button>

					{state.message && (
						<span
							className={
								state.success
									? "text-emerald-400 text-xs"
									: "text-red-400 text-xs"
							}
						>
							{state.message}
						</span>
					)}
				</form>
			</td>
		</tr>
	);
}
