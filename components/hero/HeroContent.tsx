"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import HeroCTA from "./HeroCTA";

export default function HeroContent() {
  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP Animation Logic
  // This runs once on mount and handles the cinematic entrance
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Select all elements with the 'hero-animate' class
      tl.fromTo(
        ".hero-animate",
        {
          y: 40, // Start 40px down
          opacity: 0, // Start invisible
          filter: "blur(10px)", // Start blurry (cinematic effect)
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.15, // Delay between each item
        },
      );
    },
    { scope: containerRef },
  ); // Scope ensures we only animate elements inside this component

  return (
    <div
      ref={containerRef}
      className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 pointer-events-none"
    >
      {/* 1. GLASS BADGE */}
      <div
        className="
    pointer-events-auto 
    hero-animate opacity-0
    relative overflow-hidden
    mb-8 px-5 py-2 rounded-full
    
    /* 1. Glass Material (Whitish Tint) */
    bg-white/5 backdrop-blur-xl
    border border-white/15
    
    /* 2. Soft Outer Glow */
    shadow-[0_0_20px_-5px_rgba(255,255,255,0.15)]
    
    /* Layout */
    flex items-center justify-center
  "
      >
        {/* 3. Animated Inner Light (The "Whitish Animation") 
      - Uses standard Tailwind pulse to create a breathing light effect
      - No custom keyframes needed
  */}
        <div className="absolute inset-0 bg-white/10 animate-pulse" />

        {/* 4. Top Rim Highlight (Physicality) */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

        {/* 5. Bottom Reflection */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Content */}
        <span className="relative z-10 text-[10px] md:text-xs font-semibold tracking-[0.25em] uppercase text-white/90 drop-shadow-sm">
          Nibble Computer Society
        </span>
      </div>

      {/* 2. PRIMARY HEADLINE */}
      <h1
        className="
          hero-animate opacity-0
          max-w-4xl mx-auto text-center
          text-5xl sm:text-6xl md:text-7xl lg:text-8xl
          font-bold tracking-tighter leading-[1.1] md:leading-[1.05]
          text-transparent bg-clip-text 
          drop-shadow-2xl
          bg-linear-to-b from-slate-100 to-slate-300
        "
      >
        Build What Others <br className="hidden md:block" />
        <span className="text-white/40">Only Imagine</span>
      </h1>

      {/* 3. SUBTEXT */}
      <p
        className="
          hero-animate opacity-0
          mt-8 mb-10 max-w-2xl mx-auto text-center
          text-base sm:text-lg md:text-xl
          text-white font-light leading-relaxed tracking-wide
          text-balance
        "
      >
        Join the official technical society of JSS Noida. Architect real-world
        systems, engineer future-proof AI, and define the next generation of
        open-source.
      </p>

      {/* 4. CTA CONTAINER */}
      <div className="hero-animate opacity-0 w-full flex justify-center">
        <HeroCTA />
      </div>
    </div>
  );
}
