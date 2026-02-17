"use client";

import Timeline from "@/components/landing_page/Timeline";
import Hero from "@/components/landing_page/Hero";
import Clubs from "@/components/landing_page/Clubs";
import Secondary_Hero from "@/components/landing_page/Secondary_Hero";

import Navbar from "@/components/Navbar";
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
				<Footer />
			</>
		);
	} else {
		return (
			<>
				<Hero setLoadSite={setLoadSite} />
			</>
		);
	}
};

export default Page;
