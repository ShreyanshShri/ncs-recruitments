"use client";

import Timeline from "@/components/landing_page/Timeline";
import Hero from "@/components/landing_page/Hero";
import Clubs from "@/components/landing_page/Clubs";
import Secondary_Hero from "@/components/landing_page/Secondary_Hero";
import WindScene from "@/components/landing_page/WindScene";
import JoinOurRecruitmentDrive from "@/components/landing_page/JoinOurRecruitmentDrive";
import AboutNcs from "@/components/landing_page/AboutNcs";

import Navbar from "@/components/landing_page/Navbar";
import Footer from "@/components/landing_page/Footer";

import { useState } from "react";

const Page = () => {
	const [loadSite, setLoadSite] = useState(false);

	if (loadSite) {
		return (
			<>
				<Navbar />
				<Secondary_Hero />
				<Clubs />
				<Timeline />
				<AboutNcs />
				<JoinOurRecruitmentDrive />
				<Footer />
			</>
		);
	} else {
		return (
			<>
				<Hero setLoadSite={setLoadSite} />
				<WindScene particle_count={140} contrast={false} />
			</>
		);
	}
};

export default Page;
