"use client";

import { useActionState } from "react";
import { Application, Domain } from "@/types/db";
import { applyToDomain } from "@/app/actions/dashboard";

type Props =
	| {
			type: "applied";
			application: Application;
	  }
	| {
			type: "available";
			domain: Domain;
	  };

export function ApplicationCard(props: Props) {
	if (props.type === "applied") {
		return <AppliedCard application={props.application} />;
	}

	return <AvailableCard domain={props.domain} />;
}

/* ---------------- APPLIED ---------------- */

function AppliedCard({ application }: { application: Application }) {
	return (
		<div className="p-4 rounded-xl space-y-2">
			<h3 className="font-shuriken font-medium">{application.domain}</h3>
			<p className="text-sm">Status: SUBMITTED</p>
		</div>
	);
}

/* ---------------- AVAILABLE ---------------- */

type ApplyState = {
	success: boolean;
	message: string;
};

const initialState: ApplyState = {
	success: false,
	message: "",
};

function AvailableCard({ domain }: { domain: Domain }) {
	const [state, formAction, pending] = useActionState(
		applyToDomain,
		initialState,
	);

	// ✅ instant UI switch after success (no refresh needed)
	if (state.success) {
		return (
			<div className="p-4 rounded-xl space-y-2">
				<h3 className="font-shuriken font-medium">{domain}</h3>
				<p className="text-sm">Status: SUBMITTED</p>
			</div>
		);
	}

	return (
		<div className="p-4 rounded-xl space-y-2">
			<h3 className="font-shuriken font-medium">{domain}</h3>

			<form action={formAction} className="space-y-1">
				<input type="hidden" name="domain" value={domain} />

				<button
					disabled={pending}
					className="cursor-pointer border border-primary-red px-3 py-1 rounded font-shuriken font-medium text-[12px] disabled:opacity-50 hover:text-beige hover:bg-primary-red transition"
				>
					{pending ? "Applying..." : "Apply"}
				</button>

				{state.message && (
					<p
						className={`text-xs ${
							state.success ? "text-green-500" : "text-primary-red"
						}`}
					>
						{state.message}
					</p>
				)}
			</form>
		</div>
	);
}
