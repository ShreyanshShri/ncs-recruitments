"use client";

import { useActionState, useState } from "react";
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

	const action = saveOfflineMarks.bind(null, roundId);
	const [state, formAction, pending] = useActionState(action, initialState);

	function updateValue(index: number, key: string, value: number) {
		const copy = [...rows];
		copy[index].sections[key] = value;
		setRows(copy);
	}

	return (
		<form action={formAction} className="space-y-4">
			<div className="glass-card p-5">
				<div className="overflow-hidden rounded-xl border border-glass-border-soft">
					<table className="w-full text-sm">
						<thead className="bg-white/5 text-white/70">
							<tr>
								<th className="p-3 text-left font-medium">Name</th>
								<th className="p-3 text-left font-medium">Email</th>

								{markingScheme.map((m: any) => (
									<th key={m.title} className="p-3 text-left font-medium">
										{m.title} ({m.maxMarks})
									</th>
								))}

								<th className="p-3 text-left font-medium">Total</th>
							</tr>
						</thead>

						<tbody>
							{submissions.map((s: any, i: number) => {
								const total = Object.values(rows[i].sections).reduce(
									(a: number, b: any) => a + Number(b || 0),
									0,
								);

								return (
									<tr
										key={s.id}
										className="border-t border-white/5 hover:bg-white/4 transition-colors"
									>
										<td className="p-3">
											{s.application?.user?.name ?? s.user?.name ?? "—"}
										</td>

										<td className="p-3 text-white/60">
											{s.application?.user?.email ?? s.user?.email ?? "—"}
										</td>

										{markingScheme.map((m: any) => (
											<td key={m.title} className="p-3">
												<input
													type="number"
													min={0}
													max={m.maxMarks}
													value={rows[i].sections[m.title] || ""}
													onChange={(e) =>
														updateValue(i, m.title, Number(e.target.value))
													}
													className="glass-input w-20 text-center"
												/>
											</td>
										))}

										<td className="p-3 font-semibold text-white/80">{total}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>

			<input type="hidden" name="data" value={JSON.stringify(rows)} />

			<button className="btn w-fit" disabled={pending}>
				{pending ? "Saving..." : "Save Marks"}
			</button>

			{state.message && (
				<p
					className={
						state.success ? "text-emerald-400 text-sm" : "text-red-400 text-sm"
					}
				>
					{state.message}
				</p>
			)}
		</form>
	);
}
