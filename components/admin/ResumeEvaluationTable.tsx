"use client";

import { useActionState } from "react";
import { evaluateResumeAction } from "@/app/actions/resume";

export function ResumeEvaluationTable({ submissions }: { submissions: any[] }) {
	return (
		<div className="border rounded-lg overflow-hidden">
			<table className="w-full text-sm">
				<thead className="bg-muted">
					<tr>
						<th className="p-2 text-left">Name</th>
						<th className="p-2 text-left">Email</th>
						<th className="p-2 text-left">Resume</th>
						<th className="p-2 text-left">Score / 100</th>
						<th className="p-2 text-left"></th>
					</tr>
				</thead>

				<tbody>
					{submissions.map((s) => (
						<ResumeRow key={s.id} submission={s} />
					))}
				</tbody>
			</table>
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
		<tr className="border-t">
			<td className="p-2">{user?.name}</td>
			<td className="p-2">{user?.email}</td>

			<td className="p-2">
				{submission.resumeUrl ? (
					<a
						href={submission.resumeUrl}
						target="_blank"
						className="text-blue-600 underline"
					>
						View
					</a>
				) : (
					"—"
				)}
			</td>

			<td className="p-2">
				<form action={formAction} className="flex gap-2 items-center">
					<input type="hidden" name="submissionId" value={submission.id} />

					<input
						name="score"
						type="number"
						min={0}
						max={100}
						defaultValue={submission.score ?? ""}
						className="border px-2 py-1 w-20 rounded"
						required
					/>

					<button
						disabled={pending}
						className="border px-3 py-1 rounded bg-black text-white"
					>
						Save
					</button>
				</form>

				{state?.error && <p className="text-xs text-red-500">{state.error}</p>}
				{state?.success && <p className="text-xs text-green-600">Saved</p>}
			</td>
		</tr>
	);
}
