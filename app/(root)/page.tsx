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

import { useState, useRef } from "react";

const Page = () => {
	const [loadSite, setLoadSite] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const audioRef = useRef<HTMLAudioElement | null>(null);

	const handleStart = () => {
		setLoadSite(true);
		setIsPlaying(true);
		if (audioRef.current) {
			audioRef.current.volume = 0.5;
			audioRef.current.play().catch((e: any) => console.log("Audio play failed", e));
		}
	};

	const toggleMusic = () => {
		if (audioRef.current) {
			if (isPlaying) {
				audioRef.current.pause();
			} else {
				audioRef.current.play();
			}
			setIsPlaying(!isPlaying);
		}
	};

	return (
		<>
			{/* Hidden Audio Player */}
			<audio ref={audioRef} src="/audio/bg-music.mp3" loop />

			{loadSite ? (
				<>
					<Navbar isPlaying={isPlaying} toggleMusic={toggleMusic} />
					<Secondary_Hero />
					<Clubs />
					<Timeline />
					<AboutNcs />
					<JoinOurRecruitmentDrive />
					<Footer />
				</>
			) : (
				<>
					<Hero setLoadSite={handleStart} />
					<WindScene particle_count={140} contrast={false} />
				</>
			)}
		</>
	);
};

export default Page;
