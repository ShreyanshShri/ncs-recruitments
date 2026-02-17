import Link from "next/link";
import { Round, RoundType } from "@/types/db";

type Props = {
	round: Round;
};

export function RoundCard({ round }: Props) {
	const isMcq = round.type === RoundType.MCQ;

	return (
		<div className="border p-4 rounded-xl space-y-3">
			<h3 className="font-semibold">{round.title}</h3>

			<p className="text-sm">Type: {round.type}</p>

			{round.startTime && (
				<p className="text-sm">Starts: {round.startTime.toLocaleString()}</p>
			)}

			{round.endTime && (
				<p className="text-sm">Ends: {round.endTime.toLocaleString()}</p>
			)}

			{/* ACTIONS */}
			<div className="flex gap-2 pt-2">
				{isMcq && (
					<Link
						href={`/dashboard/mcq/${round.id}`}
						className="border px-3 py-1 rounded text-sm"
					>
						Start MCQ
					</Link>
				)}

				<Link href={`/dashboard/result/${round.id}`}>
					<button className="border px-3 py-1 rounded text-sm cursor-pointer">
						View Result
					</button>
				</Link>
			</div>
		</div>
	);
}
