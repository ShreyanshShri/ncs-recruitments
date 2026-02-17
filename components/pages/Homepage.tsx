import React from "react";
import Navbar from "@/components/Navbar";
import bgImage from "@/assets/BG.png";
import RoundCard from "@/components/RoundCard";
import ClubCard from "../landing_page/ClubCard";

export default function Home() {
	return (
		<>
			<div
				className="min-h-screen absolute w-full bg-cover bg-center bg-no-repeat flex flex-col  text-center "
				style={{
					backgroundImage: `url(${bgImage.src})`,
				}}
			>
				<Navbar />
				{/* Dark Overlay for cinematic feel */}

				{/* Content */}
				<div className="relative top-24">
					{/* Title */}
					<h1 className="font-shuriken text-black text-2xl sm:text-6xl md:text-5xl tracking-wider drop-shadow-[0_5px_15px_rgba(212,175,55,0.9)]">
						RECRUITMENT
					</h1>

					<h2 className="font-shuriken text-black text-3xl sm:text-5xl md:text-6xl mt-2 drop-shadow-[0_5px_15px_rgba(212,175,55,0.9)]">
						2026
					</h2>
				</div>
				{/* Rounds Section */}
				<div className="relative top-40 flex flex-col items-center gap-10 px-6">
					{/* row1 */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-10">
						<RoundCard title="R1 - ONLINE APTITUDE" subtitle="" unlocked />

						<RoundCard title="R2 - TECHNICAL ROUND" subtitle="" />

						<RoundCard title="R3 - GROUP DISCUSSION" subtitle="" />
					</div>
					{/* row2 */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-4">
						<RoundCard title="R4 - TECHNICAL INTERVIEW" subtitle="" />

						<RoundCard title="R5 - HR ROUND" subtitle="" />
					</div>
				</div>
				{/* OUR CLUBS SECTION */}
				<div className="relative top-60 px-6 pb-40">
					<div className="text-center mb-20">
						<h2 className="text-4xl font-shuriken tracking-widest text-beige">
							OUR CLUBS
						</h2>
						<p className="mt-5 max-w-4xl font-shuriken mx-auto text-lightBeige/70 leading-relaxed">
							Discover specialized communities where innovation meets
							creativity. Learn, build, and grow together through hands-on
							projects and real-world problem solving.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
						<ClubCard
							title="Programming Club"
							icon="</>"
							gradient=""
							description="Master logic, data structures, and algorithms through
      problem-solving and competitive programming challenges."
						/>

						<ClubCard
							title="Development Club"
							icon="🧩"
							gradient=""
							description="Build real-world web applications using modern frameworks
      and tools while learning full-stack development practices."
						/>

						<ClubCard
							title="Design Club"
							icon="🎨"
							gradient=""
							description="Explore UI/UX principles, visual storytelling, and creative
      design to craft beautiful and intuitive digital experiences."
						/>

						<ClubCard
							title="AI / ML Club"
							icon="🤖"
							gradient=""
							description="Dive into Artificial Intelligence and Machine Learning by
      training models, analyzing data, and building intelligent systems."
						/>
					</div>
				</div>
			</div>
		</>
	);
}
