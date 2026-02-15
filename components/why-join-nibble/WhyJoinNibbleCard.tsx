"use client";

import React, { forwardRef } from "react";

type WhyJoinNibbleCardProps = {
	title: string;
	description: string;
	index: number;
};

const WhyJoinNibbleCard = forwardRef<HTMLDivElement, WhyJoinNibbleCardProps>(
	({ title, description, index }, ref) => {
		return (
			<div
				ref={ref}
				className="absolute inset-0 w-full h-full flex flex-col justify-center p-8 md:p-12 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300"
				style={{ zIndex: index }}
			>
				<span className="text-white/30 font-mono text-sm mb-4">
					0{index + 1}
				</span>
				<h3 className="text-white text-3xl md:text-5xl font-bold tracking-tight mb-4">
					{title}
				</h3>
				<p className="text-white/60 text-lg md:text-xl max-w-md">
					{description}
				</p>
			</div>
		);
	},
);

WhyJoinNibbleCard.displayName = "WhyJoinNibbleCard";

export default WhyJoinNibbleCard;
