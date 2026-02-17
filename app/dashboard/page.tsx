import { requireUser } from "@/app/lib/auth";
import { logout } from "@/app/lib/session";
import { getDashboardData } from "./data";
import { ApplicationCard } from "@/components/dashboard/ApplicationCard";
import { RoundCard } from "@/components/dashboard/RoundCard";

export default async function Dashboard() {
	const session = await requireUser();

	const { applications, availableDomains, commonRounds, roundsByDomain, user } =
		await getDashboardData(session.userId);

	return (
		<div className="min-h-screen bg-bg-dark/95 text-beige">
			<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-14">
				{/* HEADER */}
				<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<h1 className="text-3xl font-shuriken text-beige tracking-wide">
						Welcome, <span className="text-primary-red">{user?.name}</span>
					</h1>

					<form action={logout}>
						<button className="w-full sm:w-auto rounded-lg border border-border-red px-5 py-2 text-sm font-medium hover:bg-deep-brown transition  font-shuriken">
							Logout
						</button>
					</form>
				</div>

				{/* APPLICATIONS */}
				<section className="space-y-6">
					<h2 className="text-2xl font-shuriken text-primary-red tracking-wide">
						Your Applications
					</h2>

					{applications.length === 0 && (
						<p className="text-beige/70 text-base">No applications yet</p>
					)}

					<div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
						{applications.map((app, id) => (
							<div
								key={id}
								className="rounded-2xl bg-beige text-bg-dark p-6 shadow-md"
							>
								<div className="text-base font-semibold leading-relaxed">
									<ApplicationCard type="applied" application={app} />
								</div>
							</div>
						))}
					</div>
				</section>

				{/* AVAILABLE DOMAINS */}
				{availableDomains.length > 0 && (
					<section className="space-y-6">
						<h2 className="text-2xl font-shuriken text-primary-red tracking-wide">
							Apply to a Domain
						</h2>

						<div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
							{availableDomains.map((domain) => (
								<div
									key={domain}
									className="rounded-2xl bg-beige text-bg-dark p-6 shadow-md"
								>
									<div className="text-base font-semibold">
										<ApplicationCard type="available" domain={domain} />
									</div>
								</div>
							))}
						</div>
					</section>
				)}

				{/* ACTIVE ROUNDS */}
				<section className="space-y-10">
					<h2 className="text-2xl font-shuriken text-primary-red tracking-wide">
						Upcoming / Active Rounds
					</h2>

					{/* COMMON */}
					{commonRounds.length > 0 && (
						<div className="space-y-4">
							<h3 className="text-lg font-semibold text-beige/80 font-shuriken">
								Common
							</h3>

							<div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
								{commonRounds.map((round) => (
									<div
										key={round.id}
										className="rounded-2xl bg-beige text-bg-dark p-6 shadow-md"
									>
										<div className="text-base font-semibold">
											<RoundCard round={round} />
										</div>
									</div>
								))}
							</div>
						</div>
					)}

					{/* DOMAIN ROUNDS */}
					{Object.entries(roundsByDomain).map(([domain, rounds]) => (
						<div key={domain} className="space-y-4">
							<h3 className="text-lg font-semibold text-beige/80 font-shuriken">
								{domain}
							</h3>

							<div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
								{rounds.map((round) => (
									<div
										key={round.id}
										className="rounded-2xl bg-beige text-bg-dark p-6 shadow-md"
									>
										<div className="text-base font-semibold">
											<RoundCard round={round} />
										</div>
									</div>
								))}
							</div>
						</div>
					))}
				</section>
			</div>
		</div>
	);
}
