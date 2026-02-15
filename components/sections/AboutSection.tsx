"use client";

import React from "react";
import { Vortex } from "../ui/vortex";

const AboutSection = () => {
  return (
    <section className="w-full bg-black relative">
      <div className="w-full mx-auto h-[50vh] min-h-[420px] overflow-hidden">
        <Vortex
          backgroundColor="black"
          rangeY={500} // Reduced for subtle movement
          particleCount={200} // Reduced to avoid hero duplication
          baseHue={120}
          rangeSpeed={0.5}
          className="
            flex flex-col
            items-center
            justify-center

            px-6 md:px-16
            py-10

            w-full h-full

            text-center
          "
        >
          {/* Section Label */}
          <span
            className="
            text-[11px]
            md:text-xs
            uppercase
            tracking-[0.4em]
            text-white/40
            mb-6
          "
          >
            What is Nibble
          </span>

          {/* Main Heading */}
          <h2
            className="
            text-3xl
            sm:text-4xl
            md:text-5xl
            lg:text-6xl

            font-semibold
            tracking-tight
            leading-[1.1]

            text-white

            max-w-4xl
          "
          >
            The Official Technical Society
            <br />
            of JSS Noida
          </h2>

          {/* Supporting Statement */}
          <p
            className="
            text-base
            sm:text-lg
            md:text-xl

            text-white/60

            max-w-3xl
            mt-8
            leading-relaxed
          "
          >
            Nibble Computer Society builds engineers, not just members. We
            design and deploy real-world systems — from AI platforms and
            scalable web infrastructure to high-performance applications.
          </p>

          {/* Manifesto Line */}
          <p
            className="
            mt-8
            text-lg
            md:text-xl

            font-medium
            tracking-wide

            text-white/80
          "
          >
            Not just learners.
            <span className="text-white ml-2">Builders.</span>
          </p>
        </Vortex>
      </div>
    </section>
  );
};

export default AboutSection;
