import bgImage from "@/assets/bg-secondary.png";
import WindScene from "./WindScene";

const Secondary_Hero = () => {
	return (
		<>
			<section
				id="Secondary_Hero"
				className="relative min-h-screen overflow-hidden bg-bg-dark flex items-center justify-center px-6 text-center"
				style={{
					backgroundImage: `url(${bgImage.src})`,
					backgroundSize: "cover",
					backgroundPosition: "top",
					backgroundRepeat: "no-repeat",
				}}
			>
				<div className="absolute inset-0 bg-black/75 backdrop-blur-[2px]"></div>
				{/* <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/40 to-black/20 backdrop-blur-[2px]"></div> */}
				<WindScene particle_count={180} contrast={true} />
				<div className="relative z-20 space-y-6">
					{/* MAIN TITLE */}
					<h1 className="hero-fade-drop font-shuriken text-4xl sm:text-5xl md:text-5xl lg:text-6xl tracking-wide bg-linear-to-b from-beige to-beige/70 bg-clip-text text-transparent">
						NIBBLE COMPUTER SOCIETY
					</h1>

					<div className="mx-auto h-0.5 w-24 bg-primary-red hero-fade-drop [animation-delay:0.15s]" />

					<p className="hero-fade-rise text-lg sm:text-xl md:text-2xl text-beige font-bold tracking-widest [animation-delay:0.25s]">
						We Design, We Code, We Develop
						<span className="block mt-4">Since 2000</span>
					</p>
				</div>
			</section>
		</>
	);
};

export default Secondary_Hero;
