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
					className="glass-input"
					placeholder="e.g. Programming Round 1"
				/>
			</div>

			{/* Scope */}
			<div>
				<label className="block text-sm font-medium mb-1">Scope</label>
				<select name="scope" className="glass-input" required>
					<option value="COMMON" className="bg-bg-elevated text-neutral-200">
						COMMON
					</option>
					<option value="DOMAIN" className="bg-bg-elevated text-neutral-200">
						DOMAIN
					</option>
				</select>
			</div>

			{/* Domain */}
			<div>
				<label className="block text-sm font-medium mb-1">Domain</label>
				<select name="domain" className="glass-input">
					{Object.values(Domain).map((d) => (
						<option
							key={d}
							value={d}
							className="bg-bg-elevated text-neutral-200"
						>
							{d}
						</option>
					))}
				</select>
			</div>

			{/* Type */}
			<div>
				<label className="block text-sm font-medium mb-1">Round Type</label>
				<select name="type" required className="glass-input">
					{Object.values(RoundType).map((t) => (
						<option
							key={t}
							value={t}
							className="bg-bg-elevated text-neutral-200"
						>
							{t}
						</option>
					))}
				</select>
			</div>

			<div>
				<label className="block text-sm font-medium mb-1">Year</label>
				<select name="year" className="glass-input" required>
					<option value="FIRST" className="bg-bg-elevated text-neutral-200">
						First Year
					</option>
					<option value="SECOND" className="bg-bg-elevated text-neutral-200">
						Second Year
					</option>
					<option value="THIRD" className="bg-bg-elevated text-neutral-200">
						Third Year
					</option>
					<option value="FOURTH" className="bg-bg-elevated text-neutral-200">
						Fourth Year
					</option>
				</select>
			</div>

			{/* Start Time */}
			<div>
				<label className="block text-sm font-medium mb-1">Start Time</label>
				<input type="datetime-local" name="startTime" className="glass-input" />
			</div>

			{/* End Time */}
			<div>
				<label className="block text-sm font-medium mb-1">End Time</label>
				<input type="datetime-local" name="endTime" className="glass-input" />
			</div>
			{/* Order */}
			<div>
				<label className="block text-sm font-medium mb-1">Order</label>
				<input type="number" name="order" className="glass-input" required />
			</div>

			{/* Error */}
			{state?.error && <p className="text-red-500 text-sm">{state.error}</p>}

			{/* Submit */}
			<button type="submit" className="btn">
				Create Round
			</button>
		</form>
	);
}
