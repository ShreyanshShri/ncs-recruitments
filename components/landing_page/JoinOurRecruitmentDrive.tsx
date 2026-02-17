import Link from "next/link";

const JoinOurRecruitmentDrive = () => {
	return (
		<div id="JoinOurRecruitmentDrive" className="bg-bg-dark p-6 py-16">
			<div className="bg-linear-to-r from-primary-red/18 via-primary-red/22 to-primary-red/4 backdrop-blur-sm border border-primary-red/30 rounded-3xl p-12 space-y-6">
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
					<Link href="/auth/register">
						<button className="px-8 py-3 bg-primary-red text-bg-dark font-shuriken rounded-xl hover:shadow-lg hover:shadow-primary-red/50 transition-all duration-300">
							Apply Now
						</button>
					</Link>
					{/* <button className="px-8 py-3 border border-beige/30 text-beige font-shuriken rounded-xl hover:border-primary-red hover:bg-primary-red/10 transition-all duration-300">
						Learn More
					</button> */}
				</div>
			</div>
		</div>
	);
};

export default JoinOurRecruitmentDrive;
