import { ApplicationCard } from "@/components/dashboard/ApplicationCard";
import ApplySection from "./ApplySection";

export default function ApplicationsView({ data }: any) {
	const { applications, availableDomains, passedDomains } = data;

	const hasApplied = applications.length > 0;

	return (
		<div className="space-y-12">
			<h2 className="text-2xl font-shuriken text-primary-red">
				Your Applications
			</h2>

			{applications.length === 0 && (
				<p className="text-beige/70">No applications yet</p>
			)}

			<div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
				{applications.map((app: any, i: number) => (
					<div
						key={i}
						className="rounded-2xl bg-beige text-bg-dark p-6 border-2 border-primary-red"
					>
						<ApplicationCard type="applied" application={app} />
					</div>
				))}
			</div>

			{!hasApplied && availableDomains.length > 0 && (
				<ApplySection availableDomains={availableDomains} />
			)}

			{passedDomains?.length > 0 && (
				<div className="flex flex-wrap gap-3">
					{passedDomains.map((d: any) => (
						<div
							key={d}
							className="px-4 py-2 rounded-lg bg-primary-red text-beige text-sm font-shuriken"
						>
							{d}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
