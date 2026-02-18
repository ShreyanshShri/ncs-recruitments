import Link from "next/link";
import { Round, RoundType } from "@/types/db";

type Props = {
	round: Round;
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
				<p>Type: {round.type}</p>

				{round.startTime && (
					<p>
						Starts:{" "}
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
						Ends:{" "}
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
			</div>

			{/* ACTIONS */}
			<div className="flex flex-wrap gap-2 pt-2">
				{round.type === RoundType.MCQ && (
					<Link
						href={`/dashboard/mcq/${round.id}`}
						className="border border-primary-red px-3 py-1 rounded text-xs font-shuriken font-medium hover:bg-primary-red hover:text-light-beige transition"
					>
						Start MCQ
					</Link>
				)}

				{round.type === RoundType.RESUME && (
					<Link
						href={`/dashboard/resume/${round.id}`}
						className="border border-primary-red px-3 py-1 rounded text-xs font-shuriken font-medium hover:bg-primary-red hover:text-light-beige transition"
					>
						Submit Resume
					</Link>
				)}

				<Link
					href={`/dashboard/result/${round.id}`}
					className="border border-primary-red px-3 py-1 rounded text-xs font-shuriken font-medium hover:bg-primary-red hover:text-light-beige transition"
				>
					View Result
				</Link>
			</div>
		</div>
	);
}
