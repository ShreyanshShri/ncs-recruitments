"use client";

import { useActionState } from "react";
import { publishRound, PublishState } from "@/app/actions/rounds";

const initialState: PublishState = {
	success: false,
	message: "",
};

export function PublishMcqForm({
	roundId,
	totalSubmissions,
	isPublished,
	promotionRounds,
}: {
	roundId: string;
	totalSubmissions: number;
	isPublished: boolean;
	promotionRounds: { id: string; title: string; order: number }[];
}) {
	const defaultTake = Math.ceil(totalSubmissions / 2);

	const action = publishRound.bind(null, roundId);

	const [state, formAction, pending] = useActionState(action, initialState);

	if (isPublished) {
		return (
			<div className="text-green-600 font-medium">
				Results already published
			</div>
		);
	}

	return (
		<form action={formAction} className="space-y-4 p-5">
			<div className="text-sm font-semibold tracking-wide text-white/80">
				Publish Results
			</div>

			<div className="text-sm text-white/60">
				Total submissions: {totalSubmissions}
			</div>

			<div className="space-y-1.5">
				<label className="text-sm text-white/70">Candidates to promote</label>

				<input
					name="takeCount"
					type="number"
					defaultValue={defaultTake}
					min={1}
					max={totalSubmissions}
					className="glass-input"
				/>
			</div>

			<div className="space-y-1.5">
				<label className="text-sm text-white/70">Promote to round</label>

				<select name="promoteToRoundId" className="glass-input">
					<option value="">Final round (no promotion)</option>

					{promotionRounds.map((r) => (
						<option key={r.id} value={r.id}>
							Round {r.order} — {r.title}
						</option>
					))}
				</select>
			</div>

			<label className="flex items-center gap-2 text-sm text-white/70">
				<input
					type="checkbox"
					required
					className="h-4 w-4 rounded border border-white/20 bg-transparent
						   accent-white/80"
				/>
				I confirm publishing results
			</label>

			<button type="submit" disabled={pending} className="btn w-fit">
				{pending ? "Publishing..." : "Publish"}
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
