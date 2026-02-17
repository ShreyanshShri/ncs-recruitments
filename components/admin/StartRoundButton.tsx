"use client";

import { useActionState } from "react";
import {
	startAllFirstRounds,
	type StartRoundsState,
} from "@/app/actions/rounds";

const initialState: StartRoundsState = {
	success: false,
	message: "",
};

export function StartRoundsButton() {
	const [state, action, pending] = useActionState(
		startAllFirstRounds,
		initialState,
	);

	return (
		<form action={action} className="space-y-2">
			<button type="submit" className="btn" disabled={pending}>
				{pending ? "Starting..." : "Start Round 1 (All Domains)"}
			</button>

			{state.message && (
				<p className={state.success ? "text-green-600" : "text-red-600"}>
					{state.message}
					{state.created !== undefined &&
						` • ${state.created} submissions created`}
				</p>
			)}
		</form>
	);
}
