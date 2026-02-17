"use client";

import { useState } from "react";
import Spline from "@splinetool/react-spline";

export default function HeroBackground() {
	const [isSplineLoaded, setIsSplineLoaded] = useState(false);

	return (
		<div className="absolute inset-0 z-0 w-full h-full overflow-hidden bg-black select-none">
			{/* Spline Scene */}
			<div
				className={`
          absolute inset-0 w-full h-full scale-[1.1] transition-opacity duration-[1.5s] ease-in-out
          ${isSplineLoaded ? "opacity-100" : "opacity-0"}
        `}
			>
				<Spline
					className="w-full h-full"
					scene="https://prod.spline.design/epRk5J3rZZYI1UHE/scene.splinecode"
					onLoad={() => setIsSplineLoaded(true)}
					onMouseMove={() => console.log("Spline mouse move working")}
				/>
			</div>

			{/* Loading Fallback */}
			<div
				className={`
          absolute inset-0 flex items-center justify-center transition-opacity duration-700
          ${isSplineLoaded ? "opacity-0 pointer-events-none" : "opacity-100"}
        `}
			>
				<div className="w-125 h-125 bg-blue-900/20 rounded-full blur-[100px] animate-pulse" />
			</div>

			{/* Vignette */}
			<div
				className="
          absolute inset-0 pointer-events-none z-10
          bg-[radial-gradient(circle_at_50%_50%,transparent_10%,rgba(0,0,0,0.6)_90%)]
        "
			/>

			{/* Gradients */}
			<div className="absolute top-0 inset-x-0 h-32 bg-linear-to-b from-black/80 via-black/20 to-transparent pointer-events-none z-10" />
			<div className="absolute bottom-0 inset-x-0 h-40 bg-linear-to-t from-black via-black/60 to-transparent pointer-events-none z-10" />

			{/* Noise Texture */}
			<div
				className="absolute inset-0 opacity-[0.04] pointer-events-none z-20 mix-blend-overlay"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
				}}
			/>
		</div>
	);
}
