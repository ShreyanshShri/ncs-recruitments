"use client";

import { useEffect, useRef } from "react";

const items = [
	{
		date: "22 Feb 2026",
		title: "Round 1 – Online MCQ",
		desc: "First Year • Aptitude + Club MCQs",
	},
	{
		date: "23 Feb 2026",
		title: "Technical Proficiency – Programming",
		desc: "First Year • Coding + Group Discussion",
	},
	{
		date: "24 Feb 2026",
		title: "Technical Proficiency – Dev / AIML / Design",
		desc: "First Year • Practical rounds + GD",
	},
	{
		date: "24 Feb 2026",
		title: "Resume Shortlisting",
		desc: "Second Year • Resume based screening",
	},
	{
		date: "25 Feb 2026",
		title: "Technical Interviews",
		desc: "First & Second Year • Domain evaluation",
	},
	{
		date: "25 Feb 2026",
		title: "HR Round",
		desc: "First & Second Year • Final selection",
	},
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
		<section
			className="relative py-24 pt-20 bg-bg-dark text-beige font-shuriken"
			id="timeline"
		>
			<div className="text-center mb-16 space-y-2">
				<h2 className="text-3xl text-primary-red">Event Timeline</h2>
				<p className="text-beige/80 text-sm ">23–25 Feb 2026 • 4:45–6:45 PM</p>
				<p className="text-primary-red text-sm">
					AB1 Computer Centre — Labs 1,2,3,4
				</p>
			</div>

			<div className="relative">
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
			</div>
		</section>
	);
}
