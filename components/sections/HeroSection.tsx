"use client";

import HeroBackground from "@/components/hero/HeroBackground";
import HeroContent from "@/components/hero/HeroContent";

export default function HeroSection() {
  return (
    <section
      className="
        relative
        w-full
        h-[100vh]

        flex
        items-center
        justify-center

        overflow-hidden

        bg-black
      "
    >
      {/* Background Layer */}
      <HeroBackground />

      {/* Content Layer */}
      <HeroContent />
     
    </section>
  );
}
