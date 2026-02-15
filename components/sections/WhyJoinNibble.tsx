"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WhyJoinNibbleCard from "@/components/why-join-nibble/WhyJoinNibbleCard";

gsap.registerPlugin(ScrollTrigger);

const CARD_DATA = [
	{
		title: "Build Real Systems",
		description: "Work on real production-grade platforms.",
	},
	{
		title: "Elite Engineering Culture",
		description: "Collaborate with serious engineers.",
	},
	{
		title: "Ship Cinematic Interfaces",
		description: "Create Awwwards-level web experiences.",
	},
	{
		title: "Accelerate Your Growth",
		description: "Become industry ready.",
	},
];

export default function WhyJoinNibble() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const pinRef = useRef<HTMLDivElement>(null);
	// 1. Correctly type the array ref
	const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

	useLayoutEffect(() => {
		const section = sectionRef.current;
		const pin = pinRef.current;
		// 2. Filter out nulls to get the actual elements for GSAP
		const cards = cardsRef.current.filter(
			(el): el is HTMLDivElement => el !== null,
		);

		if (!section || !pin || cards.length === 0) return;

		const scrollDistance = window.innerHeight * (cards.length - 1);

		gsap.set(section, {
			height: window.innerHeight + scrollDistance,
		});

		gsap.set(cards, {
			yPercent: 120,
			scale: 1,
		});

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: section,
				start: "top top",
				end: `+=${scrollDistance}`,
				scrub: true,
				pin: pin,
				anticipatePin: 1,
				invalidateOnRefresh: true,
			},
		});

		cards.forEach((card, index) => {
			tl.to(
				card,
				{
					yPercent: 0,
					ease: "none",
				},
				index,
			);

			if (index > 0) {
				tl.to(
					cards.slice(0, index),
					{
						scale: 0.92 - index * 0.03,
						ease: "none",
					},
					index,
				);
			}
		});

		return () => {
			if (ScrollTrigger.getById("why-join-trigger")) {
				ScrollTrigger.getById("why-join-trigger")?.kill();
			}
		};
	}, []);

	return (
		<section ref={sectionRef} className="relative w-full bg-black">
			<div
				ref={pinRef}
				className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
			>
				{/* Container for the cards */}
				<div className="relative w-full max-w-4xl h-100 md:h-125 px-6">
					{CARD_DATA.map((card, index) => (
						<WhyJoinNibbleCard
							key={index}
							// 3. Populate the ref array by index (Fixes ESLint error)
							ref={(el) => {
								cardsRef.current[index] = el;
							}}
							index={index}
							title={card.title}
							description={card.description}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
