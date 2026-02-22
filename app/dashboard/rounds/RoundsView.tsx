import { RoundCard } from "@/components/dashboard/RoundCard";

export default function RoundsPage({ data }: any) {
	const { commonRounds, roundsByDomain } = data;

	return (
		<div className="space-y-10">
			{commonRounds.length > 0 && (
				<div className="space-y-4">
					<h3 className="text-lg font-shuriken text-beige/80">Common</h3>

					<div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
						{commonRounds.map((round: any) => (
							<div
								key={round.id}
								className="rounded-2xl bg-beige text-bg-dark p-6 border-2 border-primary-red"
							>
								<RoundCard round={round} />
							</div>
						))}
					</div>
				</div>
			)}

			{Object.entries(roundsByDomain).map(([domain, rounds]: any) => (
				<div key={domain} className="space-y-4">
					<h3 className="text-lg font-shuriken text-beige/80">{domain}</h3>

					<div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
						{rounds.map((round: any) => (
							<div
								key={round.id}
								className="rounded-2xl bg-beige text-bg-dark p-6 border-2 border-primary-red"
							>
								<RoundCard round={round} />
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
}
