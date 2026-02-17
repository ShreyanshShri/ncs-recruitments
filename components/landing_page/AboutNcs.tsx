const AboutNcs = () => {
	return (
		<div id="AboutNcs" className="bg-beige px-12">
			<section className="py-16 space-y-8">
				<div className="text-center space-y-3 mb-12">
					<h2 className="text-4xl font-shuriken text-primary-red">
						About NCS Community
					</h2>
					<p className="text-bg-dark text-lg max-w-2xl mx-auto">
						Join the leading tech community at JSS dedicated to fostering
						innovation and excellence
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-6">
					{[
						{ stat: "500+", label: "Active Members" },
						{ stat: "50+", label: "Projects Completed" },
						{ stat: "100%", label: "Success Rate" },
					].map((item, idx) => (
						<div
							key={idx}
							className="bg-linear-to-br from-primary-red/20 via-primary-red/10 backdrop-blur-sm border border-beige/20 rounded-2xl p-8 text-center hover:border-primary-red/50 transition-all duration-300"
						>
							<p className="text-4xl font-shuriken text-primary-red mb-2">
								{item.stat}
							</p>
							<p className="text-dark/80 font-medium">{item.label}</p>
						</div>
					))}
				</div>
			</section>
		</div>
	);
};

export default AboutNcs;
