"use client";

import { useActionState } from "react";
import { evaluateResumeAction } from "@/app/actions/resume";

export function ResumeEvaluationTable({ submissions }: { submissions: any[] }) {
	return (
		<div className="glass-card p-5">
			<div className="overflow-hidden rounded-xl border border-glass-border-soft">
				<table className="w-full text-sm">
					<thead className="bg-white/5 text-white/70">
						<tr>
							<th className="p-3 text-left font-medium">Name</th>
							<th className="p-3 text-left font-medium">Email</th>
							<th className="p-3 text-left font-medium">Resume</th>
							<th className="p-3 text-left font-medium">Score / 100</th>
							<th className="p-3 text-left font-medium"></th>
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
		<tr className="border-t border-white/5 hover:bg-white/4 transition-colors">
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
		</tr>
	);
}
