import { requireUser } from "@/app/lib/auth";
import { logout } from "@/app/lib/session";
import { getDashboardData } from "./data";
import { ApplicationCard } from "@/components/dashboard/ApplicationCard";
import { RoundCard } from "@/components/dashboard/RoundCard";

export default async function Dashboard() {
	const session = await requireUser();

	const { applications, availableDomains, roundsByDomain, user } =
		await getDashboardData(session.userId);

	return (
		<div className="p-6 space-y-10">
			<div className="flex justify-between">
				<h1 className="text-2xl font-bold">Welcome {user?.name}</h1>

				<form action={logout}>
					<button className="border px-3 py-1 rounded">Logout</button>
				</form>
			</div>

			{/* APPLICATIONS */}
			<section className="space-y-4">
				<h2 className="text-xl font-semibold">Your Applications</h2>
				{applications.length === 0 && <p>No applications yet</p>}
				<div className="grid grid-cols-3 gap-4">
					{applications.map((app, id) => (
						<ApplicationCard key={id} type="applied" application={app} />
					))}
				</div>
			</section>

			{/* AVAILABLE DOMAINS */}
			{availableDomains.length > 0 && (
				<section className="space-y-4">
					<h2 className="text-xl font-semibold">Apply to a Domain</h2>

					<div className="grid grid-cols-3 gap-4">
						{availableDomains.map((domain) => (
							<ApplicationCard key={domain} type="available" domain={domain} />
						))}
					</div>
				</section>
			)}

			{/* ACTIVE ROUNDS */}
			<section className="space-y-4">
				<h2 className="text-xl font-semibold">Upcoming / Active Rounds</h2>

				{Object.entries(roundsByDomain).map(([domain, rounds]) => (
					<div key={domain} className="space-y-2">
						<h3 className="font-bold">{domain}</h3>

						<div className="grid grid-cols-3 gap-4">
							{rounds?.map((round) => (
								<RoundCard key={round.id} round={round} />
							))}
						</div>
					</div>
				))}
			</section>
		</div>
	);
}
