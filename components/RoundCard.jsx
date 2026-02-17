import React from "react";
import texture from "@/assets/bg2.jpg";

export default function RoundCard({ title, subtitle, unlocked = false }) {
	return (
		<div className="relative border-2 border-borderRed bg-bgDark/70 px-6 py-5 w-full max-w-sm shadow-[0_0_25px_rgba(176,50,44,0.35)]">
			{/* Title */}
			<h3 className="text-beige font-serif tracking-widest text-lg">{title}</h3>

			{/* Subtitle */}
			<p className="text-lightBeige text-sm mt-1 tracking-wide">{subtitle}</p>

			{/* Action */}
			<div className="mt-4">
				{unlocked ? (
					<div className="border border-borderRed inline-block">
						<button
							className="px-5 py-2 text-sm font-semibold backdrop:blur-sm text-deepBrown"
							style={{
								backgroundImage: `url(${texture.src})`,
								backgroundSize: "cover",
							}}
						>
							BEGIN TEST
						</button>
					</div>
				) : (
					<div className="flex items-center justify-center gap-2 text-borderRed text-sm tracking-widest">
						🔒 LOCKED
					</div>
				)}
			</div>
		</div>
	);
}
