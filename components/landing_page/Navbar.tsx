"use client";

import { useState } from "react";
import Image from "next/image";
import ncsLogo from "@/assets/ncs-logo.png";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
	const [open, setOpen] = useState(false);

	return (
		<nav className="fixed top-0 left-0 w-full z-30">
			<div className="flex items-center justify-between px-6 py-4 bg-black/20 backdrop-blur-sm">
				{/* LOGO */}
				<Image
					src={ncsLogo}
					alt="NCS Logo"
					height={40}
					width={160}
					className="h-10 w-auto object-contain"
					priority
				/>

				{/* DESKTOP MENU */}
				<ul className="hidden md:flex items-center gap-10 text-beige text-sm tracking-widest">
					<Link
						// href="/about"
						href="https://hackncs.in"
						className="font-shuriken hover:text-primary-red transition cursor-pointer"
					>
						ABOUT US
					</Link>

					<Link
						href="/auth/register"
						className="font-shuriken hover:text-primary-red transition cursor-pointer"
					>
						REGISTER
					</Link>
				</ul>

				{/* MOBILE TOGGLE */}
				<button onClick={() => setOpen(!open)} className="md:hidden text-beige">
					{open ? <X size={26} /> : <Menu size={26} />}
				</button>
			</div>

			{/* MOBILE MENU */}
			<div
				className={`md:hidden transition-all duration-300 overflow-hidden ${
					open ? "max-h-60" : "max-h-0"
				} bg-bg-dark/95 backdrop-blur-lg`}
			>
				<ul className="flex flex-col items-center gap-6 py-6 text-beige text-sm tracking-widest">
					<li
						onClick={() => setOpen(false)}
						className="font-shuriken hover:text-primary-red transition cursor-pointer"
					>
						ABOUT US
					</li>

					<Link
						href="/auth/register"
						className="font-shuriken hover:text-primary-red transition cursor-pointer"
						onClick={() => setOpen(false)}
					>
						REGISTER
					</Link>
				</ul>
			</div>
		</nav>
	);
}
