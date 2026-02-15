"use client";

import React, { useRef } from "react";
import gsap from "gsap";

type PillarCardProps = {
	title: string;
	description: string;
};

export default function PillarCard({ title, description }: PillarCardProps) {
	const cardRef = useRef<HTMLDivElement>(null);
	const glowRef = useRef<HTMLDivElement>(null);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!cardRef.current || !glowRef.current) return;

		const rect = cardRef.current.getBoundingClientRect();

		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const centerX = rect.width / 2;
		const centerY = rect.height / 2;

		const rotateX = -(y - centerY) / 12;
		const rotateY = (x - centerX) / 12;

		// Tilt effect
		gsap.to(cardRef.current, {
			rotationX: rotateX,
			rotationY: rotateY,
			transformPerspective: 800,
			duration: 0.4,
			ease: "power2.out",
		});

		// Glow follows cursor
		gsap.to(glowRef.current, {
			x: x - rect.width / 2,
			y: y - rect.height / 2,
			duration: 0.4,
			ease: "power2.out",
		});
	};

	const handleMouseLeave = () => {
		if (!cardRef.current || !glowRef.current) return;

		gsap.to(cardRef.current, {
			rotationX: 0,
			rotationY: 0,
			duration: 0.6,
			ease: "power3.out",
		});

		gsap.to(glowRef.current, {
			x: 0,
			y: 0,
			duration: 0.6,
			ease: "power3.out",
		});
	};

	return (
		<div
			ref={cardRef}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			className="
        relative

        group

        p-8
        md:p-10

        rounded-2xl

        border border-white/8

        bg-white/2
        backdrop-blur-xl

        transition-colors duration-300

        hover:border-white/18
        hover:bg-white/4

        cursor-pointer

        overflow-hidden
      "
		>
			{/* Cursor Glow */}
			<div
				ref={glowRef}
				className="
          absolute

          top-1/2
          left-1/2

          w-40
          h-40

          bg-white/10

          rounded-full

          blur-3xl

          opacity-0
          group-hover:opacity-100

          transition-opacity duration-300

          pointer-events-none
        "
				style={{
					transform: "translate(-50%, -50%)",
				}}
			/>

			{/* Content */}
			<div className="relative z-10">
				{/* Title */}
				<h3
					className="
            text-white

            text-xl
            md:text-2xl

            font-semibold

            tracking-tight
          "
				>
					{title}
				</h3>

				{/* Description */}
				<p
					className="
            mt-3

            text-sm
            md:text-base

            text-white/60

            leading-relaxed
          "
				>
					{description}
				</p>
			</div>
		</div>
	);
}
