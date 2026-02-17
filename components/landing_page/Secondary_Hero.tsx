import WindScene from "./WindScene";

const Secondary_Hero = () => {
	return (
		<>
			<section
				id="Secondary_Hero"
				className="relative min-h-screen overflow-hidden bg-bg-dark flex items-center justify-center px-6 text-center"
			>
				<WindScene particle_count={180} contrast={true} />
				<div className="relative z-20 space-y-6">
					{/* MAIN TITLE */}
					<h1 className="font-shuriken text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-beige tracking-wide">
						NIBBLE COMPUTING SOCIETY
					</h1>

					{/* ACCENT LINE */}
					<div className="mx-auto h-0.5 w-24 bg-primary-red" />

					{/* SUBHEADING */}
					<p className="text-lg sm:text-xl md:text-2xl text-beige/80 font-medium tracking-widest">
						Inspiring Minds • Since 2000
					</p>
				</div>
			</section>
		</>
	);
};

export default Secondary_Hero;
