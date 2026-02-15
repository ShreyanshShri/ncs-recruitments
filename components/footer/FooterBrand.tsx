"use client";

import React from "react";

export default function FooterBrand() {

  return (

    <div
      className="
        flex
        flex-col

        items-start

        max-w-sm
      "
    >

      {/* Brand Name */}
      <h3
        className="
          text-white

          text-lg
          md:text-xl

          font-semibold

          tracking-tight
        "
      >
        Nibble Computer Society
      </h3>


      {/* Identity Line */}
      <p
        className="
          mt-3

          text-sm
          md:text-base

          text-white/50

          leading-relaxed
        "
      >
        Official technical society of JSS Noida, focused on building
        real-world engineering systems, fostering innovation, and
        developing elite developers.
      </p>


      {/* Authority Tag */}
      <span
        className="
          mt-4

          text-xs

          uppercase
          tracking-[0.25em]

          text-white/30
        "
      >
        Est. 2024
      </span>

    </div>

  );

}
