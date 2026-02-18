"use client";

import { useEffect, useRef, useState } from "react";

type Status = "active" | "completed" | "upcoming" | "pending";

const statusStyles: Record<Status, { label: string; class: string }> = {
	active: {
		label: "Active",
		class: "bg-primary-red text-beige border border-primary-red",
	},
	completed: {
		label: "Completed",
		class: "bg-beige text-bg-dark border border-beige",
	},
	upcoming: {
		label: "Upcoming",
		class: "bg-transparent text-beige border border-border-red",
	},
	pending: {
		label: "Pending",
		class: "bg-transparent text-beige/80 border border-border-red",
	},
} as const;

const items: {
	date: string;
	title: string;
	desc: string;
	status: Status;
}[] = [
	{
		date: "23 Feb 2026",
		title: "Round 1 – Online MCQ",
		desc: "First Year • Aptitude + Club MCQs",
		status: "active",
	},
	{
		date: "23 Feb 2026",
		title: "Technical Proficiency – Programming",
		desc: "First Year • Coding + Group Discussion",
		status: "upcoming",
	},
	{
		date: "24 Feb 2026",
		title: "Technical Proficiency – Dev / AIML / Design",
		desc: "First Year • Practical rounds + GD",
		status: "upcoming",
	},
	{
		date: "24 Feb 2026",
		title: "Resume Shortlisting",
		desc: "Second Year • Resume based screening",
		status: "upcoming",
	},
	{
		date: "25 Feb 2026",
		title: "Technical Interviews",
		desc: "First & Second Year • Domain evaluation",
		status: "upcoming",
	},
	{
		date: "25 Feb 2026",
		title: "HR Round",
		desc: "First & Second Year • Final selection",
		status: "upcoming",
	},
];

export default function Timeline() {
	const refs = useRef<(HTMLDivElement | null)[]>([]);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [rodHeight, setRodHeight] = useState(0);

	/* reveal animation */
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					const el = entry.target as HTMLElement;

					if (entry.isIntersecting) {
						el.classList.remove("opacity-0", "translate-y-10");
						el.classList.add("opacity-100", "translate-y-0");
					} else {
						el.classList.add("opacity-0", "translate-y-10");
						el.classList.remove("opacity-100", "translate-y-0");
					}
				});
			},
			{
				threshold: 1, // control when it triggers
			},
		);

		refs.current.forEach((ref) => ref && observer.observe(ref));

		return () => observer.disconnect();
	}, []);

	/* progress index logic */
	const activeIndex = items.findIndex((i) => i.status === "active");
	const lastCompletedIndex = items
		.map((i) => i.status)
		.lastIndexOf("completed");

	const fillIndex = activeIndex !== -1 ? activeIndex : lastCompletedIndex;

	/* measure rod height to the exact dot center */
	useEffect(() => {
		if (fillIndex === -1) return;

		const measure = () => {
			const containerTop =
				containerRef.current?.getBoundingClientRect().top ?? 0;

			const el = refs.current[fillIndex];
			if (!el) return;

			const rect = el.getBoundingClientRect();

			const dotCenter = rect.top - containerTop + rect.height / 2;

			setRodHeight(dotCenter);
		};

		measure();
		window.addEventListener("resize", measure);
		return () => window.removeEventListener("resize", measure);
	}, [fillIndex]);

	return (
		<section
			className="relative py-24 pt-20 bg-bg-dark text-beige"
			id="timeline"
		>
			<div className="text-center mb-16 space-y-2">
				<h2 className="text-3xl text-primary-red font-shuriken">
					Event Timeline
				</h2>
				<p className="text-beige/80 text-lg font-sans tracking-wider font-bold">
					23–25 Feb 2026 • 4:45–6:45 PM
				</p>
				<p className="text-primary-red text-lg font-sans font-bold tracking-wider">
					AB1 Computer Centre — Labs 1,2,3,4
				</p>
			</div>

			<div className="relative" ref={containerRef}>
				{/* base rod */}
				<div className="absolute left-1/2 top-0 h-full w-0.5 bg-border-red -translate-x-1/2" />

				{/* progress rod */}
				{fillIndex !== -1 && (
					<div
						className="absolute left-1/2 top-0 w-0.5 bg-beige -translate-x-1/2 transition-all duration-700"
						style={{ height: rodHeight }}
					/>
				)}

				<div className="max-w-5xl mx-auto space-y-8">
					{items.map((item, i) => {
						const isActive = item.status === "active";
						const isCompleted = item.status === "completed";

						return (
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
								<div
									className={`absolute left-1/2 w-4 h-4 border-4 border-bg-dark rounded-full -translate-x-1/2 z-10
									${isActive || isCompleted ? "bg-beige" : "bg-primary-red"}`}
								/>

								{/* card */}
								<div
									className={`w-[45%] p-6 rounded-xl shadow-xl transition hover:scale-105
									${
										isActive
											? "bg-beige text-bg-dark border-primary-red border-2"
											: "bg-deep-brown text-beige border-border-red border"
									}`}
								>
									<div className="flex items-center justify-between mb-2 gap-3">
										<p className="text-sm font-bold text-primary-red">
											{item.date}
										</p>

										<span
											className={`text-xs px-2.5 py-1 rounded-full font-semibold tracking-wide whitespace-nowrap
		${statusStyles[item.status].class}`}
										>
											{statusStyles[item.status].label}
										</span>
									</div>

									<h3 className="text-xl mb-2 font-bold">{item.title}</h3>

									<p
										className={`text-md ${
											isActive ? "text-bg-dark/80" : "text-beige/80"
										}`}
									>
										{item.desc}
									</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
