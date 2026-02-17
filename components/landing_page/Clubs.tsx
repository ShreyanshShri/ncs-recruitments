"use client";

import { useEffect, useRef } from "react";
import ClubCard from "./ClubCard";

const clubsData = [
	{
		title: "Programming Club",
		icon: "</>",
		description:
			"Master logic, data structures, and algorithms through problem-solving and competitive programming challenges.",
		gradient: "bg-gradient-to-br from-red-500/20 to-orange-500/20",
	},
	{
		title: "Development Club",
		icon: "🧩",
		description:
			"Build real-world web applications using modern frameworks and tools while learning full-stack development practices.",
		gradient: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20",
	},
	{
		title: "Design Club",
		icon: "🎨",
		description:
			"Explore UI/UX principles, visual storytelling, and creative design to craft beautiful and intuitive digital experiences.",
		gradient: "bg-gradient-to-br from-purple-500/20 to-pink-500/20",
	},
	{
		title: "AI / ML Club",
		icon: "🤖",
		description:
			"Dive into Artificial Intelligence and Machine Learning by training models, analyzing data, and building intelligent systems.",
		gradient: "bg-gradient-to-br from-green-500/20 to-emerald-500/20",
	},
];

const Clubs = () => {
	const refs = useRef<(HTMLDivElement | null)[]>([]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.remove("opacity-0", "translate-y-20");
						entry.target.classList.add("opacity-100", "translate-y-0");
					}
				});
			},
			{ threshold: 0.2 },
		);

		refs.current.forEach((ref) => ref && observer.observe(ref));

		return () => observer.disconnect();
	}, []);

	return (
		<div className="relative py-24 px-6 bg-beige overflow-hidden">
			{/* Header */}
			<div className="text-center mb-24 relative z-10">
				<h2 className="text-4xl md:text-5xl font-shuriken tracking-widest text-primary-red mb-6">
					OUR CLUBS
				</h2>
				<p className="max-w-3xl mx-auto font-shuriken text-bg-dark/70 text-lg leading-relaxed">
					Discover specialized communities where innovation meets creativity.
					Learn, build, and grow together through hands-on projects.
				</p>
			</div>

			{/* Timeline Container */}
			<div className="relative max-w-6xl mx-auto">
				{/* Center Line */}
				<div className="absolute left-1/2 top-0 bottom-0 w-1 bg-primary-red/20 -translate-x-1/2 hidden md:block" />

				<div className="space-y-12 md:space-y-24">
					{clubsData.map((club, index) => (
						<div
							key={index}
							ref={(el) => {
								refs.current[index] = el;
							}}
							className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-0 opacity-0 translate-y-20 transition-all duration-1000 ease-out ${
								index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
							}`}
						>
							{/* Content Side (45%) */}
							<div className="w-full md:w-[45%]">
								<ClubCard
									title={club.title}
									icon={club.icon}
									gradient={club.gradient}
									description={club.description}
								/>
							</div>

							{/* Center Dot (10%) - Absolute positioning for perfect centering */}
							<div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center w-10 h-10">
								<div className="w-4 h-4 md:w-6 md:h-6 bg-primary-red rounded-full border-4 border-beige z-10 shadow-lg" />
							</div>

							{/* Empty Side (45%) */}
							<div className="hidden md:block md:w-[45%]" />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Clubs;
