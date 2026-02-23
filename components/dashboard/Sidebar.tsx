"use client";

import { useState } from "react";
import NavLink from "@/components/dashboard/NavLink";

export default function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
	const [locked, setLocked] = useState(false);

	const handleNavigate = () => {
		if (locked) return;

		setLocked(true);
		onNavigate?.();

		setTimeout(() => {
			setLocked(false);
		}, 4000);
	};

	return (
		<aside className="w-64 h-full bg-bg-dark border-r border-border-red p-4 space-y-3">
			<NavLink
				href="/dashboard/applications"
				segment="applications"
				label="Applications"
				onClick={handleNavigate}
				disabled={locked}
			/>

			<NavLink
				href="/dashboard/rounds"
				segment="rounds"
				label="Rounds"
				onClick={handleNavigate}
				disabled={locked}
			/>

			<NavLink
				href="/dashboard/notifications"
				segment="notifications"
				label="Notifications"
				onClick={handleNavigate}
				disabled={locked}
			/>

			<NavLink
				href="/dashboard/profile"
				segment="profile"
				label="Profile"
				onClick={handleNavigate}
				disabled={locked}
			/>
		</aside>
	);
}
