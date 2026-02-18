"use client";

import { useState, useEffect } from "react";

const clubsData = [
	{
		id: 1,
		name: "Machine Learning Club",
		description:
			"Dive deep into AI and machine learning algorithms. Learn from experts and build real-world ML solutions.",
	},
	{
		id: 2,
		name: "Web Development Club",
		description:
			"Master modern web technologies (React, Next.js, Node.js). Build scalable web applications and learn best practices.",
	},
	{
		id: 3,
		name: "Cybersecurity Club",
		description:
			"Explore security vulnerabilities and ethical hacking. Learn to protect systems and data from threats.",
	},
	{
		id: 4,
		name: "Data Science Club",
		description:
			"Analyze complex datasets and extract meaningful insights. Learn data visualization and statistical analysis.",
	},
	{
		id: 5,
		name: "Cloud Computing Club",
		description:
			"Master AWS, Azure, and cloud architecture. Build scalable infrastructure and serverless applications.",
	},
];

interface TypeWriterProps {
	text: string;
	isActive: boolean;
}

function TypeWriter({ text, isActive }: TypeWriterProps) {
	const [displayText, setDisplayText] = useState("");

	const charLimit = 100;
	const shouldType = isActive && displayText.length < charLimit;

	useEffect(() => {
		if (!shouldType) return;

		const timer = setTimeout(() => {
			setDisplayText((prev) => prev + text[prev.length]);
		}, 30);

		return () => clearTimeout(timer);
	}, [displayText, shouldType, text]);

	useEffect(() => {
		if (!isActive) {
			// setDisplayText("");
		}
	}, [isActive]);

	return <span>{displayText}</span>;
}

export function ClubsTimeline() {
	const [activeClub, setActiveClub] = useState<number | null>(null);

	return (
		<section className="py-16 px-4">
			<div className="max-w-7xl mx-auto">
				<h2 className="text-4xl font-shuriken text-primary-red mb-4 text-center">
					Explore Our Clubs
				</h2>
				<p className="text-center text-beige/70 mb-16 text-lg">
					Choose your path and grow with us
				</p>

				{/* Timeline Container */}
				<div className="relative">
					{/* Center Line */}
					<div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-linear-to-b from-primary-red via-primary-red to-transparent"></div>

					{/* Clubs */}
					<div className="space-y-12">
						{clubsData.map((club, idx) => (
							<div
								key={club.id}
								className={`flex items-center ${idx % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
							>
								{/* Content */}
								<div className={`w-1/2 ${idx % 2 === 0 ? "pr-12" : "pl-12"}`}>
									<div
										onMouseEnter={() => setActiveClub(club.id)}
										onMouseLeave={() => setActiveClub(null)}
										className="group cursor-pointer"
									>
										<div className="bg-linear-to-r from-beige/10 to-beige/5 backdrop-blur-sm border border-beige/20 rounded-2xl p-8 hover:border-primary-red/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary-red/20">
											<h3 className="text-2xl font-shuriken text-beige mb-3 group-hover:text-primary-red transition-colors">
												{club.name}
											</h3>
											<p className="text-beige/80 text-sm leading-relaxed h-12 overflow-hidden">
												<TypeWriter
													text={club.description}
													isActive={activeClub === club.id}
												/>
											</p>
											<div className="mt-4 flex items-center justify-between">
												<span className="text-xs text-beige/50 uppercase tracking-wider">
													Hover to learn more
												</span>
												<div className="w-8 h-8 rounded-full bg-linear-to-r from-primary-red to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
											</div>
										</div>
									</div>
								</div>

								{/* Dot */}
								<div className="w-0 flex justify-center">
									<div className="relative">
										<div className="w-6 h-6 bg-primary-red rounded-full border-4 border-bg-dark shadow-lg shadow-primary-red/50"></div>
										<div className="absolute inset-0 w-6 h-6 bg-primary-red rounded-full animate-pulse opacity-30"></div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
