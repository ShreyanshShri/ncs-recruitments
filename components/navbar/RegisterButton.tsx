import Link from 'next/link';
import React from 'react';

interface RegisterButtonProps {
  isScrolled: boolean;
}

const RegisterButton: React.FC<RegisterButtonProps> = ({ isScrolled }) => {
  return (
    <Link
      href="/register"
      className={`
        group relative flex items-center justify-center overflow-hidden rounded-full 
        transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)]
        outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black
        
        /* 1. Base Glass Material */
        bg-white/5 backdrop-blur-md border border-white/10
        
        /* 2. Interactive States */
        hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]
        active:scale-95 active:bg-white/5
        
        /* 3. Adaptive Sizing based on Scroll */
        ${isScrolled 
          ? 'px-5 py-2 text-xs' 
          : 'px-6 py-2.5 text-sm'
        }
      `}
    >
      {/* CINEMATIC SHINE EFFECT
         A sheer gradient that slides across the button on hover
      */}
      <div 
        className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-10"
      />

      {/* INNER GLOW (The "Reactor Core") 
         A subtle blue radial gradient in the center that pulses
      */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_70%)]" />

      {/* BUTTON TEXT */}
      <span 
        className={`
          relative z-20 font-semibold tracking-wider uppercase text-white 
          transition-all duration-300
          group-hover:text-blue-50
        `}
      >
        Join NCS
      </span>

      {/* OPTIONAL: Right Arrow Icon (Fades in on hover)
         Adds a sense of direction/movement
      */}
      <svg 
        className={`
          relative z-20 w-3 h-3 ml-2 text-blue-200 
          transform transition-all duration-300 
          ${isScrolled ? 'hidden' : 'block group-hover:translate-x-1'}
        `} 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </Link>
  );
};

export default RegisterButton;