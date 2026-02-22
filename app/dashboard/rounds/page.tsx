import { requireUser } from "@/app/lib/auth";
import { getRoundsData } from "../data";
import RoundsView from "./RoundsView";

export default async function RoundsPage() {
	const session = await requireUser();
	const data = await getRoundsData(session.userId);

	return <RoundsView data={data} />;
}
