'use client';

import React from 'react';

export default function ScrollIndicator() {
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 pointer-events-none z-20">
      
      <span 
        className="
          text-[10px] font-medium tracking-[0.3em] uppercase text-white/30
          animate-pulse duration-[3s]
        "
      >
        Scroll
      </span>

      <div 
        className="
          relative w-[2px] h-16 
          rounded-full bg-gradient-to-b from-white/5 to-transparent
          overflow-hidden
        "
      >
        {/* Uses the 'animate-scroll-drop' defined in tailwind.config.ts */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white to-transparent opacity-0 animate-scroll-drop" />
      </div>
    </div>
  );
}