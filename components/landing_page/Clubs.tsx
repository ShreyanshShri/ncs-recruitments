import ClubCard from "./ClubCard";
import { Code2, LayoutDashboard, Palette, BrainCircuit } from "lucide-react";

const Clubs = () => {
	return (
		<div className="relative pt-25 px-6 pb-25 bg-beige" id="domains">
			{/* <div
				className="relative pt-25 px-6 pb-25"
				style={{ backgroundColor: "#422017", color: "beige" }}
			> */}
			<div className="text-center mb-20">
				<h2 className="text-4xl font-shuriken tracking-widest text-primary-red">
					OUR CLUBS
				</h2>
				<p className="mt-5 max-w-4xl font-shuriken mx-auto text-lightBeige/70 leading-relaxed">
					Discover specialized communities where innovation meets creativity.
					Learn, build, and grow together through hands-on projects and
					real-world problem solving.
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
				<ClubCard
					title="Programming Club"
					icon={Code2}
					gradient="from-red-500 to-orange-400"
					description="Master logic, data structures, and algorithms through
      problem-solving and competitive programming challenges."
				/>

				<ClubCard
					title="Development Club"
					icon={LayoutDashboard}
					gradient="from-blue-500 to-cyan-400"
					description="Build real-world web applications using modern frameworks
      and tools while learning full-stack development practices."
				/>

				<ClubCard
					title="Design Club"
					icon={Palette}
					gradient="from-pink-500 to-purple-500"
					description="Explore UI/UX principles, visual storytelling, and creative
      design to craft beautiful and intuitive digital experiences."
				/>

				<ClubCard
					title="AI / ML Club"
					icon={BrainCircuit}
					gradient="from-emerald-500 to-lime-400"
					description="Dive into Artificial Intelligence and Machine Learning by
      training models, analyzing data, and building intelligent systems."
				/>
			</div>
		</div>
	);
};

export default Clubs;
