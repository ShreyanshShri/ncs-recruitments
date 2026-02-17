import { requireUser } from "@/app/lib/auth";
import { getDashboardData } from "./data";
import DashboardShell from "@/components/dashboard/DashboardShell";

export default async function DashboardPage() {
	const session = await requireUser();

	const data = await getDashboardData(session.userId);

	return <DashboardShell data={data} />;
}
