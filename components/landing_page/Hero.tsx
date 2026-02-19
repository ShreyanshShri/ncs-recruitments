"use client";

import { useEffect, useState } from "react";
import bgImage from "@/assets/BG.png";
import texture from "@/assets/bg2.jpg";
import NcsLogo from "@/assets/ncs-logo.png";
import Image from "next/image";
import Loader from "@/components/common/Loader";

const Hero = ({ setLoadSite }: { setLoadSite: any }) => {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const img = new window.Image();
		img.src = bgImage.src;
		img.onload = () => setLoaded(true);
	}, []);

	return (
		<div className="min-h-screen w-full relative bg-bg-dark flex items-center justify-center">
			{/* Loader */}
			{!loaded && (
				<div className="absolute inset-0 z-50 flex items-center justify-center">
					<Loader />
				</div>
			)}

			{/* Hero */}
			<div
				className={`w-full min-h-screen transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"
					}`}
				style={{
					backgroundImage: `url(${bgImage.src})`,
					backgroundSize: "cover",
					backgroundPosition: "top",
					backgroundRepeat: "no-repeat",
				}}
			>
				{/* Dark Overlay for cinematic feel */}
				<div className="absolute inset-0 bg-black/10"></div>

				<Image
					src={NcsLogo.src}
					width={80}
					height={80}
					alt="NCS Logo"
					className="
		absolute top-6 left-6
drop-shadow-[0_0_15px_rgba(212,175,55,1)]
	"
				/>
				{/* Content */}
				<div className="absolute top-[18%] lg:top-[20%] left-1/2 -translate-x-1/2 text-center">
					<h1 className="font-shuriken text-bd-dark text-4xl sm:text-4xl lg:text-[36px] xl:text-5xl tracking-wider drop-shadow-[0_5px_15px_rgba(212,175,55,0.9)]">
						ANNUAL
					</h1>
					<h1 className="font-shuriken text-bd-dark text-4xl sm:text-4xl lg:text-[36px] xl:text-5xl tracking-wider drop-shadow-[0_5px_15px_rgba(212,175,55,0.9)]">
						RECRUITMENT
					</h1>

					<h2 className="font-shuriken text-bg-dark text-3xl sm:text-4xl lg:text-[36px] xl:text-5xl drop-shadow-[0_5px_15px_rgba(212,175,55,0.9)]">
						2026
					</h2>
				</div>

				<div className="absolute bottom-[24%] lg:bottom-[12%] left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 px-4 text-center w-full">
					{/* Subtitle */}
					<p className="text-beige text-lg sm:text-xl md:text-2xl mt-12 font-serif tracking-wide">
						The Journey Begins Here
					</p>

					{/* Button */}
					<div className="border-[1.5px] border-border-red rounded-md  shadow-md animate-pulse mt-2">
						<button
							className="m-0.5 px-5 py-2 text-lg font-bold text-deep-brown cursor-pointer"
							style={{
								backgroundImage: `url(${texture.src})`,
								backgroundSize: "cover",
								backgroundPosition: "center",
							}}
							onClick={() => setLoadSite(true)}
						>
							BEGIN YOUR JOURNEY
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
