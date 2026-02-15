"use client";

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({
	children,
}: {
	children: ReactNode;
}) {
	const lenisRef = useRef<Lenis | null>(null);

	useEffect(() => {
		const lenis = new Lenis({
			duration: 1.2,
			easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			smoothWheel: true,
			touchMultiplier: 2,
		});

		lenisRef.current = lenis;

		// CRITICAL: use ONLY GSAP ticker as RAF driver
		gsap.ticker.add((time) => {
			lenis.raf(time * 1000);
		});

		gsap.ticker.lagSmoothing(0);

		// Sync ScrollTrigger
		lenis.on("scroll", ScrollTrigger.update);

		// Refresh ScrollTrigger after setup
		ScrollTrigger.refresh();

		return () => {
			gsap.ticker.remove((time) => {
				lenis.raf(time * 1000);
			});

			lenis.destroy();
			ScrollTrigger.killAll();
		};
	}, []);

	return <>{children}</>;
}
