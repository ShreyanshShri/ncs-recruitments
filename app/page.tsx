import HeroSection from "@/components/sections/HeroSection";
import IdentitySection from "@/components/sections/IdentitySection";
import AboutSection from "@/components/sections/AboutSection";

const page = () => {
	return (
		<>
			{/* <Spline
        className="w-full h-full"
        scene="https://prod.spline.design/epRk5J3rZZYI1UHE/scene.splinecode"
      /> */}
			<HeroSection />
			<IdentitySection />
			<AboutSection />
		</>
	);
};

export default page;
