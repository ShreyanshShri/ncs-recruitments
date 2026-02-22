import { requireUser } from "@/app/lib/auth";
import { getDashboardData } from "../data";
import ProfileView from "./ProfileView";

export default async function ProfilePage() {
	const session = await requireUser();
	const data = await getDashboardData(session.userId);

	return <ProfileView data={data} />;
}
