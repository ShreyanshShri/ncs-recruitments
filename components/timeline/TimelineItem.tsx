"use client";

import React, { useRef } from "react";
import SectionReveal from "@/components/ui/SectionReveal";

type TimelineItemProps = {
	date: string;
	events: string[];
	index: number;
};

export default function TimelineItem({
	date,
	events,
	index,
}: TimelineItemProps) {
	const isLeft = index % 2 === 0;

	const nodeRef = useRef<HTMLDivElement>(null);

	return (
		<div className="relative flex items-center justify-center">
			{/* LEFT SIDE */}
			<div className="w-1/2 flex justify-end pr-10">
				{isLeft && (
					<SectionReveal delay={0.1}>
						<div
							className="
                relative

                max-w-md

                p-6
                md:p-8

                rounded-xl

                border border-white/10

                bg-white/3
                backdrop-blur-xl

                hover:border-white/20

                transition-all duration-300
              "
						>
							{/* Date */}
							<h3
								className="
                text-white
                text-lg
                md:text-xl
                font-semibold
              "
							>
								{date}
							</h3>

							{/* Events */}
							<ul className="mt-4 space-y-2">
								{events.map((event, i) => (
									<li key={i} className="text-white/60 text-sm md:text-base">
										{event}
									</li>
								))}
							</ul>
						</div>
					</SectionReveal>
				)}
			</div>

			{/* CENTER NODE */}
			<div
				ref={nodeRef}
				className="
          absolute

          left-1/2
          -translate-x-1/2

          w-4
          h-4

          rounded-full

          bg-white

          shadow-[0_0_10px_rgba(255,255,255,0.6)]

          z-10
        "
			/>

			{/* RIGHT SIDE */}
			<div className="w-1/2 flex justify-start pl-10">
				{!isLeft && (
					<SectionReveal delay={0.1}>
						<div
							className="
                relative

                max-w-md

                p-6
                md:p-8

                rounded-xl

                border border-white/10

                bg-white/3
                backdrop-blur-xl

                hover:border-white/20

                transition-all duration-300
              "
						>
							{/* Date */}
							<h3
								className="
                text-white
                text-lg
                md:text-xl
                font-semibold
              "
							>
								{date}
							</h3>

							{/* Events */}
							<ul className="mt-4 space-y-2">
								{events.map((event, i) => (
									<li key={i} className="text-white/60 text-sm md:text-base">
										{event}
									</li>
								))}
							</ul>
						</div>
					</SectionReveal>
				)}
			</div>
		</div>
	);
}
