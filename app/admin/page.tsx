import { requireAdmin } from "@/app/lib/auth";
import { getAdminStats } from "@/app/lib/adminStats";
import { StatCard, ChartCard } from "@/components/admin/HomeUIElements";
import DomainPieChart from "../lib/charts/DomainPieChart";
import RegistrationsLineChart from "../lib/charts/RegistrationsLineChart";
import Link from "next/link";

export default async function AdminHomePage() {
	await requireAdmin();
	const stats = await getAdminStats();

	const pieData = stats.domainApplications.map((d) => ({
		name: d.domain,
		value: d._count,
	}));

	return (
		<div className="space-y-6">
			{/* 🔷 TOP */}
			<div className="grid grid-cols-3 gap-4">
				<Link href="/admin/registrations">
					<StatCard title="Total Registrations" value={stats.totalUsers} />
				</Link>

				<StatCard title="Total Applications" value={stats.totalApplications} />

				<StatCard
					title="Total Rounds"
					value={stats.totalRounds}
					subtitle={`${stats.activeRounds} active • ${stats.completedRounds} completed`}
				/>
			</div>

			{/* 🔷 DOMAIN */}
			<div className="grid grid-cols-4 gap-4">
				{stats.domainApplications.map((d) => (
					<StatCard key={d.domain} title={`${d.domain}`} value={d._count} />
				))}
			</div>

			{/* 🔷 EVALUATION */}
			<div className="grid grid-cols-2 gap-4">
				<StatCard title="Evaluated" value={stats.evaluatedSubmissions} />
				<StatCard title="Pending Evaluation" value={stats.pendingEvaluations} />
			</div>

			{/* 🔷 CHARTS */}
			<div className="grid grid-cols-2 gap-4">
				<ChartCard title="Applications by Domain">
					<DomainPieChart data={pieData} />
				</ChartCard>

				<ChartCard title="Day-wise Registrations">
					<RegistrationsLineChart
						data={stats.registrationsByDay.map((r) => ({
							date: r.createdAt.toISOString().split("T")[0],
							count: r._count,
						}))}
					/>
				</ChartCard>
			</div>
		</div>
	);
}
