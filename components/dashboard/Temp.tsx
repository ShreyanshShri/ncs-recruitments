const Temp = () => {
	return (
		<div id="Temp">
			<div className="bg-gradient-to-r from-primary-red/20 via-primary-red/10 to-transparent backdrop-blur-sm border border-primary-red/30 rounded-3xl p-12 space-y-6">
				<div className="space-y-3">
					<h2 className="text-3xl font-shuriken text-beige">
						Join Our Recruitment Drive
					</h2>
					<p className="text-beige/80 text-lg max-w-2xl">
						We&apos;re looking for talented individuals to join our teams.
						Showcase your skills and be part of something amazing.
					</p>
				</div>

				<div className="flex flex-wrap gap-4">
					<button className="px-8 py-3 bg-primary-red text-bg-dark font-shuriken rounded-xl hover:shadow-lg hover:shadow-primary-red/50 transition-all duration-300">
						Apply Now
					</button>
					<button className="px-8 py-3 border border-beige/30 text-beige font-shuriken rounded-xl hover:border-primary-red hover:bg-primary-red/10 transition-all duration-300">
						Learn More
					</button>
				</div>
			</div>

			{/*  */}

			<section className="py-16 space-y-8">
				<div className="text-center space-y-3 mb-12">
					<h2 className="text-4xl font-shuriken text-primary-red">
						About NCS Community
					</h2>
					<p className="text-beige/70 text-lg max-w-2xl mx-auto">
						Join the leading tech community at VIIT dedicated to fostering
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
							className="bg-gradient-to-br from-beige/10 to-beige/5 backdrop-blur-sm border border-beige/20 rounded-2xl p-8 text-center hover:border-primary-red/50 transition-all duration-300"
						>
							<p className="text-4xl font-shuriken text-primary-red mb-2">
								{item.stat}
							</p>
							<p className="text-beige/80 font-medium">{item.label}</p>
						</div>
					))}
				</div>
			</section>
		</div>
	);
};

export default Temp;
