"use client";

import React from "react";
import GridBackground from "@/components/ui/GridBackground";
import SectionReveal from "@/components/ui/SectionReveal";
import PillarCard from "@/components/pillars/PillarCard";

const pillars = [
	{
		title: "Development",
		description:
			"Build full-stack applications, scalable platforms, and real-world software systems.",
	},
	{
		title: "AI / ML",
		description:
			"Design intelligent systems, train machine learning models, and work on cutting-edge AI.",
	},
	{
		title: "Design",
		description:
			"Craft world-class UI/UX, product interfaces, and immersive digital experiences.",
	},
	{
		title: "Programming",
		description:
			"Master data structures, algorithms, and competitive programming at elite level.",
	},
];

export default function PillarsSection() {
	return (
		<section
			className="
        relative
        w-full

        min-h-[80vh]

        flex
        items-center
        justify-center

        bg-black

        px-6
        md:px-10
        lg:px-16

        overflow-hidden
      "
		>
			{/* Grid Background */}
			<GridBackground />

			{/* Content Container */}
			<div
				className="
          relative
          z-10

          max-w-6xl
          w-full

          mx-auto

          text-center
        "
			>
				{/* Section Label */}
				<SectionReveal>
					<span
						className="
              text-[11px]
              md:text-xs

              uppercase
              tracking-[0.4em]

              text-white/40
            "
					>
						Domains
					</span>
				</SectionReveal>

				{/* Section Heading */}
				<SectionReveal delay={0.1}>
					<h2
						className="
              mt-6

              text-3xl
              sm:text-4xl
              md:text-5xl
              lg:text-6xl

              font-semibold

              tracking-tight

              text-white
            "
					>
						Choose Your Domain
					</h2>
				</SectionReveal>

				{/* Pillars Grid */}
				<div
					className="
            mt-16

            grid

            grid-cols-1
            sm:grid-cols-2

            gap-6
            md:gap-8
          "
				>
					{pillars.map((pillar, index) => (
						<SectionReveal key={pillar.title} delay={0.15 + index * 0.1}>
							<PillarCard
								title={pillar.title}
								description={pillar.description}
							/>
						</SectionReveal>
					))}
				</div>
			</div>
		</section>
	);
}
