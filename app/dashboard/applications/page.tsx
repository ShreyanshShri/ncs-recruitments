import { requireUser } from "@/app/lib/auth";
import { getApplicationsData } from "../data";
import ApplicationsView from "./ApplicationsView";

export default async function ApplicationsPage() {
	const session = await requireUser();
	const data = await getApplicationsData(session.userId);

	return <ApplicationsView data={data} />;
}
