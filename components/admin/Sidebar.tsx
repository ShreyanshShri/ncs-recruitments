"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export default function Sidebar() {
	const segment = useSelectedLayoutSegment();

	return (
		<aside className="border-r border-white/20 px-4 py-6 space-y-1 min-h-[calc(100vh-65px)]">
			<NavLink href="/admin/" label="Home" active={segment === null} />
			<NavLink
				href="/admin/rounds"
				label="Rounds"
				active={segment === "rounds"}
			/>
			<NavLink
				href="/admin/questions"
				label="Questions"
				active={segment === "questions"}
			/>
			<NavLink
				href="/admin/notifications"
				label="Notifications"
				active={segment === "notifications"}
			/>
		</aside>
	);
}

function NavLink({
	href,
	label,
	active,
}: {
	href: string;
	label: string;
	active: boolean;
}) {
	return (
		<Link
			href={href}
			className={`block rounded-lg px-3 py-2 text-sm transition
			${
				active
					? "bg-white/10 text-white border border-white/15"
					: "text-white/70 hover:text-white hover:bg-white/5"
			}`}
		>
			{label}
		</Link>
	);
}
