import { requireAdmin } from "@/app/lib/auth";
import Link from "next/link";
import { logout } from "@/app/lib/session";
import { StartRoundsButton } from "@/components/admin/StartRoundButton";

export default async function NewRoundPage() {
	await requireAdmin();

	return (
		<div className="relative min-h-screen overflow-hidden bg-[#100807] text-[#f1dcc0]">
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(170,30,19,0.55),transparent_45%)]" />
			<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.25),rgba(0,0,0,0.75))]" />

			<div className="relative mx-auto max-w-3xl px-4 py-20 sm:px-6">
				<div className="rounded-3xl border border-[#7d2118]/70 bg-gradient-to-b from-[#2b1412]/85 to-[#170b0a]/90 p-8 shadow-[0_30px_70px_rgba(0,0,0,0.55)] space-y-8">
					<div className="space-y-3">
						<p className="text-xs tracking-[0.35em] text-[#ffc58f] font-shuriken">
							NCS ADMIN PANEL
						</p>
						<h1 className="text-4xl sm:text-5xl font-shuriken text-[#f8e8cb]">
							Recruitment Control Center
						</h1>
						<p className="text-[#f1dcc0]/75">
							Manage rounds, question banks, and recruitment flow from one place.
						</p>
					</div>

					<div className="flex flex-wrap gap-4">
						<form action={logout}>
							<button className="rounded-lg border border-[#913128] px-6 py-3 text-sm font-medium text-[#f1dcc0] hover:bg-[#7f2018]/25 transition-all">
								Logout
							</button>
						</form>
						<div className="rounded-lg border border-[#9c6a35] bg-[linear-gradient(180deg,#d2a061,#a56c35)] px-4 py-1.5 text-sm font-semibold text-[#1a0d0b] flex items-center">
							Admin Access
						</div>
					</div>

					<div className="grid gap-4 sm:grid-cols-2">
						<div className="rounded-2xl border border-[#7c3428]/55 bg-[#150b09]/60 p-5 space-y-4">
							<h2 className="text-xl font-shuriken text-[#f4b679]">Round Workflow</h2>
							<div className="[&>button]:w-full [&>button]:rounded-lg [&>button]:border [&>button]:border-[#9c6a35] [&>button]:bg-[linear-gradient(180deg,#d2a061,#a56c35)] [&>button]:px-5 [&>button]:py-2.5 [&>button]:text-sm [&>button]:font-semibold [&>button]:text-[#1a0d0b]">
								<StartRoundsButton />
							</div>
							<Link
								href="/admin/rounds"
								className="inline-flex w-full justify-center rounded-lg border border-[#d18549]/60 px-5 py-2.5 text-sm font-medium text-[#f1dcc0] hover:bg-[#7f2018]/20 transition-all"
							>
								Manage Rounds
							</Link>
						</div>

						<div className="rounded-2xl border border-[#7c3428]/55 bg-[#150b09]/60 p-5 space-y-4">
							<h2 className="text-xl font-shuriken text-[#f4b679]">Question Bank</h2>
							<p className="text-sm text-[#f1dcc0]/75">
								Create and organize questions for technical and aptitude rounds.
							</p>
							<Link
								href="/admin/questions"
								className="inline-flex w-full justify-center rounded-lg border border-[#d18549]/60 px-5 py-2.5 text-sm font-medium text-[#f1dcc0] hover:bg-[#7f2018]/20 transition-all"
							>
								Open Questions
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
