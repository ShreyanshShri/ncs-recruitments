"use client";

import { useActionState } from "react";
import { publishMcqRound, PublishState } from "@/app/actions/rounds";

const initialState: PublishState = {
	success: false,
	message: "",
};

export function PublishMcqForm({
	roundId,
	totalSubmissions,
	isPublished,
}: {
	roundId: string;
	totalSubmissions: number;
	isPublished: boolean;
}) {
	const defaultTake = Math.ceil(totalSubmissions / 2);

	const action = publishMcqRound.bind(null, roundId);

	const [state, formAction, pending] = useActionState(action, initialState);

	if (isPublished) {
		return (
			<div className="text-green-600 font-medium">
				Results already published
			</div>
		);
	}

	return (
		<form action={formAction} className="space-y-3 border p-4 rounded-lg">
			<div className="font-semibold">Publish Results</div>

			<div className="text-sm text-muted-foreground">
				Total submissions: {totalSubmissions}
			</div>

			<div>
				<label className="text-sm">Candidates to promote</label>
				<input
					name="takeCount"
					type="number"
					defaultValue={defaultTake}
					min={1}
					max={totalSubmissions}
					className="border px-2 py-1 rounded w-full"
				/>
			</div>

			<label className="flex items-center gap-2 text-sm">
				<input type="checkbox" required />I confirm publishing results
			</label>

			<button type="submit" disabled={pending} className="btn">
				{pending ? "Publishing..." : "Publish"}
			</button>

			{state.message && (
				<p className={state.success ? "text-green-600" : "text-red-600"}>
					{state.message}
				</p>
			)}
		</form>
	);
}
