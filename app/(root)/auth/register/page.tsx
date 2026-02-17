"use client";

import { useActionState, useState, useEffect } from "react";
import { signup } from "@/app/actions/auth";

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
		password: "",
	});

	useEffect(() => {
		if (state?.redirectTo) {
			window.location.href = state.redirectTo;
		}
	}, [state]);

	return (
		<form action={formAction} className="space-y-4">
			{/* hidden step tracker */}
			<input type="hidden" name="step" value={step === 1 ? "step1" : "final"} />

			{/* ================= STEP 1 ================= */}
			{step === 1 && (
				<>
					<input
						name="name"
						placeholder="Name"
						className="border p-2 w-full"
						value={step1Data.name}
						onChange={(e) =>
							setStep1Data({ ...step1Data, name: e.target.value })
						}
					/>

					<input
						name="email"
						type="email"
						placeholder="Email"
						required
						className="border p-2 w-full"
						value={step1Data.email}
						onChange={(e) =>
							setStep1Data({ ...step1Data, email: e.target.value })
						}
					/>

					<input
						name="password"
						type="password"
						placeholder="Password"
						required
						className="border p-2 w-full"
						value={step1Data.password}
						onChange={(e) =>
							setStep1Data({ ...step1Data, password: e.target.value })
						}
					/>

					<button
						type="button"
						onClick={() => setStep(2)}
						className="bg-blue-500 text-white p-2 w-full"
					>
						Next
					</button>
				</>
			)}

			{/* ================= STEP 2 ================= */}
			{step === 2 && (
				<>
					<input type="hidden" name="name" value={step1Data.name} />
					<input type="hidden" name="email" value={step1Data.email} />
					<input type="hidden" name="password" value={step1Data.password} />

					<input
						name="rollNumber"
						placeholder="Roll Number"
						required
						className="border p-2 w-full"
					/>

					<input
						name="mobile"
						placeholder="Mobile Number"
						required
						className="border p-2 w-full"
					/>

					<select name="institution" className="border p-2 w-full" required>
						<option value="">Institution</option>
						<option value="AKTU">AKTU</option>
						<option value="JSSUNI">JSSUNI</option>
					</select>

					<select name="year" className="border p-2 w-full" required>
						<option value="">Year</option>
						<option value="FIRST">1st</option>
						<option value="SECOND">2nd</option>
						<option value="THIRD">3rd</option>
						<option value="FOURTH">4th</option>
					</select>

					<select name="branch" className="border p-2 w-full" required>
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

					<div className="flex gap-2">
						<button
							type="button"
							onClick={() => setStep(1)}
							className="border p-2 w-full"
						>
							Back
						</button>

						<button
							type="submit"
							disabled={isPending}
							className="bg-blue-500 text-white p-2 w-full disabled:bg-gray-400"
						>
							{isPending ? "Creating Account..." : "Sign up"}
						</button>
					</div>
				</>
			)}

			{/* ERROR */}
			{state?.error && (
				<p className="text-red-500 text-sm text-center">{state.error}</p>
			)}
		</form>
	);
}
