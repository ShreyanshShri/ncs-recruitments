import React from "react";
import RoundCard from "../components/RoundCard";
import bgImage from "../assets/BG.png";
import Navbar from "../components/Navbar";

export default function Rounds() {
  return (
    <>
      <div
        className="min-h-screen absolute w-full bg-cover bg-center bg-no-repeat flex flex-col  text-center "
        style={{
          backgroundImage: `url(${bgImage})`,
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
      </div>
    </>
  );
}
