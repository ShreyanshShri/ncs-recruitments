import Link from "next/link";
import { Round, RoundType } from "@/types/db";

type Props = {
	round: Round;
};

export function RoundCard({ round }: Props) {
	const isMcq = round.type === RoundType.MCQ;

	return (
		<div className="space-y-3">
			{/* TITLE */}
			<h3 className="font-shuriken text-lg text-primary-red tracking-wide">
				{round.title}
			</h3>

			{/* META */}
			<div className="space-y-1 text-sm font-medium text-bg-dark/80">
				<p>Type: {round.type}</p>

				{round.startTime && <p>Starts: {round.startTime.toLocaleString()}</p>}

				{round.endTime && <p>Ends: {round.endTime.toLocaleString()}</p>}
			</div>

			{/* ACTIONS */}
			<div className="flex flex-wrap gap-2 pt-2">
				{isMcq && (
					<Link
						href={`/dashboard/mcq/${round.id}`}
						className="border border-primary-red px-3 py-1 rounded text-xs font-shuriken font-medium hover:bg-primary-red hover:text-light-beige transition"
					>
						Start MCQ
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
