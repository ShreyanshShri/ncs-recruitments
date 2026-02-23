"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export default function NavLink({
	href,
	segment,
	label,
	onClick,
	disabled,
}: {
	href: string;
	segment: string;
	label: string;
	onClick?: () => void;
	disabled?: boolean;
}) {
	const active = useSelectedLayoutSegment() === segment;

	return (
		<Link
			href={disabled ? "" : href}
			onClick={(e) => {
				if (disabled) e.preventDefault();
				else onClick?.();
			}}
			aria-disabled={disabled}
			className={`block rounded-lg px-4 py-2 font-shuriken border transition
        ${
					active
						? "bg-primary-red border-primary-red"
						: "border-border-red hover:bg-primary-red/20"
				}
        ${disabled ? "pointer-events-none opacity-40 cursor-not-allowed" : ""}
      `}
		>
			{label}
		</Link>
	);
}
