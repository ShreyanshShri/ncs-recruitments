"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export default function NavLink({
	href,
	segment,
	label,
	onClick,
}: {
	href: string;
	segment: string;
	label: string;
	onClick?: () => void;
}) {
	const active = useSelectedLayoutSegment() === segment;

	return (
		<Link
			href={href}
			onClick={onClick}
			className={`block rounded-lg px-4 py-2 font-shuriken border transition
      ${
				active
					? "bg-primary-red border-primary-red"
					: "border-border-red hover:bg-primary-red/20"
			}`}
		>
			{label}
		</Link>
	);
}
