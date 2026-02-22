"use client";

import { useActionState, useRef } from "react";
import { evaluateResumeAction } from "@/app/actions/resume";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export function ResumeEvaluationTable({ submissions }: { submissions: any[] }) {
	const tableRef = useRef<HTMLTableElement>(null);

	const handleExport = () => {
		if (!tableRef.current) return;

		// 1. Convert the HTML table to a workbook object
		const workbook = XLSX.utils.table_to_book(tableRef.current);

		// 2. Generate the Excel binary data
		const excelBuffer = XLSX.write(workbook, {
			bookType: "xlsx",
			type: "array",
		});

		// 3. Create a Blob and save it
		const data = new Blob([excelBuffer], {
			type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		});

		saveAs(data, "Leaderboard.xlsx");
	};

	return (
		<div className="p-5">
			<div className="overflow-hidden rounded-xl border border-glass-border-soft">
				<button onClick={handleExport} className="btn">
					Export Excel
				</button>
				<table className="w-full text-sm" ref={tableRef}>
					<thead className="bg-white/5 text-white/70">
						<tr>
							<th className="p-3 text-left font-medium">Name</th>
							<th className="p-3 text-left font-medium">Email</th>
							<th className="p-3 text-left font-medium">Resume</th>
							<th className="p-3 text-left font-medium">Score / 100</th>
							{/* <th className="p-3 text-left font-medium">Actions</th> */}
						</tr>
					</thead>

					<tbody>
						{submissions.map((s) => (
							<tr
								key={s.id}
								className="border-t border-white/5 hover:bg-white/4 transition-colors"
							>
								<ResumeRow submission={s} />
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

function ResumeRow({ submission }: { submission: any }) {
	const [state, formAction, pending] = useActionState(
		evaluateResumeAction,
		null,
	);

	const user = submission.application?.user ?? submission.user;

	return (
		<>
			<td className="p-3 font-medium text-white/80">{user?.name}</td>

			<td className="p-3 text-white/60">{user?.email}</td>

			<td className="p-3">
				{submission.resumeUrl ? (
					<a
						href={submission.resumeUrl}
						target="_blank"
						className="text-white/80 underline underline-offset-4 hover:text-white"
					>
						View
					</a>
				) : (
					"—"
				)}
			</td>

			<td className="p-3">
				<form action={formAction} className="flex items-center gap-2">
					<input type="hidden" name="submissionId" value={submission.id} />

					<input
						name="score"
						type="number"
						min={0}
						max={100}
						defaultValue={submission.score ?? ""}
						required
						className="glass-input w-20 text-center"
					/>

					<button disabled={pending} className="btn h-9 px-3">
						Save
					</button>
				</form>

				{state?.error && (
					<p className="mt-1 text-xs text-red-400">{state.error}</p>
				)}

				{state?.success && (
					<p className="mt-1 text-xs text-emerald-400">Saved</p>
				)}
			</td>
		</>
	);
}
