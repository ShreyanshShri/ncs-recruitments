"use client";

import React from "react";

export default function HeroCTA() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-lg mx-auto">
      {/* Primary Button */}
      <button
        className="
          pointer-events-auto
          group relative w-full sm:w-auto
          flex items-center justify-center
          px-8 py-3.5 sm:py-4
          rounded-full
          bg-white/10 backdrop-blur-md
          border border-white/10
          shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)]
          text-sm sm:text-base font-semibold tracking-wide text-white
          uppercase
          transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)]
          hover:bg-white/20 hover:scale-[1.02] hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.2)] hover:border-white/30
          active:scale-[0.96] active:bg-white/10
          overflow-hidden
        "
        aria-label="Apply to Nibble Computer Society"
      >
        {/* Shimmer Effect */}
        <div
          className="
            absolute inset-0 -translate-x-full 
            bg-gradient-to-r from-transparent via-white/20 to-transparent 
            group-hover:animate-shimmer
            z-0
          "
        />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-30" />

        <span className="relative z-10 flex items-center gap-2">
          Apply Now
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </span>
      </button>

      {/* Secondary Button */}
      <button
        className="
        pointer-events-auto
          group relative w-full sm:w-auto
          flex items-center justify-center
          px-8 py-3.5 sm:py-4
          rounded-full
          bg-transparent
          border border-white/5
          text-sm sm:text-base font-medium tracking-wide text-zinc-400
          transition-all duration-300 ease-out
          hover:bg-white/5 hover:text-white hover:border-white/20
          active:scale-[0.98]
        "
      >
        <span className="relative z-10">Explore Society</span>
      </button>
    </div>
  );
}