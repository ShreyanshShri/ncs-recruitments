import Link from "next/link";
import Image from "next/image";
import React from "react";

interface NavLogoProps {
  isScrolled: boolean;
}

const NavLogo: React.FC<NavLogoProps> = ({ isScrolled }) => {
  return (
    <Link href="/" className="group relative z-50 block outline-none">
      {/* Container
        - Aligns icon and text
        - Handles the overall scale transition 
      */}
      <div
        className={`
          flex items-center gap-3 
          transition-all duration-500 cubic-bezier(0.25, 0.8, 0.25, 1)
          ${isScrolled ? "gap-2" : "gap-3"}
        `}
      >
        {/* 1. LOGO IMAGE
           - Scales down when scrolled
           - Bloom effect on hover
        */}
        <div
          className={`
            relative flex items-center justify-center 
            transition-all duration-500 
            ${isScrolled ? "w-12 h-12" : "w-16 h-16"}
          `}
        >
          {/* Back Glow (Hover only) - Creates a colored atmosphere behind the logo */}
          <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <Image
            src="/ncs-logo.svg" // <--- PLACE YOUR SVG FILE IN THE PUBLIC FOLDER
            alt="NCS Logo"
            width={20}
            height={20}
            className={`
              object-contain w-full h-full 
              transition-all duration-500 ease-out
              group-hover:scale-110 group-hover:brightness-125 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]
            `}
            priority
          />
        </div>

        {/* 2. LOGO TEXT
           - "NCS" is always visible
           - "Nibble" fades out on scroll
        */}
      </div>
    </Link>
  );
};

export default NavLogo;
