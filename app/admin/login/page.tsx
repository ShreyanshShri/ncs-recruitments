"use client";

import { useActionState, useEffect } from "react";
import { login } from "@/app/actions/admin-login";

export default function AdminLogin() {
	const initialState = { error: "" };

	const [state, action, isPending] = useActionState(login, initialState);

	useEffect(() => {
		if (state?.redirectTo) {
			window.location.href = state.redirectTo;
		}
	}, [state]);

	return (
		<div className="flex items-center justify-center bg-bg-dark px-6 py-10 font-sans">
			<form action={action} className="w-full max-w-md space-y-6">
				<h1 className="opacity-90 text-3xl text-center font-bold">
					Admin Login
				</h1>

				{/* EMAIL */}
				<input
					name="email"
					type="email"
					autoComplete="email"
					placeholder="Email"
					required
					className="glass-input w-full"
				/>

				{/* PASSWORD */}
				<input
					name="password"
					type="password"
					autoComplete="current-password"
					placeholder="Password"
					required
					className="glass-input w-full"
				/>

				{/* ERROR */}
				{state?.error && (
					<p className="text-sm text-primary-red text-center">{state.error}</p>
				)}

				{/* SUBMIT */}
				<button type="submit" disabled={isPending} className="btn w-full">
					{isPending ? "LOGGING IN..." : "LOGIN"}
				</button>
			</form>
		</div>
	);
}
