import { requireAdmin } from "@/app/lib/auth";
import Link from "next/link";
import { logout } from "@/app/lib/session";
import { StartRoundsButton } from "@/components/admin/StartRoundButton";

export default async function NewRoundPage() {
	await requireAdmin();

	return (
		<div className="max-w-2xl mx-auto py-10">
			<form action={logout}>
				<button className="border px-3 py-1 rounded">Logout</button>
			</form>
			<br />
			<StartRoundsButton />
			<Link href="/admin/rounds" className="btn">
				Rounds
			</Link>
			<br />
			<Link href="/admin/questions" className="btn">
				Questions
			</Link>
			<br />
			<Link href="/admin/notifications" className="btn">
				Notifications
			</Link>
		</div>
	);
}
