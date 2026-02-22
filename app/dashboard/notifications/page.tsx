import { requireUser } from "@/app/lib/auth";
import { getNotificationsData } from "../data";
import NotificationsView from "./NotificationsView";

export default async function NotificationPage() {
	const session = await requireUser();
	const data = await getNotificationsData(session.userId);

	return <NotificationsView data={data} />;
}
