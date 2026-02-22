import { requireUser } from "@/app/lib/auth";
import { getDashboardData } from "../data";
import NotificationsView from "./NotificationsView";

export default async function RoundsPage() {
	const session = await requireUser();
	const data = await getDashboardData(session.userId);

	return <NotificationsView data={data} />;
}
