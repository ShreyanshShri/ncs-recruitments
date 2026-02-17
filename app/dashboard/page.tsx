import { requireUser } from "@/app/lib/auth";
import { logout } from "@/app/lib/session";
import { getDashboardData } from "./data";
import { ApplicationCard } from "@/components/dashboard/ApplicationCard";
import { RoundCard } from "@/components/dashboard/RoundCard";
import { Navbar } from "@/components/Navbar";
import { ClubsTimeline } from "@/components/dashboard/ClubsTimeline";

export default async function Dashboard() {
	const session = await requireUser();

	const { applications, availableDomains, commonRounds, roundsByDomain, user } =
		await getDashboardData(session.userId);

	return (
		<div className="min-h-screen bg-gradient-to-b from-bg-dark via-bg-dark/95 to-bg-dark text-beige">
			{/* NAVBAR */}
			<Navbar />

			<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-20">
				{/* WELCOME SECTION */}
				<section className="pt-10 pb-20 space-y-6">
					<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
						<div className="space-y-3">
							<h1 className="text-5xl font-shuriken text-beige tracking-wide">
								Welcome Back, <span className="text-primary-red">{user?.name}</span>
							</h1>
							<p className="text-beige/70 text-lg">
								Ready to grow with NCS? Explore opportunities and showcase your skills.
							</p>
						</div>

						<form action={logout}>
							<button className="w-full sm:w-auto rounded-xl border border-primary-red px-6 py-3 text-sm font-medium text-beige hover:bg-primary-red/10 hover:shadow-lg hover:shadow-primary-red/30 transition-all duration-300 font-shuriken">
								Logout
							</button>
						</form>
					</div>
				</section>

				{/* CLUBS TIMELINE SECTION */}
				<section className="py-10">
					<ClubsTimeline />
				</section>

				{/* ABOUT SECTION */}
				<section className="py-16 space-y-8">
					<div className="text-center space-y-3 mb-12">
						<h2 className="text-4xl font-shuriken text-primary-red">
							About NCS Community
						</h2>
						<p className="text-beige/70 text-lg max-w-2xl mx-auto">
							Join the leading tech community at VIIT dedicated to fostering innovation and excellence
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-6">
						{[
							{ stat: "500+", label: "Active Members" },
							{ stat: "50+", label: "Projects Completed" },
							{ stat: "100%", label: "Success Rate" },
						].map((item, idx) => (
							<div
								key={idx}
								className="bg-gradient-to-br from-beige/10 to-beige/5 backdrop-blur-sm border border-beige/20 rounded-2xl p-8 text-center hover:border-primary-red/50 transition-all duration-300"
							>
								<p className="text-4xl font-shuriken text-primary-red mb-2">
									{item.stat}
								</p>
								<p className="text-beige/80 font-medium">{item.label}</p>
							</div>
						))}
					</div>
				</section>

				{/* RECRUITMENT SECTION */}
				<section className="py-16 space-y-8">
					<div className="bg-gradient-to-r from-primary-red/20 via-primary-red/10 to-transparent backdrop-blur-sm border border-primary-red/30 rounded-3xl p-12 space-y-6">
						<div className="space-y-3">
							<h2 className="text-3xl font-shuriken text-beige">
								Join Our Recruitment Drive
							</h2>
							<p className="text-beige/80 text-lg max-w-2xl">
								We&apos;re looking for talented individuals to join our teams. Showcase your skills and be part of something amazing.
							</p>
						</div>

						<div className="flex flex-wrap gap-4">
							<button className="px-8 py-3 bg-primary-red text-bg-dark font-shuriken rounded-xl hover:shadow-lg hover:shadow-primary-red/50 transition-all duration-300">
								Apply Now
							</button>
							<button className="px-8 py-3 border border-beige/30 text-beige font-shuriken rounded-xl hover:border-primary-red hover:bg-primary-red/10 transition-all duration-300">
								Learn More
							</button>
						</div>
					</div>
				</section>

				{/* APPLICATIONS SECTION */}
				<section className="py-10 space-y-8">
					<div className="space-y-3">
						<h2 className="text-3xl font-shuriken text-primary-red tracking-wide">
							Your Applications
						</h2>
						<p className="text-beige/70">Track your progress across all domains</p>
					</div>

					{applications.length === 0 && (
						<div className="text-center py-12 bg-beige/5 border border-beige/10 rounded-2xl">
							<p className="text-beige/70 text-base">No applications yet. Explore available domains below!</p>
						</div>
					)}

					<div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
						{applications.map((app, id) => (
							<div
								key={id}
								className="group relative rounded-2xl bg-gradient-to-br from-beige/95 to-beige/90 text-bg-dark p-6 shadow-lg hover:shadow-2xl hover:shadow-primary-red/20 transition-all duration-300 border-l-4 border-primary-red"
							>
								<div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-red/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
								<div className="relative text-base font-semibold leading-relaxed">
									<ApplicationCard type="applied" application={app} />
								</div>
							</div>
						))}
					</div>
				</section>

				{/* AVAILABLE DOMAINS SECTION */}
				{availableDomains.length > 0 && (
					<section className="py-10 space-y-8">
						<div className="space-y-3">
							<h2 className="text-3xl font-shuriken text-primary-red tracking-wide">
								Explore Domains
							</h2>
							<p className="text-beige/70">Apply to new domains and expand your opportunities</p>
						</div>

						<div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
							{availableDomains.map((domain) => (
								<div
									key={domain}
									className="group relative rounded-2xl bg-gradient-to-br from-beige/95 to-beige/90 text-bg-dark p-6 shadow-lg hover:shadow-2xl hover:shadow-primary-red/20 transition-all duration-300 border-t-4 border-primary-red"
								>
									<div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-red/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
									<div className="relative text-base font-semibold">
										<ApplicationCard type="available" domain={domain} />
									</div>
								</div>
							))}
						</div>
					</section>
				)}

				{/* ACTIVE ROUNDS SECTION */}
				<section className="py-10 space-y-10">
					<div className="space-y-3">
						<h2 className="text-3xl font-shuriken text-primary-red tracking-wide">
							Upcoming / Active Rounds
						</h2>
						<p className="text-beige/70">Don&apos;t miss your chance to showcase your skills</p>
					</div>

					{/* COMMON ROUNDS */}
					{commonRounds.length > 0 && (
						<div className="space-y-6">
							<h3 className="text-xl font-shuriken text-beige/90 pl-4 border-l-2 border-primary-red">
								Common Rounds
							</h3>

							<div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
								{commonRounds.map((round) => (
									<div
										key={round.id}
										className="group relative rounded-2xl bg-gradient-to-br from-beige/95 to-beige/90 text-bg-dark p-6 shadow-lg hover:shadow-2xl hover:shadow-primary-red/20 transition-all duration-300"
									>
										<div className="absolute inset-0 bg-gradient-to-br from-primary-red/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
										<div className="relative text-base font-semibold">
											<RoundCard round={round} />
										</div>
									</div>
								))}
							</div>
						</div>
					)}

					{/* DOMAIN ROUNDS */}
					{Object.entries(roundsByDomain).map(([domain, rounds]) => (
						<div key={domain} className="space-y-6">
							<h3 className="text-xl font-shuriken text-beige/90 pl-4 border-l-2 border-primary-red">
								{domain} Rounds
							</h3>

							<div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
								{rounds.map((round) => (
									<div
										key={round.id}
										className="group relative rounded-2xl bg-gradient-to-br from-beige/95 to-beige/90 text-bg-dark p-6 shadow-lg hover:shadow-2xl hover:shadow-primary-red/20 transition-all duration-300"
									>
										<div className="absolute inset-0 bg-gradient-to-br from-primary-red/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
										<div className="relative text-base font-semibold">
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
