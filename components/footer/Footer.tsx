"use client";

import React from "react";
import FooterBrand from "./FooterBrand";
import FooterLinks from "./FooterLinks";
import FooterBottom from "./FooterBottom";

export default function Footer() {

  return (

    <footer
      className="
        relative
        w-full

        bg-black

        border-t border-white/[0.08]

        overflow-hidden
      "
    >

      {/* Subtle gradient fade from content */}
      <div
        className="
          absolute
          top-0
          left-0
          w-full
          h-32

          bg-gradient-to-b
          from-transparent
          via-black/60
          to-black

          pointer-events-none
        "
      />


      {/* Main content container */}
      <div
        className="
          relative
          z-10

          max-w-7xl
          mx-auto

          px-6
          md:px-10
          lg:px-16

          pt-20
          pb-12
        "
      >

        {/* Top Grid */}
        <div
          className="
            grid

            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3

            gap-12
            lg:gap-20

            items-start
          "
        >

          {/* Brand */}
          <FooterBrand />


          {/* Navigation Links */}
          <FooterLinks />

        </div>


        {/* Bottom Strip */}
        <FooterBottom />

      </div>


      {/* Background grid (very subtle, optional visual depth) */}
      <div
        className="
          absolute inset-0
          opacity-[0.02]
          pointer-events-none
        "
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

    </footer>

  );

}
