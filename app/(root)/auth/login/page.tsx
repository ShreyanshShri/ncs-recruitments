"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/auth";

export default function Login() {
	const initialState = { error: "" };
	const [state, action, isPending] = useActionState(login, initialState);

	return (
		<form action={action} className="space-y-4 flex flex-col max-w-sm">
			<input
				name="email"
				type="email"
				placeholder="Email"
				className="border p-2 rounded"
				required
			/>
			<input
				name="password"
				type="password"
				placeholder="Password"
				className="border p-2 rounded"
				required
			/>

			{state?.error && <p className="text-red-500 text-sm">{state.error}</p>}

			<button
				type="submit"
				disabled={isPending}
				className="bg-blue-500 text-white p-2 rounded disabled:bg-gray-400"
			>
				{isPending ? "Logging in..." : "Login"}
			</button>
		</form>
	);
}
