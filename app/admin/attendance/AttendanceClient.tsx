"use client";

import { useActionState, useState, useRef } from "react";
import { markAttendance, MarkAttendanceState } from "@/app/actions/attendance";
import { Scanner } from "@yudiel/react-qr-scanner";

const initialState: MarkAttendanceState = {
	success: false,
	message: "",
};

export default function AttendanceClient({ rounds }: any) {
	const [selectedRound, setSelectedRound] = useState("");
	const [lastScanned, setLastScanned] = useState<string | null>(null);

	const [state, action, pending] = useActionState(markAttendance, initialState);

	const formRef = useRef<HTMLFormElement>(null);
	const userIdRef = useRef<HTMLInputElement>(null);

	const handleScan = (results: any[]) => {
		if (!results?.length || !selectedRound) return;

		const value = results[0].rawValue;

		// 🔒 prevent same QR firing repeatedly
		if (value === lastScanned) return;
		setLastScanned(value);

		userIdRef.current!.value = value;
		formRef.current?.requestSubmit();
	};

	return (
		<div className="p-6 space-y-6">
			{/* round selector */}
			<select
				className="input"
				value={selectedRound}
				onChange={(e) => setSelectedRound(e.target.value)}
			>
				<option value="">Select round</option>
				{rounds.map((r: any) => (
					<option key={r.id} value={r.id}>
						{r.title}
					</option>
				))}
			</select>

			{/* scanner */}
			{selectedRound && (
				<div className="max-w-md">
					<Scanner
						onScan={handleScan}
						onError={(e) => console.error(e)}
						constraints={{ facingMode: "environment" }}
					/>
				</div>
			)}

			{/* hidden form */}
			<form ref={formRef} action={action} className="hidden">
				<input name="roundId" value={selectedRound} readOnly />
				<input name="userId" ref={userIdRef} readOnly />
			</form>

			{/* status */}
			{state.message && (
				<div className="text-sm">{pending ? "Marking..." : state.message}</div>
			)}
		</div>
	);
}
