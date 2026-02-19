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
		<form action={action} className="space-y-4 max-w-xl">
			<input
				name="title"
				placeholder="Title"
				className="w-full border p-2 rounded"
				required
			/>

			<textarea
				name="body"
				placeholder="Body"
				className="w-full border p-2 rounded"
				required
			/>

			<select name="year" className="w-full border p-2 rounded" required>
				{Object.values(Year).map((y) => (
					<option key={y} value={y}>
						{y}
					</option>
				))}
			</select>

			<select
				name="scope"
				className="w-full border p-2 rounded"
				value={scope}
				onChange={(e) => setScope(e.target.value as RoundScope)}
			>
				{Object.values(RoundScope).map((s) => (
					<option key={s} value={s}>
						{s}
					</option>
				))}
			</select>

			{scope === "DOMAIN" && (
				<select name="domain" className="w-full border p-2 rounded" required>
					{Object.values(Domain).map((d) => (
						<option key={d} value={d}>
							{d}
						</option>
					))}
				</select>
			)}

			<button
				disabled={pending}
				className="px-4 py-2 bg-black text-white rounded"
			>
				{pending ? "Publishing..." : "Publish"}
			</button>

			{state.error && <p className="text-red-500">{state.error}</p>}
			{state.success && <p className="text-green-600">Published ✅</p>}
		</form>
	);
}
