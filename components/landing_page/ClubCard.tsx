import { ReactNode } from "react";

type ClubCardProps = {
	title: string;
	description: string;
	gradient: string; // tailwind gradient classes
	icon: ReactNode;
};

export default function ClubCard({
	title,
	description,
	gradient,
	icon,
}: ClubCardProps) {
	return (
		<div className="group relative rounded-2xl p-px transition duration-500 hover:-translate-y-3 will-change-transform">
			{/* Gradient Border */}
			<div className={`absolute inset-0 rounded-2xl ${gradient}`} />

			{/* Card */}
			<div className="relative h-full rounded-2xl border-2 border-border-red bg-bg-dark/80 backdrop-blur-md p-8 text-center shadow-[0_0_30px_rgba(0,0,0,0.6)]">
				{/* Floating Icon */}
				<div className="absolute -top-10 left-1/2 -translate-x-1/2">
					<div
						className={`w-20 h-20 rounded-full border-2 border-border-red flex items-center justify-center shadow-[0_0_25px_rgba(255,255,255,0.15)] ${gradient} bg-bg-dark/80`}
					>
						<div className="text-3xl text-light-beige">{icon}</div>
					</div>
				</div>

				{/* Content */}
				<div className="pt-12">
					<h3 className="text-xl font-semibold text-light-beige tracking-wide mb-3 font-shuriken">
						{title}
					</h3>

					<p className="text-sm text-light-beige/70 leading-relaxed ">
						{description}
					</p>
				</div>

				{/* Hover Glow */}
				<div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100 shadow-[0_0_40px_rgba(176,50,44,0.35)]" />
			</div>
		</div>
	);
}
