"use client";

import { useActionState, useState, useEffect } from "react";
import { signup } from "@/app/actions/auth";
import Link from "next/link";

import Navbar from "@/components/landing_page/Navbar";
import Footer from "@/components/landing_page/Footer";

interface FormState {
	error?: string;
	success?: boolean;
	redirectTo?: string;
}

const initialState: FormState = {};

export default function SignupForm() {
	const [step, setStep] = useState<1 | 2>(1);
	const [state, formAction, isPending] = useActionState(signup, initialState);

	const [step1Data, setStep1Data] = useState({
		name: "",
		email: "",
		dob: "",
	});

	useEffect(() => {
		if (state?.redirectTo) window.location.href = state.redirectTo;
	}, [state]);

	const inputStyle =
		"w-full rounded-lg bg-bg-dark/60 border border-border-red px-4 py-3 text-sm text-light-beige placeholder:text-light-beige/40 focus:outline-none focus:ring-2 focus:ring-primary-red transition";

	return (
		<>
			<Navbar />

			<div className="min-h-screen flex items-center justify-center bg-bg-dark px-6 py-10 font-sans pt-20">
				<form action={formAction} className="w-full max-w-md space-y-6">
					<h1 className="text-beige text-3xl text-center font-shuriken">
						Register
					</h1>

					<StepIndicator step={step} />

					<input
						type="hidden"
						name="step"
						value={step === 1 ? "step1" : "final"}
					/>

					{/* ================= STEP 1 ================= */}
					{step === 1 && (
						<>
							<input
								name="name"
								placeholder="Name"
								required
								className={inputStyle}
								value={step1Data.name}
								onChange={(e) =>
									setStep1Data({ ...step1Data, name: e.target.value })
								}
							/>

							<input
								name="email"
								type="email"
								autoComplete="email"
								placeholder="Email"
								required
								className={inputStyle}
								value={step1Data.email}
								onChange={(e) =>
									setStep1Data({ ...step1Data, email: e.target.value })
								}
							/>

							<input
								type="date"
								name="password"
								autoComplete="bday"
								required
								className={inputStyle}
								value={step1Data.dob}
								onChange={(e) =>
									setStep1Data({ ...step1Data, dob: e.target.value })
								}
							/>

							<button
								type="button"
								onClick={() => setStep(2)}
								className="w-full rounded-lg bg-primary-red py-3 text-light-beige tracking-widest hover:bg-dark-red transition font-shuriken"
							>
								NEXT
							</button>
						</>
					)}

					{/* ================= STEP 2 ================= */}
					{step === 2 && (
						<>
							<input type="hidden" name="name" value={step1Data.name} />
							<input type="hidden" name="email" value={step1Data.email} />
							<input type="hidden" name="password" value={step1Data.dob} />

							<input
								name="rollNumber"
								placeholder="Roll Number"
								required
								className={inputStyle}
							/>

							<input
								name="mobile"
								placeholder="Mobile Number"
								required
								className={inputStyle}
							/>

							<select name="institution" required className={inputStyle}>
								<option value="">Institution</option>
								<option value="AKTU">AKTU</option>
								<option value="JSSUNI">JSSUNI</option>
							</select>

							<select name="year" required className={inputStyle}>
								<option value="">Year</option>
								<option value="FIRST">1st</option>
								<option value="SECOND">2nd</option>
							</select>

							<select name="branch" required className={inputStyle}>
								<option value="">Branch</option>
								<option value="CSE">CSE</option>
								<option value="CSE_AIML">CSE AIML</option>
								<option value="CSE_DS">CSE DS</option>
								<option value="IT">IT</option>
								<option value="ECE">ECE</option>
								<option value="MECHANICAL">MECHANICAL</option>
								<option value="RAI">RAI</option>
								<option value="EEE">EEE</option>
								<option value="EE">EE</option>
								<option value="CIVIL">CIVIL</option>
							</select>

							<input
								name="linkedIn"
								placeholder="LinkedIn Profile (Optional)"
								className={inputStyle}
							/>

							<div className="flex gap-3">
								<button
									type="button"
									onClick={() => setStep(1)}
									className="w-full rounded-lg border border-border-red py-3 text-light-beige hover:bg-deep-brown transition font-shuriken"
								>
									BACK
								</button>

								<button
									type="submit"
									disabled={isPending}
									className="w-full rounded-lg bg-primary-red py-3 text-light-beige tracking-widest hover:bg-dark-red disabled:bg-border-red transition font-shuriken"
								>
									{isPending ? "CREATING ACCOUNT..." : "SIGN UP"}
								</button>
							</div>
						</>
					)}

					{state?.error && (
						<p className="text-sm text-primary-red text-center">
							{state.error}
						</p>
					)}

					<Link
						href="/auth/login"
						className="text-beige text-[12px] font-light font-shuriken block text-center"
					>
						Already have an account? <span className="underline">Login</span>
					</Link>
				</form>
			</div>

			<Footer />
		</>
	);
}

function StepIndicator({ step }: { step: 1 | 2 }) {
	return (
		<div className="flex items-center justify-center gap-3 mb-10">
			<div
				className={`h-4 w-4 rounded-full transition-colors duration-500 ${
					step >= 1 ? "bg-beige" : "bg-deep-brown"
				}`}
			/>

			<div className="relative h-0.5 w-20 bg-deep-brown overflow-hidden rounded">
				<div
					className={`absolute inset-y-0 left-0 bg-beige transition-all duration-500 ${
						step === 2 ? "w-full" : "w-0"
					}`}
				/>
			</div>

			<div
				className={`h-4 w-4 rounded-full transition-colors duration-500 ${
					step === 2 ? "bg-beige" : "bg-deep-brown"
				}`}
			/>
		</div>
	);
}
