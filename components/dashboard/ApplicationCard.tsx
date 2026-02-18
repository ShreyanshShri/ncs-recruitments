"use client";

import { Application, Domain } from "@/types/db";

type Props =
	| {
			type: "applied";
			application: Application;
	  }
	| {
			type: "available";
			domain: Domain;
			onApplyClick: (domain: Domain) => void;
	  };

export function ApplicationCard(props: Props) {
	if (props.type === "applied") {
		return <AppliedCard application={props.application} />;
	}

	return (
		<AvailableCard domain={props.domain} onApplyClick={props.onApplyClick} />
	);
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

function AvailableCard({
	domain,
	onApplyClick,
}: {
	domain: Domain;
	onApplyClick: (domain: Domain) => void;
}) {
	return (
		<div className="p-4 rounded-xl space-y-2">
			<h3 className="font-shuriken font-medium">{domain}</h3>

			<button
				onClick={() => onApplyClick(domain)}
				className="cursor-pointer border border-primary-red px-3 py-1 rounded font-shuriken font-medium text-[12px] hover:text-beige hover:bg-primary-red transition"
			>
				Apply
			</button>
		</div>
	);
}
