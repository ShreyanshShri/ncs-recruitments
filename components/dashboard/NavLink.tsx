"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export default function NavLink({
	href,
	label,
	segment,
}: {
	href: string;
	label: string;
	segment: string;
}) {
	const active = useSelectedLayoutSegment() === segment;

	return (
		<Link
			href={href}
			className={`block px-4 py-2 rounded-lg font-shuriken transition
				${active ? "bg-primary-red text-beige" : "hover:bg-bg-dark/60 text-beige/80"}`}
		>
			{label}
		</Link>
	);
}
