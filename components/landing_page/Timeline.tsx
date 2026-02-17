"use client";

import { useEffect, useRef } from "react";

const items = [
	{
		date: "Jan 2024",
		title: "Project Initiated",
		desc: "Initial planning and team formation.",
	},
	{
		date: "Feb 2024",
		title: "Design Phase",
		desc: "Wireframes and UI system created.",
	},
	{
		date: "Mar 2024",
		title: "Development",
		desc: "Core features implemented.",
	},
	{
		date: "Apr 2024",
		title: "Testing",
		desc: "Performance & usability testing.",
	},
	{ date: "May 2024", title: "Launch", desc: "Public release and onboarding." },
];

export default function Timeline() {
	const refs = useRef<(HTMLDivElement | null)[]>([]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.remove("opacity-0", "translate-y-10");
					}
				});
			},
			{ threshold: 0.2 },
		);

		refs.current.forEach((ref) => ref && observer.observe(ref));
	}, []);

	return (
		<section className="relative py-24 bg-bg-dark text-beige font-shuriken">
			{/* center line */}
			<div className="absolute left-1/2 top-0 h-full w-0.5 bg-border-red -translate-x-1/2" />

			<div className="max-w-5xl mx-auto space-y-8">
				{items.map((item, i) => (
					<div
						key={i}
						ref={(el) => {
							refs.current[i] = el;
						}}
						className={`relative flex items-center ${
							i % 2 === 0 ? "justify-start" : "justify-end"
						} opacity-0 translate-y-10 transition-all duration-700`}
					>
						{/* dot */}
						<div className="absolute left-1/2 w-4 h-4 bg-primary-red border-4 border-bg-dark rounded-full -translate-x-1/2 z-10" />

						{/* card */}
						<div className="w-[45%] bg-deep-brown border border-border-red p-6 rounded-xl shadow-xl hover:scale-105 transition">
							<p className="text-primary-red text-sm mb-1">{item.date}</p>
							<h3 className="text-light-beige text-xl mb-2">{item.title}</h3>
							<p className="text-beige/80 text-sm">{item.desc}</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
