"use client";

import { useEffect, useState } from "react";
import bgImage from "@/assets/BG.png";
import texture from "@/assets/bg2.jpg";

const Hero = ({ setLoadSite }: { setLoadSite: any }) => {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const img = new Image();
		img.src = bgImage.src;
		img.onload = () => setLoaded(true);
	}, []);

	return (
		<div
			className={`min-h-screen w-full flex flex-col items-center justify-end text-center relative
      transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
			style={{
				backgroundImage: `url(${bgImage.src})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
			}}
		>
			{/* Dark Overlay for cinematic feel */}
			<div className="absolute inset-0 bg-black/10"></div>

			{/* Content */}
			<div className="mb-16">
				<div className="relative">
					{/* Title */}
					<h1 className="font-shuriken text-beige text-2xl sm:text-6xl md:text-5xl tracking-wider drop-shadow-[0_5px_15px_rgba(212,175,55,0.9)]">
						RECRUITMENT
					</h1>

					<h2 className="font-shuriken text-beige text-3xl sm:text-5xl md:text-6xl drop-shadow-[0_5px_15px_rgba(212,175,55,0.9)]">
						2026
					</h2>
				</div>

				<div className="relative z-10 flex flex-col items-center px-4">
					{/* Subtitle */}
					<p className="text-beige text-lg sm:text-xl md:text-2xl mt-12 font-serif tracking-wide">
						The Journey Begins Here
					</p>

					{/* Button */}
					<div className=" border-borderRed rounded-md  shadow-md animate-pulse-soft mt-2">
						{/* <Link href="/auth/register"> */}
						<button
							className="m-0.5 px-5 py-2 text-lg font-semibold text-deep-brown cursor-pointer"
							style={{
								backgroundImage: `url(${texture.src})`,
								backgroundSize: "cover",
								backgroundPosition: "center",
							}}
							onClick={() => setLoadSite(true)}
						>
							BEGIN YOUR JOURNEY
						</button>
						{/* </Link> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
