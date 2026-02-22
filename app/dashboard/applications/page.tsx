import { requireUser } from "@/app/lib/auth";
import { getDashboardData } from "../data";
import ApplicationsView from "./ApplicationsView";

export default async function ApplicationsPage() {
	const session = await requireUser();
	const data = await getDashboardData(session.userId);

	return <ApplicationsView data={data} />;
}
