"use client";

import { useActionState } from "react"; // Changed from react-dom
import { signup } from "@/app/actions/auth";

interface FormState {
	error?: string;
	success?: boolean;
}

const initialState: FormState = {};

export default function SignupForm() {
	// 1. Rename the hook
	// 2. Added 'isPending' (the 3rd argument)
	const [state, formAction, isPending] = useActionState(signup, initialState);

	return (
		<form action={formAction} className="space-y-3">
			<input name="name" placeholder="Name" className="border p-2" />
			<input
				name="email"
				type="email"
				placeholder="Email"
				required
				className="border p-2"
			/>
			<input
				name="password"
				type="password"
				placeholder="Password"
				required
				className="border p-2"
			/>

			{state?.error && <p className="text-red-500 text-sm">{state.error}</p>}

			<button
				type="submit"
				disabled={isPending}
				className="bg-blue-500 text-white p-2 disabled:bg-gray-400"
			>
				{isPending ? "Creating Account..." : "Sign up"}
			</button>
		</form>
	);
}
