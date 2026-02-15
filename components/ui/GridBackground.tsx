"use client";

import React from "react";

export default function GridBackground() {

  return (

    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      {/* Base Grid Layer */}
      <div
        className="
          absolute inset-0
          opacity-[0.06]
        "
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          backgroundPosition: "center center",
        }}
      />


      {/* Secondary finer grid (adds technical precision) */}
      <div
        className="
          absolute inset-0
          opacity-[0.03]
        "
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "12px 12px",
          backgroundPosition: "center center",
        }}
      />


      {/* Radial vignette (focus attention to center) */}
      <div
        className="
          absolute inset-0
        "
        style={{
          background: `
            radial-gradient(
              circle at center,
              transparent 0%,
              rgba(0,0,0,0.4) 60%,
              rgba(0,0,0,0.9) 100%
            )
          `
        }}
      />


      {/* Subtle vertical fade (section blending) */}
      <div
        className="
          absolute top-0 left-0 w-full h-40
          bg-gradient-to-b
          from-black
          to-transparent
        "
      />

      <div
        className="
          absolute bottom-0 left-0 w-full h-40
          bg-gradient-to-t
          from-black
          to-transparent
        "
      />

    </div>

  );

}
