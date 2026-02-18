"use client";

import { useRef, useState } from "react";
import { useIntro } from "@/providers/landing-page/intro-provider";

import Timeline from "@/components/landing_page/Timeline";
import Hero from "@/components/landing_page/Hero";
import Clubs from "@/components/landing_page/Clubs";
import Secondary_Hero from "@/components/landing_page/Secondary_Hero";
import WindScene from "@/components/landing_page/WindScene";
import JoinOurRecruitmentDrive from "@/components/landing_page/JoinOurRecruitmentDrive";
import AboutNcs from "@/components/landing_page/AboutNcs";
import Navbar from "@/components/landing_page/Navbar";
import Footer from "@/components/landing_page/Footer";

export default function Page() {
	const { introDone, setIntroDone } = useIntro();

	const [isPlaying, setIsPlaying] = useState(false);
	const audioRef = useRef<HTMLAudioElement | null>(null);

	// 🎬 called when user enters the site
	const handleStart = async () => {
		setIntroDone(true);

		if (audioRef.current) {
			try {
				audioRef.current.volume = 0.5;
				await audioRef.current.play();
				setIsPlaying(true);
			} catch (err) {
				console.log("Audio play failed", err);
			}
		}
	};

	const toggleMusic = () => {
		if (!audioRef.current) return;

		if (isPlaying) {
			audioRef.current.pause();
			setIsPlaying(false);
		} else {
			audioRef.current.play();
			setIsPlaying(true);
		}
	};

	return (
		<>
			{/* 🔊 Global audio element (never unmounts during navigation) */}
			<audio ref={audioRef} src="/audio/bg-music.mp3" loop />

			{introDone ? (
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
}
