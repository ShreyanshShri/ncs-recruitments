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
			<table className="w-full text-sm border rounded-lg overflow-hidden">
				<thead className="bg-muted">
					<tr>
						<th className="p-2 text-left">Name</th>
						<th className="p-2 text-left">Email</th>

						{markingScheme.map((m: any) => (
							<th key={m.title} className="p-2 text-left">
								{m.title} ({m.maxMarks})
							</th>
						))}

						<th className="p-2 text-left">Total</th>
					</tr>
				</thead>

				<tbody>
					{submissions.map((s: any, i: number) => {
						const total = Object.values(rows[i].sections).reduce(
							(a: number, b: any) => a + Number(b || 0),
							0,
						);

						return (
							<tr key={s.id} className="border-t">
								<td className="p-2">
									{s.application?.user?.name ?? s.user?.name ?? "—"}
								</td>
								<td className="p-2">
									{s.application?.user?.email ?? s.user?.email ?? "—"}
								</td>

								{markingScheme.map((m: any) => (
									<td key={m.title} className="p-2">
										<input
											type="number"
											min={0}
											max={m.maxMarks}
											value={rows[i].sections[m.title] || ""}
											onChange={(e) =>
												updateValue(i, m.title, Number(e.target.value))
											}
											className="border px-2 py-1 rounded w-20"
										/>
									</td>
								))}

								<td className="p-2 font-medium">{total}</td>
							</tr>
						);
					})}
				</tbody>
			</table>

			<input type="hidden" name="data" value={JSON.stringify(rows)} />

			<button className="btn" disabled={pending}>
				{pending ? "Saving..." : "Save Marks"}
			</button>

			{state.message && (
				<p className={state.success ? "text-green-600" : "text-red-600"}>
					{state.message}
				</p>
			)}
		</form>
	);
}
