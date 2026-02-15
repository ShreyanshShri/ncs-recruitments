"use client";

import React from "react";

export default function FooterBottom() {

  const year = new Date().getFullYear();

  return (

    <div
      className="
        mt-16
        pt-6

        border-t border-white/[0.08]

        flex
        flex-col
        md:flex-row

        items-center
        justify-between

        gap-4

        text-xs
        md:text-sm

        text-white/40
      "
    >

      {/* Copyright */}
      <span>
        © {year} Nibble Computer Society. All rights reserved.
      </span>


      {/* Ownership line */}
      <span
        className="
          text-white/30
        "
      >
        JSS Academy of Technical Education, Noida
      </span>

    </div>

  );

}
