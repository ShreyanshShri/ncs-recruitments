"use client";

import { useRef } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function LeaderboardTable({ submissions }: any) {
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
		<div className="glass-card p-5 space-y-4">
			<h2 className="text-lg font-semibold">Leaderboard</h2>
			<button onClick={handleExport} className="btn">
				Export Excel
			</button>
			<div className="overflow-hidden rounded-xl border border-glass-border-soft">
				<table className="w-full text-sm" ref={tableRef}>
					<thead className="bg-white/5 text-white/70">
						<tr>
							<th className="p-3 text-left font-medium">Rank</th>
							<th className="p-3 text-left font-medium">Name</th>
							<th className="p-3 text-left font-medium">Email</th>
							<th className="p-3 text-left font-medium">Score</th>
							<th className="p-3 text-left font-medium">Status</th>
						</tr>
					</thead>

					<tbody>
						{submissions.map((s: any, i: number) => (
							<tr
								key={s.id}
								className="border-t border-white/5 hover:bg-white/4 transition-colors"
							>
								<td className="p-3">{i + 1}</td>

								<td className="p-3">
									{s.application?.user?.name ?? s.user?.name ?? "—"}
								</td>

								<td className="p-3 text-white/60">
									{s.application?.user?.email ?? s.user?.email ?? "—"}
								</td>

								<td className="p-3 font-medium">{s.score ?? "-"}</td>

								<td className="p-3 text-white/70">{s.status}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
