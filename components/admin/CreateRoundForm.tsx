"use client";

import { useActionState } from "react";
import { createRound } from "@/app/actions/rounds";
import { Domain, RoundType } from "@/types/db";

export type FormState = {
	error?: string | null;
	success?: boolean;
};

const initialState: FormState = {
	error: null,
	success: false,
};

export function CreateRoundForm() {
	const [state, formAction] = useActionState(createRound, initialState);

	return (
		<form action={formAction} className="space-y-5">
			{/* Title */}
			<div>
				<label className="block text-sm font-medium mb-1">Title</label>
				<input
					name="title"
					required
					className="w-full border px-3 py-2 rounded"
					placeholder="e.g. Programming Round 1"
				/>
			</div>

			{/* Domain */}
			<div>
				<label className="block text-sm font-medium mb-1">Domain</label>
				<select
					name="domain"
					required
					className="w-full border px-3 py-2 rounded"
				>
					{Object.values(Domain).map((d) => (
						<option key={d} value={d}>
							{d}
						</option>
					))}
				</select>
			</div>

			{/* Type */}
			<div>
				<label className="block text-sm font-medium mb-1">Round Type</label>
				<select
					name="type"
					required
					className="w-full border px-3 py-2 rounded"
				>
					{Object.values(RoundType).map((t) => (
						<option key={t} value={t}>
							{t}
						</option>
					))}
				</select>
			</div>

			{/* Start Time */}
			<div>
				<label className="block text-sm font-medium mb-1">Start Time</label>
				<input
					type="datetime-local"
					name="startTime"
					className="w-full border px-3 py-2 rounded"
				/>
			</div>

			{/* End Time */}
			<div>
				<label className="block text-sm font-medium mb-1">End Time</label>
				<input
					type="datetime-local"
					name="endTime"
					className="w-full border px-3 py-2 rounded"
				/>
			</div>
			{/* Order */}
			<div>
				<label className="block text-sm font-medium mb-1">Order</label>
				<input
					type="number"
					name="order"
					className="w-full border px-3 py-2 rounded"
					required
				/>
			</div>

			{/* Error */}
			{state?.error && <p className="text-red-500 text-sm">{state.error}</p>}

			{/* Submit */}
			<button type="submit" className="bg-black text-white px-4 py-2 rounded">
				Create Round
			</button>
		</form>
	);
}
