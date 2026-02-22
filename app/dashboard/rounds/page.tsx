import { requireUser } from "@/app/lib/auth";
import { getDashboardData } from "../data";
import RoundsView from "./RoundsView";

export default async function RoundsPage() {
	const session = await requireUser();
	const data = await getDashboardData(session.userId);

	return <RoundsView data={data} />;
}
