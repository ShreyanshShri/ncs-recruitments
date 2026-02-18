const Page = () => {
	return (
		<div className="w-full">
			{/* HERO */}
			<section className="bg-bg-dark text-beige py-24 px-6 text-center">
				<div className="max-w-5xl mx-auto space-y-6">
					<h1 className="font-shuriken text-primary-red text-4xl sm:text-6xl tracking-wider">
						NIBBLE COMPUTER SOCIETY
					</h1>

					<p className="text-lg sm:text-xl text-light-beige">
						Official technical society of the Department of Computer Science and
						Engineering at JSS Academy of Technical Education, Noida.
						Established in 2000.
					</p>
				</div>
			</section>

			{/* WHO WE ARE */}
			<section className="bg-light-beige text-bg-dark py-24 px-6">
				<div className="max-w-5xl mx-auto space-y-6">
					<h2 className="font-shuriken text-3xl text-dark-red">Who We Are</h2>

					<p>
						Nibble Computer Society is a student driven technical community that
						represents the academic and innovative spirit of the department. It
						is a space where curiosity is converted into systems, ideas become
						projects, and learning extends far beyond the classroom.
					</p>

					<p>
						For more than two decades, the society has cultivated a culture of
						collaboration, technical depth, and consistency. Members work
						together, build together, and grow together.
					</p>
				</div>
			</section>

			{/* WHAT WE DO */}
			<section className="bg-bg-dark text-beige py-24 px-6">
				<div className="max-w-5xl mx-auto space-y-12">
					<h2 className="font-shuriken text-3xl text-primary-red">
						What We Do
					</h2>

					<div className="space-y-8 text-light-beige">
						<p>
							Technical sessions, project based learning, and hands on
							exploration of modern technologies that strengthen core
							fundamentals and practical understanding.
						</p>

						<p>
							Active participation in competitive programming, hackathons, and
							development driven events that promote discipline, problem
							solving, and long term growth.
						</p>

						<p>
							A mentorship culture where every batch contributes to the next,
							ensuring continuity of knowledge and a strong community
							foundation.
						</p>
					</div>
				</div>
			</section>

			{/* LEGACY */}
			<section className="bg-light-beige text-bg-dark py-24 px-6">
				<div className="max-w-5xl mx-auto space-y-6">
					<h2 className="font-shuriken text-3xl text-dark-red">
						Legacy and Alumni Network
					</h2>

					<p>
						The strength of NCS lies in its people. Over the years, its members
						have moved into leading technology companies, research roles, and
						entrepreneurial ventures. Their journey continues to guide and
						inspire the present generation.
					</p>

					<p>
						This network is not just a list of achievements. It is an active
						support system that contributes through mentorship, collaboration,
						and shared experience.
					</p>
				</div>
			</section>

			{/* CLOSING */}
			<section className="bg-bg-dark text-beige py-24 px-6 text-center">
				<div className="max-w-4xl mx-auto space-y-6">
					<h2 className="font-shuriken text-3xl text-primary-red">
						A Culture of Builders
					</h2>

					<p className="text-light-beige text-lg">
						Since 2000, Nibble Computer Society has remained a place for
						students who want to build, explore, and lead. It is not defined by
						events or titles, but by the people who choose to put in the work
						and move the community forward.
					</p>
				</div>
			</section>
		</div>
	);
};

export default Page;
