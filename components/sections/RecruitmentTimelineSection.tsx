"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import GridBackground from "@/components/ui/GridBackground";
import SectionReveal from "@/components/ui/SectionReveal";
import TimelineItem from "@/components/timeline/TimelineItem";

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
	{
		date: "22 February 2026",
		events: [
			"Online Aptitude and Club Based MCQ Round for First Year students",
		],
	},
	{
		date: "23 February 2026",
		events: [
			"Technical Proficiency Round for Programming Club",
			"Group Discussion for shortlisted First Year candidates",
		],
	},
	{
		date: "24 February 2026",
		events: [
			"Technical Proficiency Round for Development Club",
			"Technical Proficiency Round for AIML Club",
			"Technical Proficiency Round for Design Club",
			"Group Discussion for shortlisted First Year candidates",
			"Resume submission and shortlisting for Second Year students",
		],
	},
	{
		date: "25 February 2026",
		events: [
			"Technical Interview for shortlisted candidates",
			"HR Round",
			"Time: 4:45 PM to 6:45 PM",
			"Venue: AB1 Computer Centre",
		],
	},
];

export default function RecruitmentTimelineSection() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const spineActiveRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			if (!sectionRef.current || !spineActiveRef.current) return;

			gsap.set(spineActiveRef.current, {
				height: 0,
			});

			gsap.to(spineActiveRef.current, {
				height: "100%",
				ease: "none",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top center",
					end: "bottom center",
					scrub: true,
				},
			});
		},
		{ scope: sectionRef },
	);

	return (
		<section
			ref={sectionRef}
			className="
        relative
        w-full

        min-h-[120vh]

        bg-black

        px-6
        md:px-10
        lg:px-16

        py-32

        overflow-hidden
      "
		>
			<GridBackground />

			<div className="relative z-10 max-w-6xl mx-auto">
				<SectionReveal>
					<div className="text-center mb-24">
						<span
							className="
              text-xs
              uppercase
              tracking-[0.4em]
              text-white/40
            "
						>
							Recruitment Timeline
						</span>

						<h2
							className="
              mt-6

              text-3xl
              sm:text-4xl
              md:text-5xl
              lg:text-6xl

              font-semibold
              text-white
            "
						>
							Your Journey Into Nibble
						</h2>
					</div>
				</SectionReveal>

				<div className="relative">
					{/* Static Spine */}
					<div
						className="
            absolute
            left-1/2
            top-0
            -translate-x-1/2

            w-0.5
            h-full

            bg-white/20
          "
					/>

					{/* Active Spine */}
					<div
						ref={spineActiveRef}
						className="
              absolute
              left-1/2
              top-0
              -translate-x-1/2

              w-0.5

              bg-white

              origin-top
            "
					/>

					{/* Timeline Items */}
					<div className="space-y-32">
						{timelineData.map((item, index) => (
							<TimelineItem
								key={item.date}
								date={item.date}
								events={item.events}
								index={index}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
