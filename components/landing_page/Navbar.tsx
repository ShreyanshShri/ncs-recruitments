"use client";

import { useState } from "react";
import Image from "next/image";
import ncsLogo from "@/assets/ncs-logo.png";
import { Menu, X, Volume2, VolumeX } from "lucide-react";
import Link from "next/link";

interface NavbarProps {
	isPlaying?: boolean;
	toggleMusic?: () => void;
}

export default function Navbar({ isPlaying, toggleMusic }: NavbarProps) {
	const [open, setOpen] = useState(false);

	return (
		<nav className="fixed top-0 left-0 w-full z-30">
			<div className="relative flex items-center justify-end px-6 py-4 bg-black/20 backdrop-blur-sm">
				{/* LOGO */}
				<Link href="/" className="absolute left-6 top-1/2 -translate-y-1/2">
					<Image
						src={ncsLogo}
						alt="NCS Logo"
						height={40}
						width={160}
						className="h-10 w-auto object-contain"
						priority
					/>
				</Link>

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

				{/* MUSIC TOGGLE */}
				{toggleMusic && (
					<button
						onClick={toggleMusic}
						className="text-beige hover:text-primary-red transition mr-4 md:mr-0 md:ml-6"
					>
						{isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
					</button>
				)}

				{/* MOBILE TOGGLE */}
				<button onClick={() => setOpen(!open)} className="md:hidden text-beige">
					{open ? <X size={26} /> : <Menu size={26} />}
				</button>
			</div>

			{/* MOBILE MENU */}
			<div
				className={`md:hidden transition-all duration-300 overflow-hidden ${open ? "max-h-60" : "max-h-0"
					} bg-bg-dark/95 backdrop-blur-lg`}
			>
				<ul className="flex flex-col items-center gap-6 py-6 text-beige text-sm tracking-widest">
					<a
						// onClick={() => setOpen(false)}
						href="https://hackncs.in"
						className="font-shuriken hover:text-primary-red transition cursor-pointer"
					>
						ABOUT US
					</a>

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
