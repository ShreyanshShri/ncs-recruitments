import NavLink from "@/components/dashboard/NavLink";

export default function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
	return (
		<aside className="w-64 h-full bg-bg-dark border-r border-border-red p-4 space-y-3">
			<NavLink
				href="/dashboard/applications"
				segment="applications"
				label="Applications"
				onClick={onNavigate}
			/>
			<NavLink
				href="/dashboard/rounds"
				segment="rounds"
				label="Rounds"
				onClick={onNavigate}
			/>
			<NavLink
				href="/dashboard/notifications"
				segment="notifications"
				label="Notifications"
				onClick={onNavigate}
			/>
			<NavLink
				href="/dashboard/profile"
				segment="profile"
				label="Profile"
				onClick={onNavigate}
			/>
		</aside>
	);
}
