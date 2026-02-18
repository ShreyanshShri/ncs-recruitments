const AboutNcs = () => {
	return (
		<div id="AboutNcs" className="bg-beige px-12">
			<section className="py-16 space-y-8">
				<div className="text-center space-y-3 mb-12">
					<h2 className="text-4xl font-shuriken text-primary-red">
						About NCS Community
					</h2>
					<p className="text-bg-dark/80 max-w-2xl mx-auto font-sans text-[20px] font-bold tracking-wider">
						Join the leading tech community at JSS dedicated to fostering
						innovation and excellence.
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-6">
					{[
						{ stat: "Legacy", label: "Built on Years of Technical Excellence" },
						{ stat: "Culture", label: "Focused on Growth & Collaboration" },
						{ stat: "Impact", label: "From Learning to Real-World Solutions" },
					].map((item, idx) => (
						<div
							key={idx}
							className="bg-linear-to-br from-primary-red/30 to-primary-red/10 backdrop-blur-sm border border-beige/20 rounded-2xl p-8 text-center hover:border-primary-red/50 transition-all duration-300 font-sans font-bold"
						>
							<p className="text-2xl font-shuriken text-primary-red mb-2">
								{item.stat}
							</p>
							<p className="text-bg-dark/80 font-sans font-bold tracking-wide text-lg">
								{item.label}
							</p>
						</div>
					))}
				</div>
			</section>
		</div>
	);
};

export default AboutNcs;
