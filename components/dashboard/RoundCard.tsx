import Link from "next/link";
import { RoundType } from "@/types/db";
import { RoundWithStatus } from "@/app/dashboard/data";

type Props = {
	round: RoundWithStatus;
};

export function RoundCard({ round }: Props) {
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
						className="border border-primary-red px-2 py-1 pt-2 rounded text-xs font-shuriken font-medium hover:bg-primary-red hover:text-light-beige transition"
					>
						Start MCQ
					</Link>
				)}

				{round.type === RoundType.RESUME && (
					<Link
						href={`/dashboard/resume/${round.id}`}
						className="border border-primary-red px-2 py-1 pt-2 rounded text-xs font-shuriken font-medium hover:bg-primary-red hover:text-light-beige transition"
					>
						Submit Resume
					</Link>
				)}

				<Link
					href={`/dashboard/result/${round.id}`}
					className="border border-primary-red px-2 py-1 pt-2 rounded text-xs font-shuriken font-medium hover:bg-primary-red hover:text-light-beige transition"
				>
					View Result
				</Link>
			</div>
		</div>
	);
}
