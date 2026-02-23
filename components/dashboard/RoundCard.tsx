"use client";

import Link from "next/link";
import { RoundType } from "@/types/db";
import { RoundWithStatus } from "@/app/dashboard/data";
import { useState } from "react";

type Props = {
	round: RoundWithStatus;
};

export function RoundCard({ round }: Props) {
	const [locked, setLocked] = useState(false);

	const handleClick = () => {
		if (locked) return;

		setLocked(true);

		setTimeout(() => {
			setLocked(false);
		}, 4000);
	};

	const base =
		"border border-primary-red px-2 py-1 pt-2 rounded text-xs font-shuriken font-medium transition";

	const enabled = "hover:bg-primary-red hover:text-light-beige";

	const disabled = "pointer-events-none opacity-40 cursor-not-allowed";

	return (
		<div className="space-y-3">
			{/* TITLE */}
			<h3 className="font-shuriken text-lg text-primary-red tracking-wide">
				{round.title}
			</h3>

			{/* META */}
			<div className="space-y-1 text-sm font-medium text-bg-dark/80">
				<p className="font-bold mb-2">
					Type: <span className="text-primary-red">{round.type}</span>
				</p>

				{round.startTime && (
					<p>
						<span className="font-bold">Starts:</span>{" "}
						{new Date(round.startTime).toLocaleString("en-GB", {
							day: "2-digit",
							month: "2-digit",
							year: "numeric",
							hour: "2-digit",
							minute: "2-digit",
							hour12: true,
						})}
					</p>
				)}

				{round.endTime && (
					<p>
						<span className="font-bold">Ends:</span>{" "}
						{new Date(round.endTime).toLocaleString("en-GB", {
							day: "2-digit",
							month: "2-digit",
							year: "numeric",
							hour: "2-digit",
							minute: "2-digit",
							hour12: true,
						})}
					</p>
				)}

				{round.submissionStatus && (
					<p className="mt-2 font-bold font-sans">
						Status:{" "}
						<span className="text-primary-red/90">
							{round.submissionStatus === "NOT_STARTED"
								? "NOT_SUBMITTED"
								: round.submissionStatus}
						</span>
					</p>
				)}
			</div>

			{/* ACTIONS */}
			<div className="flex gap-2 pt-2">
				{round.type === RoundType.MCQ && (
					<Link
						href={`/mcq/${round.id}`}
						onClick={handleClick}
						className={`${base} ${locked ? disabled : enabled}`}
					>
						Start MCQ
					</Link>
				)}

				{round.type === RoundType.RESUME && (
					<Link
						href={`/dashboard/resume/${round.id}`}
						onClick={handleClick}
						className={`${base} ${locked ? disabled : enabled}`}
					>
						Submit Resume
					</Link>
				)}

				<Link
					href={`/dashboard/result/${round.id}`}
					onClick={handleClick}
					className={`${base} ${locked ? disabled : enabled}`}
				>
					View Result
				</Link>
			</div>
		</div>
	);
}
