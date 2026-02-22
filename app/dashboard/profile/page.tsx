import { requireUser } from "@/app/lib/auth";
import { getProfileData } from "../data";
import ProfileView from "./ProfileView";

export default async function ProfilePage() {
	const session = await requireUser();
	const data = await getProfileData(session.userId);
	console.log(data);
	return <ProfileView user={data} />;
}
