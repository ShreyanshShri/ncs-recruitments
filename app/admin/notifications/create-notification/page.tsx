"use client";

import { useActionState, useEffect, useState } from "react";
import {
	createNotification,
	NotificationState,
} from "@/app/actions/notification";
import { Domain, RoundScope, Year } from "@/types/db";

const initialState: NotificationState = {};

export default function CreateNotificationForm() {
	const [state, action, pending] = useActionState(
		createNotification,
		initialState,
	);

	const [scope, setScope] = useState<RoundScope>(RoundScope.COMMON);

	useEffect(() => {
		if (state.success) {
			// optional: reset form via key or ref if you want
		}
	}, [state.success]);

	return (
		<form action={action} className="space-y-4 max-w-200 m-auto">
			<h1 className="text-2xl font-semibold">Create Notification</h1>
			<input
				name="title"
				placeholder="Title"
				required
				className="glass-input"
			/>

			<textarea
				name="body"
				placeholder="Body"
				required
				className="glass-input min-h-30 resize-y"
			/>

			<label className="text-white/60 text-lg mb-2">Year: </label>
			<select name="year" required className="glass-input appearance-none">
				{Object.values(Year).map((y) => (
					<option key={y} value={y} className="bg-bg-elevated text-neutral-200">
						{y}
					</option>
				))}
			</select>

			<label className="text-white/60 text-lg mb-2">Scope: </label>
			<select
				name="scope"
				value={scope}
				onChange={(e) => setScope(e.target.value as RoundScope)}
				className="glass-input appearance-none"
			>
				{Object.values(RoundScope).map((s) => (
					<option key={s} value={s} className="bg-bg-elevated text-neutral-200">
						{s}
					</option>
				))}
			</select>

			{scope === "DOMAIN" && (
				<>
					<label className="text-white/60 text-lg mb-2">Scope: </label>
					<select
						name="domain"
						required
						className="glass-input appearance-none"
					>
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
				</>
			)}

			<button disabled={pending} className="btn w-fit">
				{pending ? "Publishing..." : "Publish"}
			</button>

			{state.error && <p className="text-sm text-red-400">{state.error}</p>}

			{state.success && (
				<p className="text-sm text-emerald-400">Published ✅</p>
			)}
		</form>
	);
}
