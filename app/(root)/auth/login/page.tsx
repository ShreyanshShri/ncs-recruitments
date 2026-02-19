"use client";

import Navbar from "@/components/landing_page/Navbar";
import Footer from "@/components/landing_page/Footer";
import { useActionState, useEffect } from "react";
import { login } from "@/app/actions/auth";
import Link from "next/link";

export default function Login() {
	const initialState = { error: "" };

	const [state, action, isPending] = useActionState(login, initialState);

	useEffect(() => {
		if (state?.redirectTo) {
			window.location.href = state.redirectTo;
		}
	}, [state]);

	const inputStyle =
		"w-full rounded-lg bg-bg-dark/60 border border-border-red px-4 py-3 text-sm text-light-beige placeholder:text-light-beige/40 focus:outline-none focus:ring-2 focus:ring-primary-red transition";

	return (
		<>
			<Navbar />

			<div className="min-h-screen flex items-center justify-center bg-bg-dark px-6 py-10 font-sans">
				<form action={action} className="w-full max-w-md space-y-6">
					<h1 className="text-beige text-3xl text-center font-shuriken">
						Login
					</h1>

					{/* EMAIL */}
					<input
						name="email"
						type="email"
						autoComplete="email"
						placeholder="Email"
						required
						className={inputStyle}
					/>

					{/* DOB PASSWORD */}
					<input
						name="password"
						type="date"
						autoComplete="bday"
						required
						className={inputStyle}
					/>

					{/* ERROR */}
					{state?.error && (
						<p className="text-sm text-primary-red text-center">
							{state.error}
						</p>
					)}

					{/* SUBMIT */}
					<button
						type="submit"
						disabled={isPending}
						className="w-full rounded-lg bg-primary-red py-3 text-light-beige tracking-widest hover:bg-dark-red disabled:bg-border-red transition font-shuriken"
					>
						{isPending ? "LOGGING IN..." : "LOGIN"}
					</button>

					<Link
						href="/auth/register"
						className="block text-center text-beige text-xs font-light font-shuriken"
					>
						Don’t have an account? <span className="underline">Register</span>
					</Link>
				</form>
			</div>

			<Footer />
		</>
	);
}
